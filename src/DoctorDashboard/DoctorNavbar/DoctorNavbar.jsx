import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DoctorNavbar.css';
import logo from "../../assets/logonav.png"
import Cookies from "universal-cookie";

const DoctorNavbarr = () => {
  const cookie = new Cookies();
  const gettoken = cookie.get("firstname");
  const lastname = cookie.get("lastname");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  function logout() {
 
    cookie.remove("Bearer")
    cookie.remove("firstname")
    cookie.remove("lastname")
    cookie.remove("role")
    cookie.remove("id");
       navigate('/Auth/Login')
    
  }

  return (
    <>
      <nav className="doctor-navbar">
     
              <div className="navbar-left">
       
            <img src={logo} alt="Logo" className="logo-img" />
         
          {!isMobile && (
            <div className="nav-links">
              <Link to="/DoctorDashboard" className="nav-link">Home</Link>
              <Link to="/ourstory" className="nav-link">About</Link>
              <Link to="/Contact-us" className="nav-link">Contact</Link>
            </div>
          )}
        </div>

        <div className="navbar-right">
          {isMobile && (
            <button className="hamburger-menu" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
          
          <div className="profile-dropdown">
            <button 
              className="profile-button"
              onClick={toggleDropdown}
            >
              <div className="profile-initials">
              Dr {getInitials(gettoken)}
              </div>
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                ⏷
              </span>
            </button>
            
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/DoctorDashboard/profile" className="dropdown-item">
                Profile
              </Link>
              <button 
                className="dropdown-item logout"
                onClick={() => {
                  logout()
                  console.log('Logout clicked');
                }}
              >
                Logout
              </button>
            </div>
          </div>
          </div>
                {/* Mobile Side Navigation */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleMobileMenu}>
          ✕
        </button>
        <div className="mobile-profile">
          <div className="mobile-profile-initials">
           Dr {getInitials(gettoken)}
          </div>
            <span className="mobile-profile-name"> Dr {gettoken} { lastname}</span>
        </div>
        <div className="mobile-nav-links">
          <Link to="/doctor/dashboard" className="mobile-nav-link" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/doctor/about" className="mobile-nav-link" onClick={toggleMobileMenu}>
            About
          </Link>
          <Link to="/doctor/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>
            Contact
          </Link>
          <div className="mobile-nav-divider"></div>
          <Link to="/DoctorDashboard/profile" className="mobile-nav-link" onClick={toggleMobileMenu}>
            Profile
          </Link>
          <button 
            className="mobile-nav-link logout"
            onClick={() => {
              
              logout()
              toggleMobileMenu();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}

 
    
      </nav>


    </>
  );
};

export default DoctorNavbarr; 