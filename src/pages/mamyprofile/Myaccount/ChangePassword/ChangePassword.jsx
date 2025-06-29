import { useState } from "react";
import "./ChangePassword.css"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import DeleteMe from "../DeleteMe/Deleteme";

export default function ChangePassword() {
   const cookie = new Cookies();
   const gettoken = cookie.get("Bearer");
    const [passwordVisible, setpasswordVisible] = useState(false);
    const [newpasswordVisible, setnewpasswordVisible] = useState(false);
    const [confirmpasswordVisible, setconfirmpasswordVisible] = useState(false);
    const [Form, setForm] = useState(
        {
    oldPassword:"",
            newPassword: "",
        confirmPassword:""
        }
    )
    const [error, setErrors] = useState({});
    const [Loading, setLoading] = useState(false);
    const [errorpost, seterrorpost] = useState({});
    const[updatedone , setupdatedone]=useState("")
        const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
   function validateForm() {
  const errors = {};

  // 1 - Old password
  if (!Form.oldPassword) {
    errors.oldPassword = "Current password is required.";
  }

  // 2 - New password
  if (!Form.newPassword) {
    errors.newPassword = "New password is required.";
       }
       else if (Form.newPassword.length < 8) {
            errors.newPassword = "password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(Form.newPassword)) {
            errors.newPassword = "Password must be at least 8 characters, have at least one capital letter, one small letter, one digit, and one special character";
        }

  // 3 - Confirm password
  if (Form.newPassword !== Form.confirmPassword) {
    errors.confirm = "Passwords do not match.";
  }

  return errors;
    }
     async function handleupdate(e){
            e.preventDefault();
       
            const errorsafter = validateForm(); 
            if (Object.keys(errorsafter).length > 0) {
                setErrors(errorsafter);
                return; 
            }
            setErrors({});
            setLoading(true); 
            console.log(error)
    
    try {
  const res = await axios.put(
    "https://carenest-serverside.vercel.app/users/updateUserPassword",
    Form,
    {
      headers: {
        Authorization: `${gettoken}` // ← حطي التوكن هنا
      }
    }
        );
        console.log("Password updated:", res);
        cookie.set("Bearer", res.data.token)
        seterrorpost({});
        setLoading(false); 
        setupdatedone("Profile updated successfully ✅");
        
        setTimeout(() => setupdatedone(""), 2000);

}
            
             
     
           
            catch (error) {
                if(error.response && error.response.status === 401){
                    setLoading(false); 
                
                    seterrorpost({ error: 'old password is not valid' });
                }
                else {
                    console.log(error)
                    setLoading(false); 
                  
                    seterrorpost({error: " Oops something wrong please try again"});
                }
            }
        }

    
    return (
        <>
          
        <div className="UpdatePassword">
            <h2>Security</h2>
            <div className="passwords">
                   <div className="oldpassword">
                <span onClick={()=>setpasswordVisible(prev=>!prev)}>
                    {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
                </span>
            
            <label htmlFor="">Current Password</label>
            <input type={passwordVisible? "text":"password"}  value={Form.oldPassword} name="oldPassword" onChange={handleChange}/>
            </div>
                       <div className="Newpassword">
                    <span onClick={()=>setnewpasswordVisible(prev=>!prev)}>
                    {newpasswordVisible? <FaEye/> : <FaEyeSlash/>}
                </span>
            <label htmlFor="">new Password</label>
                <input type={newpasswordVisible ? "text" : "password"} value={Form.newPassword} name="newPassword"  onChange={handleChange}/>
            </div>
            </div>
         
                  {error.oldPassword&& (
                <span className="error">{error.oldPassword}</span>
            )}
     
     
               {error.newPassword && (
                <span className="error">{ error.newPassword}</span>
            )}
            <div className="otherdivpasswords">
                      <div className="confirmnewpassword">
                    <span onClick={()=>setconfirmpasswordVisible(prev=>!prev)}>
                    {confirmpasswordVisible ? <FaEye/> : <FaEyeSlash/>}
                </span>
            <label htmlFor="">confirm Password</label>
            <input type={confirmpasswordVisible? "text":"password"} value={Form.confirmPassword} onChange={handleChange}  name="confirmPassword"/>
            </div>
      <div className="save-button-container-passowrd">
                <button className="Save" onClick={handleupdate}>
                        {Loading ?  <div className="spinner-small"></div> : "change password"}
                    </button>
                </div>
            </div>
      
            {
                error.confirm && (
                    <span className="error"> { error.confirm}</span>
                )
            }
           {
  errorpost.error && (
    <span className="error" style={{textAlign:"center" , width:"100%" , display:"flex", justifyItems:"center",alignItems:"center"}}>{errorpost.error}</span>
  )
            }
                       {
  updatedone.length>0 && (
    <span className="success" style={{textAlign:"center" , width:"100%" , display:"flex", justifyItems:"center",alignItems:"center" , color:"green"}}>{updatedone}</span>
  )
}

      
        

            </div>
            <div className="deleteaccount">
                <DeleteMe/>

        </div>
        </>
        
        
    )

}