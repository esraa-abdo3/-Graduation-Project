import React, { useState } from "react";
import NearDoctors from "./NearDoctors";
import NearHospitals from "./NearHospitals";
import './NearDoctors.css'
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";

export default function NearPlaces() {
  const [activeTab, setActiveTab] = useState("Doctors");

  return (
    <div className="nearPlaces">
        <Mainnavbar/>
      <div className="titleBtn">
      <h2>Near {activeTab}</h2>
      <div className="btnTurn">
        <p
          className={activeTab === "Doctors" ? "active" : ""}
          onClick={() => setActiveTab("Doctors")}
        >
          Doctors
        </p>
        <p
          className={activeTab === "Hospitals" ? "active" : ""}
          onClick={() => setActiveTab("Hospitals")}
        >
          Hospitals
        </p>
      </div>
      </div>
      {activeTab === "Doctors" ? <NearDoctors /> : <NearHospitals />}
    </div>
  );
}
