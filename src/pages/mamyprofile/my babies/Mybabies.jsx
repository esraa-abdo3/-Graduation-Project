
import "./Addbabies.css";
import ProfileNav from "../../../Componets/profilenav/ProfileNav";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import babyboy from "../../../assets/babyNameBoy.png";
import babygirl from "../../../assets/babyNameGirl.png";
import { TiDeleteOutline } from "react-icons/ti";
import NextNavbar from "../../../Componets/NextNavbar/NextNavbar";

export default function Mybabies() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [allbabies, setallbabies] = useState([]);
    const [loading, setLoading] = useState(true);
   

    // to get all babies first 
    useEffect(() => {
        async function getbabies() {
            try {
                const response = await axios.get('https://carenest-serverside.vercel.app/babies/allBabiesOfLoggedUser', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setallbabies(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching babies:", error);
                setLoading(false);
            }
        }
        if (gettoken) {
            getbabies();
        }
    }, [gettoken]);
 
    async function handledelete(id) {
        try {
           
            await axios.delete(`https://carenest-serverside.vercel.app/babies/${id}`, {
                headers: {
                    "Authorization": `${gettoken}`
                }
            });
    
         
            if (cookie.get("activebaby") === id) {
                

                const remainingBabies = allbabies.filter((baby) => baby._id !== id);
                if (remainingBabies.length > 0) {
                    const newActiveBaby = remainingBabies[remainingBabies.length - 1]._id;
                    cookie.set("activebaby", newActiveBaby);
                }
            }
    
         
            setallbabies((prevBabies) => prevBabies.filter((baby) => baby._id !== id));
    
        } catch (error) {
            console.log(error);
        }
    }
    


    let babiescard = allbabies.map((e, index) => {
        return (
            <Link 
                to={`/myprofile/${e._id}`}
                key={index}
                onClick={(event) => {
                    if (event.target.closest(".deleteicon")) {
                        event.preventDefault(); 
                    }
                }}
            >
                <div
                    style={{
                        border: e.gender === "Male" ? "1px solid #418FBF" : "1px solid #E68CC7",
                        boxShadow: e.gender === "Male"
                            ? "rgb(65 143 191 / 25%) 0px 4px 4px 0px"
                            : "rgb(230 140 199 / 25%) 0px 4px 4px 0px"
                    }}
                    className="baby-card"
                    data-id={e._id}
                >
                    <div className="baby-nameimg">
                        <img src={e.gender === "Male" ? babyboy : babygirl} alt="" />
                        <h2>{e.name}</h2>
                    </div>
               
                        <TiDeleteOutline
                            className="deleteicon"
                            onClick={() => handledelete(e._id)}
                        />
                 
                </div>
            </Link>
        );
    });

    return (
        <>
            <ProfileNav />
            <NextNavbar/>
            <div className="Addbaby">
                <h3>My Babies</h3>
                <div className="card">
                    {loading ? (
                        <div className="skeleton-loader">
                            <div className="baby-card skeleton"></div>
                            <div className="baby-card skeleton"></div>
                            <div className="baby-card skeleton"></div>
                        </div>
                    ) : (
                        allbabies.length === 0 ? (
                            <p>No babies added yet. Please add a new baby.</p>
                        ) : (
                            babiescard
                        )
                    )}
                </div>
                <button>
                    <Link to="/myprofile/NameBaby">
                        Add New Baby
                    </Link>
                </button>
            </div>
        </>
    );
}


