import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./Footer.css";
import insta from "../../assets/instagram.webp";
import fac from "../../assets/facebook.webp";
import pintrest from "../../assets/pinterest.webp";
import tiktok from "../../assets/tiktok.webp";
import downloadApp from "../../assets/Downloadappstore.svg";
import googlplay from "../../assets/Google.png"
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="cont">
                <div className="section section-slogan">
                    <h2>We believe in making motherhood simpler</h2>
                    <div className="icon">
                        <LazyLoadImage src={insta} alt="Instagram" effect="fade" loading="lazy" />
                        <LazyLoadImage src={fac} alt="Facebook" effect="fade" loading="lazy" />
                        <LazyLoadImage src={pintrest} alt="Pinterest" effect="fade" loading="lazy" />
                        <LazyLoadImage src={tiktok} alt="TikTok" effect="fade" loading="lazy" />
                    </div>
                </div>
                <div className="section section-connect">
                    <h3>Connect</h3>
                    <ul>
                        <li><Link to="/Contact-us" onClick={() => window.scrollTo(0, 0)}>Contact us</Link></li>
                        <li><Link to="/help-center" onClick={() => window.scrollTo(0, 0)}>Help Center</Link></li>
                        <li><Link to="/community" onClick={() => window.scrollTo(0, 0)}>Community</Link></li>
                    </ul>
                </div>
                <div className="section section-about">
                    <h3>About</h3>
                    <ul>
                        <li><NavLink to="/ourstory" onClick={() => window.scrollTo(0, 0)}>Our Story </NavLink></li>
                        <li><Link to="/feedback" onClick={() => window.scrollTo(0, 0)}>Moms Feedback</Link></li>
                         <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)}>FAQ</Link></li>
                    </ul>
                </div>
                <div className="section section-download">
                    <h3>Download App</h3>
                    <div className="download-btns">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src={downloadApp} alt="Download on Google Play" className="download-app-img" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src={googlplay} alt="Download on App Store" className="download-app-img" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-links">
                    <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link>
                    <span className="footer-divider">|</span>
                    <Link to="/cookies-policy" onClick={() => window.scrollTo(0, 0)}>Cookies Policy</Link>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} CareNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
