import "./Topbar.css"
import { FaBars } from "react-icons/fa";
import logo from "../../../assets/logonav.png"
export default function Topbar() {
    return (
        <div className="TopBar">

       
            <div className="logo">
                <img src={logo} alt="carenest logo" />
                <span> <FaBars /></span>
            </div>
            <div className="users">
                

            </div>
      
            </div>
    )
}