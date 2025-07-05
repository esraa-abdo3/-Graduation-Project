import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/");
    };

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <p>It might have been moved, deleted, or you entered the wrong URL.</p>
                <button onClick={handleReturnHome}>Return Home</button>
            </div>
        </div>
    );
};

export default NotFound; 