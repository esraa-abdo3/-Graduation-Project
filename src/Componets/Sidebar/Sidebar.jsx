import logo from "../../assets/Logo0.svg"
import "./Sidebar.css"
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="logo">
                </img>
            </div>
            <div className="featurs">
                
                <h3>
                Cry guide
                </h3>
                <h3>
                Reminders
                </h3>
                <h3>
                Baby growth
                </h3>
                <h3>
                Mamy Tips
                </h3>
                <h3>
                Enterainment
                </h3>
                <h3>
                Doctors
                </h3>
                <h3>
                Shopping
                </h3>
                <h3>
                Community
                </h3>

            </div>
            <div className="logout">
                <button>
                    log out 
                </button>
            </div>
        </div>
        
         
     )
}