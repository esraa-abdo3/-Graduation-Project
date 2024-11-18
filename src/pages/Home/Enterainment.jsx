
import { LazyLoadImage } from 'react-lazy-load-image-component';

import "./Enterainment.css";
import t1 from "../../assets/t1.webp";
import t2 from "../../assets/t2.webp";
import t3 from "../../assets/t3.webp";
import ballon from "../../assets/bullon.webp";

export default function Enterainment() {
    return (
        <div className="Enterainment">
            <div className="cont">
                <div className="img">
                    <div className="flex-column">
                        
                        <LazyLoadImage 
                            src={t3} 
                            alt="Image t3" 
                            effect="blur" 
                        />
                        <LazyLoadImage 
                            src={t2} 
                            alt="Image t2" 
                            effect="blur" 
                        />
                    </div>
                    <div className="column">
                      
                        <LazyLoadImage 
                            src={t1} 
                            alt="Image t1" 
                            className="t" 
                            effect="fade" 
                        />
                        <LazyLoadImage 
                            src={ballon} 
                            alt="Balloon" 
                            className="bullon" 
                            effect="fade" 
                        />
                    </div>
                </div>

                <div className="text">
                    <h2>Enterainment</h2>
                    <p>
                        Our website offers a calming collection of sleep-inducing music,
                        enchanting children's stories, and engaging short educational videos
                        designed to create a nurturing environment for kids. Explore our
                        resources to support your child’s relaxation and growth.
                    </p>
                    <button>explore now</button>
                </div>
            </div>
        </div>
    );
}
