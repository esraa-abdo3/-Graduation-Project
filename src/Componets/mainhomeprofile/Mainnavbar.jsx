
////////////////////////////
import { Link, useNavigate, } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./mainnavbar.css"
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import axios from "axios";
import Cookies from "universal-cookie";
import { IoAlarmOutline } from "react-icons/io5";

import logonav from "../../assets/logonav.png";
import { BabyContext } from "../../context/BabyContext";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";


export default function Mainnavbar() {
    const cookie = new Cookies();
   
    const gettoken = cookie.get("Bearer");
    const [isOpen, setIsOpen] = useState(false);
    const [allnotification, setallnotication] = useState([])
    const [notificationactive, setnotificationactive] = useState(false)
    const firstsname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    console.log(firstsname)
  const nav = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [Msg, setMsg] = useState("")
  const { allBabies, activeBaby, loading, handleActiveBabyChange } = useContext(BabyContext);
  const [active, setActive] = useState(false);

  const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
  };
  console.log(isDropdownVisible)
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
//     useEffect(() => {
//     async function getallnotication() {
//       try {
//         let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
//           headers: {
//             Authorization: `${gettoken}`
//           }
          
//         })
//         const datanote = res.data.data;
//         setallnotication(res.data.data)
//         if (datanote.length === 0) {
//           setMsg("No Reminders Added for you Yet");
//         }
        
      
//       }
//       catch (error) {
//         console.log(error)
//       }
//     }
//     getallnotication()
// }, [gettoken,allnotification])

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
 
    const cardnotification = allnotification.map((e) => {
        return (
            <div className="note" key={e._id} >
                <header className="header-note">
                    <IoAlarmOutline className="alarmicon" style={{fontSize: "30px", color: "#e68cc7"}}/>
                    <h3>
                        {e.title}
                        </h3>
                </header>
                <p>
                {e.message}
            </p>
            < TiDeleteOutline className="delete-note" onClick={()=>handledeletenotification(e._id)} />
            
                
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

  
    const babyDropdown = allBabies.map((e, index) => {
      return (
        <div onClick={() => handleActiveBabyChange(e._id)} key={index}>
          <input id={`option-${e._id}`} name="option" type="radio" />
          <label
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
  console.log(allnotification)


    return (
  < >
        
 
            <nav className="mainNav" >
            <FaBars
                    style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
                    className="menu-icon"
                    onClick={toggleSidebar}
                />
                <div className="cont">
                <div className="one-sidenav">
                <div className="logo">
                                    <img src={logonav} alt="logonav" />
                    </div>
                    <ul>
                    <li className="home">
                        <Link to="/mainhome">home</Link>
                    </li>
                    <li className="about">
                        <Link to="/">about</Link>
                    </li>
                    <li className="contact">
                        <Link to="/">contact</Link>
                    </li>
                 
              
                </ul>

                    </div>
                    <div className="otherside-nav">
                    <li style={{ listStyle: "none" }} className="li-select">
    <div className="select">
      <div
        className={`selected ${active ? "activearrow" : ""}`}
        onClick={() => setActive(!active)}
      >
        {loading ? (
          <span className="skeleton-span"></span>
        ) : (
          <span>{activeBaby}</span>
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
      <div className={`options ${active ? "active" : ""} option-profile`}>
        {babyDropdown}
        <div>
          <input id={`option-all`} name="option" type="radio" />
          <label
            className="option"
            htmlFor={`option-all`}
            onClick={() => {
              setActive(false);
              handleActiveBabyChange("all");
            }}
          >
            all babies
          </label>
        </div>
      </div>
                </div>
                
              </li>
              <Link to={`/vaccines/${activeBaby}`}>{activeBaby}'s Vaccines</Link>
                    <li className="nofitication">
                        <span className="numberofnotication" onClick={()=>{ handlenotificationclick()}}>
                            <p >   {allnotification && Array.isArray(allnotification) ? allnotification.length : 0}</p>
                     
                    
                        </span>
                        <IoMdNotificationsOutline  style={{ fontSize: "25px" , color:"black" }}  />
                        {notificationactive && <div className="cards">
                            <div className="headerforcards">
                                <p>Notifications</p>
                                <div className="icon"><MdDelete style={{color:"black",paddingBottom:"0px", fontSize:"20px"} }  onClick={() => deleteall()}/></div>
                                

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
                        <Link to={`/profile/${cookie.get("uid")}`}>
                            <VscAccount  style={{paddingRight:"10px" , fontSize:"25px" ,paddingTop:"10px"}}/>
                            Profile
                        </Link>
                    </li>
                    <li onClick={handlelogout}>
                        <CiLogout  style={{paddingRight:"10px" , fontSize:"25px" ,paddingTop:"10px"}}/>
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




