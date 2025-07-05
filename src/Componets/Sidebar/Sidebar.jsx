import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../../assets/Logo0.svg"
import "./Sidebar.css"

import { useEffect,} from "react"
import Cookies from 'universal-cookie';
import { VscAccount } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { FaHome, FaInfoCircle, FaPhone, FaSyringe } from 'react-icons/fa';
import { FaWeightScale } from 'react-icons/fa6';
import { FaHistory } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

export default function Sidebar() {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const isLoggedIn = !!cookie.get('Bearer');
    const firstname = cookie.get('firstname') || '';
    const lastname = cookie.get('lastname') || '';
    // const cookie = new Cookies();
    // const nav = useNavigate();
    const location = useLocation();

    // const firstsname = cookie.get("firstname");
    // const lastname = cookie.get("lastname");
    // console.log(firstsname)
    // function handlelogout() {
    
    //     cookie.remove("firstname");
    //     cookie.remove("lastname");
    //     cookie.remove("Bearer")
    //     nav("/Auth/Login")
     

    // }
    

    useEffect(() => {
     
      if (location.pathname === "/myprofile/mybabies") {
        const allFeatures = document.querySelectorAll(".featurs div");
        allFeatures.forEach((feature) => feature.classList.remove("active"));
      }
    }, [location.pathname]);
  
    const handleActiveClass = (event) => {
      const allFeatures = document.querySelectorAll(".featurs div");
      allFeatures.forEach((feature) => feature.classList.remove("active"));
      event.currentTarget.classList.add("active");
    };
    
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="logo">
                </img>
            </div>
            <div className="featurs">
                
                <div onClick={handleActiveClass}>
                    <Link>
               
                    <h3>
                    Cry guide
                 </h3>
                    </Link>
            
          
                </div>
                <div onClick={handleActiveClass}>
                    <Link to="/myprofile/reminders" style={{ textDecoration: "none", color: "black" }}>
                   
                        <h3>
                        Reminders

                        </h3>
              
                    </Link>
              
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                   
                    <h3>
                    Baby growth
                    </h3>
                    </Link>
                
               
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                 
                        <h3>
                        Mamy Tips
                        </h3>
                
                    </Link>
             
                  
                    
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                     
                        <h3>
                        Enterainment
                        </h3>
                 
                    </Link>
            
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                
                        <h3>
                        Doctors
                        </h3>
                  

                    </Link>
              
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                   
                        <h3>
                        Shopping
                        </h3>
                 
                    </Link>
             
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                 
                        <h3>
              
                
              Community
                  </h3>
                    </Link>
          
                    </div>

            </div>
            {/* <div className="log-out"> */}
            {/* <div className="select-mam">
                            <div
                                className={`selected-mam ${active2 ? "activearrowmam" : ""}`}
                                onClick={() => setActive2(!active2)}
                            >
                                <span>{`${firstsname[0]}${lastname[0]}`}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                    className="arrow"
                                >
                                    <path
                                      fill="white"
                                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                    ></path>
                                </svg>
                            </div>
                            <div className={`options-mam ${active2 ? "active" : ""}`}>
                                <div>
                                 
                                    <input id={`myaccount`} name="option" type="radio" />
                                 
                                    <label
                                        className="option-mam"
                                        htmlFor={`myaccount`}
                                        onClick={() => {
                                            setActive2(false);
                                        }}
                                    >  <VscAccount/>
                                      
                                        <Link to="/myprofile/myaccount">account</Link>
                                    </label>
                                </div>
                                <div>
                                    <input id={`logout`} name="option" type="radio" />
                                    <label
                                        className="option-mam"
                                        htmlFor={`logout`}
                                        onClick={() => {
                                            setActive2(false);
                                        }}
                                    >
                                           <CiLogout/>
                                        <p onClick={handlelogout}>log out</p>
                                    </label>
                                </div>
                            </div>
                        </div> */}
            {/* <div className="mama">
                    
                    <span>{`${firstsname[0]}${lastname[0]}`}</span>

                    </div>
         

               
                <div className="options-mama">
                    <Link > <VscAccount/><p>account-settings</p></Link>
                    <p to="/myprofile/myaccount"  onClick={handlelogout}>   <CiLogout/> log out</p>

                    </div> */}
                

          
          
             
            
        </div>
        // </div>
         
     )
}