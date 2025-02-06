
import { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import "./Topfeaturs.css";
import one from "../../assets/second_vectors-removebg-preview.webp";
import two from "../../assets/one_vectors-removebg-preview.webp";
import three from "../../assets/thirds_vectors-removebg-preview.webp";
import health from "../../assets/mm.webp";
import shoppinng from "../../assets/Screenshot 2024-10-31 184619.webp";
import micro from "../../assets/3097ebb115dae92cfcbbfd2a7e16e279.webp";

export default function Top() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true); 
                }
            },
            { threshold: 0.2 } 
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
        <div className={`top ${isVisible ? 'active' : ''}`} ref={sectionRef}>
            <div className="baby-tools1">
                {/* Lazy loading للصورة الأولى مع تأثير البلور */}
                <LazyLoadImage src={one} alt="Tool 1" loading='lazy' effect='blur' />
            </div>
            <div className="baby-tools2">
                {/* Lazy loading للصورة الثانية مع تأثير الفيد */}
                <LazyLoadImage src={two} alt="Tool 2" loading='lazy' effect='fade' />
            </div>
            <div className="baby-tools3">
                {/* Lazy loading للصورة الثالثة مع تأثير البلور */}
                <LazyLoadImage src={three} alt="Tool 3" loading='lazy' effect='blur' />
            </div>
            <h2>Our best services</h2>
            <div className="cont">
                <div className="featur-1">
                    {/* Lazy loading لصورة Cry Analysis مع تأثير الفيد */}
                    <LazyLoadImage src={micro} style={{ maxWidth: "70px", height: "70px" }} alt="Cry Analysis" loading='lazy' effect='fade' />
                    <div className="header">
                        <h4>Cry analysis</h4>
                        {/* <p>With Cry analysis helps you understand your baby's needs with personalized tips and insights for comfort and care.</p> */}
                        {/* <p>Understand your baby's needs with personalized comfort tips</p> */}
                    </div>
                </div>
                <div className="featur-1">
                    {/* Lazy loading لصورة Health Care مع تأثير البلور */}
                    <LazyLoadImage src={health} style={{ maxWidth: "70px", height: "70px" }} alt="Health Care" loading='lazy' effect='blur' />
                    <div className="header">
                        <h4>Health care and development</h4>
                        {/* <p>Easily track your baby's health and development with vaccination reminders and health tips for your support.</p> */}
                    </div>
                </div>
                <div className="featur-1">
                    {/* Lazy loading لصورة Shopping and Entertainment مع تأثير الفيد */}
                    <LazyLoadImage src={shoppinng} style={{ maxWidth: "70px", height: "70px" }} alt="Shopping and Entertainment" loading='lazy' effect='fade' />
                    <div className="header">
                        <h4>Entertainment and shopping</h4>
                        {/* <p>Enjoy precious moments with your baby! From stories and games to shopping essentials.</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
