import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar";
import MessagesPage from "../chat/MessagesPage";
import "./Community.css"

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
                    <MessagesPage/>
           
                </div>
                </div>
        </div>
    )
}