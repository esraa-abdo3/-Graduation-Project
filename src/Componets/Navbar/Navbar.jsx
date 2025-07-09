
import "./Navbar.css";
import logo from "../../assets/Logo CareNest.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Cookies from "universal-cookie";
import UserSidebar from "../UserSidebar/UserSidebar";

export default function Navbar() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const gettoken = cookie.get("Bearer");
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const [active, setActive] = useState(null);
  const handleLogout = () => {
    cookie.remove("Bearer");
    cookie.remove("firstname");
    cookie.remove("lastname");
    cookie.remove("role");
    cookie.remove("id");
    navigate("/Auth/Login");
  };

  const handleSelect = (item) => {
    setActive(active === item ? null : item);
  };

  const toggleSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
  };

  return (
    <div className="Navbar"  style={{ backgroundColor: window.location.pathname.startsWith('/Auth') ? 'white' : '' }}
>
      {/* ✅ يظهر السايدبار عند الضغط */}
      <UserSidebar isOpen={isUserSidebarOpen} toggle={toggleSidebar} />

      <nav>
        <FaBars
          style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
          className="menu-icon"
          onClick={toggleSidebar}
        />
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="selectcont">
          {/* <div className="select">
            <div className="selected">
              <span>Home</span>
            </div>
          </div> */}

          <div className="select">
            <div className="selected">
              <span>
                <Link to="/CryList" style={{textDecoration:"none" , color:"#444157"}}>Cry History</Link>
                </span>
              
            </div>
          </div>

          <div className="select">
            <div
              className={`selected ${active === "health" ? "activeaarrow" : ""}`}
              onClick={() => handleSelect("health")}
            >
              <span>Health</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="arrow"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
            <div className={`options ${active === "health" ? "active" : ""}`}>
              <div>
                <Link to="/myprofile/MedicinePage">Reminders</Link>
              </div>
              <div>
                <Link to="/growthBaby">Baby Growth</Link>
              </div>
              <div>
                <Link to="/nearPlaces">Doctors</Link>
              </div>
            </div>
          </div>

          <div className="select">
            <div
              className={`selected ${active === "mom" ? "activeaarrow" : ""}`}
              onClick={() => handleSelect("mom")}
            >
              <span>Mom</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="arrow"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
            <div className={`options ${active === "mom" ? "active" : ""}`}>
              <div>
                <Link to="/MamyTips">Mamy Tips</Link>
              </div>
              <div>
                <Link to="/community">Community</Link>
              </div>
            </div>
          </div>

          <div className="select">
            <div
              className={`selected ${active === "activities" ? "activeaarrow" : ""}`}
              onClick={() => handleSelect("activities")}
            >
              <span>activities</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="arrow"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </div>
            <div className={`options ${active === "activities" ? "active" : ""}`}>
              <div>
                       <Link to="/babystoeies">Baby stories</Link>
              </div>
              <div>
                <Link to="/Videos"> fun Videos</Link>
                  </div>
                <div>
<Link to="/Entertainment/SleepMusic"> Sleep Music</Link>
                </div>
          
            </div>
          </div>
        </div>

      <div className="Navbar-btn">
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
    <button className="logout" onClick={handleLogout}>
      Log out
    </button>
  )}
</div>

      </nav>
    </div>
  );
}

