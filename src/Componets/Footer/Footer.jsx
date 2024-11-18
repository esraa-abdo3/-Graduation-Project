
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./Footer.css";
import insta from "../../assets/instagram.webp";
import fac from "../../assets/facebook.webp";
import pintrest from "../../assets/pinterest.webp";
import tiktok from "../../assets/tiktok.webp";

export default function Footer() {
    return (
        <footer>
            <div className="cont">
                <div className="section">
                    <h2>We believe in making motherhood simpler</h2>
                    <div className="icon">
                        <LazyLoadImage src={insta} alt="Instagram" effect="fade" loading="lazy" />
                        <LazyLoadImage src={fac} alt="Facebook" effect="fade" loading="lazy" />
                        <LazyLoadImage src={pintrest} alt="Pinterest" effect="fade" loading="lazy" />
                        <LazyLoadImage src={tiktok} alt="TikTok" effect="fade" loading="lazy" />
                    </div>
                </div>
                <div className="section">
                    <h3>Connect</h3>
                    <ul>
                        <li>Contact us</li>
                        <li>Advertise with us</li>
                        <li>Share your story</li>
                    </ul>
                </div>
                <div className="section">
                    <h3>About us</h3>
                    <ul>
                        <li>Our story</li>
                        <li>CareNest Insights</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
