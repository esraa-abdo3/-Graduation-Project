import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import MarqueeBanner from "../../../Componets/MarqueeBanner";
import Cringhome from "./Crying";
import Features from "./Features";
import Maybabies from "./Maybabies";
import Welcomepart from "./Welcomepart";
import { ChatBotButton } from "../Mamyscommunity/Chatbox/Chatbox";
import Footer from "../../../Componets/Footer/Footer"


export default function Mainhome() {
    return (
        <>
            <div style={{position:"relative" , paddingBottom:"30px"}}>
                <Mainnavbar />
                <MarqueeBanner language="en" />
                <Welcomepart />
                <Features />
                <div className="babyies-crying">
                    <Maybabies />
                    <Cringhome/>
                </div>
            </div>
            <ChatBotButton />
            <Footer/>
        </>
    )
}