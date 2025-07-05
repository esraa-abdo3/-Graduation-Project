import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './UserSidebar.css';

import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { FaHome, FaInfoCircle, FaPhone, FaSyringe} from 'react-icons/fa';
import { FaWeightScale } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from 'axios';



const UserSidebar = ({ isOpen, toggle, activeBaby }) => {
    const cookie = new Cookies();
    const gettoken =cookie.get("Bearer")
    const navigate = useNavigate();
    const firstname = cookie.get("firstname") || "User";
    const lastname = cookie.get("lastname") || "";
    const [image ,setimage] = useState("");
  useEffect(() => {
      async function getuserimage() {
          try {
              const res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
                  headers: {
                      Authorization: `${gettoken}`,
                  },
              });
              console.log("User image info:", res.data.data.image);
              setimage(res.data.data.image && res.data.data.image)
       
          } catch (error) {
        console.log("Error fetching user info:", error);
      }
    }

    getuserimage();
  }, []);

    const handleLogout = () => {
        cookie.remove("Bearer");
        cookie.remove("firstname");
        cookie.remove("lastname");
        cookie.remove("role");
        cookie.remove("id");
        navigate('/Auth/Login');
        toggle(); // Close sidebar after logout
    };

    return (
        <>
            <div className={`mobile-sidebar user-sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-sidebar" onClick={toggle}>
                    ✕
                </button>
                <div className="mobile-profile" style={{position:'sticky',top:0,zIndex:2,background:'#fff'}}>
                    {
                        image.length > 0 ? (
                        <img src={image} style={{width:"35px", height:'35px', borderRadius:"50%"}}></img>
                        ) : (
                                   <div className="mobile-profile-initials">
                        {(firstname[0] || '').toUpperCase()}
                    </div>
                        )
                    }
                 
                    <span className="mobile-profile-name">{firstname} {lastname}</span>
                </div>
                <div className='scrolsidebar' style={{flex:1,overflowY:'auto',height:'calc(100dvh - 80px)'}}>
                  <div className="mobile-nav-links">
                    <Link to="/mainhome" className="mobile-nav-link" onClick={toggle}><FaHome className="sidebar-icon" /> Home</Link>
                    <Link to={`/CryList`} className="mobile-nav-link" onClick={toggle}><FaHistory className="sidebar-icon" /> Cry History</Link>
                    <Link to={`/reminders`} className="mobile-nav-link" onClick={toggle}>< IoAlarm className="sidebar-icon"/> Reminders</Link>
                    <Link to={`/growthBaby`} className="mobile-nav-link" onClick={toggle}><FaWeightScale className="sidebar-icon"/> Baby Growth</Link>
                    <Link to={`/vaccines/${activeBaby}`} className="mobile-nav-link" onClick={toggle}><FaSyringe className="sidebar-icon"/> Vaccines</Link>
                    <Link to="/MamyTips" className="mobile-nav-link" onClick={toggle}><MdOutlineTipsAndUpdates className="sidebar-icon"/> Mamy tips</Link>
                    <Link to="/EnterTiemnt" className="mobile-nav-link" onClick={toggle}><MdLibraryMusic className="sidebar-icon" /> EnterTiemnt</Link>
                    <Link to="/nearPlaces" className="mobile-nav-link" onClick={toggle}><FaUserDoctor className="sidebar-icon" /> Near Doctors</Link>
                    <Link to="/appointment" className="mobile-nav-link" onClick={toggle}><MdDateRange  className="sidebar-icon"/> My appointment </Link>
                    <Link to="/Community" className="mobile-nav-link" onClick={toggle}><IoChatbubbleEllipsesSharp className="sidebar-icon" /> community</Link>
                    <div className="mobile-nav-divider"></div>
                    <Link to="/ourstory" className="mobile-nav-link" onClick={toggle}><FaInfoCircle className="sidebar-icon"/> About</Link>
                    <Link to="/Contactus" className="mobile-nav-link" onClick={toggle}><FaPhone className="sidebar-icon"/> Contact</Link>
                    <div className="mobile-nav-divider"></div>
                        <Link to="/myaccount" className="mobile-nav-link" onClick={toggle}><VscAccount className="sidebar-icon" /> My Account</Link>
             {!gettoken ? (
  <>
    <button className="loging">
      <Link to="/Auth/Login">Log in</Link>
    </button>
    <button className="signup active">
      <Link to="/Auth/Signup">Sign up</Link>
    </button>
  </>
) : (
  <>
    <button className="mobile-nav-link logout" onClick={handleLogout}>
      <CiLogout className="sidebar-icon" /> Logout
    </button>
  </>
)}

                 
                  </div>
                </div>
            </div>
            {isOpen && <div className="mobile-overlay" onClick={toggle}></div>}
        </>
    );
};

export default UserSidebar; 