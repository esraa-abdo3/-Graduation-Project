
import{ useEffect } from "react";
import "./Doctors.css";
import { TbMapPinSearch } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

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
                
                </div>
                
                <div className="cont d">
             
                </div>
                      <div className="keys">
     <div className="key">
                        <div className="icon">
                            <TbMapPinSearch className="i"/>
                          </div>
                                <div>
                            <h3>Find Nearby Doctors And Hospitla</h3>
                            <p>Easily find doctors in your area</p>
                                    

                                </div>
                        

                        </div>
                               <div className="key">
                            <div className="icon">
                                <MdOutlineDateRange className="i" />
                        </div>
                        <div>
    <h3>Book Appointments Quickly</h3>
                            <p>Schedule with doctors in just a few clicks</p>
                        </div>
            

                        </div>
                                       <div className="key">
                            <div className="icon">
                               <FaUserDoctor className="i" />
                        </div>
                        <div>
    <h3>Doctors Can Sign Up Easily</h3>
                            <p>Doctors can register and join the platform</p>
                        </div>
                    

                        </div>
                        </div>

            </div>
        </>
    );
}

