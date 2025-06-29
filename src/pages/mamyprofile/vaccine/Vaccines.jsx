import { useContext, useEffect, useState } from "react";
import "./Vaccines.css";
import axios from "axios";
import Cookies from 'universal-cookie';
import virus from "../../../assets/virus.png";
import { BabyContext } from "../../../context/BabyContext";
import { FaCircle } from "react-icons/fa";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
export default function Vaccines() {
    const cookie = new Cookies();
    const { activeBaby, activeBabyId, activebabyage, activebabyweight, activebabyheight } = useContext(BabyContext);
    const formattedDate = activebabyage ? new Date(activebabyage).toISOString().split("T")[0] : "";
    const [allvaccine, setallvacine] = useState([]);
    const gettoken = cookie.get('Bearer');
    const idbaby =cookie.get("activebaby")
    const [loading, setLoading] = useState(true);
   

    /** Fetch all vaccines  */
    useEffect(() => {
        async function getallvaccines() {
            if (!activeBabyId) {
                return; 
            }
            try {
                setLoading(true); 
                let res = await axios.get(`https://carenest-serverside.vercel.app/babies/vaccines/forBaby/${activeBabyId}`, {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                });
           
console.log(res)
                // هرتبهم
                setallvacine(
                    [...res.data.data].sort((a, b) => {
                        const dateA = new Date(a.date).getTime();
                        const dateB = new Date(b.date).getTime();
                        return dateA - dateB;
                    })
                );
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        getallvaccines();
    }, [activeBabyId, gettoken]);

    /** هقسمهم */
    const groupedData = allvaccine.reduce((acc, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});
    const groupedArray = Object.entries(groupedData).map(([date, items], index) => ({
        index,
        date,
        items,

    }));

 
 
      

      const checked = async (idVaccine) => {
        const originalVaccines = allvaccine;

        setallvacine(prevVaccines =>
            prevVaccines.map(item => {
                if (item.vaccine && item.vaccine._id && item.vaccine._id._id === idVaccine) {
                    return { ...item, administered: true };
                }
                return item;
            })
        );
        
        try{
            await axios.put(`https://carenest-serverside.vercel.app/babies/vaccines/${idbaby}/administered/${idVaccine}`,{},{
            headers: {
                Authorization: `${gettoken}`
        
            }
        });
    
        }catch(err){
            console.log("Error:", err);
            setallvacine(originalVaccines);
        }
      };


    

    const vaciinecard = groupedArray.map((e, index) => {
        return (
            <div className="vaccinecard" key={index}>
                <div className="vaccine-header">
                    {index === 0 && (
                        <>
                            <h2>Birth dose</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 1 && (
                        <>
                            <h2>2-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 2 && (
                        <>
                            <h2>4-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 3 && (
                        <>
                            <h2>6-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 4 && (
                        <>
                            <h2>9-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 5 && (
                        <>
                            <h2>12-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                    {index === 6 && (
                        <>
                            <h2>18-Month Vaccination Round</h2>
                            <p className="date-vaccine">Date: {e.date}</p>
                        </>
                    )}
                </div>

                <div className="vaccine-flexbox">
                    {e.items.map((item, idx) => (

                <div key={idx} className="vaccine-thismonth">
                    
                    <div
                    onClick={(e) => {
                    e.stopPropagation();
                    if (!item.administered) {
                        checked(item.vaccine._id._id);
                    }
                                }}
                                style={{color: item.administered ? "#4CAF50" : "#a7c8dd", cursor: "pointer", fontSize:"24px"}}
                    >
                    {item.administered
                    ? <MdCheckCircle />
                    : <MdRadioButtonUnchecked />}
                </div>

                    <div>
                        <h4>{item.vaccine && item.vaccine.name}</h4>
                        <p>{item.vaccine && item.vaccine.description}</p>

                        
                    </div>
                
            
          </div>
        ))}

                    </div>
               
    
   
                  



            </div>
        );
    });

    return (
        <>
            <Mainnavbar />
        
            <div className="vaccine-landing">
                <div className=" text">
                    <h5>Make sure you don't miss {activeBaby} vaccine it's a reminder of how much you care for him</h5>
                    {loading ? (
                        <ul className="vaccineui">
                            <li></li>
                        
                        </ul>
                    ) : (
                                <ul>
                        <li> <FaCircle style={{ fontSize: "10px", paddingRight: "5px", color: "#e68cc7"}} /> born {formattedDate}</li>
                        <li> <FaCircle style={{ fontSize: "10px", paddingRight: "5px", color: "#e68cc7"}} /> weight: {activebabyweight}kg</li>
                        <li> <FaCircle style={{ fontSize: "10px", paddingRight: "5px", color: "#e68cc7"}} /> height: {activebabyheight}cm</li>
                    </ul>
                    )
                    }
                

                
               
                    </div>
                    
                

                    <img src={virus} alt="" className="one" />
                </div>
              
      
            <div className="vaccinesall">
                {loading ? (
                    <div className="skeleton-loader-vaccine">
                        <div className="vaccine"></div>
                        <div className="vaccine"></div>
                        <div className="vaccine"></div>
                    </div>
                ) : vaciinecard}
            </div>
        </>
    );
}
