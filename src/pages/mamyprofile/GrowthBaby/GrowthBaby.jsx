import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";  
import "./GrowthBaby.css";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import imgbaby from "../../../assets/imgonline-com-ua-twotoone-fiensv2ybm.jpg.avif";
import Cookies from "universal-cookie";
import axios from "axios";

export default function GrowthBaby() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const idbaby = cookie.get("activebaby");

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [status, setStatus] = useState("");
    const [empty, setEmpty] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [growthMessage, setGrowthMessage] = useState("");
    const [lastRecord, setLastRecord] = useState(""); 
    const [dataNum, setDataNum] = useState("");
    const [latestHeight, setLatestHeight] = useState(null);
    const [latestWeight, setLatestWeight] = useState(null);
    const [statusH, setStatusH] = useState('');
    const [statusW, setStatusW] = useState('');
    // const [currentEntry,setcurrentEntry]=('');

    const fetchLatestGrowthData = async () => {
        try {
            const res = await axios.get(
                `https://carenest-serverside.vercel.app/dataGrowth/LatestGrowthData/${idbaby}`,
                {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                }
            );

            if (res.data.success) {
                const { latestHeight, latestWeight, heightStatus, weightStatus } = res.data.data;
                setLatestHeight(latestHeight);
                setLatestWeight(latestWeight);
                setStatusH(heightStatus);
                setStatusW(weightStatus);
                setLastRecord(`Last recorded height: ${latestHeight}Cm, weight: ${latestWeight}Kg`);
                setDataNum(`${latestHeight}Cm / ${latestWeight}Kg`);
                setDisplayText("Your baby’s current growth: ");
                setGrowthMessage(
                    heightStatus === 'Average' && weightStatus === 'Normal' 
                    ? "Your baby is growing well" 
                    : "Your baby’s growth is slowing!"
                );
            } else {
                setStatus("No growth data available.");
            }
        } catch (err) {
            setStatus("Failed to fetch latest growth data.");
        }
    };

    
    useEffect(() => {
        fetchLatestGrowthData();
        
    }, []); 

    const handleSubmit = async () => {
        if (!height || !weight) {
            setEmpty("Please enter both height and weight.");
            return;
        } else {
            setEmpty("");
        }

        setLoading(true);
        try {
            await axios.put(
                `https://carenest-serverside.vercel.app/dataGrowth/${idbaby}`,
                {
                    heightEntry: Number(height),
                    weightEntry: Number(weight),
                },
                {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                }
            );

            fetchLatestGrowthData();
            
        } catch (err) {
            setStatus("Failed to update growth data.");
        } finally {
            setLoading(false);
        }
    };

    const handleWeightClick = async () => {
        
        setLastRecord(`Last recorded weight: ${latestWeight}Kg`);
        setDataNum(`${latestWeight}Kg`);
        setDisplayText("Your baby’s current weight: ");
        setGrowthMessage(statusW === 'Normal' ? "Your baby is growing well" : "Your baby’s growth is slowing!");
    };

    const handleHeightClick = async () => {
        
        setLastRecord(`Last recorded height: ${latestHeight}Cm`);
        setDataNum(`${latestHeight}Cm`);
        setDisplayText("Your baby’s current height: ");
        setGrowthMessage(statusH === 'Average' ? "Your baby is growing well" : "Your baby’s growth is slowing!");
    };
    
    // const currentDate=async(type)=>{
    //     try{
    //         const res =await axios.get(`https://carenest-serverside.vercel.app/dataGrowth/${type}/${idbaby}`,
    //             {
    //                 headers: {
    //                     Authorization: `${gettoken}`,
    //                 },
    //             })
    //             if (res.data.success) {
    //                 const data = res.data.data[type]; // البيانات المسترجعة (height أو weight)
    //                 setcurrentEntry = data.reverse().find(entry => entry !== null); // البحث عن آخر قيمة غير null
    //                 console.log(currentEntry)
    //             } else {
    //                 setStatus("No growth data available.");
                    
    //             }
    //         } catch (err) {
    //             setStatus("Failed to fetch growth data.");
               
    //         }
    // }

    return (
        <div>
            <Mainnavbar />
            <div className="growthpage">
                <div className="imgtop">
                    <img src={imgbaby} alt="img" className="imggrowth" />
                    <div className="boxAddDataGrowth">
                        <h2>Add Growth Data</h2>
                        <div>
                            <label>Height (cm):</label>
                            <input
                                type="number"
                                placeholder="Enter Height"
                                value={height || ""}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Weight (kg):</label>
                            <input
                                type="number"
                                placeholder="Enter weight"
                                value={weight || ""}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        {empty && <p className="error">{empty}</p>}
                        <button onClick={handleSubmit}>
                            {loading ? <div className="spinner-small" style={{ fontSize: '12px' }}></div> : "Save"}
                        </button>
                    </div>
                </div>

                <div className="resultGrowth">
                    <p>{lastRecord}</p>
                    <p>
                        {displayText}{" "}
                        <span style={{ color: growthMessage === "Your baby is growing well" ? "#4CAF50" : "#ff4d4d" }}>
                            {dataNum}
                        </span>
                    </p>
                    <p
                        className={growthMessage === "Your baby is growing well" ? "green-box" : "red-box"}
                    >
                        {growthMessage}
                    </p>
                    <button className="gWeight" onClick={handleWeightClick}>
                        Weight per growth
                    </button>
                    <button className="gHeight" onClick={handleHeightClick}>
                        Height for age
                    </button>
                </div>
            </div>
        </div>
    );
}