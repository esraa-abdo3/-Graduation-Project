import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/Logo0.svg"
import "./Sidebar.css"

import tips from "../../assets/tipsicon.png"
import shoppingicon from "../../assets/shoppingicon.png"
import community from "../../assets/communiityicon.png"
import Enterainment from "../../assets/eniterminticon.png"
import growth from "../../assets/growthicon.png"
import alarm from "../../assets/alarm.svg"
import doc from "../../assets/doc.png"
import cry from "../../assets/cryicon.png"
import { useEffect } from "react"

export default function Sidebar() {
    const location = useLocation(); // الحصول على مسار الصفحة الحالي

    useEffect(() => {
      // التحقق من المسار وإزالة الكلاس "active" عند الحاجة
      if (location.pathname === "/myprofile/mybabies") {
        const allFeatures = document.querySelectorAll(".featurs div");
        allFeatures.forEach((feature) => feature.classList.remove("active"));
      }
    }, [location.pathname]); // التحديث عند تغيير المسار
  
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
                    <img src={cry} style={{width:"20px"}}></img>
                    <h3>
                    Cry guide
                 </h3>
                    </Link>
            
          
                </div>
                <div onClick={handleActiveClass}>
                    <Link to="/myprofile/reminders" style={{ textDecoration: "none", color: "black" }}>
                        <img src={alarm} style={{ width: "20px" }}></img>
                        <h3>
                        Reminders

                        </h3>
              
                    </Link>
              
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                    <img src={growth} style={{ width: "20px" }}></img>
                    <h3>
                    Baby growth
                    </h3>
                    </Link>
                
               
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                        <img src={tips} style={{ width: "20px" }}></img>
                        <h3>
                        Mamy Tips
                        </h3>
                
                    </Link>
             
                  
                    
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                        <img src={Enterainment} style={{ width: "20px" }}></img>
                        <h3>
                        Enterainment
                        </h3>
                 
                    </Link>
            
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                        <img src={doc} style={{ width: "20px" }}></img>
                        <h3>
                        Doctors
                        </h3>
                  

                    </Link>
              
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                        <img src={shoppingicon} style={{ width: "20px" }}></img>
                        <h3>
                        Shopping
                        </h3>
                 
                    </Link>
             
                </div>
                <div onClick={handleActiveClass}>
                    <Link>
                        <img src={community} style={{ width: "20px" }}></img>
                        <h3>
              
                
              Community
                  </h3>
                    </Link>
          
                    </div>

            </div>
          
                <button>
                    log out 
                </button>
            
        </div>
        
         
     )
}