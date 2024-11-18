
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../../Componets/Sidebar/Sidebar";
import "./Addbabies.css"


export default function Mainprofile() {
    
    return (
        <>
            <div className="mainprofile" >
            <div className="Sid" style={{width:"20%"}}>
            <Sidebar />
                </div>
                <div className="outlite " style={{width:"80%", height:"100vh" , position:"relative"}}>
                    <Outlet />
                    <Navigate to="/myprofile/mybabies" /> 
            </div>

            </div>
         
         
       
            
            
            
        
        </>
              
                 
      
       
        
    )
}