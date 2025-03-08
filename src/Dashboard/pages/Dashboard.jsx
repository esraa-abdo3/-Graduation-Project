import { Outlet } from "react-router-dom"
import Sidebar from "../ComonetsDashboard/SideBar/Sidebar"
import "./Dashboard.css"
import Mainnavbar from "../../Componets/mainhomeprofile/Mainnavbar"

export default function Dashboard() {

    return (
        <>
            <Mainnavbar />
            <div className="Dashboard">

<Sidebar />
<div className="outlit">
   
<Outlet />
</div>


</div>
        </>
      
    )
}