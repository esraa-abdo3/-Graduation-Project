import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./Sidebar.css"
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
import { MdTipsAndUpdates } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    const [userdetalis, setuserdeatalis] = useState(false);
    const [tipsdetalis, settipsdetlais] = useState(false)
    const[doctordetalis,setdoctoedetlais]=useState(false)
    console.log(userdetalis)
    
    return (
        <div className="sidebar-Dashboard">
                <div className="header">
                            <MdSpaceDashboard className="dash-icon"/>
                            <h3> Dashboard</h3>
            </div>
            <div className="users-Dashboard">
                <div className="users">

               
                    <div className="usericon">
                   <FaUsers className="icon"/>
                    <h4>  users</h4>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${userdetalis?'active':"" } arrow-list`}onClick={()=>setuserdeatalis(prev=>!prev)}/>
                </div>
               
                <div className={`${userdetalis ? 'active' : "close"} user-list`}>
                <span></span>
                        <p> overview</p>
                        <span></span>
                       <p>  add user</p>
   
                   </div>
                 
             

            </div>
            <div className="Tips-Dashboard">
                <div className="Tips">
                    <div className="TipsIcon">
                   <MdTipsAndUpdates  className="icon"/>
                    <h4> tips</h4>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${tipsdetalis?'active':"" } arrow-list`}onClick={()=>settipsdetlais(prev=>!prev)}/>
                </div>
               
                <div className={`${tipsdetalis ? 'active' : "close"} tip-list`}>
                    <NavLink to="CarenestTips" className="link">
                        <span></span>
                        <p> overview</p>
                    </NavLink>
                    <NavLink to="AddTip" className="link">
                    <span></span>
    
                        <p>  Add tips</p>
                        </NavLink>
   
                   </div>
                 
             

            </div>
            <div className="Tips-Dashboard">
                <div className="Tips">
                    <div className="TipsIcon">
                   <FaUserDoctor className="icon" />
                    <h4> doctors</h4>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${doctordetalis?'active':"" } arrow-list`}onClick={()=>setdoctoedetlais(prev=>!prev)}/>
                </div>
               
                <div className={`${doctordetalis ? 'active' : "close"} tip-list`}>
                    <NavLink to="AllDoctors" className="link">
                    <span></span>
                        <p> overview</p>
                    </NavLink>
                    <NavLink to="AddDoctor" className="link">
                 
    
                        <p>  Add Doctor</p>
                        <span></span>
                        </NavLink>
   
                   </div>
                 
             

            </div>
        </div>
    )
}