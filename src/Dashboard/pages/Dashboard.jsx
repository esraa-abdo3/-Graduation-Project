import { Outlet } from "react-router-dom"
import Sidebar from "../ComonetsDashboard/SideBar/Sidebar"
import "./Dashboard.css"

export default function Dashboard() {

    return (
        <div className="Dashboard">
            <Sidebar/>
            <Outlet/>

        </div>
    )
}