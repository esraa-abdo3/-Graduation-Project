import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "universal-cookie";
import axios from "axios";
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { GoArrowRight } from "react-icons/go";
import "./TipDetalis.css"
export default function TipDetalis() {
    const nav = useNavigate()
    const { tipid } = useParams();
    const [tipdetalis, settipddetalis] = useState([])
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [resettips, setresettips] = useState([])
    const [image, setimage] = useState("")
    const [Loading, setLoading] = useState(true)
    /// get the tips
    useEffect(() => {
        async function gettip() {
            setLoading(true)
            try {
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/${tipid}`, {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                settipddetalis([response.data.data])
                setimage(response.data.data.image)
                console.log(response.data.data)
                setLoading(false)
 
            } catch (error) {
                console.log("Error fetching babies:", error);
                setLoading(false)
        
            }
        }
        if (gettoken) {
            gettip();
        }
        
    }, [gettoken, tipid])
  
    useEffect(() => {
        async function gettips() {
           
            try {
                let target = "Mama";
                let month = "";
                if (tipdetalis.length > 0) {
                    target = tipdetalis[0].target;
                    if (target === "Baby") {
                        month = tipdetalis[0].month;
                    }
                }
                const query = target === "Baby" ? `target=Baby&month=${month}&limit=5` : `target=Mama&limit=5`;
                const response = await axios.get(`https://carenest-serverside.vercel.app/tips/?${query}`, {
                    headers: { "Authorization": `${gettoken}` }
                });
                
                setresettips(response.data.data.filter(item => item._id !== tipid));
               
            } catch (error) {
                console.error("Error fetching reset tips:", error);
               
            }
        }
        if (gettoken && tipdetalis.length > 0) {
            gettips();
        }
    }, [gettoken, tipid, tipdetalis]);
   
    
    // tip article
    const tipcard = tipdetalis.map((tip, index) => {
        const tiplist = tip.tip.map((item, index) => {
            return (
                <li key={index}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                </li>
            )
        })
  
        return (
            <>
                <div className="tip-detalis" key={index}>
                          <div className="tipheader">
                          <p>{tip.header} ❤️</p>
                      

                    </div>
                                            <div className="img-back" style={{ backgroundImage: `url(${image})` }}>
                            
                            </div>
              
             
               
                    <div className="listtips">
                        <ul>
                            {tiplist}
                        </ul>
                    </div>
                    <div className="tipaddvice">
                        <p>{tip.advice}  ❤️</p>
                    </div>

                </div>
              
            </>
        )
    })
    // tip reset cards
    const resetstips = resettips.map((tip, index) => {
        return (
            <>
                <SwiperSlide key={index} >
                    <div className={`card-tip   cardmam${index}`} key={index} style={{ backgroundImage: `url(${tip.image})` }}
                        onClick={() => nav(`/MamyTips/${tip._id}`)}
                    >
                        <div className="text">
                            <h3>{tip.category}</h3>
                            <div className="icon">
                                <GoArrowRight className="right-arrow" />
                            </div>
                        </div>
                    </div>
            
                </SwiperSlide>
          
         
            </>
          
        )
        
    })
    return (
        <>
             <Mainnavbar />
            {!Loading ? (
  <>
    <div className="tipdetalis">
                       
       
    

                        <div className="cont">
             
                     
                          
        {tipcard}
        <div className="resetcards">
          <h4>Other Useful Tips</h4>
          <Swiper
  modules={[Pagination]}
  spaceBetween={10}
  pagination={{ clickable: true }}
  breakpoints={{
    0: { slidesPerView: 1 }, 
    480: { slidesPerView: 1 }, 
    768: { slidesPerView: 1 }, 
    1024: { slidesPerView: 2 }, 
    1264: { slidesPerView: 3 }, 
  }}
>
  {resetstips}
</Swiper>

        </div>
      </div>
    </div>
  </>
            ) :
                       <div className="tip-detalis tiploader" >
                          <div className="tipheader tiploaderheader">
                          <p></p>
                      

                    </div>
                                            <div className="img-back tiploaderimage">
                            
                            </div>
              
             
               
                    <div className="listtips listtipsloader">
                        <ul>
                            <p></p>
                            <p></p>
                            <p></p>
                        </ul>
                    </div>
                

                </div>
                    
 }

        </>
          
      
    )
}