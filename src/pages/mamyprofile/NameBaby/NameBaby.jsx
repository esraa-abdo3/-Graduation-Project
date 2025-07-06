import './NameBaby.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../NameBaby/NameBaby.css";
import { BabyContext } from "../../../context/BabyContext";
import addProfileImg from '../../../assets/userprofile.jpg';
import PropTypes from 'prop-types';
import { IoMdCloseCircleOutline } from "react-icons/io";
NameBaby.propTypes = {
    close: PropTypes.func.isRequired
};
export default function NameBaby({close}) {
    const [babyData, setBabyData] = useState({
        name: "",
        weightEntry: "",
        heightEntry: "",
        dateOfBirthOfBaby: "",
        gender: "",
    });
    
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState("");
    const Navigate = useNavigate();
    const [imgGender] = useState(addProfileImg);
    const [bgColorFont, setBgColorFont] = useState('linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)');
    const [bgColor, setBgColor] = useState('linear-gradient(180deg, #418FBF 0%, #948EC3 30%, #E68CC7 55%, #F3C6E3 80%, #FFFFFF 100%)');
    const [inputBorderColor, setInputBorderColor] = useState('linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)');
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [babyImage, setBabyImage] = useState(null);
    const [babyImagePreview, setBabyImagePreview] = useState(null);
    const fileInputRef = useRef();
    const [isClosing, setIsClosing] = useState(false);
    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        // Trigger scale-in animation on mount
        setShowAnim(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBabyData({ ...babyData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: "" }); 
    };
    
    const handleGenderChange = (e) => {
        const gender = e.target.value;
        setBabyData({ ...babyData, gender });
        if (e.target.value === 'Female') {
            setBgColor('linear-gradient(180deg, #DC5AB0 0%, #E483C3 25%, #ECABD6 50%, #F4D3E9 75%, #F8E7F2 87.5%, #FAF2F7 93.75%, #FCFCFC 100%)');
            setBgColorFont('#E68CC7');
            setInputBorderColor('#E68CC7');
            // setImgGender(namebabyGirl); 
        } else if (e.target.value === 'Male') {
            setBgColor('linear-gradient(180deg, #0A6AA6 0%, #468EBB 25%, #83B3D1 50%, #BFD7E6 75%, #DDE9F1 87.5%, #ECF2F6 93.75%, #FCFCFC 100%)');
            setBgColorFont('#0A6AA6');
            setInputBorderColor('#0A6AA6');
            // setImgGender(namebabyBoy);
        } else {
            setBgColor('linear-gradient(180deg, #0A6AA6 0%, #468EBB 25%, #83B3D1 50%, #BFD7E6 75%, #DDE9F1 87.5%, #ECF2F6 93.75%, #FCFCFC 100%)');
            setBgColorFont('#999999');
            setInputBorderColor('#CCCCCC');
            // setImgGender(namebabyimg); 
        }
    };
    const {  handleActiveBabyChange } = useContext(BabyContext);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBabyImage(file);
            setBabyImagePreview(URL.createObjectURL(file));
        }
    };
    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setFieldErrors({});
//         setSuccess("");
//         console.log("📦 البيانات اللي هتتبعت:");
// console.log("🍼 babyData:", babyData);
// console.log("📸 babyImage:", babyImage);

