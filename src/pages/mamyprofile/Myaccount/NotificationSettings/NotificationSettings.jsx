
import { useEffect, useState } from "react";
import "./NotificationSettings.css";

export default function NotificationSettings() {
  const [permission, setPermission] = useState("default");
  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const handleToggle = () => {
 
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((result) => {
        setPermission(result);

        if (result === "granted") {
          new Notification("🔔 Notifications Enabled!", {
            body: "You’ll now receive updates.",
            icon: "/icon.png", 
          });
        }
      });
    } else {
  
      alert("To disable notifications, please go to your browser settings.");
    }
  };

  const isEnabled = permission === "granted";

  return (
    <div className="notification-settings">
      <h2>App Notifications</h2>
      <p className="notif-msg">
        Never miss a message, click the link below to easily enable notifications from us
      </p>

      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
          />
          <span className="slider round"></span>
        </label>
        <span className="switch-label">{isEnabled ? "ON" : "OFF"}</span>
      </div>

      {permission === "denied" && (
        <p className="warning">
          ❌ Notifications are blocked. You can enable them manually in browser settings.
        </p>
      )}
    </div>
  );
}


