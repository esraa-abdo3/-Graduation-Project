
import { Link } from "react-router-dom";

export default function NextNavbar({ toggleSidebar }) {
    return (
        <div className="cat">
  <div className="cont">
            <Link to="/" onClick={toggleSidebar}>Home</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Reminders</Link>
                <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
                <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
                <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
                <Link to="/reminders" onClick={toggleSidebar}>Community</Link>
            <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
            
            <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
             
              
                
                
        </div>
        </div>
      
    );
}