//         try {
//             let res;
//             if (babyImage) {
//                 const formData = new FormData();
//                 Object.entries(babyData).forEach(([key, value]) => {
//                     formData.append(key, value);
//                 });
//                 formData.append("image", babyImage);
//                 res = await axios.post('https://carenest-serverside.vercel.app/babies', formData, {
//                     headers: {
//                         "Authorization":` ${gettoken}`,
//                         'Content-Type': 'multipart/form-data',
//                     }
//                 });
//             } else {
//                 res = await axios.post('https://carenest-serverside.vercel.app/babies', babyData, {
//                     headers: {
//                         "Authorization":` ${gettoken}`
//                     }
//                 });
//             }
//             console.log(res)
//             setSuccess("Baby added successfully!");
//             cookie.set("activebaby", res.data.data._id);
//             handleActiveBabyChange(res.data.data._id)
//             handleGetIdBaby(res.data.data._id);
//             Navigate('/mainhome');
//         } catch (err) {
//             console.log(err)
//             if (err.response && err.response.data && err.response.data.errors) {
//                 const errors = err.response.data.errors;
//                 const formattedErrors = {};
//                 errors.forEach(error => {
//                     formattedErrors[error.path] = error.msg;  
//                 });
//                 setFieldErrors(formattedErrors);
//             } else {
//                 console.error("Error:", err);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
       
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setSuccess("");

    try {
        let res;

        // نحضّر نسخة من البيانات ونتأكد إن التاريخ سترينج بصيغة YYYY-MM-DD
        const updatedBabyData = {
            ...babyData,
            dateOfBirthOfBaby:
                babyData.dateOfBirthOfBaby instanceof Date
                    ? babyData.dateOfBirthOfBaby.toISOString().split("T")[0]
                    : babyData.dateOfBirthOfBaby
        };

        console.log("📦 البيانات اللي هتتبعت:");
        console.log("🍼 babyData:", updatedBabyData);
        console.log("📸 babyImage:", babyImage);

        if (babyImage) {
            const formData = new FormData();
            Object.entries(updatedBabyData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append("image", babyImage);

            res = await axios.post(
                "https://carenest-serverside.vercel.app/babies",
                formData,
                {
                    headers: {
                        Authorization: ` ${gettoken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } else {
            res = await axios.post(
                "https://carenest-serverside.vercel.app/babies",
                updatedBabyData,
                {
                    headers: {
                        Authorization: ` ${gettoken}`,
                    },
                }
            );
        }

        console.log(res);
        setSuccess("Baby added successfully!");
        cookie.set("activebaby", res.data.data._id);
        handleActiveBabyChange(res.data.data._id);
        handleGetIdBaby(res.data.data._id);
        Navigate("/mainhome");
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            const formattedErrors = {};
            errors.forEach((error) => {
                formattedErrors[error.path] = error.msg;
            });
            setFieldErrors(formattedErrors);
        } else {
            console.error("Error:", err);
        }
    } finally {
        setLoading(false);
    }
};

    async function handleGetIdBaby(id) {
        cookie.set("activebaby", id);
        try {
            let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${id}`, {
                headers: {
                    Authorization: `${gettoken}`
                }
            });
            cookie.set("babyname-active", response.data.data.name);
        } catch (err) {
            console.log("Error fetching baby details:", err);
        }
    }
    

    return (

        <div>
   
            
            <div className={`Addbaby babybname${showAnim ? ' scale-in' : ''}${isClosing ? ' closingaddbaby' : ''}`}>
          
                <div className="NameBabyTitle" style={{ background: bgColor }}>
                          <div className="close" onClick={() => {
                        setIsClosing(true);
                        setShowAnim(false)
                              setTimeout(() => {
                                  close();
                              }, 500);
                          }}>
                    <IoMdCloseCircleOutline className='closecircle'/>
                </div>
                    <div className="bg-nameimgbaby upload-baby-img" onClick={handleImageClick} style={{cursor:'pointer', position:'relative'}}>
                        <img src={babyImagePreview || imgGender} alt="Baby" style={{borderRadius:'50%', objectFit:'cover', width:'100%', height:'100%'}} />
                        <input type="file" accept="image/*" ref={fileInputRef} style={{display:'none'}} onChange={handleImageChange} />
                        <span className="camera-icon-overlay"style={{
  color: babyData.gender === "Male" ? "#0A6AA6" : "#F488B8",
  borderColor: babyData.gender === "Male" ? "#0A6AA6" : "#F488B8"
}}
><i className="fa-solid fa-camera"></i></span>
                    </div>
                    {/* <h2>Baby's profile</h2> */}
                </div>
                <div className="name-baby">
                    <form className="name-baby-form" onSubmit={handleSubmit}>
                        <div className='posIcon'>
                        <i
  className={`fa-regular fa-face-grin iconn ${
    babyData.gender === ""
      ? "mexcolor"
      : babyData.gender === "Male"
      ? "boycolor"
      : "girlcolor"
  }`}
></i>

                            <input
                                
                                name="name"
                                value={babyData.name}
                                onChange={handleChange}
                                placeholder="Baby Name"
                                className={`${
                                    babyData.gender === "" ? "mexinput" : babyData.gender === "Male" ? "boy-placeholder" : "girl-placeholder"
                                }`}
                                style={{
                                    borderColor: inputBorderColor,
                                    color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                                
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}
                        
                        <div className='posIcon'>
                            <i className={`fa-regular fa-calendar-days icodate ${babyData.gender === "" ? "mexcolor" : babyData.gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                            {/* <DatePicker
    selected={babyData.dateOfBirthOfBaby ? new Date(babyData.dateOfBirthOfBaby) : null}
    onChange={(date) => handleChange({ target: { name: "dateOfBirthOfBaby", value: date } })}
    dateFormat="yyyy-MM-dd"
    isClearable
    placeholderText={
        babyData.gender === ""
            ? "Date Of Birth" 
            : babyData.gender === "Male"
            ? "Date Of Birth" 
                : "Date Of Birth"
        
    }
    className={`${
        babyData.gender === "" ? "mexinput" : babyData.gender === "Male" ? "boy-placeholder" : "girl-placeholder"
    }`}
    style={{
        borderColor: inputBorderColor,
          color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                                
    }}
    required
/> */}
                            <DatePicker
  selected={babyData.dateOfBirthOfBaby ? new Date(babyData.dateOfBirthOfBaby) : null}
  onChange={(date) =>
    handleChange({ target: { name: "dateOfBirthOfBaby", value: date } })
  }
  dateFormat="yyyy-MM-dd"
  isClearable
  placeholderText="Date Of Birth"
  className={`datepicker-input ${
    babyData.gender === ""
      ? ""
      : babyData.gender === "Male"
      ? "boy-placeholder"
      : "girl-placeholder"
  }`}
  style={{
    borderColor: inputBorderColor,
    color:
      babyData.gender === "Male"
        ? "#0A6AA6"
        : babyData.gender === "Female"
        ? "#F488B8"
        : "black",
  }}
  required
/>




                        </div>
                        {fieldErrors.dateOfBirthOfBaby && <span style={{ color: "red" }}>{fieldErrors.dateOfBirthOfBaby}</span>}

                        <div className="measurements">
                            <div className='posIcon'>
                                <i className={`fa-solid fa-weight-scale iconn ${babyData.gender === "" ? "mexcolor" : babyData.gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                                <input
                                    type="number"
                                    name="weightEntry"
                                    value={babyData.weightEntry}
                                    onChange={handleChange}
                                    placeholder="Weight (kg)"
                                    className={`${
                                        babyData.gender === "" ? "mexinput" : babyData.gender === "Male" ? "boy-placeholder" : "girl-placeholder"
                                    }`}
                                    style={{
                                        borderColor: inputBorderColor,
                                        paddingLeft: "40px",
                                       color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                                        
                                    }}
                                    required
                                />
                            </div>
                            <div className='posIcon'>
                                <i className={`fa-solid fa-arrows-alt-v iconn ${babyData.gender === "" ? "mexcolor" : babyData.gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                                <input
                                    type="number"
                                    name="heightEntry"
                                    value={babyData.heightEntry}
                                    onChange={handleChange}
                                    placeholder="Height (cm)"
                                    className={`${
                                        babyData.gender === "" ? "mexinput" : babyData.gender === "Male" ? "boy-placeholder" : "girl-placeholder"
                                    }`}
                                    style={{
                                        borderColor: inputBorderColor,
                                        color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                                     
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        {fieldErrors.weight && <span style={{ color: "red" }}>{fieldErrors.weight}</span>}
                        {fieldErrors.height && <span style={{ color: "red" }}>{fieldErrors.height}</span>}

                        <div className="gender">
                            <label className={`${babyData.gender === "" ? "genderr" : babyData.gender === "Male" ? "boycolor" : "girlcolor"}`
                            } style={{
                                color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                            }}>
                                Gender:</label>
                            <div>
                                <label style={{ color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"#999"}}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        onChange={handleGenderChange}
                                        className="radioGirl"
                                        style={{
                                            accentColor: " #DC5AB0",
                                            color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"black"
                                        }}
                                    />{" "}
                                    Girl
                                </label>
                                <label style={{ color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"#999"}}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        onChange={handleGenderChange}
                                        style={{
                                            accentColor: "#418FBF",
                                            color:babyData.gender==="Male"?"#0A6AA6": babyData.gender=="Female"?"#F488B8":"#999"
                                        }}
                                    />{" "}
                                    Boy
                                </label>
                            </div>
                        </div>
                        {fieldErrors.gender && <span style={{ color: "red" }}>{fieldErrors.gender}</span>}
                        <button
                            type="submit"
                            className="submit-button"
                            style={{ background: bgColorFont }}
                            disabled={loading}
                        >
                            {loading ? <div className="spinner-small"></div> : "Add Baby"}
                        </button>
                    </form>
                    {success && <span style={{ color: "green" }}>{success}</span>}
                </div>
            </div>
        </div>
    );


}