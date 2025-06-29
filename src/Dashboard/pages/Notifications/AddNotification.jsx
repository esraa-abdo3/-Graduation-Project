import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export default function AddNotification({closeModal,getAllNotif,showModal}) {
  if (!showModal) return null;  
      const [errormsg ,setErrormsg] = useState('')
      const [Donemsg ,setDonemsg] = useState('')
      const [isLoading, setIsLoading] = useState(false);
      const cookie = new Cookies();
      const gettoken = cookie.get('Bearer');
  

  
      const resetData =()=>{
          setErrormsg(""); 
          setDonemsg(""); 
          setTitle('');
          setMessage('')
          setEmail('');
      }
  
      const [form, setform] = useState({
        title:'',
        message:'',
        userEmail: '',
    });
      
      const createNewNotification = async()=>{
          setIsLoading(true);
          setErrormsg(""); 
          setDonemsg("");  
        
          if (!form.title || !form.message || !form.userEmail) {
            setErrormsg("Please provide all required fields");
            setIsLoading(false);
            return;
          }
          try {
              const res = await axios.post(
                    `https://carenest-serverside.vercel.app/user/notifications`,form,
                    {
                      headers: {
                        Authorization: `${gettoken}`,
                      }
                    }
                  );
              
                  console.log("Uploaded Notification successfully");
                  setDonemsg(" A new Notification has been added successfully.");
                  await getAllNotif(); 
                  closeModal();            
          } catch (error) {
              if (error.response) {
                  console.log("Server error:", error.response.data);
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
  
          <h2 className="modal-title">Add new Notification</h2>
  
          <div className="modal-formChannel">
            <div className="form-group2">
                <div className="EmailN">
                    <input type="email" placeholder="Enter your email"  value={form.userEmail}
                    onChange={(e) => setform({...form,userEmail:e.target.value})} />
                </div>
                <div className="FLname">
                    <input type="text" placeholder="Enter the title"
                    value={form.title}
                    onChange={(e) => setform({...form,title:e.target.value})} />

                    <textarea name="text"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={(e) => setform({...form,message:e.target.value})}
                    rows="2" cols="90"
                    ></textarea>
                </div>
            </div>
            
            
            {errormsg && <p className="error-message">{errormsg}</p>}
            {Donemsg && <p className="success-message">{Donemsg}</p>}
  
            <div className="btn-voiceForm">
              <button  className="reset-button" onClick={resetData}>
              <i className="fa-solid fa-repeat"></i> Reset all
              </button>
              {isLoading ? (
    <div className="flex flex-col items-center gap-2 loadingUpLoading">
      <ClipLoader color="white" size={20} />
    </div>
  ) : (
    <button className="add-button" onClick={createNewNotification} disabled={isLoading}>
      <FaPlus /> Add
    </button>
  )}
  
            </div>
          
  
          </div>
        </div>
      </div>
    )
  }
  