
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component"; 

import reminder1 from '../../assets/reminder img 2.webp';
import reminder2 from '../../assets/reminder img 1.webp';
import heart from '../../assets/Stethoscope.webp';
import injection from '../../assets/Injection .webp';
import './Reminders.css';
import Remindersimg from "../../assets/Reminderslanding.png"
import { PiBabyLight } from "react-icons/pi";
import { TbVaccine } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";

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
        <div className="RemindersLanding">
         
            <div className="cont">
            <div className="imges">
                <img src={Remindersimg} alt=" img" />

            </div>
            <div className="text">
                    <h2>Never Miss a Dose - Smart Reminders for Moms</h2>
                    {/* <p>Easily track your child’s medications and vaccines  once your baby is registered, vaccine dates are added automatically, and you can enter medication schedules yourself. Get timely reminders for both vaccines and medications on any device. Stay organized, stress-free, and always on time</p> */}
                    {/* <p>Stay on top of your child’s health with ease.
Once you register your baby by adding their name and birthdate, the app automatically schedules all vaccine dates based on their age — no manual input needed.

You can also add any medication schedules yourself, whether it’s daily treatments, vitamins, or prescriptions.

Get timely reminders for both vaccines and medications — delivered right to any device you use.
It’s the easiest way to stay organized, stress-free, and always on time for what matters most</p> */}
                    <p>We know how busy motherhood can be. That’s why we make it simple.
Just register your baby once, and we’ll automatically add all vaccine dates for you — no guesswork, no stress.
Need to give medications? You can add those too.

You’ll get smart reminders, right on your phone, tablet, or laptop — wherever you are.
Because your child’s health matters — and we’re here to help you stay one step ahead, every day</p>
                    <div className="steps">
                        <div className="iconstep">
    <PiBabyLight />
                        </div>
                    <div className="iconstep">
                            <TbVaccine />
                        </div>
                        <div className="iconstep">
                            <IoMdNotifications />
                            </div>
                   </div>
                </div>
                </div>
            
    </div>
    );
}
