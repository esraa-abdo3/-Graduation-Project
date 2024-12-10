
import {  Outlet } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import "./my babies/Mybabies"
export default function Mainprofile() {
    const isSpecificPage = location.pathname === "/myprofile/myaccount";
    return (
        <>
            <div className="mainprofile"  >
            <div className="Sid">
            <Sidebar />
                </div>
               
                <div  className={`outlite ${isSpecificPage ? "overflow" : ""}`} style={{height:"100vh" , position:"relative"}}>
                    <Outlet />
            </div>

            </div>
         
         
       
            
            
            
        
        </>
              
                 
      
       
        
    )
}