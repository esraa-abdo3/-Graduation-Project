
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './Growth.css';
import g from "../../assets/growth.webp";

import grothy from "../../assets/ruler (1).webp";
import feet from "../../assets/feet (1).webp";
import babygrowthnew from "../../assets/imgonline-com-ua-twotoone-fiensv2ybm.jpg.avif"
import chart from "../../assets/iPhone 14 Plus - 8.png"
import frame from "../../assets/Frame 427323145.png"
import applestore from "../../assets/Downloadappstore.svg";
import googleplay from "../../assets/Google.png";

export default function Growth() {
  return (
   
    <>
   
      <div className='growth-chart'>
        <div className="cont">
          <div className="text">
            <h2> Growth Starts With Awareness</h2>
       
            <p>Tracking your baby’s growth is key to monitoring their health. Measure weight, height, and head circumference to detect potential issues early.</p>
<p>Log weight and height with Carenest and access personalized growth charts based on gender, prematurity, and chromosomal conditions.</p>
<p>Track your baby’s growth easily on both web and mobile platforms, keeping you informed anytime, anywhere.</p>


              <div className="imges-buttonn"style={{marginTop:"30px"}}>
                                    <a href="#">
                                        <img src={applestore}>
                                        </img>
            
                                    </a>
                                    <a href="#">
                                        <img src={googleplay}>
                                        </img>
            
                                    </a>
                                </div>
          </div>
          <div className="img">
            <img src={chart} alt=""  className='chart'/>
            <img src={frame} alt=""  className='frame'/>
          </div>
        </div>
        
      </div>
      </>
   
  );
}

// {/* <div className='newgrowth'> 
      

      
// <img src={babygrowthnew}></img>
//   <div className="text">
//     <h2>Tracking Baby Growth Month by Month</h2>
//     {/* <p>Want to keep track of your child’s growth? Log the weight and height of your child from birth to 2 years of age. The perfect resource for your next healthcare professional checkup.</p> */}
//     <p>Track your child’s growth from birth to 2 years. Log weight and height for your next checkup</p>

//   </div>
//   </div> */}