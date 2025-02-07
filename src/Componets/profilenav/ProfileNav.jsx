
////////////////////////////////////
import { Link, useNavigate, } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./ProfileNav.css";
import "../Navbar/Navbar.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import logo from "../../assets/Logo0.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import { IoAlarmOutline } from "react-icons/io5";
import { Checkbox } from "@mui/material";
import { IoCheckmarkDoneOutline } from "react-icons/io5";



function ProfileNav() {
    const cookie = new Cookies();
   
    const gettoken = cookie.get("Bearer");
    const [isOpen, setIsOpen] = useState(false);
 
    const [allnotification, setallnotication] = useState([])
    const [notificationactive, setnotificationactive] = useState(false)
    const firstsname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    console.log(firstsname)
    const nav = useNavigate();
    function handlelogout() {
    
        cookie.remove("firstname");
        cookie.remove("lastname");
        cookie.remove("Bearer")
        nav("/Auth/Login")
     

    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    /**first git all notifcations */
    useEffect(() => {
   

        async function getallnotication() {
          try {
            let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
              headers: {
                Authorization:`${gettoken}`
              }
              
            })
            setallnotication(res.data.data)
            
            
          }
          catch (error) {
            console.log(error)
          }
        }
        getallnotication()
    }, [gettoken,allnotification ])
    // useEffect(() => {
    //     async function getallnotication() {
    //       try {
    //         let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
    //           headers: {
    //             Authorization: `${gettoken}`
    //           }
    //         });
    //         setallnotication(prevNotications => [...prevNotications, ...res.data.data]);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    
    //     getallnotication();
    //   }, [gettoken,allnotification]);
    
 
    const cardnotification = allnotification.map((e) => {
        return (
            <div className="note" key={e._id}>
                <header className="header-note">
                    <IoAlarmOutline className="alarmicon" style={{fontSize: "30px",
    color: "#e68cc7"}}/>
                    <h3>
                        {e.title}
                        </h3>
                </header>
                <p>
                {e.message}
                </p>
              <Checkbox className="check" onClick={()=>handledeletenotification(e._id)}></Checkbox>
                
           </div>
       )
    })
    function handlenotificationclick() {
        setnotificationactive(prev=> !prev)
    }
    async function handledeletenotification(id) {
        try {
            let res = await axios.delete(`https://carenest-serverside.vercel.app/user/notifications/${id}`, {
                headers: {
                Authorization:`${gettoken}`
            }
            })
            setallnotication((prevNotifications) => 
                prevNotifications.filter(notification => notification._id !== id)
            );
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
        
    }


    return (
        <>
            <nav className="profileNav">
                <FaBars
                    style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
                    className="menu-icon"
                    onClick={toggleSidebar}
                />
                <ul>
                    <li className="home">
                        <Link to="/">home</Link>
                    </li>
                    <li className="about">
                        <Link to="/">about</Link>
                    </li>
                    <li className="contact">
                        <Link to="/">contact</Link>
                    </li>
                    <li className="nofitication">
                        <span className="numberofnotication" onClick={()=>{ handlenotificationclick()}}>
                            <p >   {allnotification && Array.isArray(allnotification) ? allnotification.length : 0}</p>
                     
                    
                        </span>
                        <IoMdNotificationsOutline  style={{ fontSize: "25px" }}  />
                        {notificationactive && <div className="cards">
                            <div className="headerforcards">
                                <p>notifications</p>
                                <div className="icon"><IoCheckmarkDoneOutline style={{color:"green",paddingBottom:"0px", fontSize:"16px"}}/> mark all as read </div>
                                
                          </div>
    {cardnotification}
</div>}
                    </li>
                    <li>
                    
                    </li>
                </ul>
            </nav>

            <div className={`categories ${isOpen ? 'show' : ''}`}>
                <div className="cont">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="all" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <Link to="/reminders" onClick={toggleSidebar}>Home</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
                            <Link to="/myprofile/MedicinePage" onClick={toggleSidebar}>Reminders</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
                        </div>
                    </div>
                    <div className="Navbar-btn">
                    {!gettoken ? (   
                        <>
                        
    <button className="loging">
                        <Link to="Auth/login">Log in</Link>
                    </button>
                    <button className="signup active">
                        <Link to="Auth/Signup">sign up</Link>
                            </button>
                  </>) :
                                 <div className="log-out">
                                 <div className="mama">
                                 
                                 <span>{`${firstsname[0]}${lastname[0]}`}</span>
             
                                 </div>
                      
             
                            
                             <div className="options-mama">
                                 <Link> <p> <VscAccount/> my-account</p></Link>
                                 <p to="/myprofile/myaccount"  onClick={handlelogout}>   <CiLogout/> log out</p>
             
                                 </div>
                             
             
                       
                       
                          
                         
                     </div>
                            
                   }
                    </div>
                    </div>
                <div className="icon">
                    <FaBars style={{ fontSize: "25px", color: "black" }} className="menu-icon ll" onClick={toggleSidebar} />
                </div>
                </div>
                
        </>
    );
}


export default ProfileNav;









