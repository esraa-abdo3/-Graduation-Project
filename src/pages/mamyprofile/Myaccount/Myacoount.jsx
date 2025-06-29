

import {  useState } from "react"
import "./Myaccount.css"
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import Myprofile from "./MyProfile/MyProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import NotificationSettings from "./NotificationSettings/NotificationSettings";

export default function Myaccount() {
 const[option, setoption]=useState("Account")

    return (
        <>
            <Mainnavbar />
            <div className="account-settings">

         
                <div className="buttons">
                  <button className={option === "Account" ? "active" : ""} onClick={() => setoption("Account")}>
  Account
</button>

                    <button className={option === "Notification" ? "active" : ""} onClick={() => setoption("Notification")}>Notifications</button>
                    <button className={option === "ChangePassword" ? "active" : ""} onClick={() => setoption("ChangePassword")}>Security</button>

                </div>
                {option === "Account" && (
                    <Myprofile></Myprofile>
                )}
                {
                    option === "ChangePassword" && (
                     <ChangePassword> </ChangePassword>
                    )
                }
                {
                    option === "Notification" && (
                        <NotificationSettings/>
                    )
                }
                   </div>
      
           
        </>
    );
}

