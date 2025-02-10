import{ useState, useEffect, useContext, useRef } from "react";  
import "./GrowthBaby.css";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import Cookies from "universal-cookie";
import axios from "axios";
import { BabyContext } from "../../../context/BabyContext";
import { GiWeightScale } from "react-icons/gi";
import LineChartComponent from "../../charts/BabyGrowthchart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CiLineHeight } from "react-icons/ci";
import { LiaWeightSolid } from "react-icons/lia";
import loadimg from "../../../assets/baby-load-removebg-preview.png"
export default function GrowthBaby() {   
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const idbaby = cookie.get("activebaby");
    const { activeBabyId, } = useContext(BabyContext);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [status, setStatus] = useState("");
    const [empty, setEmpty] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [growthMessage, setGrowthMessage] = useState("");
    const [lastRecord, setLastRecord] = useState(""); 
    const [dataNum, setDataNum] = useState("");
    const [latestHeight, setLatestHeight] = useState(null);
    const [latestWeight, setLatestWeight] = useState(null);
    const [HeightBefor, setHeightBefor] = useState(null);
    const [WeightBefor, setweightBefor] = useState(null);
    const [hasData, setHasData] = useState(false); 
    const [statusH, setStatusH] = useState('');
    const [statusW, setStatusW] = useState('');
    const [weightactive, setweightactive] = useState(false);
    const [heightactive, setheightactive] = useState(false);
    const [load, setload] = useState(false)
    const [weightadvice, setweightadvice] = useState("");
    const [heightadvice, setheightadvice] = useState("");
    const [styleheight, setstyleheight] = useState(false);
    const [styleweight, setstyleweight] = useState(false);


    const fetchLatestGrowthData = async () => {
        
        setload(true)
        try {
            const res = await axios.get(
                `https://carenest-serverside.vercel.app/dataGrowth/LatestGrowthData/${idbaby}`,
                {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                }
            );
             setload(false)
            console.log(res);

            if (res.data.success) {
                const { latestHeight, latestWeight, heightStatus, weightStatus } = res.data.data;
                setLatestHeight(latestHeight);
                setLatestWeight(latestWeight);
                setStatusH(heightStatus);
                setStatusW(weightStatus);
                setHasData(latestHeight !== null || latestWeight !== null); // التأكد من وجود بيانات

                setLastRecord(` ${latestHeight}Cm,  ${latestWeight}Kg`);
                setDataNum(`${latestHeight}Cm / ${latestWeight}Kg`);
                setDisplayText("Your baby’s current growth: ");
                setGrowthMessage(
                    heightStatus === 'Average' && weightStatus === 'Normal' 
                    ? "Your baby is growing well" 
                    : "Your baby’s growth is slowing!"
                );
            } else {
                setHasData(false);
              
                setStatus("No growth data available.");
            }
        } catch (err) {
            setload(false)
            setStatus("Failed to fetch latest growth data.");
        }
    };
    useEffect(() => {
        fetchLatestGrowthData();
    }, [activeBabyId]);
    
    const handleSubmit = async () => {
        if (!height || !weight) {
            setEmpty("Please enter both height and weight.");
            return;
        } else {
            setEmpty("");
        }

        setLoading(true);
        try {
            await axios.put(
                `https://carenest-serverside.vercel.app/dataGrowth/${idbaby}`,
                {
                    heightEntry: Number(height),
                    weightEntry: Number(weight),
                },
                {
                    headers: {
                        Authorization: `${gettoken}`,
                    },
                }
            );

            fetchLatestGrowthData();
            
        } catch (err) {
            setStatus("Failed to update growth data.");
        } finally {
            setLoading(false);
        }
    };

    const handleWeightClick = async () => {
        setweightactive(true)
        setheightactive(false)
        setLastRecord(` ${latestWeight}Kg`);
        setDataNum(`${latestWeight}Kg`);
        setDisplayText("Your baby’s current weight: ");
        setGrowthMessage(statusW === 'Normal' ? "Your baby is growing well" : statusW === "Underweigh" ? "Your baby is underweight. Ensure proper nutrition" : statusW === "Overweight" ? "Your baby is overweight. Focus on a balanced diet." : "No recent data available");
        setweightadvice(statusW === 'Normal' ? "Great job, mama! Keep providing a balanced diet to support steady growth. ✅" : statusW === "Underweigh" ? "A little extra nutrition will help! Add more proteins and healthy fats. ❤️ " : statusW === "Overweight" ? "Active playtime and a balanced diet will keep your baby healthy. 🍼✨" : "")
        setheightadvice("")
        setstyleheight(false)
        setstyleweight(true)
    };

    const handleHeightClick = async () => {
        setweightactive(false)
        setheightactive(true)
        setstyleheight(true)
        setstyleweight(false)
        
        setLastRecord(` ${latestHeight}Cm`);
        setDataNum(`${latestHeight}Cm`);
        setDisplayText("Your baby’s current height: ");
        setGrowthMessage(
            statusH === 'Average'
                ? "Your baby is growing well"
                : statusH === "Short"
                    ? "Your baby is shorter than average. Monitor growth"
                    : statusH === "Tall"
                        ? "Your baby is taller than average. Keep tracking"
                        : "No recent data available"
        );
        setheightadvice(statusH === 'Average' ? "Your baby’s height is on track! Keep up the good care. ✅" : statusH === "Short" ? "Every child grows at their own pace. Keep monitoring with love. ❤️" : statusW === "Tall" ? "Growing strong! Keep up with nutritious meals and happy moments. 🍼✨" : "")
        setweightadvice("")

        
        
    };
    const getColor = () => {
      
        if (styleheight) {
          if (statusH === "Tall") return "orange";
          else if ( statusH=== "Short") return "red";
          else if ( statusH === "Average") return "green";
          else return ""; // افتراضي
        }
    
        else if (styleweight) {
          if (statusW === "Overweight") return "orange";
          else if (statusW  === "Underweight") return "red";
          else if (statusW === "Normal") return "green";
          else return "";
        }
        // إذا كان كلا المتغيرين styleheight و styleweight غير مفعّلين (false)
        else {
          if (
            (statusH && statusH === "Tall") ||
            (statusW && statusW === "Overweight")
          ) {
            return "orange";
          } else if (
            (statusH && statusH=== "Short") ||
            (statusW && statusW === "Underweight")
          ) {
            return "red";
          } else if (
            (statusW && statusW === "Normal") ||
            (statusH && statusH === "Average")
          ) {
            return "green";
          } else {
            return ""; // افتراضي
          }
        }
      };
      
    console.log(statusW);
    console.log(statusH);
    

    return (
        <div style={{position:"relative"}}>
            <Mainnavbar />
            <div className="growthpage">
            <div  className="swiper-container"style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}>
                    <Swiper
                   style={{ width: "80%" }} 
                   spaceBetween={50}
                   slidesPerView={1}
                   allowTouchMove={false}
                   pagination={{ clickable: true }} 
                   modules={[Pagination]}
                >
     
      <SwiperSlide >
        <div className="text">
          <h2>You're doing an amazing job! Every small step counts in your baby's growth journey. Keep going!</h2>
          <p 
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }} 
            onClick={() => document.querySelector(".swiper").swiper.slideNext()}
          >
            Record Growth Data for This Month
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide className="slide2">
      <div className="boxAddDataGrowth">
       <h2> Record Growth Data for This Month</h2>
       <div style={{display:"flex" , gap:"10px" , justifyContent:"center"}}>
       <div style={{ position: "relative", display: "inline-block"}}>
        <LiaWeightSolid
       style={{ 
        position: "absolute", 
        left: "12px", 
        top: "50%", 
        transform: "translateY(-50%)", 
        color: "#418FBF", 
        fontSize: "20px" 
      }} 
                                        />
      <input
      type="number"
      placeholder="Enter weight"
      value={weight || ""}
      onChange={(e) => setWeight(e.target.value)}
  />
     </div>
        <div style={{ position: "relative", display: "inline-block"}}>
        <CiLineHeight 
       style={{ 
        position: "absolute", 
        left: "12px",  
        top: "50%", 
        transform: "translateY(-50%)", 
        color: "#418FBF", 
        fontSize: "20px" 
      }} 
 />
                <input
                type="number"
                placeholder="Enter Height"
                value={height || ""}
                onChange={(e) => setHeight(e.target.value)}/>
