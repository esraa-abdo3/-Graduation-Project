import './Terms.css';
import Mainnavbar from "../Componets/mainhomeprofile/Mainnavbar"
import Footer from "../Componets/Footer/Footer"
import Cookies from "universal-cookie";
import Navbar from "../Componets/Navbar/Navbar"

export default function CookiesPolicy() {
  const cookie = new Cookies();
      const gettoken = cookie.get("Bearer");
  return (
    <>
      {gettoken ? <Mainnavbar /> : <Navbar />}
      <div className="terms-container">
      <h1>Cookies Policy</h1>
      <p className="terms-intro">
        This Cookies Policy explains how CareNest uses cookies and similar technologies to improve your experience.
      </p>
      <div className="terms-section">
        <h2>1. What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
      </div>
      <div className="terms-section">
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies to remember your settings, analyze usage, and personalize content. Some cookies are essential for the app to function.</p>
      </div>
      <div className="terms-section">
        <h2>3. Types of Cookies We Use</h2>
        <p>We use session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until deleted).</p>
      </div>
      <div className="terms-section">
        <h2>4. Managing Cookies</h2>
        <p>You can control and delete cookies through your browser settings. Disabling cookies may affect your experience on CareNest.</p>
      </div>
      <div className="terms-section">
        <h2>5. Changes to This Policy</h2>
        <p>We may update this Cookies Policy from time to time. Please review it regularly for any changes.</p>
      </div>
      <div className="terms-section">
        <h2>6. Contact Us</h2>
        <p>If you have any questions about our Cookies Policy, please <a href="/contactus">contact us</a>.</p>
      </div>
      </div>
         <Footer/>
    </>
    
  );
} 