
// import "./Chat.css"
// import img from "../../assets/image-asset.jpeg"
// import chaticon from "../../assets/chat-message-notification-icon-isolated-3d-render-illustration_47987-9636-removebg-preview.png"
// export default function Chat() {
//     document.addEventListener("DOMContentLoaded", function () {
//         const textElement = document.querySelector(".Mamy-community .text");
    
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     textElement.classList.add("show");
//                 }
//             });
//         }, { threshold: 0.5 }); // يظهر عند وصول 50% من العنصر إلى الشاشة
    
//         observer.observe(textElement);
//     });
//     return (
     
    
//         <div className="Mamy-community">
            
//                 <img src={img} alt="" className="img" />

         
//             <div className="text">
//                 <img src={chaticon} alt=""  className="chaticon"/>
//                 <p>With CareNest, join a supportive moms' community to share experiences, tips, and the journey of motherhood together!</p>

//             </div>
            
//      </div>
//     )
// }
import { useEffect, useRef } from "react";
import "./Chat.css";
import img from "../../assets/image-asset.jpeg";
import chaticon from "../../assets/chat-message-notification-icon-isolated-3d-render-illustration_47987-9636-removebg-preview.png";

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
        <div className="Mamy-community">
            <img src={img} alt="" className="img" />
            <div className="text" ref={textRef}>
                <img src={chaticon} alt="" className="chaticon" />
                <p>With CareNest, join a supportive moms' community to share experiences, tips, and the journey of motherhood together!</p>
            </div>
        </div>
    );
}
