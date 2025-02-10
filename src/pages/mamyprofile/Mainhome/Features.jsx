// import cryguide from "../../../assets/crycuide.png"
// import reminders from "../../../assets/reminders.png"
// import doctors from "../../../assets/doctors.png"
// import shopping from "../../../assets/shopping.png"
// import community from "../../../assets/community.png"
// import babygrowth from "../../../assets/baby-growth.png"
// import entermints from "../../../assets/Entirement.png"
// import mamytips from "../../../assets/tips.png"
// import { Link } from "react-router-dom"

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Features() {
//     const handleActiveClass = (event) => {
//         const allFeatures = document.querySelectorAll(".all-features div");
//         allFeatures.forEach((feature) => feature.classList.remove("active"));
//         event.currentTarget.classList.add("active");
    
 
//     };
    
 
    




//     return (
//         <>
//              <div className="all-features">
             
//              <div className="feature" onClick={handleActiveClass}>
//                  <Link className="cryguide">
//                  <img src={cryguide}></img>
//                  <h4>Cry guide</h4>
//                  </Link>
             
 
//              </div>
//              <div className= {window.location.href==="http://localhost:5173/reminders" ? "active" :"feature"} onClick={handleActiveClass}>
//                  <Link to="/reminders">
//                  <img src={reminders}></img>
//                  <h4>Reminders</h4>
//                  </Link>
             
 
//              </div>
//              <div className="feature"  onClick={handleActiveClass}>
//                  <Link to="/growthBaby">
//                  <img src={babygrowth}></img>
//                  <h4>Baby Growth</h4>
//                  </Link>
                
 
//              </div>
//              <div className="feature" onClick={handleActiveClass}>
//                  <Link>
//                  <img src={mamytips}></img>
//                  <h4>Mamy Tips</h4>
//                  </Link>
                
 
//              </div>
//              <div className="feature"  onClick={handleActiveClass}>
//                  <Link>
//                  <img src={entermints}></img>
//                  <h4>Enterainment</h4>
//                  </Link>
            
 
//              </div>
      
//              <div className="feature"  onClick={handleActiveClass}>
//                  <Link>
//                  <img src={doctors}></img>
//                  <h4>Doctors</h4>
//                  </Link>
              
 
//              </div>
//              <div className="feature"  onClick={handleActiveClass}>
//                  <Link>
//                  <img src={shopping}></img>
//                  <h4>Shopping</h4>
//                  </Link>
              
 
//              </div>
//              <div className="feature"  onClick={handleActiveClass}>
//                  <Link>
//                  <img src={community}></img>
//                  <h4>Community</h4>
//                  </Link>
              
 
//              </div>
//             </div>
         

//         </>
       
       
        
//     )
// }
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cryguide from "../../../assets/crycuide.png";
import reminders from "../../../assets/reminders.png";
import doctors from "../../../assets/doctors.png";
import shopping from "../../../assets/shopping.png";
import community from "../../../assets/community.png";
import babygrowth from "../../../assets/baby-growth.png";
import entermints from "../../../assets/Entirement.png";
import mamytips from "../../../assets/tips.png";
import { Link } from "react-router-dom";
export default function Features() {
    const handleActiveClass = (event) => {
      const allFeatures = document.querySelectorAll(".features-container .swiper-slide");
      allFeatures.forEach((feature) => feature.classList.remove("active"));
      
      // إضافة الـ active للعنصر الصح
      event.currentTarget.classList.add("active");
    };
  
    const features = [
      { img: cryguide, title: "Cry Guide", link: "#" },
      { img: reminders, title: "Reminders", link: "/reminders" },
      { img: babygrowth, title: "Baby Growth", link: "/growthBaby" },
      { img: mamytips, title: "Mamy Tips", link: "#" },
      { img: entermints, title: "Entertainment", link: "#" },
      { img: doctors, title: "Doctors", link: "#" },
      { img: shopping, title: "Shopping", link: "#" },
      { img: community, title: "Community", link: "#" },
    ];
  
    return (
      <div className="features-container">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={4}
          pagination={{ clickable: true }}
          breakpoints={{
            1264: { slidesPerView: 8 },
            1200: { slidesPerView: 6 },
            768: { slidesPerView: 6 },
            480: { slidesPerView: 4 },
          }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index} onClick={handleActiveClass}>
              <Link to={feature.link} className="feature">
                <img src={feature.img} alt={feature.title} />
                <h4>{feature.title}</h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  

