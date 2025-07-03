

import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import babymedicine from "../../../../assets/babymedicine.png";
import Cookies from "universal-cookie";
import "./Addmedicine.css";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import "../../my babies/Addbabies.css"
import axios from "axios";
import dayjs from 'dayjs'; 
import { FaClock } from "react-icons/fa";
import { InputAdornment } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import PropTypes from 'prop-types';
Updatemedicine.propTypes = {
  close: PropTypes.func.isRequired,
  getallreminders: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default function Updatemedicine({close, getallreminders ,id}) {
 
   
  const [Medicine, setMedicine] = useState({
    medicationName: "",
    begin: "",
    end: "",
   time:"",
    });
       const [loading, setLoading] = useState(false);
      const [fieldErrors, setFieldErrors] = useState({});
      const [success, setSuccess] = useState("");
      const[errorpost, seterrorpost] = useState({});
    const cookie = new Cookies();
    const gettoken = cookie.get('Bearer');
    const idbaby = cookie.get('activebaby');
  
        const [isClosing, setIsClosing] = useState(false);
      const [showAnim, setShowAnim] = useState(false);
  
      useEffect(() => {
          // Trigger scale-in animation on mount
          setShowAnim(true);
      }, []);
  
  
  
  /* first step to get the medicine detalis first */
  
    useEffect(() => {
        async function getmedicinedetalis() {
            try {
                let res = await axios.get(`https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}/${id}`, {
                    headers: {
                        Authorization: `${gettoken}`
                    }
                })
              console.log(res.data.data);
              setMedicine({
                medicationName: res.data.data.medicationName,
                begin: res.data.data.begin,
                end: res.data.data.end,
               time:res.data.data.time,
              })
                
            }
            catch (error) {
                console.log(error)
            }
            
      }
      getmedicinedetalis()
        
    }, [gettoken, idbaby])
  
  
  
  
  /*  second step  to handle change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...Medicine, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleDateChange = (date, fieldName) => {
    setMedicine((prevState) => ({
      ...prevState,
      [fieldName]: date,
    }));
    setFieldErrors((prevState) => ({
      ...prevState,
      [fieldName]: "",
    }));
  };

  const handleTimeChange = (name, newTime) => {
    // تنسيق الوقت إلى ساعة ودقيقة باستخدام dayjs
    const formattedTime = dayjs(newTime).format('HH:mm');
    setMedicine({ ...Medicine, [name]: formattedTime });
  };

  /**  third step the valdiation */
    
  function validet() {
    const error = {};
  
    if (Medicine.medicationName === "") {
      error.medicationName = "Please enter the medicine name";
    }
    
    if (Medicine.time === "") { 
      error.time = "Time is required";
    }
  
    if (Medicine.begin === "") {
      error.begin = "start date is required";
    }
  
    if (Medicine.end === "") {
      error.end = "end date is required"; 
    }
  
    return error;
  }


  /** then finaly  we can send the update value */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsafter = validet(); 
    if (Object.keys(errorsafter).length > 0) {
        setFieldErrors(errorsafter);
        return; 
    }
    setLoading(true); 
    setLoading(true);
 
    setSuccess("");

    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const idbaby = cookie.get("activebaby");

    try {
      const res = await axios.put( `https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}/${id}`,
        Medicine,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      console.log(res)
     
      setSuccess("Medicine update successfully!");
      setTimeout(() => {
        close()
      }, 2000); 
        getallreminders()
    
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });
        setFieldErrors(formattedErrors);
      }else {
        seterrorpost({ error: "Oops something went wrong, please try again" });
       
    }
    } finally {
      setLoading(false);
    }
  };
   const isMobile = useMediaQuery("(max-width:600px)");
  const [focused, setFocused] = useState(false);

      return (
        <div>
          <div className={`Addbaby addmedicine ${showAnim ? ' scale-in addmedicine Addbaby' : ''}${isClosing ? ' closingaddbaby addmedicine Addbaby' : ''}`}>
            <div className="NameBabyTitle medicine-img">
                   <div className="close" onClick={() => {
                                                setIsClosing(true);
                                                setShowAnim(false)
                                                      setTimeout(() => {
                                                          if(close) close();
                                                      }, 500);
                                                  }}>
                                            <IoMdCloseCircleOutline className='closecircle'/>
                                        </div>
              <div className="img">
                <img src={babymedicine} alt="img" />
              </div>
            </div>
            <div className="add-medicine-paragraph">
            <p  style={{ textAlign: "center" }}>Update Medicine</p>
    
            </div>
           
            <div className="medicine-form">
              <form className="name-baby-form medicine-form" onSubmit={handleSubmit} >
                <div className="medicine-name">
                  <AiOutlineMedicineBox className="medicine-bottle" />
                  <input
                    type="text"
                    name="medicationName"
                    className="medicationName"
                    value={Medicine.medicationName}
                    onChange={handleChange}
                    placeholder="Medicine Name"
                  
                  />
                </div>
    
                {fieldErrors.medicationName && (
                  <span className="error-medicne" style={{ color: "red" }}>{fieldErrors.medicationName}</span>
                )}
    
                {/* <div className="time">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        label="When to take"
                        value={Medicine.time ? dayjs(Medicine.time, 'HH:mm') : null} 
                        onChange={(newValue) => handleTimeChange("time", newValue)}
                        format="HH:mm" 
                        className="timebacker"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div> */}
                     <div className="time" style={{position:'relative', width:'100%'}}>
              {isMobile ? (
                <>
                
                  <div className="clockinput">

              
                  <LocalizationProvider dateAdapter={AdapterDayjs}
                  >
  <MobileTimePicker
    label="When to take"
    value={Medicine.time ? dayjs(`2000-01-01T${Medicine.time}`) : null}
    onChange={(newValue) => handleTimeChange("time", newValue)}
    format="HH:mm"
    slotProps={{
      textField: {
        fullWidth: true,
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <FaClock style={{ color: "#418FBF" }} />
            </InputAdornment>
          ),
        },
        sx: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            minHeight: '30px',
            fontSize: '16px',
            background: '#fff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1.8px solid #418FBF !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1.8px solid #418FBF !important',
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1.8px solid #418FBF !important',
          },
          '& .MuiInputLabel-root': {
            color: '#1976d2',
            fontSize: '16px',
          },
          '& .MuiInputLabel-shrink': {
            fontSize: '16px',
            color: '#1565c0',
          },
          '& .MuiInputBase-input': {
            border: '1px solid transparent !important',
          }
        }
      }
    }}
  />
                    </LocalizationProvider>
                        </div>
                </>
             
              ) : (
                <div className={`custom-input-wrapper ${focused || Medicine.time ? "focused" : ""}`}> 
                  <input
                    type="time"
                    name="time"
                    value={Medicine.time}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="custom-time-input"
                    id="custom-time"
                    required
                  />
                  <label htmlFor="custom-time" className="floating-label">
                    When to take
                  </label>
                </div>
              )}
            </div>
    
                {fieldErrors.time && (
                  <span className="error-medicne" style={{ color: "red" }}>{fieldErrors.time}</span>
                )}
    
                <div className="date">
                  <div style={{ position: "relative", display: "inline-block" }}>
               <MdOutlineDateRange className="custom-date-icon" />
                    <DatePicker
                      name="begin"
                      selected={Medicine.begin}
                      onChange={(date) => handleDateChange(date, "begin")}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Start"
                      isClearable
                      showPopperArrow={false}
                      popperPlacement="top"
                      customInput={
                        <input
                          className="custom-date-input"
                          style={{
                            paddingLeft: "55px",
                          }}
                        />
                      }
                    />
                  </div>
    
                  <div style={{ position: "relative", display: "inline-block" }}>
                 <MdOutlineDateRange className="custom-date-icon" />
                    <DatePicker
                      name="end"
                      selected={Medicine.end}
                      onChange={(date) => handleDateChange(date, "end")}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Finish"
                      isClearable
                      showPopperArrow={false}
                      popperPlacement="top"
                      customInput={
                        <input
                          className="custom-date-input"
                          style={{
                            paddingLeft: "55px",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
    
               
    
               
                {fieldErrors.begin && (
                  <span  className="error-medicne" style={{ color: "red" }}>{fieldErrors.begin}</span>
                )}
                {fieldErrors.end && (
                  <span  className ="error-medicne"style={{ color: "red" }}>{fieldErrors.end}</span>
                  )}
                   
    
                 <button
                  type="button"
                  className="submit-button save-reminders"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? <div className="spinner-small"></div> : "update Reminder"}
                </button> 
              </form>
          
              {success && 
                <div style={{display: "flex", justifyContent: "center", paddingBottom:"5px"}}>
                <span style={{ color: "green" ,textAlign:"center"}}>{success}</span>
                </div>}
              {errorpost &&
                <div style={{display: "flex", justifyContent: "center", paddingBottom:"5px"}}>
                  <span style={{ color: "red", textAlign: "center",  }}> {errorpost.error}</span>
                  </div>} 
            </div>
          </div>
        
        </div>
      );
}