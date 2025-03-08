import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./Sidebar.css"
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    const [userdetalis, setuserdeatalis] = useState(false);
    const[tipsdetalis,settipsdetlais]=useState(false)
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
                   <FaUsers/>
                    <p> CareNest users</p>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${userdetalis?'active':"" } arrow-list`}onClick={()=>setuserdeatalis(prev=>!prev)}/>
                </div>
               
                <div className={`${userdetalis ? 'active' : "close"} user-list`}>
                   
                        <p> overview</p>
                      
                       <p>  add user</p>
   
                   </div>
                 
             

            </div>
            <div className="Tips-Dashboard">
                <div className="Tips">
                    <div className="TipsIcon">
                   <MdOutlineTipsAndUpdates />
                    <p>CareNest tips</p>
               </div>
               <MdOutlineKeyboardArrowUp   className={`${tipsdetalis?'active':"" } arrow-list`}onClick={()=>settipsdetlais(prev=>!prev)}/>
                </div>
               
                <div className={`${tipsdetalis ? 'active' : "close"} tip-list`}>
                <NavLink to="CarenestTips" className="link">
                        <p> overview</p>
                    </NavLink>
                    <NavLink to="AddTip" className="link">

    
                        <p>  Add tips</p>
                        </NavLink>
   
                   </div>
                 
             

            </div>
        </div>
    )
}