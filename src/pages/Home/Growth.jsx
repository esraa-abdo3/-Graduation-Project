
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
    // <div className='growth'>
    
    //   <LazyLoadImage
    //     src={feet}
    //     alt="img"
    //     className='feetGrowth'
    //     effect="blur"
    //   />
    
    //   <div className='cont'>
    //     <div className='title-home'>
    //       <div className='flex'>
    //         {/* Lazy loading مع تأثير الفيد */}
    //         <LazyLoadImage
    //           src={g}
    //           alt="Growth image"
    //           className='g'
    //           loading='lazy'
    //           effect="fade"
    //         />
    //         <h2>Baby Growth</h2>
    //       </div>
         
    //       <div className='growthtext'>
    //         <p>We know how important your child's development is. We're here to provide you with helpful insights. Our goal is to support you at every stage of their growth.</p>
    //         <div className='btnex'>
    //           <button className="btn-explore">Explore Now</button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className='card-growth'>
    //       <div className='right'>
    //         {/* Lazy loading مع تأثير البلور */}
    //         <LazyLoadImage
    //           src={grothy}
    //           alt="Growth ruler"
    //           className='grothy'
    //           effect="blur"
    //         />
    //         <div className='growthimgs'>
    //           {/* Lazy loading مع تأثير الفيد */}
    //           <LazyLoadImage
    //             src={babygrowth}
    //             alt="Baby Growth"
    //             loading='lazy'
    //             effect="fade"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
   
      <div className='growth-chart'>
        <div className="cont">
          <div className="text">
            <h2>Baby Growth</h2>
            {/* <p>Tracking your baby’s growth is crucial for their health. Key indicators like weight, height, and head circumference help monitor development and detect potential health issues early</p> */}
            {/* <p>Track your baby’s growth with Carenest by logging weight and height. Access customized growth charts based on gender, prematurity, and chromosomal conditions</p> */}
            {/* <p>Track your baby’s growth with carenest by logging weight, height. Access customized growth charts based on gender, prematurity, and chromosomal conditions. Compare progress with age-appropriate percentiles,and monitor development to ensure healthy growth</p> */}
            {/* <p>Stay updated on your baby’s growth through both web and mobile</p> */}
            <p>Tracking your baby’s growth is key to monitoring their health. Measure weight, height, and head circumference to detect potential issues early.</p>
<p>Log weight and height with Carenest and access personalized growth charts based on gender, prematurity, and chromosomal conditions.</p>
<p>Track your baby’s growth easily on both web and mobile platforms, keeping you informed anytime, anywhere.</p>


              <div className="imges-buttonn">
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