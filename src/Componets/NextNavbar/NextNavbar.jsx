
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import "../profilenav/ProfileNav.css";
import "../Navbar/Navbar.css"
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo0.svg";
import axios from "axios";
import Cookies from "universal-cookie";

export default function NextNavbar({ toggleSidebar }) {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [isOpen, setIsOpen] = useState(false);
    const [allbabies, setAllBabies] = useState([]);
    const [active, setActive] = useState(null);
    const[active2,setacive2]=useState(null)
    const [activebaby, setActiveBaby] = useState("Choose your little");
    const getid = cookie.get("activebaby");
    const [loading, setLoading] = useState(true);
    const firstsname = cookie.get("firstname");
    const lastname = cookie.get("lastname");

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };

    
    useEffect(() => {
        async function getBabies() {
            try {
                let res = await axios.get('https://carenest-serverside.vercel.app/babies/allBabiesOfLoggedUser', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setAllBabies(res.data.data);
                setLoading(false);

                if (getid === "all") {
            
                    setActiveBaby("all babies");
                } else if (!getid) {
                 
                    const lastBabyId = res.data.data[res.data.data.length - 1]._id;
                    cookie.set("activebaby", lastBabyId);
                    setActiveBaby(res.data.data[res.data.data.length - 1].name);
                } else {
                  
                    const activeBabyData = res.data.data.find(baby => baby._id === getid);
                    if (activeBabyData) {
                        setActiveBaby(activeBabyData.name);
                    }
                }
            } catch (error) {
                console.log("Error fetching babies:", error);
                setLoading(false);
            }
        }

        getBabies();
    }, [gettoken, getid]);

    async function handleGetIdBaby(id) {
        cookie.set("activebaby", id);
        try {
            let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${id}`, {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
            setActiveBaby(response.data.data.name);
        } catch (err) {
            console.log("Error fetching baby details:", err);
        }
    }

    const babyDropdown = allbabies.map((e, index) => {
        return (
            <div onClick={() => handleGetIdBaby(e._id)} key={index}>
                <input id={`option-${e._id}`} name="option" type="radio" />
                <label
                    className="option"
                    htmlFor={`option-${e._id}`}
                    onClick={() => {
                        setActiveBaby(e.name);
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
            <Link to="/myprofile/mybabies" onClick={toggleSidebar}>my babies</Link>
            <Link to="/reminders" onClick={toggleSidebar}>{activebaby}' Vaccines</Link>
           
            
                <li style={{listStyle:"none"}}>
                        <div className="select">
                            <div
                                className={`selected ${active ? "activearrow" : ""}`}
                                onClick={() => setActive(!active)}
                            >
                                {loading ? <span className="skeleton-span"> </span>
                     
                                    :
                                    <span>{activebaby}</span>
                                }
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                    className="arrow"
                                >
                                    <path
                                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                                    ></path>
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
                                            setActive(false)
                                            setActiveBaby("all babies");
                                            cookie.set("activebaby", "all"); // تعيين الكوكيز لـ "all"
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


