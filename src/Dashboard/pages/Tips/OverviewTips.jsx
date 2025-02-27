import { useNavigate } from "react-router-dom";
import tipslogo from "../../../assets/illustration-light-bulb-icon_53876-5597.jpg"
import "./OverviewTips.css"
import { GoArrowRight } from "react-icons/go";
export default function OverviewTips() {
    const nav = useNavigate()
    return (
        <div className="Tips-overview">
            
           

           
            <div className="header">
            
                <div className="box1">
                    <img src={tipslogo} alt="tips logo" />
                    <div className="text">
                    <h2>CareNest tips</h2>
                    <p>Categories</p>
                </div>
                    </div>
                    <div className="box2">
                        add 
                    </div>
                    </div>
                <div className="Categories">
                <div className="Categoriemamy">
                    
                   
                        
              
                    <h3> Tips for Moms 🤰</h3>
                    <p>For self-care, pregnancy guidance, and motherhood tips</p>
                    <div className="arrowspan">

                 
                        <span>5 tips</span>
                        <div className="icon" onClick={()=> nav("/Dashboard/MamyCategorie")}>
                            <GoArrowRight/>

                        </div>
                        </div>
                     

                    </div>
                <div className="Categoriebaby">
               
                  

                 
                        <h3>Tips for Babies 🍼</h3>
                    <p>For baby care, health tips, and essential parenting advice.</p>
                    <div className="arrowspan">
                        <span>35 tips</span>
                        <div className="icon">
                            <GoArrowRight/>

                        </div>
                        

                    </div>
                     
                       

</div>
            
             
            
            </div>

        </div>
    )
}