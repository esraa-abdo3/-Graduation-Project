import { Link, useNavigate } from "react-router-dom";
import imgemail from "../../../assets/Screenshot 2024-10-15 195243.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Confirm.css";

export default function ConfirmPass() {
    const cookies = new Cookies();
    const navigate = useNavigate();
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const [code, setCode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
    });

    useEffect(() => {
        document.getElementsByName("first")[0].focus();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setCode({ ...code, [name]: value });

        if (value && name !== "sixth") {
            document.getElementsByName(getNextInput(name))[0].focus();
        }
    }

    function getNextInput(name) {
        const inputOrder = ["first", "second", "third", "fourth", "fifth", "sixth"];
        const currentIndex = inputOrder.indexOf(name);
        return currentIndex < inputOrder.length - 1 ? inputOrder[currentIndex + 1] : null;
    }

    async function handleSubmit(e) {
        e.preventDefault(); 
        setLoading(true); 
        setError(""); 
        const getToken = cookies.get('resetToken');
        console.log(getToken)

        if (!getToken) {
            setError("Token is not available");
            setLoading(false);
            return;
        }

        const fullCode = Object.values(code).join(""); 

        try {
            let res = await axios.post('https://carenest-serverside.vercel.app/auth/verifycode', {
                resetCode: fullCode
            }, {
                headers: {
                    Authorization: getToken
                }
            });
        
            if (res.status === 200) {
                const newToken = res.data.token; 
                cookies.set('resetToken', newToken, { path: '/' }); 
                navigate('/Auth/SetNewPass'); 
                document.querySelectorAll('input').forEach(input => input.classList.add('scale-input'));
            } else {
                setError("Please enter the correct code.");
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError("Please enter the correct code.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="codes-inputs">
            <div className="img-email">
                <img src={imgemail} alt="img" />
            </div>
            <h2>Password reset</h2>
            <div className="text">
                Enter the code we sent to your email
            </div>

            <form className="code" onSubmit={handleSubmit}>
                <div className="flex">
                    {["first", "second", "third", "fourth", "fifth", "sixth"].map((inputName) => (
                        <input 
                            key={inputName}
                            type="text" 
                            maxLength="1" 
                            name={inputName} 
                            value={code[inputName]} 
                            onChange={handleChange} 
                        />
                    ))}
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>} 
                
                <div className="btn-continue">
                    <button type="submit" className="submit" disabled={loading}>
                        {loading ? <div className="spinner-small"></div> : "Continue"}
                    </button>
                    <Link to="/Auth/forgetPassword">Didn’t receive the mail?</Link>
                </div>
            </form>
        </div>
    );
}
