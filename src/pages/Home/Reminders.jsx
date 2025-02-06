
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component"; 

import reminder1 from '../../assets/reminder img 2.webp';
import reminder2 from '../../assets/reminder img 1.webp';
import heart from '../../assets/Stethoscope.webp';
import injection from '../../assets/Injection .webp';
import './Reminders.css';

export default function Reminders() {
    const [visibleVectors, setVisibleVectors] = useState([true, false, false]); 

    useEffect(() => {
        const interval1 = setInterval(() => {
            setVisibleVectors((prev) => {
                const newVisible = [...prev];
                newVisible[0] = !newVisible[0]; 
                return newVisible;
            });
        }, 4000); 

        const interval2 = setInterval(() => {
            setVisibleVectors((prev) => {
                const newVisible = [...prev];
                newVisible[1] = !newVisible[1]; 
                return newVisible;
            });
        }, 2000);

        const interval3 = setInterval(() => {
            setVisibleVectors((prev) => {
                const newVisible = [...prev];
                newVisible[2] = !newVisible[2]; 
                return newVisible;
            });
        }, 3000);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        }; 
    }, []);

    return (
        <div>
            <div className="reminder">
                <h2> Smart Reminders</h2>
                <p style={{color:"#777", textAlign:"center" , paddingTop:"10px"}}> Stay on top of your child’s health with timely medicine and vaccination alerts</p>
                <div className="cont">
                    <div>
                        {/* Lazy load للصور مع تأثير fade */}
                        <LazyLoadImage 
                            src={reminder1} 
                            alt="img" 
                            className="remImg" 
                            loading="lazy"
                            effect="fade" 
                        />
                        {/* <h3>Medicine</h3> */}
                        <p>We’ll remind you to give your child their medicine on time.</p>
                        <button className="btn-explore">
                            <Link to="reminders">
                                Explore Now
                            </Link>
                        </button>
                        <LazyLoadImage 
                            src={injection} 
                            alt="img" 
                            className="vector2" 
                            style={{ opacity: visibleVectors[1] ? 1 : 0, transition: 'opacity 0.9s ease' }} 
                            loading="lazy"
                            effect="fade" // تأثير الفيد عند تحميل الصورة
                        />
                    </div>
                    <div>
                        <LazyLoadImage 
                            src={reminder2} 
                            alt="img" 
                            className="remImg" 
                            loading="lazy"
                            effect="fade" 
                        />
                        {/* <h3>Vaccinations</h3> */}
                        <p>Timely vaccines help keep your child healthy and safe.</p>
                        <button className="btn-explore">
                            <Link to="reminders">
                                Explore Now
                            </Link>
                        </button>
                        <LazyLoadImage 
                            src={heart} 
                            alt="img" 
                            className="vector3" 
                            style={{ opacity: visibleVectors[2] ? 1 : 0, transition: 'opacity 0.9s ease' }} 
                            loading="lazy"
                            effect="fade" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
