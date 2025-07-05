import { Outlet } from "react-router-dom";
import "./Signup.css"
import Footer from "../../Componets/Footer/Footer"
import Mainnavbar from "../../Componets/mainhomeprofile/Mainnavbar"
import Navbar from "../../Componets/Navbar/Navbar"
import Cookies from "universal-cookie";
export default function Auth() {
    const cookie = new Cookies();
          const gettoken = cookie.get("Bearer");
    return (
        <>
               {gettoken ?   <Mainnavbar /> :<Navbar />}
     
        <div className="container-form" >
            <div className="Signup">
            <Outlet/>
            <div className="Img-Auth">
                   
                   </div>
             </div>
            </div>
               <Footer/>
               </>


    )
}