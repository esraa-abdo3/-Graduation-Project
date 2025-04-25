import "./Statistics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import babies from "../../../../assets/healthicons_loudly-crying-outline.svg"
import doctoricon from "../../../../assets/doctorsicon.svg";
import Entertaimenticon from "../../../../assets/streamline_dices-entertainment-gaming-dices.svg"
import Tipsicon from "../../../../assets/hugeicons_tips.svg"
import { GoArrowRight } from "react-icons/go";
import RandomLineChart from "../../../ComonetsDashboard/DashCharts/userCharts/Userchart";


export default function Statistics() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [stats, setStats] = useState({
        criesCount: "",
        doctorsCount: "",
        entertainmentCount: "",
        newBabiesCount: "",
        newUsersCount: "",
        tipsCount: "",
    });

    useEffect(() => {
        async function getStats() {
            try {
                let res = await axios.get('https://carenest-serverside.vercel.app/dashboard/stats', {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                });
                console.log(res)
                setStats({
                    criesCount: res.data.data.criesCount,
                    doctorsCount: res.data.data.doctorsCount,
                    entertainmentCount: res.data.data.entertainmentCount,
                    newBabiesCount: res.data.data.newBabiesCount,
                    newUsersCount: res.data.data.newUsersCount,
                    tipsCount: res.data.data.tipsCount,
                });
            } catch (error) {
                console.log(error);
            }
        }

        getStats();
    }, [gettoken]); 

    return (
        <div className="StatisticsOverview">
            <div className="header">
                <h2>StatisticsOverview</h2>
                <p>{formattedDate}</p>
            </div>
            <div className="StatisticsCards">
                <div className="cardstate">
                    <div className="imges">
                        <img src={babies} alt="" />
                        <div className="arrow">
                            <GoArrowRight style={{color:"black" , rotate:"90deg" , fontWeight:"bold", fontSize:"20px"}}/>
                        </div>
                    </div>
                    <div className="text">
                        <h4>{stats.criesCount !== "" ? stats.criesCount :0}</h4>
                        <p>Number of
                        Cries</p>
                    </div>

                </div>
                <div className="cardstate">
                    <div className="imges">
                        <img src={doctoricon} alt="" />
                        <div className="arrow">
                            <GoArrowRight  style={{color:"black" , rotate:"90deg" , fontWeight:"bold", fontSize:"20px"}}/>
                        </div>
                    </div>
                    <div className="text">
                        <h4>{stats.doctorsCount !== "" ? stats.doctorsCount :0}</h4>
                        <p>Number of  Doctors</p>
                    </div>

                </div>
                <div className="cardstate">
                    <div className="imges">
                        <img src={Entertaimenticon} alt="" />
                        <div className="arrow">
                            <GoArrowRight style={{color:"black" , rotate:"90deg" , fontWeight:"bold", fontSize:"20px"}}/>
                        </div>
                    </div>
                    <div className="text">
                        <h4>{stats.entertainmentCount !== "" ? stats.entertainmentCount :0}</h4>
                        <p>Number of
                        Enterainment</p>
                    </div>

                </div>
                <div className="cardstate">
                    <div className="imges">
                        <img src={Tipsicon} alt="" />
                        <div className="arrow">
                            <GoArrowRight  style={{color:"black" , rotate:"90deg" , fontWeight:"bold", fontSize:"20px"}}/>
                        </div>
                    </div>
                    <div className="text">
                        <h4>{stats.tipsCount !== "" ? stats.tipsCount :0} </h4>
                        <p >Number of
                       Mama Tips</p>
                    </div>

                </div>
                
            </div>
            <div className="userchart">
                <RandomLineChart/>
            </div>
        </div>
    );
}
