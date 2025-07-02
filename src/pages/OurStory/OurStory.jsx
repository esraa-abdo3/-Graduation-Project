import './OurStory.css';
import babyMomImg from '../../assets/closeup-family-hands-holding-each-other-with-love_53876-25268.jpg';
import ourteam from "../../assets/outteam.jpg"
import Mainnavbar from "../../Componets/mainhomeprofile/Mainnavbar"
import Footer from "../../Componets/Footer/Footer"
import Navbar from "../../Componets/Navbar/Navbar"
import Cookies from "universal-cookie";
export default function CareNestStory() {
   const cookie = new Cookies();
      const gettoken = cookie.get("Bearer");
  return (
        <>
      {gettoken ?   <Mainnavbar /> :<Navbar />}
       <div className="timeline-outer-container">
      <h1 className="timeline-title">Our Story</h1>
      <p className="timeline-intro">
        CareNest is a journey of passion and purpose. Here&rsquo;s how our story began and grew into a platform dedicated to supporting mothers everywhere.
      </p>
      <div className="timeline-center">
        {/* 2024 Event - Image Left, Text Right */}
        <div className="timeline-row">
          <div className="timeline-side left">
            <div className="timeline-card image-card">
              <img src={ourteam} alt="Idea - Mother and Baby" />
            </div>
          </div>
          <div className="timeline-line">
            <span className="timeline-year">2024</span>
            <span className="timeline-dot"></span>
          </div>
          <div className="timeline-side right">
            <div className="timeline-card text-card">
              <h2>Where the Idea Was Born</h2>
              <p>
                In 2024, the idea for CareNest was sparked by a simple question: How can we make motherhood easier and more joyful? Inspired by real challenges faced by mothers, our vision started to take shape.
              </p>
            </div>
          </div>
        </div>
        {/* 2025 Event - Text Left, Image Right */}
        <div className="timeline-row">
          <div className="timeline-side left">
            <div className="timeline-card text-card">
              <h2>CareNest Launches</h2>
              <p>
                After a year of dedication, research, and collaboration, CareNest officially launched in 2025. Our mission: to empower mothers with trusted knowledge, a supportive community, and innovative tools for every step of their journey.
              </p>
            </div>
          </div>
          <div className="timeline-line">
            <span className="timeline-year">2025</span>
            <span className="timeline-dot"></span>
          </div>
          <div className="timeline-side right">
            <div className="timeline-card image-card">
              <img src={babyMomImg} alt="CareNest Launch" />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
    
  )
}