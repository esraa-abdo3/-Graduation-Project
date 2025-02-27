
import { useEffect, useState } from "react";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import "./MamaTips.css";
import { GoArrowRight } from "react-icons/go";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MamyTips() {
    const [activeButtons, setActiveButtons]= useState(null);
    const [activeButtonsMonth, setActiveButtonsMonth] = useState("1");
    const cookies = new Cookies();
    const getToken = cookies.get("Bearer");
    const navigate = useNavigate();
    const [mamaTips, setMamaTips] = useState([]);
    const [babyTips, setBabyTips] = useState([]);
    const [filteredBabyTips, setFilteredBabyTips] = useState([]);
  

    function handleActiveButton(buttonName) {
        setActiveButtons(buttonName);
    }

    useEffect(() => {
        async function fetchTips(target, setState) {
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/?target=${target}&limit=40`, {
                    headers: {
                        "Authorization": `${getToken}`,
                    },
                });
                setState(response.data.data);
            } catch (error) {
                console.log(`Error fetching ${target} tips:`, error);
            }
        }

        if (getToken) {
            fetchTips("Mama", setMamaTips);
            fetchTips("Baby", setBabyTips);
        }
        setActiveButtons('baby');
        handleMonths(1);
    }, [getToken]);
    useEffect(() => {
        if (babyTips.length > 0) {
            handleMonths(1); // تحديد الشهر الأول افتراضيًا
        }
    }, [babyTips]); 
    const handleMonths = (month) => {
        setActiveButtonsMonth(month);
        const filtered = babyTips.filter(item => item.month === month);
        setFilteredBabyTips(filtered);
    };

    const renderTipsCard = (tips) =>
        tips.map((tip, index) => (
            <div
                className={`card-tip cardmam${index}`}
                key={index}
                style={{ backgroundImage: `url(${tip.image})` ,animationDelay: `${index * 0.2}s`  }}
                onClick={() => navigate(`/MamyTips/${tip._id}`)}
            >
                <div className="text">
                    <h3>{tip.category}</h3>
                    <div className="icon">
                        <GoArrowRight className="right-arrow" />
                    </div>
                </div>
            </div>
        ));
        
    return (
        <div className="mamytips">
            <Mainnavbar />
            <div className="landing-img">
                <div className="text">
                    <h2>MAM Tips</h2>
                    <p>Motherhood didn’t come with a manual, but the Carenest Tips has got you covered.</p>
                    <p>Supporting you every step of the way</p>
                </div>
            </div>
            <div className="tips-category">
                <div className="buttons">
                    <button className={activeButtons === "life" ? "active" : ""} onClick={() => handleActiveButton("life")}>Life as Mother</button>
                    <button className={activeButtons === "baby" ? "active" : ""} onClick={() => handleActiveButton("baby")}>Baby Tips</button>
                </div>
                { activeButtons === 'baby'&& (
                    <div className='month-buttons-container'>
                    {[...Array(12)].map((_, index) => (
                        <button key={index} onClick={() => handleMonths(index + 1)} className={activeButtonsMonth === index+1 ? "act" : "btnMonth"}>
                            Month {index + 1}
                        </button>
                    ))}
                </div>
                )

                }
                <div className="cards-tips">
                    <div className="cont">
                        {activeButtons === "life" ? renderTipsCard(mamaTips) : renderTipsCard(filteredBabyTips.length ? filteredBabyTips : babyTips)}
                    </div>
                </div>
            </div>
        </div>
    );
}

