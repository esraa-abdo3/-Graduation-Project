import  { useState } from 'react'
import './Login.css'
import logo from "../../../assets/Logo0.svg"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from "../../../Api/Api";
import { login } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [form, setform] = useState({
        Email: '',
        password: '',
    });
    const [error, setErrors] = useState({});
    const [errorpost,seterrorpost]=useState({})
    const [loading, setLoading] = useState(false);
    const [token, setToken] =useState(null);
    const Navigate= useNavigate();
    const cookie = new Cookies();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [style,setstyle]=useState(false)



    function handlechange(e) {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    function validateForm() {
        const errors = {};
        
        // 1-email
        if (!form.Email) {
            errors.Email = "Email required";
        }
    
       // 2-password
        if (!form.password) {
            errors.password = "Password required";
        } 

        return errors;
    }
    async function handlesubmit(e){
        e.preventDefault();
        setstyle(true)
        const errorsafter = validateForm(); 
        if (Object.keys(errorsafter).length > 0) {
            setErrors(errorsafter);
            return; 
        }
        setErrors({});
        setLoading(true); 
        console.log(error)

        try {
            let res = await axios.post(`${baseURL}/${login}`, form);
            setLoading(false); 
            console.log('you loged in!',res.data.token);
            setToken(res.data.token);
            cookie.set("Bearer", res.data.token);
            seterrorpost({})
            Navigate('/myprofile/NameBaby');
        } 
       
        catch (error) {
            if(error.response && error.response.status === 401){
                setLoading(false); 
                console.log('Email or password is not valid');
                seterrorpost({ error: 'Email or password is not valid' });
            }
            else{
                setLoading(false); 
                console.log(error)
                seterrorpost({error: " Oops something wrong please try again"});
            }
        }
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    const stylebefore = {
        position: 'absolute',
      right: '30px', 
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#777'
    }
    const styleafter = {
        position: 'absolute',
        right: '30px',
        top: '30%',
        transform: 'translateY(-30%)',
        cursor: 'pointer',
        color: '#777'
    }
    function home() {
        navigate("/")
    }

  return (
    <div className=''>
        <div className='login'>
            <div className="form-inputs">
                <div className="logo"  onClick={home}>
                    <img src={logo} alt="img" />
                </div>

                <div className="header">
                    <h1>
                        Your trusted guide for all things baby care. Log in , get started!
                    </h1>
                </div>

                <form onSubmit={handlesubmit}>
                <label className="email">
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.Email}
                            name="Email"
                            onChange={handlechange}
                        />
                            {error.Email && <p className="error">{error.Email}</p>}
                    </label>

                    <label className="password" style={{position:"relative"}}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            name="password"
                              onChange={handlechange}
                              style={{
                                paddingRight: '30px' 
                              }}
                          />
                            <span
    onClick={togglePasswordVisibility}
    style={ style ? styleafter :stylebefore}
  >
    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
  </span>
                             {error.password && <p className="error">{error.password}</p>}
                    </label>
                    <div className='forget'>
                        <Link to='/Auth/forgetPassword'>Forget Password?</Link>
                    </div>
                    <button 
                    type="submit" 
                    className="submit" 
                    disabled={loading}
                    >
                        {loading ?  <div className="spinner-small"></div> : "Log in"}
                    </button>
                    <p className="options">
                        Don’t have an account? 
                        <Link to="/Auth/signup"> Sign up</Link>
                        </p>
                        {errorpost.error && <p className="error">{errorpost.error}</p>}
                </form>
            </div>

            

        </div>
    </div>
)}
