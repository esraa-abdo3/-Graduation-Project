
import { useEffect, useRef, useState } from 'react';
import "./Cry.css";

import applestore from "../../assets/Downloadappstore.svg"
import googleplay from "../../assets/Google.png";
import Voicecontrol from "../../assets/freepik--Device--inject-433.png"
import ph from "../../assets/ph_01.jpg"
import imgsamples from "../../assets/icon_sample.png"
import childcry from "../../assets/mainvisual.jpg"
import img from "../../assets/crayinglanding.png"


export default function Cry() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
   
        <>
          
      
            <div className='cry-detalis'>
           
                <div className="cont">
                    <div className="text">
                        <h2>You can easily understand a baby's request</h2>
                        <p>Our app analyzes over <span>20,000</span>  baby cries to help you understand your little one's needs. Using advanced detection technology and research-based patterns, we can identify the difference between cries ,
                          babies aged 0-12 months, ensuring you respond with confidence</p>
                        <img src={imgsamples} alt="" />
                        
                    </div>
                    <div className="img">
                        <img src={ph} alt=""  />
                    </div>
                </div>

            </div>

            {/* <div className='crydownload'>

                <div className="custom-shape-divider-top-1750359858">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          
                    </svg>
                                      <div className="imgdonlowd">
                        <img src={img} alt="img" />

                    </div>
                
</div>
  </div> */}

<div className="crydownload">
  <div className="svg-background">
          <div className="custom-shape-divider-top-1750359858">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          
                        </svg>
                        </div>
  </div>
                <div className="cont">
                     <div className="imgdonlowd">
    <img src={img} alt="img" />
                    </div>
                    <div className="text">
                        <h2>Use Your Android or iOS Device to Understand Every Cry</h2>
                           <p>Our Smart Cry Detection works on all your devices — anytime, anywhere.  
                            Just download the app and let it guide you to what your little one truly needs.</p>
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
                 
                    
                    
                
                  
                    </div>
 
</div>


                
    
     
            </>
    );
}
