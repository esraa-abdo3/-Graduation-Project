
import{ useEffect } from "react";
import "./Doctors.css";

export default function Doctors() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const docElements = document.querySelectorAll(".Doctors .doc");
        docElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="Doctors">
                <div className="cont">
                    <div className="header">
                        <h2>Welcome to Our Doctors Network</h2>
                        <p>Our website connects you with qualified doctors for quick, easy access to consultations, advice, and support, ensuring expert care for your child's health needs.</p>
                    </div>
                </div>
                
                <div className="cont d">
                    <div className="doc">
                        <div className="img1"></div>
                        <div className="text">
                            <h3>Family Doctor</h3>
                            <p>Family doctor with a focus on preventive care and family health.</p>
                        </div>
                    </div>
                    
                    <div className="doc">
                        <div className="img2"></div>
                        <div className="text">
                            <h3>Pediatrician</h3>
                            <p>Pediatrician specializing in child healthcare and wellness.</p>
                        </div>
                    </div>
                    
                    <div className="doc">
                        <div className="img3"></div>
                        <div className="text">
                            <h3>General Practitioner</h3>
                            <p>General practitioner providing comprehensive medical consultations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

