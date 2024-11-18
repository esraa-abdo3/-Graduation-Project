import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import './SetNewPass.css';
import logo from "../../../assets/Logo0.svg"

export default function SetNewPass() {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [form, setForm] = useState({
        password: '',
        passwordConfirm: '',
    });

    function handleChange(e) {
        const newForm = { ...form, [e.target.name]: e.target.value };
        setForm(newForm);
    }

    function validateForm() {
        const errors = {};
        if (!form.password) {
            errors.password = "Password required";
        } else if (form.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(form.password)) {
            errors.password = "Password must contain at least one capital letter, one small letter, one digit, and one special character";
        } 
        if (!form.passwordConfirm) {
            errors.passwordConfirm = "Password Confirmation required";
        } else if (form.password !== form.passwordConfirm) {
            errors.passwordConfirm = "Password Confirmation incorrect";
        }
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setError(errors); 
            return;
        }

        setLoading(true);
        const token = cookies.get('resetToken'); 
        console.log(token)

        try {
            const res = await axios.put('https://carenest-serverside.vercel.app/auth/resetpassword', {
                newPassword: form.password,
                passwordConfirm: form.passwordConfirm,
            }, {
                headers: {
                    Authorization: token, 
                }
            });

            if (res.status === 200) {
                const newToken = res.data.token; 
                cookies.set('resetToken', newToken, { path: '/' }); 
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError({ general: "Failed to reset password." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='newPass'>
            <div className="logo">
                    <img src={logo} alt="img" />
            </div>
            <h2>Set new password</h2>
            <form onSubmit={handleSubmit}>
                <label className="password">
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        name="password"
                        onChange={handleChange}
                    />
                    {error.password && <p className="error">{error.password}</p>}
                </label>

                <label className="confirm-password">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={form.passwordConfirm}
                        name="passwordConfirm"
                        onChange={handleChange}
                    />
                    {error.passwordConfirm && <p className="error">{error.passwordConfirm}</p>}
                </label>

                <button 
                    type="submit" 
                    className="submit" 
                    disabled={loading}
                >
                    {loading ? <div className="spinner-small"></div> : "Set as new password"}
                </button>
            </form>
        </div>
    );
}
