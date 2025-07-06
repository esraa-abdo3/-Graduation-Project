

import { Link, useNavigate} from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./mainnavbar.css"
import { FaBars } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";
import Cookies from "universal-cookie";
import logonav from "../../assets/logonav.png";
import { BabyContext } from "../../context/BabyContext";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import UserSidebar from "../UserSidebar/UserSidebar";
import { IoMdDoneAll } from "react-icons/io";
import { CiLogout } from "react-icons/ci";


export default function Mainnavbar() {
    const cookie = new Cookies();
   
    const gettoken = cookie.get("Bearer");
    const [isOpen, setIsOpen] = useState(false);
    const [allnotification, setallnotication] = useState([])
    const [notificationactive, setnotificationactive] = useState(false)
    const firstsname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [Msg, setMsg] = useState("")
    const { allBabies, activeBaby, setActiveBaby,loading,setActiveBabyId, handleActiveBabyChange } = useContext(BabyContext);
    const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const  navigate=useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
  };
 
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
 /**delete all notification */
    async function deleteall() {
      try {
        let res = await axios.delete(`https://carenest-serverside.vercel.app/user/notifications/all`, {
            headers: {
            Authorization:`${gettoken}`
        }
        })
        setallnotication([]);

        console.log(res);
    }
    catch (error) {
        console.log(error)
    }
      
    }
 
    function handlenotificationclick() {
        setnotificationactive(prev=> !prev)
  }
   /**delete one notification */
    async function handledeletenotification(id) {
        try {
          let res = await axios.delete(`https://carenest-serverside.vercel.app/user/notifications/${id}`, {
            headers: {
              Authorization: `${gettoken}`
            }
          });
          console.log("notifacatin" ,res)
            setallnotication((prevNotifications) =>
                prevNotifications.filter(notification => notification._id !== id)
            );
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
        
  }
  /**get all notification */
   async function getNotifications() {
    try {
      const res = await axios.get(`https://carenest-serverside.vercel.app/user/notifications/all`, {
        headers: {
          Authorization: `${gettoken}`,
        },
      });
    console.log(res)

      setallnotication(res.data.data || []);
      if (!res.data.notifications || res.data.notifications.length === 0) {
        setMsg("No notifications available.");
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
      setMsg("Failed to fetch notifications.");
    }
  }
useEffect(() => {
 

  getNotifications();
}, []);
  /* markNotificationAsRead*/
  async function markNotificationAsRead(id) {
  try {
    const res = await axios.put(`https://carenest-serverside.vercel.app/user/notifications/read/${id}`, {}, {
      headers: {
        Authorization: `${gettoken}`,
      },
    });
    console.log("Marked as read:", res.data);
  getNotifications();
    
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
}

  /**notifcation card */
    const cardnotification = allnotification.map((e) => {
        return (
            <div className="note" key={e._id} style={{backgroundColor :e.read===false ? "rgb(223 243 255 / 18%)":"white"}} >
                <header className="header-note">
                  
                    <h3>
                        {e.title}
                        </h3>
                </header>
                <p>
                {e.message}
            </p>
            <div className="note-icons">
              {e.read === false && (
                <IoMdDoneAll className="read-note"   onClick={() => markNotificationAsRead(e._id)}/>
                
             )} 
              < TiDeleteOutline className="delete-note" onClick={()=>handledeletenotification(e._id)} />
            </div>
          
            
                
           </div>
       )
    })


  
    const babyDropdown = allBabies.map((e, index) => {
      return (
        <div onClick={() => handleActiveBabyChange(e._id)} key={index} className={activeBaby === e._id ? "activeb" : ""}>
          <input id={`option-${e._id}`} name="option" type="radio" />
          <label
            style={{cursor:"pointer"}}
            className="option"
            htmlFor={`option-${e._id}`}
            onClick={() => {
              setActive(false);
            }}
          >
            {e.name}
          </label>
        </div>
      );
    });
     const handleLogout = () => {
        cookie.remove("Bearer");
        cookie.remove("firstname");
        cookie.remove("lastname");
        cookie.remove("role");
       cookie.remove("id");
       cookie.remove("activebaby", { path: "/" });
setActiveBaby("");
  setActiveBabyId(null);
        navigate('/Auth/Login');
      
    };
 


    return (
  < >
        <UserSidebar isOpen={isOpen} toggle={toggleSidebar} activeBaby={activeBaby} />
 
            <nav className="mainNav" >
          {isMobile && (
            <><div >
               <FaBars
                    style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
                    className="menu-icon"
                    onClick={toggleSidebar}></FaBars>
            </div>
                    
            
          
              <p className={`logomobilesid ${allBabies.length === 1 ? "logocenter" : ""}`} style={{fontFamily:"Fredoka" , color:"#F488B8" , fontWeight:'600' }}> Care<span style={{color:'#0A6AA6'}}>Nest</span></p>
                       <div className="otherside-nav">
                   { allBabies.length > 0 && !loading 
          
                && (
                        <li style={{ listStyle: "none" }} className="li-select">
    <div className="select">
      <div
        className={`selected${active ? " activearrow" : ""}`}
        onClick={() => setActive(!active)}
      >
        {loading ? (
          <span className="skeleton-span"></span>
        ) : (
          <span>{activeBaby || "Choose Baby"}</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="arrow"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </div>
                  <div  className={`options ${active ? "active" : ""} option-profile`}>
                    <div className="options-list-wrapper">
                      {babyDropdown}
                    </div>
                  </div>
                </div>
                
              </li>
                )
              }
                          <li className="nofitication">
                        <span className="numberofnotication" onClick={()=>{ handlenotificationclick()}}>
                            <p >   {allnotification && Array.isArray(allnotification) ? allnotification.length : 0}</p>
                     
                    
                        </span>
                        <IoMdNotificationsOutline  style={{ fontSize: "25px" , color:"black" }}  />
                        {notificationactive && <div className="cards">
                            <div className="headerforcards">
                                <p>Notifications</p>
                                <div className="icon"><MdDelete style={{color:"#F488B8",paddingBottom:"0px", fontSize:"20px"} }  onClick={() => deleteall()}/></div>
                                

                  </div>
                  {allnotification.length > 0 ? (
    cardnotification
) : (
    <p style={{ paddingTop: "20px", color: "#777", textTransform: "capitalize" }}>
        {Msg}
    </p>
)}

                 
    
</div>}

            </li>
                </div>
            </>
          
            )}
                <div className="cont">
                <div className="one-sidenav">
                <div className="logo">
                                    <img src={logonav} alt="logonav" />
              </div>
                      <ul>
                    <li className="home">
                        <Link to="/mainhome">home</Link>
                    </li>
            
                    <li className="contact">
                        <Link to="/Contact-us">contact</Link>
                    </li>
                 
              
                </ul>
                    
                    </div>
            <div className="otherside-nav">
              { allBabies.length > 0 && !loading 
          
                && (
                        <li style={{ listStyle: "none" }} className="li-select">
    <div className="select">
      <div
        className={`selected${active ? " activearrow" : ""}`}
        onClick={() => setActive(!active)}
      >
        {loading ? (
          <span className="skeleton-span"></span>
        ) : (
          <span>{activeBaby || "Choose Baby"}</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="arrow"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
        </svg>
      </div>
                  <div  className={`options ${active ? "active" : ""} option-profile`}>
                    <div className="options-list-wrapper">
                      {babyDropdown}
                    </div>
                  </div>
                </div>
                
              </li>
                )
              }
              
                      <Link to={`/vaccines/${activeBaby}`}>{activeBaby}'s Vaccines</Link>
              
                    <li className="nofitication">
                        <span className="numberofnotication" onClick={()=>{ handlenotificationclick()}}>
                            <p >   {allnotification && Array.isArray(allnotification) ? allnotification.length : 0}</p>
                     
                    
                        </span>
                        <IoMdNotificationsOutline  style={{ fontSize: "25px" , color:"black" }}  />
                        {notificationactive && <div className="cards">
                            <div className="headerforcards">
                                <p>Notifications</p>
                                <div className="icon"><MdDelete style={{color:"#F488B8",paddingBottom:"0px", fontSize:"20px"} }  onClick={() => deleteall()}/></div>
                                

                  </div>
                  {allnotification.length > 0 ? (
    cardnotification
) : (
    <p style={{ paddingTop: "20px", color: "#777", textTransform: "capitalize" }}>
        {Msg}
    </p>
)}

                 
    
</div>}

            </li>
            <div className="appointmentIcon">
                <Link to="/appointment" className="icon-link">
                  <i className="fa-regular fa-calendar-check"></i>
                  <span className="tooltip">My Appointment</span>
                </Link>
</div>
            <div className="mama">
            <span>{`${firstsname[0]}${lastname[0]}`}</span>
            
            <div
                className={`selected`}
                onClick={toggleDropdown}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="arrow"
                >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
            </div>
            {isDropdownVisible && (
                <ul className="dropdown-menu-active">
                    <li>
                      <Link to={`/myaccount`} style={{display:"flex", gap:"20px" , marginBottom:"10px" , fontWeight:"500"}}>
                            <VscAccount  />
                            Profile
                        </Link>
                    </li>
                    <li onClick={handleLogout} style={{display:"flex", gap:"20px" , fontWeight:"500", }}>
                        <CiLogout  />
                        Logout
                    </li>
                </ul>
            )}
        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}








