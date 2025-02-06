
// import { Link } from "react-router-dom";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import "./ProfileNav.css";
// import "../Navbar/Navbar.css"
// import { FaBars } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import logo from "../../assets/Logo0.svg";
// import axios from "axios";
// import Cookies from "universal-cookie";

// export default function ProfileNav(props) {
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
//     const [isOpen, setIsOpen] = useState(false);
//     const [allbabies, setAllBabies] = useState([]);
//     const [active, setActive] = useState(null);
//     const[active2,setacive2]=useState(null)
//     const [activebaby, setActiveBaby] = useState("Choose your little");
//     const getid = cookie.get("activebaby");
//     const [loading, setLoading] = useState(true);
//     const firstsname = cookie.get("firstname");
//     const lastname = cookie.get("lastname");

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

    
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

//     // const babyDropdown = allbabies.map((e, index) => {
//     //     return (
//     //         <div onClick={() => handleGetIdBaby(e._id)} key={index}>
//     //             <input id={`option-${e._id}`} name="option" type="radio" />
//     //             <label
//     //                 className="option"
//     //                 htmlFor={`option-${e._id}`}
//     //                 onClick={() => {
//     //                     setActiveBaby(e.name);
//     //                     setActive(false);
//     //                 }}
//     //             >
//     //                 {e.name}
//     //             </label>
//     //         </div>
//     //     );
//     // });

//     // useEffect(() => {
//     //     console.log(props.allnotification)
//     //     console.log(props.allnotification.length );
        
//     // },[])
//     console.log(props.allnotification)
   
   

    
   

//     return (
//         <>
//             <nav className="profileNav">
//                 <FaBars
//                     style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
//                     className="menu-icon"
//                     onClick={toggleSidebar}
//                 />
//                 <ul>
//                     <li className="home">
//                         <Link to="/">home</Link>
//                     </li>
//                     <li className="about">
//                         <Link to="/">about</Link>
//                     </li>
//                     <li className="contact">
//                         <Link to="/">contact</Link>
//                     </li>
                  
//                     <li className="nofitication">
//                         <span className="numberofnotication"></span>
//                         <IoMdNotificationsOutline style={{ fontSize: "30px" }} />
//                     </li>
//                     <li>
//                         <div className="select-mam">
//                             <div
//                                 className={`selected-mam ${active2 ? "activearrowmam" : ""}`}
//                                 onClick={() => setacive2(!active2)}
                              
//                             >
                               
//                                     <span>{`${firstsname[0]}${lastname[0]}`}</span>
                                
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
//                             <div  className={`options-mam ${active2 ? "active" : ""} `}>
//                                 <div>
//                                 <input id={`myaccount`} name="option" type="radio" />
//                                     <label
//                                         className="option-mam"
//                                         htmlFor={`myaccount`}
//                                         onClick={() => {
//                                             setacive2(false)
                                          
//                                         }}
//                                     >
//                                     <Link to="/myprofile/myaccount">
//                                         account
//                                     </Link>
//                                     </label>
//                                 </div>
//                                 <div>
//                                 <input id={`myaccount`} name="option" type="radio" />
//                                     <label
//                                         className="option-mam"
//                                         htmlFor={`myaccount`}
//                                         onClick={() => {
//                                             setacive2(false)
                                          
//                                         }}
//                                     >
//                                     <Link to="/">
//                                      log out
                                        
//                                     </Link>
//                                     </label>
//                           </div>
                                 
//                                 </div>
//                                 </div>
                      
   
                    

//                     </li>
//                 </ul>
//             </nav>
//             <div className={`categories ${isOpen ? 'show' : ''}`}>
//                 <div className="cont">
//                     <div className="logo">
//                         <img src={logo} alt="logo"></img>
//                     </div>
//                     <div className="all" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: "100%" }}>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
//                             <Link to="/reminders" onClick={toggleSidebar}>Home</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
//                             <Link to="/myprofile/MedicinePage" onClick={toggleSidebar}>Reminders</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
//                             <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
//                         </div>
//                     </div>
//                     <button className="lo">log out</button>
//                 </div>
//                 <div className="icon">
//                     <FaBars style={{ fontSize: "25px", color: "black" }} className="menu-icon ll" onClick={toggleSidebar} />
//                 </div>
//             </div>
//         </>
//     );
// }
////////////////////////////////////
import { Link, useNavigate, } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./ProfileNav.css";
import "../Navbar/Navbar.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import logo from "../../assets/Logo0.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import { IoAlarmOutline } from "react-icons/io5";
import { Checkbox } from "@mui/material";
import { IoCheckmarkDoneOutline } from "react-icons/io5";



