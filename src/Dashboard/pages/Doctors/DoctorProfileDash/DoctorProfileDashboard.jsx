import "./Dprofile.css"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import doctorimg from "../../../../assets/doctorprofile.jpeg"
import AppointmentsAreaChart from "../../../ComonetsDashboard/DashCharts/userCharts/DoctorCharts/Doctorchart";
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

export default function Doctordata() {
    const cookies = new Cookies();
    const getToken = cookies.get("Bearer");
    const { docid } = useParams();
    const [doctordata, setdoctordata] = useState([]);
    const [loading, setloading] = useState(false)
    const[options,setoptions]=useState("info")
    const [selectedImage, setSelectedImage] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300); // Match this with the animation duration
    };

  useEffect(() => {
      
          async function getDoctor() {
            setloading(true)
          try {
            const response = await axios.get(`https://carenest-serverside.vercel.app/doctor/${docid} `, {
              headers: {
                "Authorization": `${getToken}`
              }
            });
              setloading(false)
                
                  
              console.log("backdata", response.data.data);
             setdoctordata([response.data.data])
       
       
   
        
                 
     
          } catch (error) {
              setloading(false)
            console.log("Error fetching babies:", error);
            
          }
        }
        if (getToken) {
          getDoctor();
        }
            
      }, [getToken, docid]);
  const info = doctordata.map((e) => {
    return (
      <>
             <div className="firstpart">
                      
                            <img src={e.image ? e.image :doctorimg} alt="" />
                     
                        <div style={{flex:"1"}} >
                            <div className="datanamees">
              <div className="firstname">
                <p>FirstName :</p>
                <p>{e.user.firstName}</p></div>
              <div className="lastnames">
                <p>LastName</p>
                <p>{e.user.lastName}</p></div>
            </div>
            <div className="genderdatadoctor">
              <div className="firstname">
                <p>Gender :</p>
               <p>{e.gender ? e.gender : "male"}</p> 
              </div>
              <div className="lastnames">
                <p>Birthday :</p>
                <p>{e.user.dateOfBirthOfMam.split("T")[0]}</p>
              </div>

            </div>
            <div className="infomail"> 
                 <p>Email :</p>
              <p>{e.user.Email}</p>
           

            </div>
                       
                        </div>
        </div>
        <div className="seconddata">
          <div className="dataabout">
            <p>About</p>
            <p>{ e.About}</p>

          </div>
          <div className="stuidesdata">
            <div >
              <p>MasterOf:</p>
              <p>{e.masterOf }</p>
            </div>
            <div>
              <p>Specialty:</p>
              <p>{ e.Specialty}</p>
              </div>

          </div>
          <div className="mobilesnumbersdata">
            {e.phones.map((e ,index) => {
              return (
                <>
                     <div>
                  <p>Mobile {index + 1}</p>
                  <p>{ e}</p>
                </div>
                </>

             
                
              )
            })}
          </div>
          <div className="Appointmentsdata">
            <AppointmentsAreaChart doctorid={ e._id} />

          </div>
          
      </div>
      </>

    )
  })
  const Availability = doctordata.map((e) => {
    const days = e.day || [];

    const formatTime = (time) => {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    };

    return (
      <div key={e._id} className="Availabilitydaysdata">
        <h2>Doctor&apos;s Available Time Slots</h2>
        <div className="days-container">
          {days.map((day) => (
            <div key={day._id} className="day-box">
              <div className="current-day">
                {day.type}
              </div>
              <div className="time-slots">
                {day.slots.map((slot, index) => (
                  <div key={`${day._id}-slot-${index}`} className="slot-container">
                    <div className="time-box">
                      <span>From :</span>
                      <span>{formatTime(slot.startTime)}</span>
                    </div>
                    <div className="time-box">
                      <span>To :</span>
                      <span>{formatTime(slot.endTime)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })
  const Paymentandlocatin = doctordata.map((e) => {
    return (
      <>
        <div className="Paymentandlocatindata">
          <h2>Payment Details & Promocode</h2>
          <div className="PaymentDetails">
            <div>
              <p>Booking price :</p>
              <p>{e.bookingPrice}</p>
            </div>
            <div>
              <p>Payment method :</p>
              <p>{ e.paymentMethodType}</p>
            </div>
          </div>
          <div className="promocodeDetaild">
            <div>
              <p>Promo Code :</p>
              <p>{ e.promocode !== null ? e.promocode.code :"No code"}</p>
            </div>
            <div>
              <p>Promo value :</p>
              <p>{e.promocode !== null ? e.promocode.value :"No value"}</p>
            </div>
          </div>
          <div className="promocodeDetailsdata">
            <div>
              <p>startAt :</p>
              <p>{e.promocode !== null ? e.promocode.startAt.split("T")[0] : "No date"}</p>
            </div>
            <div>
              <p>expireAt :</p>
              <p>{e.promocode !== null ? e.promocode.expireAt.split("T")[0]:"No date"}</p>
            </div>
          </div>
          <div className="imagesoflocation">
            <p>Images of Location</p>
            {e.images.length > 0 ? (
              <div className="imagesdata">
                {e.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`image-${index}`} 
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            ) : <>
                <p style={{textAlign:"center", color:"#777"}}> No Images of Location founded</p>
            </>}
          </div>
          <div className="location-map">
            <p>Clinic Location</p>
            <div className="address-info">
              <p>{e.Location?.address || "No address available"}</p>
            </div>
            {e.Location?.coordinates ? (
              <MapContainer 
                center={[e.Location.coordinates[1], e.Location.coordinates[0]]} 
                zoom={15} 
                className="map-container"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[e.Location.coordinates[1], e.Location.coordinates[0]]}>
                  <Popup>
                    {e.Location.mainPlace || e.Location.address}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p style={{textAlign:"center", color:"#777"}}>No location data available</p>
            )}
          </div>
        </div>
      </>
    )
  })
    return (
        <div className="Doctordata">
            <div className="optionsdata">
                <div className={options==="info" ?"active":""} onClick={()=>setoptions("info")} >
                 Doctor info
                </div>
                 <div className={options==="Availability" ?"active":""} onClick={()=>setoptions("Availability")}>
                 Availability
                </div>
                    <div className={options==="Payment" ?"active":""} onClick={()=>setoptions("Payment")} >
                 Payment & location
                </div>
        </div>
 
        {loading ? (
  <section className="dots-container">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </section>
) : (
  <>
    {options === "info" && info}
    {options === "Availability" && Availability}
    {options === "Payment" && Paymentandlocatin}
  </>
)}

         
            {selectedImage && (
              <div className={`image-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
                <div className={`image-modal-content ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
                  <button className="close-modal" onClick={handleCloseModal}>×</button>
                  <img src={selectedImage} alt="Selected location" />
                </div>
              </div>
            )}
        </div>
    )
}