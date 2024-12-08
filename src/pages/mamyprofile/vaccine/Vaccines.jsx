import { useEffect, useState } from "react";
import NextNavbar from "../../../Componets/NextNavbar/NextNavbar";
import ProfileNav from "../../../Componets/profilenav/ProfileNav";
import "./Vaccines.css"
import axios from "axios";
import Cookies from 'universal-cookie';
import virus from "../../../assets/virus.png"
import heart from "../../../assets/heart.svg";
import { useParams } from "react-router-dom";



export default function Vaccines() {
    const [allvaccine, setallvacine] = useState([]);
    const cookie = new Cookies();
    const gettoken = cookie.get('Bearer');
    const idbaby = cookie.get("activebaby");
    console.log(idbaby)
    const { nameid } = useParams();
    console.log(nameid)
//     const [idbaby, setIdBaby] = useState(cookie.get("activebaby") || "");
//     const[namebaby,setnamebaby]=useState('')

// useEffect(() => {
//     const newIdBaby = cookie.get("activebaby");
//     if (newIdBaby !== idbaby) {
//         setIdBaby(newIdBaby);
//     }
   
// }, []);
   

 
    /**first get all vaccines */
    useEffect(() => {
        async function getallvaccines() {
            try {
                let res = await axios.get(`https://carenest-serverside.vercel.app/babies/vaccines/forBaby/${idbaby}`, {
                    headers: {
                        Authorization: `${gettoken}`
                
                    }
                })
             // علشان ارتبهم تبع التاريخ الاول
                setallvacine(
                    [...res.data.data].sort((a, b) => {
                      const dateA = new Date(a.date).getTime();
                      const dateB = new Date(b.date).getTime();
                      return dateA - dateB; 
                    })
                  );
                  
              
            } catch (err) {
                console.log(err)
                
            }
             
        }
        getallvaccines()
        
    }, [idbaby])
    ////////////////////////////// to filter the vaccine
  
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
      
    /**vaccind cards */
    console.log(groupedArray)
    
    const vaciinecard = groupedArray.map((e, index) => {
        return (
            <>
                <div className="vaccinecard" key={index}>
                    <div className="vaccine-header">
                    {e.date === "2024-11-28" && (
                        <>
                          <h2>Birth dose</h2>
                                <p className="date-vaccine"> date : 2024-11-28</p>
                            </>
                      
               )}
                    {e.date === "2025-01-23" && (
                        <>
                            <h2>2-Month Vaccination Round</h2>
                            <p className="date-vaccine">date : 2025-01-23</p>
                        </>
         
             )}
                    {e.date === "2025-03-20" && (
                        <>
                            <h2>4-Month Vaccination Round</h2>
                            <p className="date-vaccine"> date:2025-03-20</p>
                        </>
          
         )}
                    {e.date === "2025-05-15" && (
                        <>
                            <h2>6-Month Vaccination Round</h2>
                            <p className="date-vaccine"> date :2025-05-15</p>
                        </>
         
         )}
                    {e.date === "2025-10-30" && (
                        <>
                            <h2>9-Month Vaccination Round</h2>
                            <p className="date-vaccine"> date :2025-10-30</p>
                        </>
          
        )}
                    {e.date === "2026-04-16" && (
                        <>
                            <h2>12-Month Vaccination Round</h2>
                            <p className="date-vaccine"> date: 2025-12-12</p>
                        </>
 
           )}
                    {e.date === "2028-08-03" && (
                        <>
                            <h2>18-Month Vaccination Round</h2>
                            <p className="date-vaccine"> date:2028-08-03</p>
                        </>
       
        )}


                    </div>
  
          
                    <div className="vaccine-flexbox">
                    {e.items.map((item, idx) => (
                <div key={idx} className="vaccine-thismonth">
                <h4>{item.vaccine.name}</h4>
                <p>{item.vaccine.description}</p>
                <span>Dose:{ item.vaccine.dose}</span>
                
            
          </div>
        ))}

                    </div>
               
    
   
                  


            </div>
            </>
      
        )
    })
    /**get baby name */
    // useEffect(() => {
    //     async function handleGetIdBaby() {
    //         const idbaby = cookie.get('activebaby');
           
    //         try {
    //             let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${idbaby}`, {
    //                 headers: {
    //                     Authorization: `${gettoken}`
    //                 }
    //             });
              
    //            setnamebaby (response.data.data.name);
    //         } catch (err) {
    //             console.log("Error fetching baby details:", err);
    //         }
    //     }
    //     handleGetIdBaby()
    
        
    // }, [idbaby]);
    console.log(idbaby);
 
 

    return (
        <>
            <ProfileNav />
            <NextNavbar />
            <div className="vaccine-landing">
                <div className=" text">
                
                    <h5>Make sure you don’t miss { nameid } vaccine it’s a reminder of how much you care for him
               
                    </h5>
                    
                

                </div>
                <img src={heart}></img>
                  

            </div>
            <div className="vaccinesall">
                {vaciinecard}
                <img src={virus} alt="" className="one" />
            
                
                


            </div>
        </>
    )
}