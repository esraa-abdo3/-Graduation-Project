
import {  Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import "./my babies/Mybabies"
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import Cookies from "universal-cookie";
export default function Mainprofile() {
    const cookie = new Cookies();
    const isSpecificPage = location.pathname === "/myprofile/myaccount";

    
    const nav = useNavigate();
    function handlelogout() {
    
        cookie.remove("firstname");
        cookie.remove("lastname");
        cookie.remove("Bearer")
        nav("/Auth/Login")
     

    }
    return (
        <>
            <div className="mainprofile"  >
            <div className="Sid">
                    <Sidebar />
                    <div className="log-out">
              
         

               
                <div className="options-mama">
                    <Link> <p> <VscAccount/> account</p></Link>
                    <p to="/myprofile/myaccount"  onClick={handlelogout}>   <CiLogout/> log out</p>

                    </div>
                

          
          
             
            
        </div>
                </div>
               
                <div  className={`outlite ${isSpecificPage ? "overflow" : ""}`} style={{height:"100vh" , position:"relative"}}>
                    <Outlet />
            </div>

            </div>
         
         
       
            
            
            
        
        </>
              
                 
      
       
        
    )
}