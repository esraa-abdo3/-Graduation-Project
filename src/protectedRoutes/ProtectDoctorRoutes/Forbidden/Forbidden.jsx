import imgForbidden from "../../../assets/403.png";
import "./Forbidden.css";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/");
    };

    return (
        <div className="forbidden-page">
            <img src={imgForbidden} alt="403 Forbidden" />
            <div className="text">
                <h2>You're not permitted to see this</h2>
                <p>The page you're trying to access has restricted access</p>
                <p>If you feel this is a mistake, contact your admin</p>
                <button onClick={handleReturnHome}>Return Home</button>
            </div>
        </div>
    );
};

export default Forbidden;
