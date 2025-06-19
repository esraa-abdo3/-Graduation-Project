
import { useEffect, useRef } from "react";
import "./Chat.css";
import img from "../../assets/image-asset.jpeg";
import chaticon from "../../assets/chat-message-notification-icon-isolated-3d-render-illustration_47987-9636-removebg-preview.png";
import { FaRobot } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
export default function Chat() {
    const textRef = useRef(null); // مرجع للعنصر

    useEffect(() => {
        const textElement = textRef.current; // تحديد العنصر

        if (!textElement) return; // تأكد من أن العنصر موجود

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        textElement.classList.add("show");
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(textElement);

        return () => observer.disconnect(); // تنظيف الـ observer عند إزالة الكومبوننت
    }, []);

    return (
        <div className="Mamy-support">
            <div className="cont">
                <div className="text">
                    <h2>Because Moms Give Everything — They Deserve It All</h2>
                    <p>We care about everything that matters to women — your health, your mind, and your journey as a mom.
Explore helpful tips, chat privately with our smart assistant, or connect with other moms in a supportive group chat.</p>
                </div>
                <div className="boxes">
                    <div className="box">
                        <div className="icon">
                            <FaRobot />
                            </div>
                            <h4>Ask Anything</h4>
                            <p>Talk to our Ai chatbot anytime anywhere</p>
                        </div>
                  
                    <div className="box">
                            <div className="icon">
                            <FaRobot />
                            </div>
                            <h4>Mom Tips</h4>
                            <p>Get curated advice for your daily life as mom</p>
                        
                    </div>
                    <div className="box">
                                 <div className="icon">
                            <FaRobot />
                            </div>
                            <h4>community chat</h4>
                            <p> join other moms, share experiences and feel supported</p>
                        </div>

                  
                   
            </div>

            </div>
            {/* <img src={img} alt="" className="img" /> */}
            {/* <div className="text" ref={textRef}>
                <img src={chaticon} alt="" className="chaticon" />
                <p>With CareNest, join a supportive moms' community to share experiences, tips, and the journey of motherhood together!</p>
            </div> */}
        </div>
    );
}
