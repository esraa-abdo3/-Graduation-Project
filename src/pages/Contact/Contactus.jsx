import "./Contactus.css"
import Mainnavbar from "../../Componets/mainhomeprofile/Mainnavbar"
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
import Cookies from "universal-cookie";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Footer from "../../Componets/Footer/Footer"
import Navbar from "../../Componets/Navbar/Navbar"
export default function ContactUs() {
    const [form, setform] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message:""
    })
  const cookie = new Cookies();
      const gettoken = cookie.get("Bearer");
    const [sucess, setsucess] = useState("");
    const [fail, setfail] = useState("");
    const [loading, setloading] = useState("")
     const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
    };
     const handleSubmit = async (e) => {
    e.preventDefault();

    setsucess("");
    setfail("");

    if (
      form.firstName.trim() === "" ||
      form.lastName.trim() === "" ||
      form.email.trim() === "" ||
      form.message.trim() === ""
    ) {
      setfail("Please fill in all required fields.");
  
      return;
         }
         setloading(true)

    try {
      const res = await fetch("https://carenest-serverside.vercel.app/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
          setsucess("Message sent successfully!");
      setTimeout(() => {
  setsucess("")
}, 2000); 

        setform({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else if (res.status === 400) {
          setTimeout(() => {
  setfail("")
}, 2000); 

        setfail("Missing or invalid fields.");
      } else {
        setfail("Something went wrong. Please try again.");
      }
    } catch (error) {
        console.log(error)
      setfail("Server error. Please try later.");
    } finally {
      setloading(false);
    }
  };

    return (
        <>
           {gettoken ?   <Mainnavbar /> :<Navbar />}
            <div className="Contactus">
                <div className="landingsection">
                    <div className="text">
                        <h2>Contact us</h2>
                    </div>
                 

                </div>
                
                   <div className="contactinfo">
                        <div className="ourdetails">
                            <h2>Contact us</h2>
                            <p> <span> <FaLocationDot /></span> Egypt, Port Said – Protex Towers</p>
                            <p> <span><MdEmail /></span>esraaabdalnasserzz@gmail.com</p>
                            <p> <span><FaPhoneAlt /></span>01222519040 </p>
                            <p> <span><GiRotaryPhone/></span>01207069616</p>

                        </div>
                        <div className="form-tosend">
                        <div className="header">
                            <h2> Get in Touch with us</h2>
                            <p>And we will get back to you</p>
                        </div>
                        <div className="inputs">
                            <div className="names">
                                <input type="text" placeholder="First name"  name="firstName" value={form.firstName} onChange={handleChange}/>
                                <input type="text" placeholder="Last Name"  name="lastName" value={form.lastName} onChange={handleChange}></input>
                            </div>
                            <div className="emailcontact">
                                <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                            
                            </div>
                            <div className="subject">
                                <input type="text" placeholder="subject"  name="subject" value={form.subject} onChange={handleChange}/>
                                
                            </div>
                            <div className="messgae">
                                <textarea name="message" id="" placeholder="message" value={form.message} onChange={handleChange}></textarea>
                </div>
                <div className="Submitrandresult" style={{display:"flex" , justifyContent:"space-between"}}>
                  <button onClick={handleSubmit}> {loading ? <div className="spinner-small"></div> : "Submit"}</button>
                                             {sucess && <p className="success" style={{color:"green" , textAlign:"center" , fontSize:"14px" , fontFamily:"Fredoka"}}>{sucess}</p>}
              {fail && <p className="error"style={{color:"red" , textAlign:"center" , fontSize:"14px" , fontFamily:"Fredoka"}}>{fail}</p>}
                </div>
                            

                        </div>

                        </div>
                </div>
            <div className="ourlocation">
 

  <div style={{ height: "300px", width: "100%", marginTop: "20px" }}>
    <MapContainer 
      center={[31.24035953122992, 32.28570769314545]
} 
      zoom={17} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[31.24035953122992, 32.28570769314545]
}>
        <Popup>Port Said – Protex Towers</Popup>
      </Marker>
    </MapContainer>
  </div>
          </div>
          <div className="oursocialmedia">

            <NavLink to={'https://www.facebook.com/esraa.abd.el.nasser.219711'}><FaFacebookSquare/></NavLink>
            <NavLink to={"www.linkedin.com/in/esraa-abdelnasser"}><FaLinkedin /></NavLink>
            <NavLink><FaInstagramSquare/></NavLink>
             <NavLink><FaTwitter/></NavLink>
          </div>
          
<Footer/>
            

        </div>
        </>
     
    )
}