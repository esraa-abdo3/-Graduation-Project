import { useEffect, useState } from "react";
import babymedicine from "../../../../assets/babymedicine.png";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Addmedicine.css";
import DatePicker from "react-datepicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import "../../my babies/Addbabies.css"
import axios from "axios";
import dayjs from 'dayjs'; 
import PropTypes from "prop-types";
import { IoMdCloseCircleOutline } from "react-icons/io";

AddMedicine.propTypes = {
    close: PropTypes.func.isRequired
};
export default function AddMedicine({close}) {
  const [Medicine, setMedicine] = useState({
    medicationName: "",
    time: "",
    begin: "",
    end: "",
  });
   const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");
  const[errorpost, seterrorpost] = useState({});
  const Navigate = useNavigate();
      const [isClosing, setIsClosing] = useState(false);
      const [showAnim, setShowAnim] = useState(false);
  
      useEffect(() => {
          // Trigger scale-in animation on mount
          setShowAnim(true);
      }, []);

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
  function validet() {
    const error = {};
  
    if (Medicine.medicationName === "") {
      error.medicationName = "Please enter the medicine name";
    }
    
    if (Medicine.time === "" ) { 
      error.time = "Time is required";
    }
  
    if (Medicine.begin === "" || Medicine.end === "") {
      error.begin = "start date and end date is required";
    } else {
      // تحقق أن البداية اليوم أو بعد اليوم
      const today = new Date();
      today.setHours(0,0,0,0);
      const start = new Date(Medicine.begin);
      const end = new Date(Medicine.end);
      if (start < today) {
        error.begin = "Start date must be today or later";
      } else if (end <= start) {
        error.begin = "End date must be after start date";
      }
    }

    return error;
  }
  

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
    console.log('idBaby:', idbaby);

    try {
      /*const res =*/ await axios.post(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}`,
        Medicine,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
     
      setSuccess("Medicine Added successfully!");
      setTimeout(() => {
        Navigate("/reminders"); 
    }, 2000); 
    
    } catch (err) {
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
        <p  style={{  fontFamily:"poppins"}}>Reminders for Medicine</p>

        </div>
       
        <div className="medicine-form">
          <form className="name-baby-form medicine-form" onSubmit={handleSubmit}>
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

            <div className="time">
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
            </div>

            {fieldErrors.time && (
              <span className="error-medicne" style={{ color: "red" }}>{fieldErrors.time}</span>
            )}

            <div className="date">
              <div style={{ position: "relative", display: "inline-block" }}>
                <MdOutlineDateRange
                  style={{
                    position: "absolute",
                    left: "10%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#418FBF",
                    pointerEvents: "none",
                    zIndex: "10000000000",
                    fontSize: "20px"
                  }}
                />
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
                <MdOutlineDateRange
                  style={{
                    position: "absolute",
                    left: "10%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#418FBF",
                    pointerEvents: "none",
                    zIndex: "10000000000",
                    fontSize: "20px"
                  }}
                />
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
         

            <button
              type="submit"
              className="submit-button save-reminders"
              disabled={loading}
            >
              {loading ? <div className="spinner-small"></div> : "Make Reminder"}
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
