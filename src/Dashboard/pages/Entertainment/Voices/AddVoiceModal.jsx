import React, { useState, useRef } from "react";
import uploadImg from '../../../../assets/uploadVoice.png'
import { FaPlus } from "react-icons/fa";
import "./AddVoiceModal.css";
import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";


const AddVoiceModal = ({ isOpen, onClose , getallVoices}) => {
  if (!isOpen) return null;
   const [categories, setCategories] = useState(["Rap", "Rock"]);
   const [newCat,setNewCat]=useState('');

   const handleAddCategory = () => {
    if (newCat) {
      setCategories([...categories, newCat]);
      setNewCat(""); 
    }
  };
  
  const [audioFile, setAudioFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errormsg ,setErrormsg] = useState('')
  const [Donemsg ,setDonemsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  
  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };
const [selectedOption, setSelectedOption] = useState("");
const [isOpenList, setIsOpenList] = useState(false);
const fileInputRef = useRef(null);
const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

const cookie = new Cookies();
const gettoken = cookie.get('Bearer');



const handleSelect = (categories) => {
  setSelectedOption(categories);
  setIsOpenList(false);
};

const resetDataVoice =()=>{
    setErrormsg(""); 
    setDonemsg(""); 
    setName('');
    setSelectedOption('');
    setAudioFile(null);
    setDescription('');
}


const createrelaxsound = async () => {
    setIsLoading(true);
    setErrormsg(""); // Reset error
    setDonemsg("");  // Reset done msg
  
    if (!audioFile || !selectedOption || !name) {
      setErrormsg("Please provide all required fields");
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("category", selectedOption);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("audio", audioFile);
  
    try {
      const res = await axios.post(
        "https://carenest-serverside.vercel.app/relaxSounds/",
        formData,
        {
          headers: {
            Authorization: `${gettoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Uploaded successfully:", res.data);
      setDonemsg("Relaxing sound uploaded!");
      await getallVoices(); // استدعاء كل الأصوات
      onClose();            // اقفل المودال
    } catch (err) {
      console.error("Error uploading:", err.response ? err.response.data : err);
      setErrormsg("Something went wrong!");
    } finally {
      setIsLoading(false); // سواء حصل خطأ أو لا، اقفل السبينر
    }
  };
  



  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Add new sweet sleep</h2>

        <div className="modal-form">
          <div className="dataVoicebox1">
          <div className="form-group" onClick={handleImageClick}>
            <img src={uploadImg} alt="uploadImg" />
            {audioFile && (
    <div className="overlay-check">
      <i className="fa-solid fa-check"></i>
    </div>
  )}
            <input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            />
          </div>
          <div className="form-group2">
            <input type="text" placeholder="Enter sound name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        <div className="catList">

          <div className="dropdown-container">
      <div className="dropdown-header" onClick={() => setIsOpenList(!isOpenList)}>
        {selectedOption || "Select the sound Category"}
        <span className="arrow">{isOpenList ?  <i className="fa-solid fa-caret-left"></i>: <i className="fa-solid fa-caret-right"></i>}</span>
      </div>

    </div>

      {isOpenList && ( categories.map((cat, index) => (
        <div key={index} className="categoryBox" onClick={() => handleSelect(cat)}>
          <span>{cat}</span>
        </div>)
      )
      
      )}
{isOpenList && (
    <div className="addBox">
        <input type="text" onChange={(e)=>setNewCat(e.target.value)} placeholder="Add new category" />
    <FaPlus  className="Faplus" onClick ={handleAddCategory} />
  </div> 
)}
    
      
        </div>
        </div>
          </div>
          
        <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
          
          {errormsg && <p className="error-message">{errormsg}</p>}
        {Donemsg && <p className="success-message">{Donemsg}</p>}

          <div className="btn-voiceForm">
            <button  className="reset-button" onClick={resetDataVoice}>
            <i className="fa-solid fa-repeat"></i> Reset all
            </button>
            {isLoading ? (
  <div className="flex flex-col items-center gap-2 loadingUpLoading">
    <ClipLoader color="white" size={20} />
    <p className="text-sm text-gray-500">Uploading...</p>
  </div>
) : (
  <button className="add-button" onClick={createrelaxsound} disabled={isLoading}>
    <FaPlus /> Add
  </button>
)}

          </div>
        

        </div>
      </div>
    </div>
  );
};

export default AddVoiceModal;

