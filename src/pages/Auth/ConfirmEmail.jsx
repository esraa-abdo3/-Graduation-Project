


import { Link, useNavigate } from "react-router-dom";
import imgemail from "../../assets/Screenshot 2024-10-15 195243.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaArrowLeft } from "react-icons/fa";
import "./Confirm.css"


export default function ConfirmEmail() {
    const cookie = new Cookies();
    const nav = useNavigate('');
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const [code, setcode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
    });
    const [emaildone,setemaildone]=useState(false)

    useEffect(() => {
        document.getElementsByName("first")[0].focus();
    }, []);

    function handlechange(e) {
        setcode({ ...code, [e.target.name]: e.target.value });

        const newCode = { ...code, [e.target.name]: e.target.value };
        const fullCode = Object.values(newCode).join("");

        
        if (fullCode.length === 6) {
            handleSubmit(fullCode);
        }
    }

    function handleFocus(nextInput) {
        if (nextInput) {
            nextInput.focus();
        }
    }

    async function handleSubmit(fullCode) {
        setLoading(true); 
        setError(""); 
        const gettoken = cookie.get('Bearer');

        try {
            let res = await axios.post('https://carenest-serverside.vercel.app/auth/verifyEmailUser', {
                code: fullCode
            }, {
                headers: {
                    Authorization: gettoken 
                }
            });
        
            if (res.status === 201) {
                setemaildone(true);
                setLoading(false);
                document.querySelectorAll('.flex input').forEach(input => input.classList.add('scale-input'));
                setTimeout(() => {
                    nav("/"); 
                }, 2000); 
            } else {
                setLoading(false);
                setError("Please enter the correct code.");
            }
            
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false);
            setError("Please enter the correct code.");
        }
    }

    return (
        <div className="codes-inputs">
            <div className="img-email">
                <img src={imgemail} alt="img" />
            </div>
            <div className="text">
                A verification code has been sent to your email.
                Please enter the code below to confirm your email address and complete your registration.
            </div>

            <form className="code" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="first" 
                        value={code.first} 
                        onChange={e => {
                            handlechange(e);
                            if (e.target.value) handleFocus(document.getElementsByName("second")[0]);
                        }} 
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="second" 
                        value={code.second} 
                        onChange={e => {
                            handlechange(e);
                            if (e.target.value) handleFocus(document.getElementsByName("third")[0]);
                        }} 
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="third" 
                        value={code.third} 
                        onChange={e => {
                            handlechange(e);
                            if (e.target.value) handleFocus(document.getElementsByName("fourth")[0]);
                        }} 
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="fourth" 
                        value={code.fourth} 
                        onChange={e => {
                            handlechange(e);
                            if (e.target.value) handleFocus(document.getElementsByName("fifth")[0]);
                        }} 
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="fifth" 
                        value={code.fifth} 
                        onChange={e => {
                            handlechange(e);
                            if (e.target.value) handleFocus(document.getElementsByName("sixth")[0]);
                        }} 
                    />
                    <input 
                        type="text" 
                        maxLength="1"  
                        name="sixth" 
                        value={code.sixth} 
                        onChange={e => {
                            handlechange(e);
                        }} 
                    />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>} 
                {emaildone && <p className="sucsses" style={{color:"green"}}> Your account has been successfully created</p>}
                <div className="options-action">
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FaArrowLeft className="icon" />
                        <Link style={{ textDecoration: "none", color: "#181869" }} to="/Auth/Signup">Previous</Link>
                    </button>
                    <button type="submit" className="submit" disabled={loading}>
                        {loading ? (
                            <div className="spinner-small" style={{borderLeftColor:"#777"}}></div>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
