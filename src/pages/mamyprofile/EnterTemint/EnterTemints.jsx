import { useEffect, useState } from "react";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar"
import "./EnterTemints.css"
import { Link } from "react-router-dom";

export default function EnterTiemnt() {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setTimeout(() => setAnimate(true), 500); 
      }, [])
    return (
        <div className="EnterTiemnt">
            <Mainnavbar/>
        <div className="header">
          <div className="text">
            <h2>Magical moments for your little one ✨ 
         bedtime stories, calming melodies, and joyful videos!</h2>
          </div>
          
            </div>
            <div className="pattern" >
                <div className="cont">
            <Link to="/babystory">
            <div
        className={`glass storyicon ${animate ? "animated" : ""}`}
        data-rotate="-15"
        style={{ "--rotate": "-15deg" }}
                >
              
                    
      </div>
            </Link> 
   
      <div
        className={`glass funvedio ${animate ? "animated" : ""}`}
        data-rotate="5"
        style={{ "--rotate": "5deg" }}
      ></div>
      <div
        className={`glass sleepysounds ${animate ? "animated" : ""}`}
        data-rotate="25"
        style={{ "--rotate": "25deg" }}
      ></div>
    </div>
</div>

</div>

      
    )
}

