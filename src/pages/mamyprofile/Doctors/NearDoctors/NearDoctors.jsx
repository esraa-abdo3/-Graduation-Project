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
import { CgSortAz } from "react-icons/cg";
import { CgSortZa } from "react-icons/cg";
import { GrMapLocation } from "react-icons/gr";


export default function NearDoctors() {
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");
  const [position, setPosition] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("doctors"); 
   const contentperpage = 2;
   const [currentPage, setCurrentPage] = useState(1);
  const nav = useNavigate();
  const [sortOrder, setSortOrder] = useState("desc"); 
      const totalPages = Math.ceil(doctors.length / contentperpage);
const indexOfLastItem = currentPage * contentperpage;
const indexOfFirstItem = indexOfLastItem - contentperpage;
  const currentItems = doctors.slice(indexOfFirstItem, indexOfLastItem);
  const[mapopen, setmapopen]=useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
      if (window.innerWidth > 920) {
        setmapopen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      console.log(res)
      setActiveTab("doctors");
      setDoctors(res.data.data || []);
      handlesort(); 

    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handlesort = () => {
    if (doctors && doctors.length > 0) {
      const sortedDoctors = [...doctors].sort((a, b) => {
        if (sortOrder === "desc") {
          return b.ratingsQuantity - a.ratingsQuantity; 
        } else {
          return a.ratingsQuantity - b.ratingsQuantity; 
        }
      });
  
      setDoctors(sortedDoctors);
  
 
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    }
  };
  
  // Pagination logic
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    // Previous button
    if (totalPages > 3) {
      pages.push(
        <button key="prev" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          {'<'}
        </button>
      );
    }
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button key={i} className={currentPage === i ? "active" : ""} onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(
            <button key={i} className={currentPage === i ? "active" : ""} onClick={() => setCurrentPage(i)}>
              {i}
            </button>
          );
        }
        pages.push(<span key="dots-end" style={{color:'#0A6AA6'}}>...</span>);
        pages.push(
          <button key={totalPages} className={currentPage === totalPages ? "active" : ""} onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 1) {
        pages.push(
          <button key={1} className={currentPage === 1 ? "active" : ""} onClick={() => setCurrentPage(1)}>
            1
          </button>
        );
        pages.push(<span key="dots-start" style={{color:'#0A6AA6'}}>...</span>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(
            <button key={i} className={currentPage === i ? "active" : ""} onClick={() => setCurrentPage(i)}>
              {i}
            </button>
          );
        }
      } else {
        pages.push(
          <button key={1} className={currentPage === 1 ? "active" : ""} onClick={() => setCurrentPage(1)}>
            1
          </button>
        );
        pages.push(<span key="dots-start" style={{color:'#0A6AA6'}}>...</span>);
        pages.push(
          <button key={currentPage} className="active" onClick={() => setCurrentPage(currentPage)}>
            {currentPage}
          </button>
        );
        pages.push(<span key="dots-end" style={{color:'#0A6AA6'}}>...</span>);
        pages.push(
          <button key={totalPages} className={currentPage === totalPages ? "active" : ""} onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </button>
        );
      }
      // Next button
      pages.push(
        <button key="next" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          {'>'}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      
      <div className="near-doctors-container">
        {/* قائمة الأطباء */}
        {(!isMobile || (isMobile && !mapopen)) && (
        <div className="doctors-list" >
            <div style={{display:"flex", justifyContent:"space-between" , padding:"5px 10px" , alignItems:"center"}}>
        <button className="sort" onClick={handlesort}>
            {sortOrder === "asc" ? (
      <CgSortAz size={30} style={{ color: "#777" }} />
                ) : (
              <CgSortZa size={30} style={{ color: "#777" }} />
  )}
</button>
              {isMobile && (
                <div className="showmap" onClick={()=>setmapopen(true)}>
                  <GrMapLocation />
                </div>
              )}
            </div>

          
          {loading &&
            <>
                <div className="near-doctor-loader">
            </div>
               <div className="near-doctor-loader">
            </div>
          
            

            </>
        
          }

          {!loading && doctors.length === 0 ? (
            <p className="no-doctors">There are no doctors near you!</p>
          ) : (
              !loading &&
              
            currentItems.map((doctor, index) => {
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
            <div className="pagination pagination-baby">{renderPagination()}</div>
        </div>
        )}
        {/* الخريطة */}
        {isMobile && mapopen && (
          <div className="map-container" style={{width:'100%',height:'85vh',display:'block',position:'relative'}}>
            <button style={{position:'absolute',top:10,right:10,zIndex:9999,background:'#fff',border:'1px solid #ccc',borderRadius:'50%',padding:'5px 10px',fontSize:'20px',cursor:'pointer'}} onClick={()=>setmapopen(false)}>
              ×
            </button>
            {position ? (
              <MapContainer center={position} zoom={13} style={{ 
                height: "100%", 
                width: "100%", 
                borderTopRightRadius: "16px", 
                borderBottomRightRadius: "16px" 
              }} className="map" >
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
        )}
        {/* في الشاشات الكبيرة تظهر الخريطة دائماً */}
        {!isMobile && (
        <div className="map-container">
          {position ? (
            <MapContainer center={position} zoom={13} style={{ 
              height: "100%", 
              width: "100%", 
              borderTopRightRadius: "16px", 
              borderBottomRightRadius: "16px" 
              }} className="map" >
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
        )}
      </div>
    </>
  );
}
