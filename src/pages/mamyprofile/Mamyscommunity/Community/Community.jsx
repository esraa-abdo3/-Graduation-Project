import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
import ChatBox from "../Chatbox/Chatbox";
import Members from "../Communitymember/Members";
import "./Community.css"

export default function Community() {
    return (
        <div className="Community">
            <Mainnavbar />
            <div className="CommunityPage">
          
                <div className="memberspart">
                    <Members/>
                </div>
                <div className="chatpart">
            <ChatBox/>
                </div>
                </div>
        </div>
    )
}