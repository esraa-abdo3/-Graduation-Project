import "./Mainhome.css"
import Cookies from "universal-cookie";
export default function Welcomepart() {
    const cookie=new Cookies
    const firstsname = cookie.get("firstname");
    const currentHour = new Date().getHours(); 
    const greeting = currentHour < 12 ? "Good morning" : "Good evening"; 
    return (
        <div className="welcome-page">

    
        <div className="welcome-text">
            <h2>
                { greeting}  <span>{firstsname}</span>,
            </h2>
       
        </div>
             <h3>Your baby's first steps are starting now </h3>
        </div>
        
    )
    
 
}