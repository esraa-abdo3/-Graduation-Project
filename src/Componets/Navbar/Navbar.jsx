
import "./Navbar.css";
import logo from "../../assets/logonav.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

import Cookies from "universal-cookie";


export default function Navbar() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer"); 
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(null); 

    const handleSelect = (item) => {
      setActive(active === item ? null : item); 
    };

    const toggleSidebar = () => {
        console.log(isOpen)
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
    
        cookie.remove("Bearer"); 
        
    
        navigate("/Auth/Login"); 
    };


    return (
        <div className="Navbar">
           
            <nav>
             <FaBars style={{fontSize:"25px" , color:"black" , zIndex:"1000"}} className="menu-icon" onClick={toggleSidebar} />
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="selectcont">
                <div className="select">
  <div
    className="selected"
    data-default="All"
    data-one="option-1"
    data-two="option-2"
    data-three="option-3"
                        >
                               <span>home</span>

  </div>

 
  </div>
                    <div className="select">
  <div
    className="selected"
    data-default="All"
   
   
                          
                        >
                               <span>Cry Guide</span>

  </div>

 
  </div>
                        
                        
                        <div className="select">
  <div
           className={`selected ${active === "health" ? "activeaarrow" : ""}`}

                            
     onClick={() => handleSelect("health")}
                        >
                               <span>health</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
  <div className={`options ${active === "health" ? "active" : ""}`}>
   
    <div title="Reminders">
      <input id="option-2" name="option" type="radio" />
      <label className="option" htmlFor="option-2" data-txt="Reminders">
        <Link to="/reminders">Reminders</Link>
      </label>
    </div>
    <div title="Baby Growth">
      <input id="option-3" name="option" type="radio" />
      <label className="option" htmlFor="option-3" data-txt="Baby Growth">
        <Link to="/baby-growth">Baby Growth</Link>
      </label>
    </div>
    <div title="Doctors">
      <input id="option-4" name="option" type="radio" />
      <label className="option" htmlFor="option-4" data-txt="Doctors">
        <Link to="/doctors">Doctors</Link>
      </label>
    </div>
  
  </div>
                        </div>
                        <div className="select">
  <div
    className={`selected ${active === "mom" ? "activeaarrow" : ""}`}
                            data-three="option-3"
                            onClick={() => handleSelect("mom")}
                        >
                               <span>mom</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
  <div className={`options ${active === "mom" ? "active" : ""}`}>
  
  <div title="Mamy Tips">
      <input id="option-7" name="option" type="radio" />
      <label className="option" htmlFor="option-7" data-txt="Mamy Tips">
        <Link to="/mamy-tips">Mamy Tips</Link>
      </label>
    </div>
  
  
   
    <div title="Community">
      <input id="option-6" name="option" type="radio" />
      <label className="option" htmlFor="option-6" data-txt="Community">
        <Link to="/community">Community</Link>
      </label>
    </div>
  
   
  </div>
                        </div>
                        <div className="select">
  <div
    className={`selected ${active === "activites" ? "activeaarrow" : ""}`}
                            onClick={() => handleSelect("activites")}
                        >
                               <span>activites</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className="arrow"
    >
      <path
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      ></path>
    </svg>
  </div>
                            <div className={`options ${active === "activites" ? "active" : ""}`}>
                            <div title="Shopping">
      <input id="option-8" name="option" type="radio" />
      <label className="option" htmlFor="option-8" data-txt="Shopping">
        <Link to="/shopping">Shopping</Link>
      </label>
    </div>


 
    <div title="Entertainment">
      <input id="option-5" name="option" type="radio" />
      <label className="option" htmlFor="option-5" data-txt="Entertainment">
        <Link to="/entertainment">Entertainment</Link>
      </label>
    </div>
   

  
  </div>
                        </div>

                </div>
                    <div className="Navbar-btn">
                    {!gettoken ?    
                        <>
                        
    <button className="loging">
                        <Link to="Auth/login">Log in</Link>
                    </button>
                    <button className="signup active">
                        <Link to="Auth/Signup">sign up</Link>
                            </button>
                        </> : <button className="logout" onClick={handleLogout}>
                            log out
                            
                    </button> }
                
             

                    </div>
         
              
            </nav>
            <div className={`categories ${isOpen ? 'show' : ''}`}>
          
           
                <div className="cont">
                    <div className="all" style={{display:"flex " ,flexDirection :"column" ,justifyContent :"space-between" , height:"100%" ,maxwidth:"100%"}}>
                        <div style={{display:"flex" ,flexDirection:"column" ,gap:"30px"}} >
                        <Link to="/reminders" onClick={toggleSidebar}>Home</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Reminders</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
           
            <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
        
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
                        </> ): (<button className="logout" onClick={handleLogout}>
                            log out
                            
                    </button>)}
                
             

                    </div>
                    </div>
                 
           
         
                
       
                </div>
                <div className="icon" >
                    <FaBars style={{fontSize:"25px", color:"black"}} className="menu-icon" onClick={toggleSidebar}  />
                    </div>
            </div>
        </div>
    );
}

