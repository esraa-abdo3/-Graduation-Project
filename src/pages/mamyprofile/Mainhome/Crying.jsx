// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import hungry from "../../../assets/Frame 101 (1).webp";
import sleeping from "../../../assets/Frame 102.webp";
import tired from "../../../assets/fram4.webp";
import gas from "../../../assets/Frame 101 3.webp";
import Burping from "../../../assets/fram5.webp";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import sleepbaby from "../../../assets/sleepimg.jpeg"
import { useNavigate } from "react-router-dom";


export default function Cryinghome() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
   const [lastCry, setLastCry] =  useState(null);
   const [timeAgo, setTimeAgo] = useState("");
   const [loading, setLoading] = useState(false);
  const [errorfetch, seterrorfetch] = useState(null);
  const nav = useNavigate();

    useEffect(() => {
      async function getLastCry() {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://carenest-serverside.vercel.app/cry/allBabies`,
          {
              headers: {
                  Authorization: `${gettoken}`
              }
          }
        );
   

      const cries = response.data.data;

      if (cries.length > 0) {
        const sortedCries = cries.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const lastCry = sortedCries[0];
        setLastCry(lastCry);

        
        const diff = getTimeAgo(lastCry.createdAt);
        setTimeAgo(diff);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching babies:", error);
      seterrorfetch("Something went wrong, please try again.");
      setLoading(false);
    }
  }

  if (gettoken) {
    getLastCry();
  }
    }, [gettoken]);
    function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now - past;

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInMinutes > 0) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  return "just now";
}
  const getCryImage = (cryClass) => {
    switch (cryClass.toLowerCase()) {
      case "hungry": return hungry;
      case "tired": return sleeping;
      case "discomfort": return tired;
      case "belly_pain": return gas;
      case "burping": return Burping;
      default: return "";
    }
    };


    return (
        <>
            <div className="soundcry">

           
             
{loading ? (
              <div className="loader-cryinghome">
                <div style={{ display: "flex"  , margin:"10px 0" , gap:'10px' , justifyContent:"space-between"}}>
                  <p className="historyp"></p>
                  <p className="historyp"></p>
                </div>
                <div className="resulitloadercryhome">
                </div>
                <div className="footerloadercryhome">
                  </div>
                </div>
          ) : (
               <div className="lastrecord">
  <div className="lastcry">
    <div className="lastcry-header">
      <h2>Last cry</h2>
      <div className="rotate-symbolsdiv" onClick={()=> nav("/CryList")}>
        <p >Cry history</p>
        <div className="rotate-symbols">
          <span>&lt;</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>

{errorfetch ? (
  <p className="error-cry">{errorfetch}</p>
) : lastCry && lastCry.class ? (
  <div className="resultlastcry">
    <img
      src={getCryImage(lastCry.class)}
      alt={lastCry.class}
      className="cry-icon"
    />
    <p>{lastCry.class}</p>
    <div className="lastrecorded">
      <span>{timeAgo}</span>
      <AudioPlayer
        src={lastCry.audio}
        showJumpControls={false}
        showDownloadProgress={false}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        layout="stacked"
      />
    </div>
  </div>
) : (
  <p className="no-cry">No cry records found.</p>
)}


    <div className="lastrecordfooter">
      <p>Download the app now on Android & iPhone and enjoy the full experience!</p>
    </div>
  </div>
                </div>
)}


          
            <div className="sleepsounds">
                <img src={sleepbaby} alt="" />
                <div className="text">
                    <h2>CareNest Sleep Sound</h2>
                    <p>Do your baby have troubles with sleeping? Try our sleep sound to help with it</p>
                    <span>Sound settings</span>
                </div>

                </div>
       </div>
        </>

    
    )
}