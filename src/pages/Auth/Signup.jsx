import "react-datepicker/dist/react-datepicker.css";
import {  Link } from "react-router-dom";
import "./Signup.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import logo from "../../assets/Logo0.svg"
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
export default function Signup() {
    const navigate = useNavigate();
    const cookie = new Cookies();

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [form, setform] = useState({
        firstName: '',
        lastName: '',
        Email: '',
        password: '',
        passwordConfirm: '',
        dateOfBirthOfMam: '',
    });
    const [error, setErrors] = useState({})
    const [errorpost, seterrorpost] = useState({})
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [style,setstyle]=useState(false)


    useEffect(() => {
        const storedForm = JSON.parse(sessionStorage.getItem('signupForm'));
        if (storedForm) {
            setform(storedForm);
        }
    }, []);
 
    function handlechange(e) {
        const newForm = { ...form, [e.target.name]: e.target.value };
        setform(newForm);
        sessionStorage.setItem('signupForm', JSON.stringify(newForm)); 
    }
    useEffect(() => {
        if (selectedDay && selectedMonth && selectedYear) {
            const day = selectedDay.getDate();
            const month = selectedMonth.getMonth() + 1; 
            const year = selectedYear.getFullYear();
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            setform(prevForm => ({ ...prevForm, dateOfBirthOfMam: formattedDate }));
        }
    }, [selectedDay, selectedMonth, selectedYear]);

    
    function validateForm() {
        const errors = {};
        
       //1- first name 
        if (!form.firstName) {
            errors.firstName = "first name required";
        } else if (form.firstName.length < 3) {
            errors.firstName = "first name must be at least 3 characters long";
        } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
            errors.firstName = "firstname should only contain English letters";
        }
        
           //2- last name 
        if (!form.lastName) {
            errors.lastName = "last name required";
        } else if (form.lastName.length < 3) {
            errors.lastName = "last name must be at least 3 characters long";
        } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
            errors.lastName = "lastname should only contain English letters";
        }
        
        // 3-email
        if (!form.Email) {
            errors.Email = "Email required";
        } else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(form.Email)) {
            errors.Email = "email must start with a character, match the '@' symbol, and end with 'gmail.com'";
        }
    
       // 4-password
        if (!form.password) {
            errors.password = "Password required";
        } else if (form.password.length < 8) {
            errors.password = "password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(form.password)) {
            errors.password = "Password must be at least 8 characters, have at least one capital letter, one small letter, one digit, and one special character";
        } else if (form.password !== form.passwordConfirm) {
            errors.passwordConfirm = "Password Confirmation incorrect";
        }
    
        // 5-passwordconfirmation
        if (!form.passwordConfirm) {
            errors.passwordConfirm = "Password Confirmation required";
        }
    
        // date
        if (!form.dateOfBirthOfMam) {
            errors.dateOfBirthOfMam = "Date of birth is required";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dateOfBirthOfMam)) {
            errors.dateOfBirthOfMam = "Invalid date format. Use YYYY-MM-DD";
        } else if (new Date(form.dateOfBirthOfMam) >= new Date()) {
            errors.dateOfBirthOfMam = "Date of birth must be in the past";
        }
    
        return errors;
    }
    
    async function handlesubmit(e) {
        e.preventDefault();
        setstyle(true)
        const errorsafter = validateForm(); 
        if (Object.keys(errorsafter).length > 0) {
            setErrors(errorsafter);
            return; 
        }
        setLoading(true); 
    
        try {
            let res = await axios.post(`https://carenest-serverside.vercel.app/auth/signup`, form);
            
            console.log(res.data.token)
            const token=res.data.token
            cookie.set("Bearer",token )
            if (res.status === 200) {
                setLoading(false); 
                navigate('/Auth/Confirmemail');
            }
        } catch (error) {
            setLoading(false); 
            console.log(error); 
            if (error.response.status === 400) {
                setErrors({ "Email": "The Email is already taken" });
            } else {
                seterrorpost({ error: "Oops something went wrong, please try again" });
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
     
            <div className="form-inputs">
             
            <div className="logo"  onClick={home} >
              
                <img src={logo} alt="img"/>
               
                    
                </div>
            

                <div className="header">
                    <h1>
                        Empowering you to care for your baby with ease. Sign up!
                    </h1>
                </div>

                <form onSubmit={handlesubmit}>
                    <label className="name">
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <input
                            type="text"
                            value={form.firstName}
                            name="firstName"
                            placeholder="First Name"
                            onChange={handlechange}
                                />
                  {error.firstName && <p className="error">{error.firstName}</p>}
                      </div>
                    
                     
                            <div style={{display:"flex",flexDirection:"column"}}>
                                
                        
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            name="lastName"
                            onChange={handlechange}
                                />
                                  {error.lastName && <p style={{paddingBottom:"10px"}} className="error">{error.lastName}</p>}
                                  </div>
                        
                      
                   
                       
                    </label>
                 
                    

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
                <label className="password" style={{ position: 'relative' }}>
  <input
    type={passwordVisible ? "text" : "password"}
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

   

                    <label className="confirm-password" style={{ position: 'relative' }}>
                        <input
                           type={passwordVisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={form.passwordConfirm}
                            name="passwordConfirm"
                        onChange={handlechange}
                        style={{
                            paddingRight: '30px' 
                          }}
                    />
                      <span
    onClick={togglePasswordVisibility}
    // style={{
    //   position: 'absolute',
    //   right: '30px', 
    //   top: '60%',
    //   transform: 'translateY(-60%)',
    //   cursor: 'pointer',
    //   color: '#777'
    // }}
    style={ style ? styleafter :stylebefore}
  >
    {passwordVisible ? <FaEye  /> : <FaEyeSlash />}
  </span>
                          {error.passwordConfirm && <p className="error">{error.passwordConfirm}</p>}
                    </label>

                    <div className="date-of-birth-label">
                        <p style={{ margin: "0 0 8px 5px", color: "rgba(10, 106, 166, 1)" }}>Date Of Birth</p>
                        <div className="date-of-birth">
                            <div className="date-picker">
                                <DatePicker
                                    selected={selectedDay}
                                    onChange={(date) => setSelectedDay(date)}
                                    dateFormat="dd"
                                    placeholderText="DD"
                                    isClearable
                                    showPopperArrow={false}
                                    popperPlacement="top"
                                    customInput={<input className="custom-date-input" />}
                                />
                            </div>
                            <div className="date-picker">
                                <DatePicker
                                    selected={selectedMonth}
                                    onChange={(date) => setSelectedMonth(date)}
                                    dateFormat="MM"
                                    placeholderText="MM"
                                    showMonthYearPicker
                                    isClearable
                                    popperPlacement="top"
                                    customInput={<input className="custom-date-input" />}
                                />
                            </div>
                            <div className="date-picker">
                                <DatePicker
                                    selected={selectedYear}
                                    onChange={(date) => setSelectedYear(date)}
                                    dateFormat="yyyy"
                                    placeholderText="YYYY"
                                    showYearPicker
                                isClearable
                                popperPlacement="top"
                                    minDate={new Date(1973, 0, 1)}
                                    maxDate={new Date()}
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={50}
                                    customInput={<input className="custom-date-input" />}
                                />
                            </div>
                        </div>
                        {error.dateOfBirthOfMam && <p className="error">{error.dateOfBirthOfMam}</p>}
                    </div>

                <label className="submit">
    <button 
        type="submit" 
        className="submit" 
        disabled={loading}
                    >
      {loading ?  <div className="spinner-small"></div> : "Sign up"}
                    </button>

</label>
                    <p className="options">
                        Already have an account?
                        <Link to="/login"> log in</Link>
                        </p>
                        {errorpost.error && <p className="error">{errorpost.error}</p>}
            </form>
        
            </div>

  
    );
}











