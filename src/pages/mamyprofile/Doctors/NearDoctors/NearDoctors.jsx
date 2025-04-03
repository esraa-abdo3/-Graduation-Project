// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import imgdefault from "../../../../assets/default_avatar.gif";
// import "./NearDoctors.css";
// import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";

// export default function NearDoctors() {
//   const cookies = new Cookies();
//   const getToken = cookies.get("Bearer");

//   const [position, setPosition] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [Hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("doctors"); 

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         getNearDoctors(longitude, latitude);
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         setLoading(false);
//       }
//     );
//   }, []);

//   const getNearDoctors = async (lng, lat) => {
//     try {
//       const res = await axios.get(
//         `https://carenest-serverside.vercel.app/doctor/near?lng=${lng}&lat=${lat}`,
//         { headers: { Authorization: `${getToken}` } }
//       );
//       setActiveTab("doctors");
//       setDoctors(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching doctors:", err);
//       setDoctors([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const getNearHospitals =async (lng ,lat)=>{
//     try {
//         const res = await axios.get(
//           `https://carenest-serverside.vercel.app/doctor/hospital?lng=${lng}&lat=${lat}`,
//           { headers: { Authorization: `${getToken}` } }
//         );
//         setActiveTab("hospitals");
//         setHospitals(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching hospitals:", err);
//         setHospitals([]);
//       } finally {
//         setLoading(false);
//       }
//   }

//   return (
//     <>
//       <Mainnavbar />
//       <div className="near-doctors-container">
//         <div className="doctors-list">
//           <h2>Near {activeTab === "doctors" ? "Doctors" : "Hospitals"}</h2>
//           <div className="btnTurn">
//             <p
//               className={activeTab === "doctors" ? "active" : ""}
//               onClick={getNearDoctors()}
//             >
//               Doctors
//             </p>
//             <p
//               className={activeTab === "hospitals" ? "active" : ""}
//               onClick={getNearHospitals()}
//             >
//               Hospitals
//             </p>
//           </div>
          
//           {loading && <p className="loading-text">Doctors are being monitored near you.</p>}

//           {!loading && doctors.length === 0 ? (
//             <p className="no-doctors">There are no doctors near you!</p>
//           ) : (
//             !loading &&
//             doctors.map((doctor, index) => {
//               const doctorName = `${doctor.user?.firstName || "Unknown"} ${doctor.user?.lastName || ""}`.trim();
//               const doctorImage = doctor.image || imgdefault;
//               const bookingPrice = doctor.bookingPrice;

//               return (
//                 <div key={index} className="doctor-card">
//                   <img src={doctorImage} alt={doctorName} className="doctor-image" />
//                   <div className="doctor-info">
//                     <strong>Dr {doctorName}</strong>
//                     <p>🩺 {doctor.Specialty}</p>
//                     <p>🏥 {doctor.Location.address}</p>
//                     <div className="textDoctor">
//                       <p>⭐ {doctor.ratingsQuantity}</p>
//                       <p style={{ color: "green", fontWeight: "bold" }}>{bookingPrice}$</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         <div className="map-container">
//           {position ? (
//             <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//               <Marker position={position}>
//                 <Popup>Your Current Position</Popup>
//               </Marker>

//               {doctors.map((doctor, index) => {
//                 const doctorName = `${doctor.user?.firstName || "Unknown"} ${doctor.user?.lastName || ""}`.trim();
//                 const specialty = doctor.Specialty || "Unknown";
//                 const doctorImage = doctor.image || imgdefault;

//                 return (
//                   <Marker
//                     key={index}
//                     position={[
//                       doctor.Location.coordinates[1] + index * 0.0001,
//                       doctor.Location.coordinates[0] + index * 0.0001,
//                     ]}
//                   >
//                     <Popup>
//                       <div style={{ textAlign: "center" }}>
//                         <img
//                           src={doctorImage}
//                           alt={doctorName}
//                           style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
//                         />
//                         <br />
//                         <strong>{doctorName}</strong>
//                         <br />
//                         🩺 {specialty}
//                       </div>
//                     </Popup>
//                   </Marker>
//                 );
//               })}
//             </MapContainer>
//           ) : (
//             <p style={{ textAlign: "center", paddingTop: "20px", color: "red" }}>Failed to get your location.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Cookies from "universal-cookie";
import imgdefault from "../../../../assets/doctors.avif";
import imgrate from '../../../../assets/star.png'
import "./NearDoctors.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";


export default function NearDoctors() {
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");
  const [position, setPosition] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("doctors"); 
  const nav = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        getNearDoctors(longitude, latitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  }, []);
  const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", 
        iconSize: [40, 40], 
        iconAnchor: [20, 40], 
        popupAnchor: [0, -40] 
    });

  const getNearDoctors = async (lng, lat) => {
    try {
      const res = await axios.get(
        `https://carenest-serverside.vercel.app/doctor/near?lng=${lng}&lat=${lat}`,
        { headers: { Authorization: `${getToken}` } }
      );
      setActiveTab("doctors");
      setDoctors(res.data.data || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="near-doctors-container">
        <div className="doctors-list">
          
          
          {loading && <p className="loading-text">Doctors are being monitored near you.</p>}

          {!loading && doctors.length === 0 ? (
            <p className="no-doctors">There are no doctors near you!</p>
          ) : (
            !loading &&
            doctors.map((doctor, index) => {
              const doctorName = `${doctor.user?.firstName || "Unknown"} ${doctor.user?.lastName || ""}`.trim();
              const doctorImage = doctor.image || imgdefault;

              return (
                <div key={index} className="doctor-card">
                  <img src={doctorImage} alt={doctorName} className="doctor-image" />
                  <div className="doctor-info">
                    <div className="textDoctor">
                    <strong>Dr {doctorName}</strong>
                      <div>
                      <img src={imgrate} alt="star" />
                      <p> {doctor.ratingsQuantity}</p>
                      </div>
                    </div>
                    <p>🩺 {doctor.Specialty}</p>
                    <p>🏥 {doctor.Location.address}</p>
                    <div className="btnBook">
                      <button onClick={()=>nav(`/Doctorprofile/${doctor._id}`)}>Book</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="map-container">
          {position ? (
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={position} icon={userIcon}>
                  <Popup>
                      <strong>Your Current Position</strong>
                  </Popup>
              </Marker>

              {doctors.map((doctor, index) => {
                const doctorName = `${doctor.user?.firstName || "Unknown"} ${doctor.user?.lastName || ""}`.trim();
                const specialty = doctor.Specialty || "Unknown";
                const doctorImage = doctor.image || imgdefault;

                return (
                  <Marker
                    key={index}
                    position={[
                      doctor.Location.coordinates[1] + index * 0.0001,
                      doctor.Location.coordinates[0] + index * 0.0001,
                    ]}
                  >
                    <Popup>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={doctorImage}
                          alt={doctorName}
                          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <br />
                        <strong>{doctorName}</strong>
                        <br />
                        🩺 {specialty}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          ) : (
            <p style={{ textAlign: "center", paddingTop: "20px", color: "red" }}>Failed to get your location.</p>
          )}
        </div>
      </div>
    </>
  );
}
