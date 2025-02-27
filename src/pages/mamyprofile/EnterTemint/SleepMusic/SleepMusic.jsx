import "./SleepMusic.css"
import  sleepybaby from"../../../../assets/modern-running-shoes-white-background_1078797-8372-removebg-preview.png"
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar"
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useEffect,useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
export default function SleepMusic() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [music, setmusic] = useState([]);
    const [whitenoise, setwhitenoise] = useState([])
    const [activebutton, setactivebuttton] = useState("relaxing-music");
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        customPaging: (i) => (
            <button className="slick-buttonn" style={{
                
                width: "30px",
                height: "30px",
                // borderRadius: "50%",
                border: "1px solid rgba(65 143 191)",
                backgroundColor: "white",
                color: "rgba(65 143 191)",
                fontSize: "14px",
                fontWeight: "bold",
                margin: "5px",
                cursor: "pointer",
                
            }}>
                {i + 1}
            </button>
        ),
        dotsClass: "slick-dots custom-dots"
    };
    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        customPaging: (i) => (
            <button className="slick-buttvnn" style={{
                
                width: "30px",
                height: "30px",
                // borderRadius: "50%",
                border: "1px solid rgba(65 143 191)",
                backgroundColor: "white",
                color: "rgba(65 143 191)",
                fontSize: "14px",
                fontWeight: "bold",
                margin: "5px",
                cursor: "pointer",
                
            }}>
                {i + 1}
            </button>
        ),
        dotsClass: "slick-dots custom-dots"
    };
    const[loading,setloading]=useState(false)
 


    // get music sounds
    useEffect(() => {
        async function getmusic() {
            setloading(true)
            try {
                const response = await axios.get('https://carenest-serverside.vercel.app/relaxSounds/?category=Music&limit=7', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setmusic(response.data.data)
               
            setloading(false)
 
            } catch (error) {
                console.log("Error fetching babies:", error);
                setloading(false)
        
            }
        }
        if (gettoken) {
            getmusic();
        }
        
    }, [gettoken , activebutton])
    // get white moise sounds
    useEffect(() => {
        async function getwhitenoise() {
            setloading(true)
            try {
                const response = await axios.get('https://carenest-serverside.vercel.app/relaxSounds/?category=White Noise&limit=10', {
                    headers: {
                        "Authorization": `${gettoken}`
                    }
                });
                setwhitenoise(response.data.data)
                setloading(false)
 
            } catch (error) {
                console.log("Error fetching babies:", error);
                setloading(false)
        
            }
        }
        if (gettoken) {
            getwhitenoise();
        }
        
    }, [gettoken , activebutton])

    // function active button
    function handleactivebuttom(buttonname) {
        setactivebuttton(buttonname)
   
    
    }
    // create fake snow
    function createSnowflakes() {
        const numFlakes = 50;
        const colors = ['#ffffff', '#d4f1f9', '#e8f8ff'];
  
        for (let i = 0; i < numFlakes; i++) {
          const flake = document.createElement('div');
          flake.classList.add('snowflake');
          flake.innerHTML = '❄';
          document.body.appendChild(flake);
  
          const size = Math.random() * 20 + 10 + 'px';
          flake.style.left = Math.random() * 100 + 'vw';
          flake.style.fontSize = size;
          flake.style.color = colors[Math.floor(Math.random() * colors.length)];
          flake.style.animationDuration = Math.random() * 15 + 5 + 's';
          flake.style.animationDelay = Math.random() * 5 + 's';
        }
    }
    // to remove snow
    const removeSnowflakes = () => {
        document.querySelectorAll(".snowflake").forEach((flake) => {
          flake.style.animation = "fadeOut 1.8s ease-in-out forwards";
          setTimeout(() => flake.remove(), 1500);
        });
      };
      
      
  
    let currentIndex = 0;
    const musicCardsGrouped = music.length > 4 
    ? music.reduce((acc, item, index) => {
        if (index % 4 === 0) {
            acc.push([item]);
        } else {
            acc[acc.length - 1].push(item);
        }
        return acc;
    }, [])
        : [music];
    
     const noisecards = whitenoise.length > 4 
    ? whitenoise.reduce((acc, item, index) => {
        if (index % 4 === 0) {
            acc.push([item]);
        } else {
            acc[acc.length - 1].push(item);
        }
        return acc;
    }, [])
    : [whitenoise];



const slides = musicCardsGrouped.map((group, index) => (
    <div key={index} className="slide">
        {group.map((music, idx) => {
            currentIndex++;

            return (
                <div key={`${activebutton}-${idx}`} className={`audio-card animate`} style={{ animationDelay: `${idx * 0.2}s` }}>

                    <AudioPlayer
                        src={music.audio}
                        showJumpControls={false}
                        showDownloadProgress={false}
                        customAdditionalControls={[]}
                        customVolumeControls={[]}
                        layout="stacked"
                        onPlay={() => createSnowflakes()}
                        onPause={() => removeSnowflakes()}
                    />
                    <p className="audio-title">{music.name}</p>
                    <span className="sleep-icon">💤</span>
                </div>
            );
        })}
    </div>
));
const slidesnoise = noisecards.map((group, index) => (
    <div key={index} className="slide">
        {group.map((music, idx) => {
            currentIndex++;

            return (
                <div key={`${activebutton}-${idx}`} className={`audio-card animate`} style={{ animationDelay: `${idx * 0.2}s` }}>

                    <AudioPlayer
                        src={music.audio}
                        showJumpControls={false}
                        showDownloadProgress={false}
                        customAdditionalControls={[]}
                        customVolumeControls={[]}
                        layout="stacked"
                 
                    />
                    <p className="audio-title">{music.name}</p>
                    <span className="sleep-icon">💤</span>
                </div>
            );
        })}
    </div>
));


     
  
    return (
        <div className="SleepMusic">
            <Mainnavbar/>
            <div className="SleepHeader">
                <div className="text">
                    <img src={sleepybaby} alt="" />
                    <h2>Calming music for peaceful baby sleep</h2>
                </div>



            </div>
            <div className="cont">
            <div className="buttons-optyons-music">
                    <button className={activebutton==="relaxing-music" ? "active" :""} onClick={()=>handleactivebuttom("relaxing-music")}>
                    relaxing music

                </button>
                <button className={activebutton==="white noise" ? "active" :""}  onClick={()=>handleactivebuttom("white noise")}>
                white noise

                </button>

                </div>
                <div className=" audio-container">
                    {loading ? (
                        <>
                        <div className="loding-music">
                        </div>
                        <div className="loding-music">
                            </div>
                        <div className="loding-music">
                            </div>
                        <div className="loding-music">
                            </div>
                            </>
                    ) :
                        (       activebutton === "relaxing-music" ? (
                            <Slider  {...settings}>
                            {slides}
                         </Slider>    
                           
                       ) : (
                           <Slider  {...settings2}>
                           {slidesnoise}
                        </Slider>   
                     
                       ))
                    }
             
                     
 

                </div>
                <div style={{ padding: "50px 0" }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum esse, asperiores eaque commodi consequuntur optio saepe adipisci sit facere quo corrupti dolorum voluptatem! Architecto reprehenderit, mollitia ad autem necessitatibus nam.

                </div>
 



 

     

            </div>
          

        </div>
    )
}
