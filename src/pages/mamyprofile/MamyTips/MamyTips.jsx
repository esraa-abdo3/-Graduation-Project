// import { useEffect, useState } from "react"
// import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar"
// import "./MamaTips.css"
// import { GoArrowRight } from "react-icons/go";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export default function MamyTips() {
//     const [activebauttons, setactivenytton] = useState(null);
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
//     const nav=useNavigate()
//     const [mamatips, setmamatips] = useState([])
//     const [babytips, setbabytips] = useState([]);
//     function handleactivebutton(buttonname) {
//         setactivenytton(buttonname)
//     }
//     /// first get the tips 
//     useEffect(() => {
//         async function gettips() {
//             try {
//                 const response = await axios.get('https://carenest-serverside.vercel.app/tips/?target=Mama&limit=5', {
//                     headers: {
//                         "Authorization": `${gettoken}`
//                     }
//                 });
//                 setmamatips(response.data.data)
//                 console.log(response.data.data)
 
//             } catch (error) {
//                 console.log("Error fetching babies:", error);
        
//             }
//         }
//         if (gettoken) {
//             gettips();
//         }
        
//     }, [gettoken])
//     useEffect(() => {
//         async function gettips() {
//             try {
//                 const response = await axios.get('https://carenest-serverside.vercel.app/tips/?target=Baby&limit=40', {
//                     headers: {
//                         "Authorization": `${gettoken}`
//                     }
//                 });
//                 setbabytips(response.data.data)
//                 console.log(response.data.data)
 
//             } catch (error) {
//                 console.log("Error fetching babies:", error);
        
//             }
//         }
//         if (gettoken) {
//             gettips();
//         }
        
//     }, [gettoken])
//     const mamatipscard = mamatips.map((tip, index) => {
//         return (
//             <div className={`card-tip   cardmam${index}`} key={index} style={{ backgroundImage: `url(${tip.image})` }}
//                 onClick={() => nav(`/MamyTips/${tip._id}`)}
//             >
//                 <div className="text">
//                     <h3>{tip.category}</h3>
//                     <div className="icon">
//                         <GoArrowRight className="right-arrow" />
//                     </div>
//                 </div>
//             </div>
        
//         )
//     });
//     const babytipscard = babytips.map((tip, index) => {
//         return (
//             <div className={`card-tip   cardmam${index}`} key={index}  style={{ backgroundImage: `url(${tip.image})` }}>
//                 <div className="text">
//                     <h3>{tip.category}</h3>
//                     <div className="icon">
//                         <GoArrowRight className="right-arrow" />
//                     </div>
//                 </div>
//             </div>
        
//         )
//     });
    
//     return (
//         <div className="mamytips">
//             <Mainnavbar/>
//             <div className="landing-img">
//                 <div className="text">
//                     <h2>MAM Tips</h2>
//                     <p>Motherhood didn’t come with a manual, but the Carenest Tips has got you covered.
//                     </p>
//                     <p>Supporting you every step of the way</p>
//                 </div>

//             </div>
//             <div className="tips-catagroy">
//                 <div className="buttons">
//                     <button className={activebauttons ==="top"?"active" :""} onClick={()=> handleactivebutton("top")}> top tips</button>
//                     <button className={activebauttons ==="life"?"active" :""} onClick={()=> handleactivebutton("life")}> life as mother</button>
//                     <button  className={activebauttons ==="baby"?"active" :""} onClick={()=> handleactivebutton("baby")}> baby tips</button>
//                 </div>
//                 <div className="cards-tips">
//                     <div className="cont">
                        
//                         {activebauttons === "life" ? (
//                             mamatipscard
                            
// ):( babytipscard) }
                      
                        
//                         </div>

//                 </div>

//             </div>

//         </div>
        
//     )
// }