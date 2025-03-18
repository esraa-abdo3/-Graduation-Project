import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import './NearDoctors.css';

export default function NearHospitals() {
    const cookies = new Cookies();
    const getToken = cookies.get("Bearer");

    const [position, setPosition] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="near-doctors-container">
            {/* قائمة المستشفيات */}
            <div className="doctors-list">

                {loading && <p className="loading-text">Hospitals are being monitored near you.</p>}

                {!loading && hospitals.length === 0 ? (
                    <p className="no-doctors">There are no Hospitals near you!</p>
                ) : (
                    !loading &&
                    hospitals.map((hospital, index) => (
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
            </div>

            {/* الخريطة */}
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
        </div>
    );
}
