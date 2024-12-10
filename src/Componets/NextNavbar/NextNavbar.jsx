
// import { Link } from "react-router-dom";
// import "../profilenav/ProfileNav.css";
// import "../Navbar/Navbar.css"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "universal-cookie";

// export default function NextNavbar() {
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");

//     const [allbabies, setAllBabies] = useState([]);
//     const [active, setActive] = useState(null);
//     const [activebaby, setActiveBaby] = useState("Choose your little");
//     const getid = cookie.get("activebaby");
   
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         async function getBabies() {
//             try {
//                 let res = await axios.get('https://carenest-serverside.vercel.app/babies/allBabiesOfLoggedUser', {
//                     headers: {
//                         "Authorization": `${gettoken}`
//                     }
//                 });
//                 setAllBabies(res.data.data);
//                 setLoading(false);

//                 if (getid === "all") {
            
//                     setActiveBaby("all babies");
//                 } else if (!getid) {
                 
//                     const lastBabyId = res.data.data[res.data.data.length - 1]._id;
//                     cookie.set("activebaby", lastBabyId);
                   
//                     setActiveBaby(res.data.data[res.data.data.length - 1].name);
//                 } else {
                  
//                     const activeBabyData = res.data.data.find(baby => baby._id === getid);
//                     if (activeBabyData) {
              
//                         setActiveBaby(activeBabyData.name);
                    
//                     }
//                 }
//             } catch (error) {
//                 console.log("Error fetching babies:", error);
//                 setLoading(false);
//             }
//         }

//         getBabies();
//     }, [gettoken, getid]);


//     async function handleGetIdBaby(id) {
//         cookie.set("activebaby", id);
//         try {
//             let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${id}`, {
//                 headers: {
//                     Authorization: `${gettoken}`
//                 }
//             });
            
          
//             setActiveBaby(response.data.data.name);
//         } catch (err) {
//             console.log("Error fetching baby details:", err);
//         }
//     }

//     const babyDropdown = allbabies.map((e, index) => {
//         return (
//             <div onClick={() => handleGetIdBaby(e._id)} key={index}>
//                 <input id={`option-${e._id}`} name="option" type="radio" />
//                 <label
//                     className="option"
//                     htmlFor={`option-${e._id}`}
//                     onClick={() => {
//                         setActiveBaby(e.name);
//                         setActive(false);
//                     }}
//                 >
//                     {e.name}
//                 </label>
//             </div>
//         );
//     });
 
   
//     return (
//         <div className="cat">
//   <div className="cont">
//             <Link to="/myprofile/mybabies" >my babies</Link>
//             <Link to={`/myprofile/vaccines/${activebaby}`} >{activebaby}' Vaccines</Link>
           
            
//                 <li style={{listStyle:"none"}}>
//                         <div className="select">
//                             <div
//                                 className={`selected ${active ? "activearrow" : ""}`}
//                                 onClick={() => setActive(!active)}
//                             >
//                                 {loading ? <span className="skeleton-span"> </span>
                     
//                                     :
//                                     <span>{activebaby}</span>
//                                 }
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     height="1em"
//                                     viewBox="0 0 512 512"
//                                     className="arrow"
//                                 >
//                                     <path
//                                         d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
//                                     ></path>
//                                 </svg>
//                             </div>
//                             <div className={`options ${active ? "active" : ""} option-profile`}>
//                                 {babyDropdown}
//                                 <div>
//                                     <input id={`option-all`} name="option" type="radio" />
//                                     <label
//                                         className="option"
//                                         htmlFor={`option-all`}
//                                         onClick={() => {
//                                             setActive(false)
//                                             setActiveBaby("all babies");
//                                             cookie.set("activebaby", "all"); // تعيين الكوكيز لـ "all"
//                                         }}
//                                     >
//                                         all babies
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
 
             
              
                
                
//         </div>
//         </div>
      
//     );
// }
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../profilenav/ProfileNav.css";
import "../Navbar/Navbar.css";
import { BabyContext } from "../../context/BabyContext";

export default function NextNavbar() {
  const { allBabies, activeBaby, loading, handleActiveBabyChange } = useContext(BabyContext);
  const [active, setActive] = React.useState(false);

  const babyDropdown = allBabies.map((e, index) => {
    return (
      <div onClick={() => handleActiveBabyChange(e._id)} key={index}>
        <input id={`option-${e._id}`} name="option" type="radio" />
        <label
          className="option"
          htmlFor={`option-${e._id}`}
          onClick={() => {
            setActive(false);
          }}
        >
          {e.name}
        </label>
      </div>
    );
  });

  return (
    <div className="cat">
      <div className="cont">
        <Link to="/myprofile/mybabies">my babies</Link>
        <Link to={`/myprofile/vaccines/${activeBaby}`}>{activeBaby}'s Vaccines</Link>

        <li style={{ listStyle: "none" }}>
          <div className="select">
            <div
              className={`selected ${active ? "activearrow" : ""}`}
              onClick={() => setActive(!active)}
            >
              {loading ? (
                <span className="skeleton-span"></span>
              ) : (
                <span>{activeBaby}</span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="arrow"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
              </svg>
            </div>
            <div className={`options ${active ? "active" : ""} option-profile`}>
              {babyDropdown}
              <div>
                <input id={`option-all`} name="option" type="radio" />
                <label
                  className="option"
                  htmlFor={`option-all`}
                  onClick={() => {
                    setActive(false);
                    handleActiveBabyChange("all");
                  }}
                >
                  all babies
                </label>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}



