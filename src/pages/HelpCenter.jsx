import './HelpCenter.css';
import { useNavigate } from 'react-router-dom';
import { FaRegQuestionCircle, FaRegLightbulb, FaRegStar } from 'react-icons/fa';
import Mainnavbar from "../Componets/mainhomeprofile/Mainnavbar"
import Footer from "../Componets/Footer/Footer"
import Cookies from "universal-cookie";
import Navbar from "../Componets/Navbar/Navbar"

export default function HelpCenter() {
  const navigate = useNavigate();
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
  return (
    <>
      {gettoken ?   <Mainnavbar /> :<Navbar />}
    
         <div className="help-center-page">
      <div className="help-center-header">
        <span className="help-center-title">Hello, How Can We Help You?</span>
      </div>
      <div className="help-center-search">
        <input type="text" placeholder="Search your keyword here..." />
        <button className="help-center-search-btn"><i className="fa fa-search"></i></button>
      </div>
      <div className="help-center-categories">
        <div className="help-center-category" onClick={() => navigate('/faq')}>
          <FaRegQuestionCircle className="help-center-icon" />
          <div className="help-center-cat-title" style={{fontWeight:"500"}}>FAQ</div>
          <div className="help-center-cat-desc">Find answers to common questions about CareNest.</div>
        </div>
        <div className="help-center-category" onClick={() => navigate('/ourstory')}>
          <FaRegLightbulb className="help-center-icon" />
          <div className="help-center-cat-title" style={{fontWeight:"500"}}>Getting Started</div>
          <div className="help-center-cat-desc">Learn about our story and how to start using CareNest.</div>
        </div>
        <div className="help-center-category" onClick={() => navigate('/feedback')}>
          <FaRegStar className="help-center-icon" />
          <div className="help-center-cat-title" style={{fontWeight:"500"}}>Moms Feedback</div>
          <div className="help-center-cat-desc">See what other moms say about their experience.</div>
        </div>
      </div>
      <div className="help-center-popular">
        <div className="help-center-popular-title">How can we help?</div>
        <div className="help-center-popular-list">
          <div className="help-center-popular-item" onClick={() => navigate('/myaccount')}>
            <div><b style={{fontWeight:"500"}}>How to change my password?</b></div>
            <ul className="help-center-guide">
              <li>Go to <b style={{fontWeight:"500"}}>My Account</b> page.</li>
              <li>Click on <b style={{fontWeight:"500"}}>Change Password</b>.</li>
              <li>Enter your current and new password.</li>
              <li>Click <b style={{fontWeight:"500"}}>Save</b>.</li>
            </ul>
          </div>
          <div className="help-center-popular-item" onClick={() => navigate('/Auth/Login')}>
            <div><b style={{fontWeight:"500"}}>How to login and sign up?</b></div>
            <ul className="help-center-guide">
              <li>Click <b style={{fontWeight:"500"}}>Sign in</b> at the top right.</li>
              <li>To create an account, choose <b style={{fontWeight:"500"}}>Sign up</b> and fill in your details.</li>
              <li>To login, enter your email and password and click <b style={{fontWeight:"500"}}>Login</b>.</li>
            </ul>
          </div>
          <div className="help-center-popular-item" onClick={() => navigate('/growthBaby')}>
            <div><b style={{fontWeight:"500"}}>How to track my baby's growth?</b></div>
            <ul className="help-center-guide">
              <li>Go to <b style={{fontWeight:"500"}}>Growth</b> section from the menu.</li>
              <li>Add your baby's weight and height regularly.</li>
              <li>View charts to monitor progress over time.</li>
            </ul>
          </div>
          <div className="help-center-popular-item" onClick={() => navigate('/faq')}>
            <div><b style={{fontWeight:"500"}}>How to use the baby cry analyzer correctly?</b></div>
            <ul className="help-center-guide">
              <li>Open the <b style={{fontWeight:"500"}}>Cry Analyzer</b> feature in the app.</li>
              <li>Record your baby's cry in a quiet environment.</li>
              <li>Wait for the analysis and read the suggested reason.</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
 
  );
} 