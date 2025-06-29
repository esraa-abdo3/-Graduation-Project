import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import uploadImg from '../../../assets/dashimgvid.png'


export default function EditAdmin({openEdit,getDataAdmins,closePageEdit,idAdmin}) {

    if (!openEdit) return null;  
        const [imgFile,setImgeFile]=useState('');
        const [errormsg ,setErrormsg] = useState('')
        const [Donemsg ,setDonemsg] = useState('')
        const [isLoading, setIsLoading] = useState(false);
        const cookie = new Cookies();
        const gettoken = cookie.get('Bearer');
        const [formData,setFormData]=useState({
              firstName:"",
              lastName:"",
              Email: "",
              phone: "",
              image : ""
        })

        
    
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
    
        
    
    console.log('iddd',idAdmin);
    
        
  const editeAdmin = async () => {
    setIsLoading(true);
    setErrormsg("");
    setDonemsg("");

    const { firstName, lastName, phone } = formData;

    if (!firstName || !lastName || !phone) {
      setErrormsg("Please provide all required fields");
      setIsLoading(false);
    return;
    }

    try {
      const res = await axios.put(
        `https://carenest-serverside.vercel.app/admin/${idAdmin}`,
        {
          firstName,
          lastName,
          phone
        },
        {
          headers: {
            Authorization: `${gettoken}`,
            "Content-Type": "application/json"
          }
        }
      );

      setDonemsg("Modified successfully.");
      
      await getDataAdmins();
      closePageEdit();
    } catch (err) {
      console.log("Failed to edit the admin!",err);
      setErrormsg("Failed to edit the admin!");
    } finally {
      setIsLoading(false);
    }
  };


        const getdataAdmin= async()=>{
            try{
                const res =await axios.get(`https://carenest-serverside.vercel.app/admin/${idAdmin}`,{
                    headers: {
                          Authorization: `${gettoken}`,
                        }
                })
                console.log('Data',res.data.data);
                const admin = res.data.data;
                setFormData({
                firstName: admin.firstName,
                lastName: admin.lastName,
                Email: admin.Email,
                phone: admin.phone,
                image: admin.image
                });
                setImgeFile(admin.image);


            }catch(err){
                console.log('failed to get data Admin!');
            }
        }

        useEffect(()=>{
            if (openEdit && idAdmin) {
                getdataAdmin();
            }
        }, [openEdit, idAdmin]);


        const deleteAdmin =async ()=>{
            try{
                const res = await axios.delete(`https://carenest-serverside.vercel.app/admin/${idAdmin}`,{
                    headers: {
                            Authorization: `${gettoken}`,
                        }
                })
                console.log("Deleted successfully");
                setDonemsg(" Deleted successfully.");
                await getDataAdmin(); 
                closePageEdit();         
            }catch(err){
                console.log('Failed to delete the Admin!');
            }
        }
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={closePageEdit}>
            <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Edit Admin</h2>

        <div className="modal-formChannel">
          <div className="dataVoicebox1">
          <div className="form-group" onClick={handleImageClick}>
            <img src={typeof imgFile === "string" ? imgFile : uploadImg} alt="Admin profile" className="preview-image"/>
            {imgFile && (
                <div className="overlay-check">
                    <i className="fa-solid fa-check"></i>
                </div>
            )}
        

          </div>
          <div className="form-group2">
            <div className="FLname">
                <input type="text" placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData,firstName:e.target.value})} />

                <input type="text" placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData,lastName:e.target.value})} />
            </div>
            <div className="FLname">
            <input
                type="email"
                placeholder="Enter your Email"
                value={formData.Email}
                readOnly
                style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
            />

            <input type="number" placeholder="Enter your Phone"  value={formData.phone}
            onChange={(e) => setFormData({...formData,phone:e.target.value})} />
            </div>
        </div>
          </div>
          
          
          {errormsg && <p className="error-message">{errormsg}</p>}
          {Donemsg && <p className="success-message">{Donemsg}</p>}

          <div className="btn-voiceForm">
            <button  className="reset-button" onClick={deleteAdmin} >
            <i class="fa-solid fa-trash"></i> Delete Admin
            </button>
            {isLoading ? (
  <div className="flex flex-col items-center gap-2 loadingUpLoading">
    <ClipLoader color="white" size={20} />
  </div>
) : (
  <button className="add-button" onClick={editeAdmin} disabled={isLoading}>
    <i class="fa-solid fa-pen-to-square"></i> Edit
  </button>
)}

          </div>
        

        </div>
      </div>
    </div>
  )
}
