import './Terms.css';
import Mainnavbar from "../Componets/mainhomeprofile/Mainnavbar"
import Footer from "../Componets/Footer/Footer"
import Cookies from "universal-cookie";
import Navbar from "../Componets/Navbar/Navbar"
 const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");

export default function Terms() {
  return (
    <>
      {gettoken ? <Mainnavbar /> : <Navbar />}
          <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p className="terms-intro">
        Please read these Terms & Conditions carefully before using CareNest. By accessing or using our app, you agree to be bound by these terms.
      </p>
      <div className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By using CareNest, you agree to comply with and be legally bound by these Terms & Conditions.</p>
      </div>
      <div className="terms-section">
        <h2>2. User Obligations</h2>
        <p>You agree to use the app responsibly and not misuse any features or content. You must provide accurate information and respect other users.</p>
      </div>
      <div className="terms-section">
        <h2>3. Intellectual Property</h2>
        <p>All content, trademarks, and data on CareNest are the property of CareNest or its licensors. You may not copy, reproduce, or distribute any content without permission.</p>
      </div>
      <div className="terms-section">
        <h2>4. Limitation of Liability</h2>
        <p>CareNest is not liable for any damages or losses resulting from your use of the app. Use the app at your own risk.</p>
      </div>
      <div className="terms-section">
        <h2>5. Changes to Terms</h2>
        <p>We may update these Terms & Conditions at any time. Continued use of the app means you accept the new terms.</p>
      </div>
      <div className="terms-section">
        <h2>6. Contact Us</h2>
        <p>If you have any questions about these Terms & Conditions, please <a href="/contactus">contact us</a>.</p>
      </div>
      </div>
      <Footer/>
    </>

  );
} 