</div>
                                    </div>
                        {empty && <p className="error">{empty}</p>}
                        <button onClick={handleSubmit}>
                            {loading ? <div className="spinner-small" style={{ fontSize: '12px' }}></div> : "Save"}
                        </button>
                    </div>
      </SwiperSlide>
    </Swiper>
                    
            </div>
  
                {load ? <img className="load" src={loadimg}>
                </img> :
                    <div className="resultGrowth">
                    <div className="measurments">
                        <div className="measurments-weight-height">
                            <div style={{ textAlign: "start"}}>
                            <p>
                                
                     
                                {displayText}{" "}
                                <span style={{ 
                  color: getColor()  }}>
                          {dataNum}
                              </span>

                                </p>
                                <p
                                   style={{ 
                                    color: getColor() ,
                                    
                                    fontSize: "28px",  
                                    maxWidth: "400px"
                                }}
                                
                            
                            // className={growthMessage === "Your baby is growing well" ? "green-box" : "red-box"}
                            
                  >
                      {growthMessage}
                          </p>
</div>
                           
                        <div>
                                <div style={{ display: "flex", marginTop:"10px"} }>
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center", color:"black"  , padding:' 0 10px'}}>
        <span style={{paddingRight:"5px" , color:"#777" , fontWeight:"500"}}> Last recorded measurements </span> 
        <GiWeightScale style={{ fontSize: "20px", color:"rgba(65, 143, 191, 1)"  }} /> 
                            </div>
                            <p style={{margin:"auto"}}>:
                            {lastRecord}
                            </p>
  
                                </div>
                                </div>

        
                        </div>
                                        
                    <p>
                      
                      <span style={{ color: growthMessage === "Your baby is growing well" ? "#4CAF50" : "#ff4d4d" }}>
                        
                      </span>
                      </p>
           
                  
                      
                        </div>
                </div>}
            
        
            </div>
            {!load && <>
                <div className="charts">
                
                </div>
                <LineChartComponent weightactive={weightactive} heightactive={heightactive} />
                {weightadvice !== "" &&
                       <div     className={
                        statusW === "Normal"
                          ? "green"       // إذا كانت الحالة Normal يكون الكلاس green
                          : statusW === "Overweight"
                          ? "orange"      // إذا كانت الحالة Over يكون الكلاس orange
                          : statusW === "Underweight"
                          ? "red"         // إذا كانت الحالة Under يكون الكلاس red
                          : ""
                      }>
                       <p> {weightadvice}</p>
                   
   
                   </div>
                }
             {heightadvice !=="" && <div className={
                        statusH === "Average" 
                          ? "green"       
                          : statusH === "Tall"
                          ? "orange"      
                          : statusH === "Short"
                          ? "red"         
                          : ""
                      }>
                    <p> {heightadvice}</p>
                

                </div>}
                
                
                  <div className="buttons-charts">
                  <button className="gWeight" onClick={handleWeightClick}>
                              Weight per growth
                          </button>
                          <button className="gHeight" onClick={handleHeightClick}>
                              Height for age
                          </button>
      
                  </div></>}
       
        </div>
    );
}