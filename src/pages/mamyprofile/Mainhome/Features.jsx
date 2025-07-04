
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cryguide from "../../../assets/crycuide.webp";
import reminders from "../../../assets/reminders.webp";
import doctors from "../../../assets/doctors.png";
import community from "../../../assets/community.webp";
import babygrowth from "../../../assets/baby-growth.webp";
import entermints from "../../../assets/Entirement.webp";
import mamytips from "../../../assets/tips.webp";
import { Link } from "react-router-dom";
export default function Features() {
    const handleActiveClass = (event) => {
      const allFeatures = document.querySelectorAll(".features-container .swiper-slide");
      allFeatures.forEach((feature) => feature.classList.remove("active"));
      
      event.currentTarget.classList.add("active");
    };
  
    const features = [
      { img: cryguide, title: "Cry History", link: "/CryList" },
      { img: reminders, title: "Reminders", link: "/reminders" },
      { img: babygrowth, title: "Baby Growth", link: "/growthBaby" },
      { img: mamytips, title: "Mamy Tips", link: "/MamyTips" },
      { img: entermints, title: "Entertainment", link: "/EnterTiemnt" },
      { img: doctors, title: "Doctors", link: "/nearPlaces" },
      { img: community, title: "Community", link: "/Community" },
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
  

