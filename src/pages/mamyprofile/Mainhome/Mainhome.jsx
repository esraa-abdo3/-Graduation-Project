import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import Mybabies from "../my babies/Mybabies";
import Cringhome from "./Crying";
import Features from "./Features";
import Maybabies from "./Maybabies";
import Welcomepart from "./Welcomepart";


export default function Mainhome() {
    return (
        <div>


            <Mainnavbar />
            <Welcomepart />
            <Features />
            <div className="babyies-crying">
                <Maybabies />
                <Cringhome/>
            </div>
           
        </div>
    )
}