import "./Sidebar.css"
import { NavLink } from "react-router-dom";
import newlogo from "../../../assets/newlogo.png"
import cryicon from "../../../assets/healthicons_loudly-crying-outline.svg"
import { FaRegUser } from "react-icons/fa";
import babies from "../../../assets/emojione-monotone_baby.svg"
import doctoricon from "../../../assets/doctorsicon.svg"
import Adminsicon from "../../../assets/Admin.svg"
import Entertaimenticon from "../../../assets/streamline_dices-entertainment-gaming-dices.svg"
import Tipsicon from "../../../assets/hugeicons_tips.svg"
import reprticon from "../../../assets/report.svg"
import noticon from "../../../assets/not.svg"
import dashicon from "../../../assets/dashicon.svg"
import logouticon from "../../../assets/logouticon.svg"
import Admin from "../../../assets/Adminn.svg"
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import voicesIcon from '../../../assets/voices.png'
import storyIcon from '../../../assets/StoryEnt.png'

export default function Sidebar() {
    const location = useLocation();
    const size = useContext(WindowSize);
    const windowsize = size.windowsize;
    const [isOpen, setIsOpen] = useState(true);
    const [showEntert, setShowEntert] = useState(false);

    const getLinkClass = ({ isActive }) => isActive ? "link active" : "link";

    useEffect(() => {
        if (windowsize < 768) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [windowsize]);

    useEffect(() => {
        setShowEntert(false);
    }, [location.pathname]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {windowsize < 768 && (
                <div className="bar-header">
                    {isOpen ? (
                        <IoMdClose className="bar" onClick={toggleSidebar} />
                    ) : (
                        <FaBars className="bar" onClick={toggleSidebar} />
                    )}
                </div>
            )}
        
            <div className={`sidebar-Dashboard ${isOpen ? 'open' : ''}`}>
                <div className="logo-dash">
                    <img src={newlogo} alt="" className="dashlogo" />
                </div>
                
                <div className="flex-divs">
                    <div className="featurslinks">
                        <NavLink to="/dashboard/mainpage" className={getLinkClass}>
                            <div className="dashboard-featuurs">
                                <img src={dashicon} alt="icon" className="icon" />
                                <h3>Dashboard</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/crying-list" className={getLinkClass}>
                            <div className="crying">
                                <img src={cryicon} alt="icon" className="icon" />
                                <h3>Crying list</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/users" className={getLinkClass}>
                            <div className="users">
                                <FaRegUser className="icon" />
                                <h3>Users</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/dashboard/Babies" className={getLinkClass}>
                            <div className="Babys">
                                <img src={babies} alt="" className="icon" />
                                <h3>Babys</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/dashboard/AllDoctors" className={getLinkClass}>
                            <div className="Docs">
                                <img src={doctoricon} alt="" className="icon" />
                                <h3>Doctors</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/admins" className={getLinkClass}>
                            <div className="Admins">
                                <img src={Adminsicon} alt="" className="icon" />
                                <h3>Admins</h3>
                            </div>
                        </NavLink>

                        <div className="entertainment" onClick={() => setShowEntert(prev => !prev)}>
                            <img src={Entertaimenticon} alt="" className="icon" />
                            <h3>Entertainment</h3>
                        </div>
                        <div className="entertainment-wrapper">
                            {showEntert && (
                                <div className="entertainment-sublist">
                                    <NavLink to="/entertainment/stories" className={getLinkClass}>
                                        <div className='boxStory'>
                                            <img src={storyIcon} alt="icon" />
                                            <p>Short Stories</p>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/Dashboard/Entertainment/Videos" className={getLinkClass}>
                                        <div className='boxStory'>
                                            <div>
                                                <i className="fa-solid fa-play"></i>
                                            </div>
                                            <p>Fun Videos</p>
                                        </div>
                                    </NavLink>
                                    <NavLink to="/Dashboard/Entertainment/Voices" className={getLinkClass}>
                                        <div className='boxStory'>
                                            <img src={voicesIcon} alt="icon" />
                                            <p>Sweet sleep</p>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <NavLink to="/dashboard/CarenestTips" className={getLinkClass}>
                            <div className="Mama-Tips">
                                <img src={Tipsicon} alt="" className="icon" />
                                <h3>Mama Tips</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/notifications" className={getLinkClass}>
                            <div className="Notifications">
                                <img src={noticon} alt="" className="icon" />
                                <h3>Notifications</h3>
                            </div>
                        </NavLink>

                        <NavLink to="/reports" className={getLinkClass}>
                            <div className="Reports">
                                <img src={reprticon} alt="" className="icon" />
                                <h3>Reports</h3>
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <div className="logout-dashboard">
                            <img src={logouticon} alt="" />
                            <h3>
                                Logout
                            </h3>
                        </div>
                        <div className="Admin-welcome">
                            <img src={Admin} alt="adminicon" />
                            <div className="text">
                                <p>  Welcome back 👋</p>
                                <h3>
                                    Esraa Abdelnasser
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
