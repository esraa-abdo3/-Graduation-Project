import { Link } from "react-router-dom";
import "./Home.css"



export default function Welcome() {
    return (
        <div className="welcome">
       
            <div className="text">
               
                <h1>Start the Journey to Your Baby's Bright and Healthy Future</h1>
          
             
                <button className="btn-welcome">
                    <Link to="Auth/Signup"
                    >
                    start free
                    </Link>
                    
                </button>
            </div>

        </div>
    )
}