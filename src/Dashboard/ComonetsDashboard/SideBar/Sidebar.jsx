import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./Sidebar.css"
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
export default function Sidebar() {
    const [userdetalis, setuserdeatalis] = useState(false);
    console.log(userdetalis)
    
    return (
        <div className="sidebar-Dashboard">
                <div className="header">
                            <MdSpaceDashboard/>
                            <h3> Dashboard</h3>
            </div>
            <div className="users-Dashboard">
                <div className="users">

               
                    <div className="usericon">
                   <FaUsers/>
                    <p>users</p>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${userdetalis?'active':"" } arrow-list`}onClick={()=>setuserdeatalis(prev=>!prev)}/>
                </div>
               
                       <div className={`${userdetalis?'active':"close" } user-list`}>
                       <p> overview</p>
                       <p>  add user</p>
   
                   </div>
                 
             

            </div>
        </div>
    )
}