function ProfileNav() {
    const cookie = new Cookies();
   
    const gettoken = cookie.get("Bearer");
    const [isOpen, setIsOpen] = useState(false);
 
    const [allnotification, setallnotication] = useState([])
    const [notificationactive, setnotificationactive] = useState(false)
    const firstsname = cookie.get("firstname");
    const lastname = cookie.get("lastname");
    console.log(firstsname)
    const nav = useNavigate();
    function handlelogout() {
    
        cookie.remove("firstname");
        cookie.remove("lastname");
        cookie.remove("Bearer")
        nav("/Auth/Login")
     

    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    /**first git all notifcations */
    useEffect(() => {
   

        async function getallnotication() {
          try {
            let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
              headers: {
                Authorization:`${gettoken}`
              }
              
            })
            setallnotication(res.data.data)
            
            
          }
          catch (error) {
            console.log(error)
          }
        }
        getallnotication()
    }, [gettoken,allnotification ])
    // useEffect(() => {
    //     async function getallnotication() {
    //       try {
    //         let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
    //           headers: {
    //             Authorization: `${gettoken}`
    //           }
    //         });
    //         setallnotication(prevNotications => [...prevNotications, ...res.data.data]);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    
    //     getallnotication();
    //   }, [gettoken,allnotification]);
    
 
    const cardnotification = allnotification.map((e) => {
        return (
            <div className="note" key={e._id}>
                <header className="header-note">
                    <IoAlarmOutline className="alarmicon" style={{fontSize: "30px",
    color: "#e68cc7"}}/>
                    <h3>
                        {e.title}
                        </h3>
                </header>
                <p>
                {e.message}
                </p>
              <Checkbox className="check" onClick={()=>handledeletenotification(e._id)}></Checkbox>
                
           </div>
       )
    })
    function handlenotificationclick() {
        setnotificationactive(prev=> !prev)
    }
    async function handledeletenotification(id) {
        try {
            let res = await axios.delete(`https://carenest-serverside.vercel.app/user/notifications/${id}`, {
                headers: {
                Authorization:`${gettoken}`
            }
            })
            setallnotication((prevNotifications) => 
                prevNotifications.filter(notification => notification._id !== id)
            );
            console.log(res);
        }
        catch (error) {
            console.log(error)
        }
        
    }


    return (
        <>
            <nav className="profileNav">
                <FaBars
                    style={{ fontSize: "25px", color: "black", zIndex: "1000" }}
                    className="menu-icon"
                    onClick={toggleSidebar}
                />
                <ul>
                    <li className="home">
                        <Link to="/">home</Link>
                    </li>
                    <li className="about">
                        <Link to="/">about</Link>
                    </li>
                    <li className="contact">
                        <Link to="/">contact</Link>
                    </li>
                    <li className="nofitication">
                        <span className="numberofnotication" onClick={()=>{ handlenotificationclick()}}>
                            <p >   {allnotification && Array.isArray(allnotification) ? allnotification.length : 0}</p>
                     
                    
                        </span>
                        <IoMdNotificationsOutline  style={{ fontSize: "25px" }}  />
                        {notificationactive && <div className="cards">
                            <div className="headerforcards">
                                <p>notifications</p>
                                <div className="icon"><IoCheckmarkDoneOutline style={{color:"green",paddingBottom:"0px", fontSize:"16px"}}/> mark all as read </div>
                                
                          </div>
    {cardnotification}
</div>}
                    </li>
                    <li>
                    
                    </li>
                </ul>
            </nav>

            <div className={`categories ${isOpen ? 'show' : ''}`}>
                <div className="cont">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="all" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <Link to="/reminders" onClick={toggleSidebar}>Home</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Cry Guide</Link>
                            <Link to="/myprofile/MedicinePage" onClick={toggleSidebar}>Reminders</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Baby Growth</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Doctors</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Entertainment</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Mamy Tips</Link>
                            <Link to="/reminders" onClick={toggleSidebar}>Shopping</Link>
                        </div>
                    </div>
                    <div className="Navbar-btn">
                    {!gettoken ? (   
                        <>
                        
    <button className="loging">
                        <Link to="Auth/login">Log in</Link>
                    </button>
                    <button className="signup active">
                        <Link to="Auth/Signup">sign up</Link>
                            </button>
                  </>) :
                                 <div className="log-out">
                                 <div className="mama">
                                 
                                 <span>{`${firstsname[0]}${lastname[0]}`}</span>
             
                                 </div>
                      
             
                            
                             <div className="options-mama">
                                 <Link> <p> <VscAccount/> my-account</p></Link>
                                 <p to="/myprofile/myaccount"  onClick={handlelogout}>   <CiLogout/> log out</p>
             
                                 </div>
                             
             
                       
                       
                          
                         
                     </div>
                            
                   }
                    </div>
                    </div>
                <div className="icon">
                    <FaBars style={{ fontSize: "25px", color: "black" }} className="menu-icon ll" onClick={toggleSidebar} />
                </div>
                </div>
                
        </>
    );
}


export default ProfileNav;









