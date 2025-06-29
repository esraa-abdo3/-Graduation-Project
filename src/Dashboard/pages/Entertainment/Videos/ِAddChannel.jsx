import React, { useState, useRef } from "react";
import uploadImg from '../../../../assets/dashimgvid.png'
import { FaPlus } from "react-icons/fa";
import "../Voices/AddVoiceModal.css";
import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export default function AddChannel({closeModal,fetchData,showModal}) {
    if (!showModal) return null;  
    const [channelURL, setChannelURL] = useState("");
    const [imgFile,setImgeFile]=useState('');
    const [name, setName] = useState("");
    const [errormsg ,setErrormsg] = useState('')
    const [Donemsg ,setDonemsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const cookie = new Cookies();
    const gettoken = cookie.get('Bearer');
    

    const fileInputRef = useRef(null);
    const handleImageClick = () => {
            fileInputRef.current.click(); 
          };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
            if (file) {
              setImgeFile(file);
            }
    };
    const resetDataVideo =()=>{
        setErrormsg(""); 
        setDonemsg(""); 
        setName('');
        setChannelURL('');
        setImgeFile('')
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("url", channelURL);
    formData.append("logo", imgFile); 
    

    const createChannel=async()=>{
        setIsLoading(true);
        setErrormsg(""); 
        setDonemsg("");  
      
        if (!channelURL || !name) {
          setErrormsg("Please provide all required fields");
          setIsLoading(false);
          return;
        }
        try {
            const res = await axios.post(
                  `https://carenest-serverside.vercel.app/channels/`,
                 formData,
                  {
                    headers: {
                      Authorization: `${gettoken}`,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
            
                console.log("Uploaded successfully:", res.data);
                setDonemsg(" Channel uploaded!");
                await fetchData(); 
                closeModal();           
              } catch (error) {
  if (error.response) {
    console.log("Server error:", error.response.data);
  } else {
    console.log("Unknown error:", error);
  }
}

 finally {
                setIsLoading(false); 
              }
      }
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Add new Channel</h2>

        <div className="modal-formChannel">
          <div className="dataVoicebox1">
          <div className="form-group" onClick={handleImageClick}>
            <img src={uploadImg} alt="uploadImg" />
            {imgFile && (
    
          <div className="overlay-check">
         <i className="fa-solid fa-check"></i>
        </div>
  )}
  
  <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleImageChange}
  style={{ display: "none" }}
/>

          </div>
          <div className="form-group2">
            <input type="text" placeholder="Enter Channel name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Enter URL of Channel"  value={channelURL}
            onChange={(e) => setChannelURL(e.target.value)} />
        </div>
          </div>
          
          
          {errormsg && <p className="error-message">{errormsg}</p>}
        {Donemsg && <p className="success-message">{Donemsg}</p>}

          <div className="btn-voiceForm">
            <button  className="reset-button" onClick={resetDataVideo}>
            <i className="fa-solid fa-repeat"></i> Reset all
            </button>
            {isLoading ? (
  <div className="flex flex-col items-center gap-2 loadingUpLoading">
    <ClipLoader color="white" size={20} />
    <p className="text-sm text-gray-500">Uploading...</p>
  </div>
) : (
  <button className="add-button" onClick={createChannel} disabled={isLoading}>
    <FaPlus /> Add
  </button>
)}

          </div>
        

        </div>
      </div>
    </div>
  )
}
