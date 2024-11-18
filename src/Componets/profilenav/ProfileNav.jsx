import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./ProfileNav.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/Logo0.svg"

export default function ProfileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

 
    return (
        
<>

        <nav className="profileNav">
              <FaBars 
                    style={{ fontSize: "25px", color: "black", zIndex: "1000" }} 
                    className="menu-icon" 
                    onClick={toggleSidebar} 
                />
            <ul>
          
                <li>
                    <Link to="/">
                    home
                    </Link>
              
                </li>
                <li>
                    <Link to="/">
                        settings
                    </Link>
                </li>
                <li className="nofitication">
                <IoMdNotificationsOutline style={{fontSize:"30px"}} />
                </li>
                <li>
                    <div className="ma">

                    </div>

                </li>
            </ul>
            </nav>
            <div className={`categories ${isOpen ? 'show' : ''}`}>
                <div className="cont">
                <div className="logo">
                <img src={logo} alt="logo">
                </img>
            </div>
                    <div className="all" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <Link to="/reminders" onClick={toggleSidebar}>Home</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Reminders</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
                        </div>
                    
                    </div>
                    
                <button className="lo">
                    log out 
                </button>
            
                </div>
                <div className="icon">
                    <FaBars style={{ fontSize: "25px", color: "black" }} className="menu-icon ll" onClick={toggleSidebar} />
                </div>
         
            </div>
            </>
    )
}