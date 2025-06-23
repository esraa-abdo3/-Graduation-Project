import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import uploadImg from '../../../../assets/dashimgvid.png'

import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export default function AddAdmin({closeModal,getDataAdmin,showModal}) {
    if (!showModal) return null;  
    const [firstName ,setFirstName]=useState('');
    const [lastName ,setLasttName]=useState('');
    const [email ,setEmail]=useState('');
    const [phone ,setPhone]=useState('');
    const [imgFile,setImgeFile]=useState('');
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

    const resetDataAdmin =()=>{
        setErrormsg(""); 
        setDonemsg(""); 
        setFirstName('');
        setLasttName('')
        setEmail('');
        setPhone('');
        setImgeFile('')
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("Email", email);
    formData.append("phone", phone);
    formData.append("image", imgFile); 
    console.log(firstName,lastName,email,phone,imgFile)
    
    const createNewAdmin = async()=>{
        setIsLoading(true);
        setErrormsg(""); 
        setDonemsg("");  
      
        if (!firstName || !lastName || !phone || !imgFile || !email) {
          setErrormsg("Please provide all required fields");
          setIsLoading(false);
          return;
        }
        try {
            const res = await axios.post(
                  `https://carenest-serverside.vercel.app/admin`,
                 formData,
                  {
                    headers: {
                      Authorization: `${gettoken}`,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
            
                console.log("Uploaded successfully:", res.data);
                setDonemsg(" A new admin has been added successfully.");
                await getDataAdmin(); 
                closeModal();            
        } catch (error) {
            if (error.response) {
                console.log("Server error:", error.response.data);
                console.log("Detailed errors:");
                error.response.data.errors.forEach((err, index) => {
                console.log(`Error ${index + 1}:`, err.msg);
                });
            } else {
                    console.log("Unknown error:", error);
                }
        }finally {
            setIsLoading(false); 
        }
    }
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Add new Admin</h2>

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
            <div className="FLname">
                <input type="text" placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />

                <input type="text" placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLasttName(e.target.value)} />
            </div>
            <div className="FLname">
            <input type="email" placeholder="Enter your email"  value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Enter your Phone"  value={phone}
            onChange={(e) => setPhone(e.target.value)} />
            </div>
        </div>
          </div>
          
          
          {errormsg && <p className="error-message">{errormsg}</p>}
          {Donemsg && <p className="success-message">{Donemsg}</p>}

          <div className="btn-voiceForm">
            <button  className="reset-button" onClick={resetDataAdmin}>
            <i className="fa-solid fa-repeat"></i> Reset all
            </button>
            {isLoading ? (
  <div className="flex flex-col items-center gap-2 loadingUpLoading">
    <ClipLoader color="white" size={20} />
  </div>
) : (
  <button className="add-button" onClick={createNewAdmin} disabled={isLoading}>
    <FaPlus /> Add
  </button>
)}

          </div>
        

        </div>
      </div>
    </div>
  )
}
