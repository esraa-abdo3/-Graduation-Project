import React, { useState } from 'react';
import logo from '../../../assets/Logo0.svg'; 
import './ForgetPass.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { baseURL, forgetPass } from "../../../Api/Api";

export default function ForgetPass() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();

    const validateEmail = (email) => {
        if (!email) {
            return "Email required";
        } else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)) {
            return "Email must start with a character, match the '@' symbol, and end with 'gmail.com'";
        }
        return '';
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        setErrors(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateEmail(email);
        if (error) {
            setErrors(error);
            return;
        }
    
        setLoading(true);
        try {
            const res = await axios.post(`${baseURL}/${forgetPass}`, { Email: email });
            console.log(res.data.message);
            
            if (res.data.token) {
                console.log(res.data.token)
                cookies.set('resetToken', res.data.token, { path: '/' });
            }

            navigate('/Auth/ConfirmPassword');
        } catch (error) {
            console.error(error.response?.data);
            let message = "An error occurred, please try again.";
            if (error.response && error.response.data) {
                message = error.response.data.message || message;
            }
            setErrors(message); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=''>
            <div className='forget-box'>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className='content-Pass'>
                    <h2>Forget your Password?</h2>
                    <p>No worries, we’ll send you reset instructions.</p>
                    <form onSubmit={handleSubmit}>
                        <label className="email">
                            <input
                                type="email"
                                placeholder="Email"
                                name="Email"
                                value={email}
                                onChange={handleChange}
                            />
                        </label>
                        {errors && <p className="error">{errors}</p>} 
                        <button 
                            type="submit" 
                            className="submit" 
                            disabled={loading}
                        >
                            {loading ? <div className="spinner-small"></div> : "Send Code"}
                        </button>
                    </form>
                    <Link to='/Auth/login'>Back to login</Link>
                </div>
            </div>
        </div>
    );
}
