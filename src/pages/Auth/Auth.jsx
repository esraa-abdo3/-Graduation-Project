import { Outlet } from "react-router-dom";
import "./Signup.css"

export default function Auth() {
    return (
        <div className="container-form"  style={{ paddingTop: window.location.pathname === '/Auth/Signup' ? '25px' : '55px' }}>
            <div className="Signup">
            <Outlet/>
            <div className="Img-Auth">
                   
                   </div>
             </div>
            </div>


    )
}