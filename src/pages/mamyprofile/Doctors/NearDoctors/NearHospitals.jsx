import  { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './NearDoctors.css';
import { GrMapLocation } from "react-icons/gr";

export default function NearHospitals() {
    const cookies = new Cookies();
    const getToken = cookies.get("Bearer");

    const [position, setPosition] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
       const contentperpage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [mapopen, setmapopen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);
          const totalPages = Math.ceil(hospitals.length / contentperpage);
const indexOfLastItem = currentPage * contentperpage;
const indexOfFirstItem = indexOfLastItem - contentperpage;
  const currentItems = hospitals.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
                getNearHospitals(longitude, latitude);
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
  

    const getNearHospitals = async (lng, lat) => {
        try {
            const res = await axios.get(
                `https://carenest-serverside.vercel.app/doctor/hospital?lng=${lng}&lat=${lat}`,
                { headers: { Authorization: `${getToken}` } }
            );
            setHospitals(res.data.data || []);
        } catch (err) {
            console.error("Error fetching hospitals:", err);
            setHospitals([]);
        } finally {
            setLoading(false);
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
        <div className="near-doctors-container">
            {/* قائمة المستشفيات */}
            {(!isMobile || (isMobile && !mapopen)) && (
            <div className="doctors-list">
                    <div style={{display:"flex", justifyContent:"flex-end", padding:"5px 10px", alignItems:"center"}}>
                        {isMobile && (
                            <div className="showmap" onClick={()=>setmapopen(true)}>
                                <GrMapLocation />
                            </div>
                        )}
                    </div>
                {loading && 
                    <>
                            <div className="near-doctor-loader"></div>
                            <div className="near-doctor-loader"></div>
                    </>
                    }
                {!loading && hospitals.length === 0 ? (
                    <p className="no-doctors">There are no Hospitals near you!</p>
                ) : (
                    !loading &&
                    currentItems.map((hospital, index) => (
                        <div key={index} className="doctor-card">
                            <div className="hos-info">
                                <strong>{hospital.title}</strong>
                                <p>{hospital.categoryName}</p>
                                <p>{hospital.label}</p> 
                                <p>{hospital.phone}</p>
                            </div>
                        </div>
                    ))
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
                        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={position} icon={userIcon}>
                                <Popup>
                                    <strong>Your Current Position</strong>
                                </Popup>
                            </Marker>
                            {hospitals.map((hospital, index) => {
                                if (!hospital.position || !hospital.position.lat || !hospital.position.lng) {
                                    console.error("Invalid hospital data:", hospital);
                                    return null;
                                }
                                return (
                                    <Marker
                                        key={index}
                                        position={[
                                            hospital.position.lat + index * 0.0001,
                                            hospital.position.lng + index * 0.0001,
                                        ]}
                                    >
                                        <Popup>
                                            <div style={{ textAlign: "center" }}>
                                                <strong>{hospital.title}</strong>
                                                <p style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
                                                    {hospital.label}
                                                </p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    ) : (
                        <p style={{ textAlign: "center", paddingTop: "20px", color: "red" }}>
                            Failed to get your location.
                        </p>
                    )}
                </div>
            )}
            {/* في الشاشات الكبيرة تظهر الخريطة دائماً */}
            {!isMobile && (
            <div className="map-container">
                {position ? (
                    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position} icon={userIcon}>
                          <Popup>
                            <strong>Your Current Position</strong>
                          </Popup>
                        </Marker>
                        {hospitals.map((hospital, index) => {
                            if (!hospital.position || !hospital.position.lat || !hospital.position.lng) {
                                console.error("Invalid hospital data:", hospital);
                                return null;
                            }
                            return (
                                <Marker
                                    key={index}
                                    position={[
                                        hospital.position.lat + index * 0.0001,
                                        hospital.position.lng + index * 0.0001,
                                    ]}
                                >
                                    <Popup>
                                        <div style={{ textAlign: "center" }}>
                                            <strong>{hospital.title}</strong>
                                            <p style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
                                                  {hospital.label}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                ) : (
                    <p style={{ textAlign: "center", paddingTop: "20px", color: "red" }}>
                        Failed to get your location.
                    </p>
                )}
            </div>
            )}
        </div>
    );
}
