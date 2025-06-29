import { useEffect, useState, useRef } from "react";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import Cookies from "universal-cookie";
import axios from "axios";
import "./Crylist.css";
import { CiSearch } from "react-icons/ci";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import hungry from "../../../assets/Frame 101 (1).webp";
import sleeping from "../../../assets/Frame 102.webp";
import tired from "../../../assets/fram4.webp";
import gas from "../../../assets/Frame 101 3.webp";
import Burping from "../../../assets/fram5.webp";
import Chartcry from "./ChartCry/Chartcry";

export default function CryList() {
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  const [AllCries, setAllCries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [durations, setDurations] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [search, setSearch] = useState("");
  const[errorfetch,seterrorfetch]=useState("")

  const audioRefs = useRef({});

  const handleLoadedMetadata = (index, cryId) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const duration = audio.duration;
      setDurations((prev) => ({
        ...prev,
        [cryId]: duration,
      }));
    }
  };


  const getCryImage = (cryClass) => {
    switch (cryClass.toLowerCase()) {
      case "hungry": return hungry;
      case "sleepiness": return sleeping;
      case "tired": return tired;
      case "gas and colic": return gas;
      case "burping": return Burping;
      default: return "";
    }
  };

  useEffect(() => {
    async function getbabies() {
      try {
        const response = await axios.get(
          `https://carenest-serverside.vercel.app/cry/allBabies`,
          { headers: { Authorization: `${gettoken}` } }
          );
          console.log(response.data.data)
        setAllCries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching babies:", error);
       seterrorfetch("Something went wrong, please try again.");

        setLoading(false);
      }
    }
    if (gettoken) {
      getbabies();
    }
  }, [gettoken]);

  const filterCriesByDate = (cries) => {
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    return cries.filter((cry) => {
      const createdDate = new Date(cry.createdAt);
      const dayOfWeek = today.getDay();
      switch (selectedFilter) {
        case "Today":
          return createdDate.toDateString() === today.toDateString();
        case "Yesterday":
          const yesterday = new Date(today.getTime() - oneDay);
          return createdDate.toDateString() === yesterday.toDateString();
        case "This week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - dayOfWeek);
          return createdDate >= startOfWeek;
        case "Last week":
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - dayOfWeek - 7);
          const lastWeekEnd = new Date(today);
          lastWeekEnd.setDate(today.getDate() - dayOfWeek - 1);
          return createdDate >= lastWeekStart && createdDate <= lastWeekEnd;
        default:
          return true;
      }
    });
  };

  const sortCries = (cries) => {
    if (sortBy === "Shortest") {
      return cries.filter((cry) => parseFloat(durations[cry._id]) < 7);
    }
    if (sortBy === "Longest") {
      return cries.filter((cry) => parseFloat(durations[cry._id]) >= 7);
    }
    if (sortBy === "Latest") {
      return [...cries]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
    }
    return cries;
  };


  const filtered = filterCriesByDate(AllCries);
  const finalCries = sortCries(filtered);

  
  const searchedCries = search.trim()
    ? finalCries.filter((cry) => cry.class.toLowerCase().includes(search.trim().toLowerCase()))
    : finalCries;

  const cardscry = searchedCries.map((cry, index) => {
    const time = new Date(cry.createdAt).toLocaleTimeString([], {
      hour: "2-digit", minute: "2-digit"
    });
    return (
      <div key={index} className="crycard">
        <div className="cryandimg">
          <img src={getCryImage(cry.class)} alt={cry.class} className="cry-icon" />
          <div className="crydetalis">
            <p>Crying for {durations[cry._id] ? durations[cry._id].toFixed(1) : "..."} sec</p>
            <span>{time}</span>
          </div>
        </div>
        <div className="cryresults">
          <span>{cry.class}</span>
          <AudioPlayer
            src={cry.audio}
            showJumpControls={false}
            showDownloadProgress={false}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            layout="stacked"
           
            onLoadedMetadata={() => handleLoadedMetadata(index, cry._id)}
          />
          <audio
            src={cry.audio}
            ref={(el) => (audioRefs.current[index] = el)}
            onLoadedMetadata={() => handleLoadedMetadata(index, cry._id)}
            style={{ display: "none" }}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <Mainnavbar />
      <div className="CryList">
        <h2>Cry History</h2>
        <div className="cry-history">
          <div className="sideone">
            <div className="search">
              <input type="text" placeholder="search by class..." value={search} onChange={e => setSearch(e.target.value)} />
              <span><CiSearch /></span>
                      </div>
                 
                      <div className="headersort"> 
                          <div className="order">
                                    <div className="FilterTime">
                  <h4>Filter by</h4>
                  <div className="FilterTimeOptions">
                    {["All", "Today", "Yesterday", "This week", "Last week"].map((filter) => (
                      <p
                        key={filter}
                        className={selectedFilter === filter ? "active-filter" : ""}
                        onClick={() => setSelectedFilter(filter)}
                      >{filter}</p>
                    ))}
                  </div>
                </div>
                <div className="Sortby">
                  <h4>Sort by</h4>
                  <div className="SortOptions">
                    {["None", "Shortest", "Longest", "Latest"].map((sort) => (
                      <p
                        key={sort}
                        className={sortBy === sort ? "active-filter" : ""}
                        onClick={() => setSortBy(sort)}
                      >{sort}</p>
                    ))}
                  </div>
                </div> 
                          </div>
                               <div className="sidechart">
              <Chartcry cries={AllCries} loading={loading} />
            </div>

            </div>
       
          </div>
          {loading ? (
            <>
                  <div className="cryloader">
              <div className="sideoneloader">
                <div className="img"></div>
                <div >
                  <p className="timeloader"></p>
                  <p className="timeloader"></p>
                  </div>

              </div>
              <div className="othersideloader">
                </div>
              </div>
                 <div className="cryloader">
              <div className="sideoneloader">
                <div className="img"></div>
                <div >
                  <p className="timeloader"></p>
                  <p className="timeloader"></p>
                  </div>

              </div>
              <div className="othersideloader">
                </div>
              </div>
                 <div className="cryloader">
              <div className="sideoneloader">
                <div className="img"></div>
                <div >
                  <p className="timeloader"></p>
                  <p className="timeloader"></p>
                  </div>

              </div>
              <div className="othersideloader">
                </div>
              </div>
           
            </>
         
          ) : AllCries.length === 0 ? (
            <p className="nodata">No cries recorded for this baby.</p>
          ) : searchedCries.length === 0 ? (
            <p className="nodata">There are no results for this search.</p>
              ) : errorfetch.length > 0 ? (
                  <p className="error" style={{color:"red" , textAlign:"center"}}> { errorfetch}</p>
          ):cardscry}
        </div>
      </div>
    </>
  );
}
