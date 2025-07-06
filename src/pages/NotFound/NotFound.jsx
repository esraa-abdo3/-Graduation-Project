import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import notfound from "../../assets/404 Error with a cute animal-pana.svg"
const NotFound = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/");
    };

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <img src={notfound} alt="" />
                <div className="text">

               
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
                <p>It might have been moved, deleted, or you entered the wrong URL.</p>
                    <button onClick={handleReturnHome}>Return Home</button>
                     </div>
            </div>
        </div>
    );
};

export default NotFound; 