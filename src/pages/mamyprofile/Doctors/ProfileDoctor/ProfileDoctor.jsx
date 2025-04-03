import { useEffect, useState } from "react"
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar"
import "./ProfileDoctor.css"
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import imgtrue from "../../../../assets/ooui_success.png"
import { FiStar } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { TiStarHalfOutline } from "react-icons/ti";
export default function ProfileDoctor() {
    const [doctordetalis, setdoctordetalis] = useState([]);
    const [Loading, setLoading] = useState(false);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const { doctorid } = useParams();
    const [statusactive, setstatusactive] = useState('Info')
    const [weekDays, setWeekDays] = useState([]);
    const availableDays = doctordetalis.length > 0 ? doctordetalis[0].day.map(d => d.type.slice(0, 3)) : [];
    const [clickday, setckickday] = useState('');
    const [slotactive, setslotactive] = useState('');
    const [Form, setForm] = useState({
        // promocode:'',
        promocode:"",
        doctor: doctorid,
        day: "",
        startTime: "",
        date: "",
        
    });
    const [valid, setvalid] = useState("still");
    const [bookingAppointments, setBookingAppointments] = useState([]);
    const [isavailble, setisavialble] = useState();
    const [isPopup, setIsPopup] = useState(false);
    const [ratingNumber, setRatingNumber] = useState(1);
    const [ratebefor, setratebefore] = useState(false);
    const myId = cookie.get("id");
    console.log(ratebefor)
  
 
    useEffect(() => {
        async function checkid() {
            try {
              // استدعاء الـ endpoint الخاص بالـ reviews
              const res = await axios.get(`https://carenest-serverside.vercel.app/doctor/${doctorid}/reviews`, {
                headers: {
                  Authorization: `${gettoken}` 
                }
              });
              
           
              const reviews = res.data.data; 
              
      
              
             
              const exists = reviews.some(review => review.user && review.user._id === myId);
              
              setratebefore(exists)
            } catch (error) {
              console.error("Error checking id:", error);
              return false;
            }
        }
        checkid()
        
    },[myId,doctorid])
      




function handleratingclick(starIndex) {
  setRatingNumber(prev => {
 
    if (prev === starIndex) {
        return prev > 1 ? prev - 1 : 1;
    }
   
    return starIndex;
  });
}

    async function submitratinf() {
        if (ratingNumber < 1) {
            alert("Rating must be at least 1.");
            return; 
        }
        
        try {
            let res = await axios.post(`https://carenest-serverside.vercel.app/doctor/${doctorid}/reviews`,
                { ratings: ratingNumber }, {
                    headers: {
                        Authorization:`${gettoken}`
                    }
                }
            )
            console.log(res.data)
            setIsPopup(false)
            
        }
        catch (error) {
            console.log(error)
        }
        
    }
      
    

    useEffect(() => {
        if (doctordetalis.length > 0 && weekDays.length > 0) {
            const currentDayFull = new Date().toLocaleDateString("en-US", { weekday: "long" });
            
            // تعيين اليوم الافتراضي دائمًا إلى اليوم الحالي
            const defaultDay = currentDayFull;
            
            // إيجاد التاريخ الموافق لليوم الافتراضي ضمن الأسبوع
            const activeDateObj = weekDays.find(e => 
                e.toLocaleDateString("en-US", { weekday: "long" }) === defaultDay
            );
            
            const selectedDate = activeDateObj ? activeDateObj.toISOString().split("T")[0] : "";
            
            setckickday(defaultDay);
            setForm((prev) => ({
                ...prev,  
                day: defaultDay,
                date: selectedDate,
                startTime: null    
            }));
        }
    }, [doctordetalis, weekDays]);
    
    
     
      useEffect(() => {
          generateWeek();
        
      }, []);
  

    // first git the doctor data
    useEffect(() => {
        async function getdoctordetalis() {
            try {
                let res = await axios.get(`https://carenest-serverside.vercel.app/doctor/${doctorid}`, {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                });

                setdoctordetalis([res.data.data])
                console.log(res.data.data)
                
            }
            catch (error) {
                console.log(error)
                
            }
        }
        if (gettoken) {
            getdoctordetalis()
        }
        
    }, [gettoken, doctorid])

    // cards
    const imgprofilecards = doctordetalis.map((e, index) => {
        return (
          <div className="imgname" key={index}>
            <img src={e.image} alt="" />
            <div className="text">
              <div className="name">
                <h2>Dr.{e.user.firstName} <span></span>{e.user.lastName}</h2>
              </div>
              <div className="Specialty">
                <p>{e.Specialty}</p>
              </div>
              <div className="price">
                <p>$ {e.bookingPrice} for Session</p>
              </div>
              <div className="stars">
  {[...Array(5)].map((_, i) => {
    const fullStars = Math.floor(e.ratingsAverage); 
    const hasHalfStar = e.ratingsAverage - fullStars >= 0.5; 
    
    if (i < fullStars) {
     
      return <GoStarFill key={i} style={{ color: "#FFCE31" }} />;
    } else if (i === fullStars && hasHalfStar) {

      return <TiStarHalfOutline key={i} style={{ color: "#FFCE31" }} />;
    } else {
  
      return <FiStar key={i} style={{ color: "#FFCE31" }} />;
    }
  })}
                 <span style={{padding:"0 5px", fontWeight:"bold"}}>{e.ratingsAverage}</span>       
                      <span style={{color:"#777"}}> {`(${e.ratingsQuantity} Reviews)`}</span> 
</div>

            </div>
          </div>
        );
      });
      
    const detaliscard = doctordetalis.map((e, index) => {
        if (statusactive === "Info") {
            return (
                <div key={index}>
                    <p>{e.About}</p>
                </div>
            );
        }
        if (statusactive === "Masterof") {
            return (
                <div key={index}>
                    <p>{e.masterOf}</p>
                </div>
            );
        }
        if (statusactive === "contact") {
            return (
                <div key={index} style={{ display: "flex", gap: "5px" }}>
                    
                    <p> <span className="labels">Phones Number :</span></p>
                    {e.phones.map((ele) => {
                        return (
                            <>
                                <div className="phone">
                                    <p><FaPhoneAlt /></p>
                                    <p>{ ele}</p>
                                </div> 
                            </>
                        
                        )
                      
                  })}
                </div>
            );
        }
        if (statusactive === "Adrress") {
            return (
                <>
                    <div>
                        <p> <span className="labels">Address<FaLocationDot /> :</span>  {e.Location.address}</p>
                        <p> <span className="labels">Main place:</span> {e.Location.mainPlace}</p>
                    </div>
                    <div>
                       <p><span className="labels">Clinic View :</span></p> 
                        <div className="images">
                            {e.images.map((imgele, i) => (
                                <img key={i} src={imgele} alt="clinic-img" />
                            ))}
                        </div>
                    </div>
                </>
            );
        }
        
        return null; 
    });
    
    // geneate days
    const generateWeek = () => {
        const today = new Date(); 
        const currentDay = today.getDate();  
        const currentWeekDay = today.getDay();  
        const startOfWeek = new Date(today);
        startOfWeek.setDate(currentDay - currentWeekDay);
    
        const endOfWeek = new Date(today);
        endOfWeek.setDate(currentDay + (6 - currentWeekDay));
        const week = [];
        for (let date = new Date(startOfWeek); date < endOfWeek; date.setDate(date.getDate() + 1)) {
          week.push(new Date(date)); 
        }
    setWeekDays(week)
    
    };
    // to show slots and days
    function showWorkHours() {

        const availableSlots = doctordetalis
            .filter((doctor) => doctor.day.some((d) => d.type === clickday))
            .flatMap((doctor) =>
                doctor.day
                    .filter((d) => d.type === clickday)
                    .flatMap((d) =>
                        d.slots.flatMap(slot => generateHourlySlots(slot.startTime, slot.endTime))
                    )
            );
    
        return availableSlots;
    }
    
    function generateHourlySlots(startTime, endTime) {
        const slots = [];
        let currentHour = parseFloat(startTime.split(":")[0]);
        const endHour = parseFloat(endTime.split(":")[0]);
    
        while (currentHour < endHour) {
            const hourString = `${currentHour.toString().padStart(2, "0")}:00`;
            slots.push(hourString);
            currentHour++;
        }
    
        return slots;
    }
    function handlepromocodeapplay() {
        const isValid = doctordetalis.some((e) => e.promocode?.code === Form.promocode);
    
        if (isValid) {
            console.log(true);
            setvalid(true)
        } else {
            setvalid(false)
            console.log(false);
        }
    }
  
    // cards working hours
    const workHours = showWorkHours().map((e, index) => {
        const Bookingday = bookingAppointments.find((book) => book.day.type === Form.day && book.day.time.startTime === e);
        
        const isBooked = Bookingday && Bookingday.status === "Booking"; 
        const isActive = Form.startTime === e && !isBooked; 
    
        return (
            <div
                className={`working-hours ${isActive ? "active" : ""} ${isBooked ? "book" : ""}`}
                key={index}
                onClick={isBooked ? null : () => {
                    setForm((prev) => ({
                        ...prev,
                        startTime: e
                    }));
                    setslotactive(index);
                }}
                style={{ cursor: isBooked ? "not-allowed" : "pointer" }} 
            >
                {e}
            </div>
        );
    });
    
    
    // handlebook
    async function handlebook() {
        setLoading(true)
        try {
            let res = await axios.post('https://carenest-serverside.vercel.app/order', Form, {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
            console.log(res)
            setIsPopup(true)
            setLoading(false)
            
        }
        catch (err) {
            setLoading(false)
            console.log(console.log(err))
        }
         
    }
    useEffect(() => {
        async function Getboooking() {
            try {
                let res = await axios.get(`https://carenest-serverside.vercel.app/order/week/${doctorid}`, {
                    headers: {
                        Authorization:`${gettoken}`
                    }
                })
                setBookingAppointments(res.data.data)
              
            }
            catch (error) {
                console.log(error)
            }
        
        }
        Getboooking()
        
    }, [gettoken, doctorid])

console.log(ratingNumber)
    
    


    return (
        <div className="ProfileDoctor">
            <Mainnavbar />
            {(isPopup &&!ratebefor) && (
              <div className="review">
              <h2>Rate the Doctor!</h2>
              <p>Rate your doctor to help us improve your experience</p>
              <div className="stars">
  <span onClick={() => handleratingclick(1)}>
    {ratingNumber >= 1 ? (
      <GoStarFill style={{ color: "#FFCE31" }} />
    ) : (
      <FiStar style={{ color: "#FFCE31" }} />
    )}
  </span>
  <span onClick={() => handleratingclick(2)}>
    {ratingNumber >= 2 ? (
      <GoStarFill style={{ color: "#FFCE31" }} />
    ) : (
      <FiStar style={{ color: "#FFCE31" }} />
    )}
  </span>
  <span onClick={() => handleratingclick(3)}>
    {ratingNumber >= 3 ? (
      <GoStarFill style={{ color: "#FFCE31" }} />
    ) : (
      <FiStar style={{ color: "#FFCE31" }} />
    )}
  </span>
  <span onClick={() => handleratingclick(4)}>
    {ratingNumber >= 4 ? (
      <GoStarFill style={{ color: "#FFCE31" }} />
    ) : (
      <FiStar style={{ color: "#FFCE31" }} />
    )}
  </span>
  <span onClick={() => handleratingclick(5)}>
    {ratingNumber >= 5 ? (
      <GoStarFill style={{ color: "#FFCE31" }} />
    ) : (
      <FiStar style={{ color: "#FFCE31" }} />
    )}
  </span>
</div>

              <div className="actions">
                  {/* زر إرسال للتقييم */}
                        <button onClick={submitratinf} style={{ cursor: "pointer" } } className="submit">Submit Rating</button>
                  {/* زر لإغلاق النافذة */}
                  <p onClick={() => setIsPopup(false)} style={{ cursor: "pointer" , padding:"10px 0" }}>No Thanks</p>
              </div>
          </div>
          
                
)}
       
            <div className="profile">
                <div className="cont">
                    <div className="side">
                    <div>

                    {imgprofilecards}
                   
                       </div>         
                 
                    <div className="status">
                        <p onClick={()=>setstatusactive("Info")} className={statusactive==="Info"?"active":""}>About Doctor</p>
                        <p onClick={()=>setstatusactive("Masterof")}className={statusactive==="Masterof"?"active":""}> Qualifications </p>
                        <p onClick={()=>setstatusactive("Adrress")}className={statusactive==="Adrress"?"active":""}>Clinic Address</p>
                        <p onClick={()=>setstatusactive("contact")}className={statusactive==="contact"?"active":""}> Contact Information</p>
                        </div>

                        <div className="detalis-status">
                            {detaliscard}
</div>

                    </div>
                    <div className="otherside">
                    <div className="schedul">
    <h3>Find the perfect time to meet Dr. and book your appointment</h3>

    <div className="days-container">
        {weekDays.map((e, index) => {
            const dayShortName = e.toLocaleDateString("en-US", { weekday: "short" }); 
            const isAvailable = availableDays.includes(dayShortName); 
            const isActive = isAvailable && clickday === e.toLocaleDateString("en-US", { weekday: "long" });

            return (
                <div 
                    className={`day ${isAvailable ? "available" : "off"} ${isActive ? "active" : ""}`}
                    key={index}
                    onClick={() => {
                        if (!isAvailable) return; // منع النقر على الأيام الغير متاحة

                        const selectedDay = e.toLocaleDateString("en-US", { weekday: "long" });
                        const selectedDate = e.toISOString().split("T")[0]; 

                        setisavialble(isAvailable);
                        setckickday(selectedDay); 
                        setForm((prevForm) => ({
                            ...prevForm,
                            day: selectedDay,
                            date: selectedDate,
                            startTime: null 
                        }));
                        setslotactive(null); 
                    }}
                >
                    <p className="num-day">{e.getDate()}</p>
                    <p className="day-name">{dayShortName}</p> 
                    {!isAvailable && <p className="off-text">Off</p>}
                </div> 
            );
        })}
    </div>
                            
    <div className="times">
        {!isavailble ? (
            <p className="off-message">
                Sorry, the doctor is off today but is available on
                <p style={{ padding: "10px" }}>
                    {availableDays.join(" , ")}         
                </p>
            </p>
        ) : (
            workHours
        )}
    </div>
</div>

                        <div>
                        {valid === "sill" ? (
    <div className="promocode">
        <input 
            type="text" 
            name="promocode" 
            id="promocode" 
            placeholder="Promo code"   
            value={Form.promocode} 
            onChange={(e) => setForm((prev) => ({
                ...prev, 
                promocode: e.target.value
            }))}
        />
        <span onClick={handlepromocodeapplay}>Apply</span>
    </div>
) : valid === true ? (
                                    <div className="valid">
                                        
                                        <div className="true-content">
                                            <img src={imgtrue} alt="" style={{width:"20px"}} />

                                            <p style={{fontWeight:"bold"}}>{Form.promocode} applied
                                            <p style={{color:"#777", fontWeight:"500"}}>Discount Value: {doctordetalis[0]?.promocode?.value} </p>
            </p>
        </div>
        
        <div className="remove" onClick={() => setvalid(null)}>
            <TiDeleteOutline style={{fontSize:"20px", cursor:"pointer"}}/>
        </div>
    </div>
) : valid === false ? (
    <div className="notvalid">
        <div className="true-content">
            <span className="true">🚫</span>
            <p style={{fontWeight:"bold"}}>{Form.promocode} is an invalid promo code! </p>
        </div>
        <div className="remove" onClick={() => setvalid(null)}>
            <TiDeleteOutline  style={{fontSize:"20px", cursor:"pointer"}}/>
        </div>
    </div>
) : (

    <div className="promocode">
        <input 
            type="text" 
            name="promocode" 
            id="promocode" 
            placeholder="Promo code"   
            value={Form.promocode} 
            onChange={(e) => setForm((prev) => ({
                ...prev, 
                promocode: e.target.value
            }))}
        />
        <span onClick={handlepromocodeapplay} style={{cursor:"pointer"}}>Apply</span>
    </div>
)}

                          
                            <div className="Appointment">
                                <button className="Book" onClick={handlebook}> 
                                {Loading ? <div className="spinner-small"></div> : "Save"}
                            </button>
                            </div>
                            </div>
                        
                       


                    </div>
                    </div>

            </div>

        </div>
    )
}