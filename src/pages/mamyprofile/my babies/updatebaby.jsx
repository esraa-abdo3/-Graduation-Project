import { useEffect, useState } from "react";
import namebabyimg from '../../../assets/Group 85 (1).png';
import namebabyBoy from '../../../assets/boy.png';
import namebabyGirl from '../../../assets/Group 81 (1).png';
import axios from "axios";
import Cookies from "universal-cookie"; 
import { useNavigate, useParams } from "react-router-dom";
import "../NameBaby/NameBaby.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import addProfileImg from '../../../assets/userprofile.jpg';
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";


Babydetails.propTypes = {
    close: PropTypes.func.isRequired,
    idbaby: PropTypes.string,
};
export default function Babydetails({close, idbaby: idbabyProp}) {
    const params = useParams();
    const idbaby = idbabyProp || params.idbaby;
    console.log(idbaby);
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [loading, setLoading] = useState(false);
    const [selectloadding, setselectLoadding] = useState(true);
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState("");
    const Navigate = useNavigate();
    const [imgGender, setImgGender] = useState(namebabyimg);
    const [bgColorFont, setBgColorFont] = useState("");
    const [bgColor, setBgColor] = useState("linear-gradient(180deg, #418FBF 0%, #948EC3 30%, #E68CC7 55%, #F3C6E3 80%, #FFFFFF 100%)");
    const [inputBorderColor, setInputBorderColor] = useState("");
    const [initialData, setinitialData] = useState({
        name: "",
        weight: "",
        height: "",
        dateOfBirthOfBaby: "",
   
    });
   
    const [babyData, setBabyData] = useState({
        name: "",
        weight: "",
        height: "",
        dateOfBirthOfBaby: "",
        ...initialData, 
    });

   
    const [gender, setgender] = useState("");
    const [isClosing, setIsClosing] = useState(false);
    const [babyImage, setBabyImage] = useState(null);
    const [babyImagePreview, setBabyImagePreview] = useState(null);
    const fileInputRef = useRef();
    const [showAnim, setShowAnim] = useState(false);
    useEffect(() => { setShowAnim(true); }, []);
  
  /// change style
    useEffect(() => {
        if (gender === "Female") {
            setBgColor('linear-gradient(180deg, #DC5AB0 0%, #E483C3 25%, #ECABD6 50%, #F4D3E9 75%, #F8E7F2 87.5%, #FAF2F7 93.75%, #FCFCFC 100%)');
            setBgColorFont("#E68CC7");
            setInputBorderColor("#E68CC7");
            setImgGender(namebabyGirl);
        } else if (gender === "Male") {
            setBgColor('linear-gradient(180deg, #0A6AA6 0%, #468EBB 25%, #83B3D1 50%, #BFD7E6 75%, #DDE9F1 87.5%, #ECF2F6 93.75%, #FCFCFC 100%)');
            setBgColorFont("#418FBF");
            setInputBorderColor("#418FBF");
            setImgGender(namebabyBoy);
        } else {
            setImgGender(namebabyimg);
        }
    }, [gender]);
 
 // get getBabyData
    useEffect(() => {
        async function getBabyData() {
            setselectLoadding(true);
            try {
                let response = await axios.get(
                    `https://carenest-serverside.vercel.app/babies/${idbaby}`,
                    {
                        headers: {
                            Authorization: `${gettoken}`,
                        },
                    }
                );
                console.log("babydata",response.data)
                setselectLoadding(false);
    
                const baby = response.data.data;     
                const formattedDate = baby.birthDay
                    ? new Date(baby.birthDay).toISOString().split("T")[0]
                    : "";
                const lastHeight = baby.height
                    .filter((item) => item.height !== null)
                    .pop()?.height || ""; 
                const lastWeight = baby.weight
                    .filter((item) => item.weight !== null) 
                    .pop()?.weight || ""; 
                setinitialData({
                    name: baby.name,
                    weight: lastWeight,
                    height: lastHeight,
                    dateOfBirthOfBaby: formattedDate,
                    imageUrl: response.data.data.babyImage,
                });
    
                setgender(baby.gender);
            } catch (error) {
                console.log("Error fetching baby details:", error);
                setselectLoadding(false);
            }
        }
      
        getBabyData();
    }, [idbaby, gettoken]);
    
  

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            const formattedDate = initialData.dateOfBirthOfBaby ? new Date(initialData.dateOfBirthOfBaby).toISOString().split('T')[0] : "";
            setBabyData(prevState => ({
                ...prevState,
                ...initialData,
                dateOfBirthOfBaby: formattedDate, 
            }));
            // set preview image if available
            if (initialData.imageUrl) {
                setBabyImagePreview(initialData.imageUrl);
            } else {
                setBabyImagePreview(addProfileImg);
            }
        }
    }, [initialData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBabyData(prevState => ({
            ...prevState,
            [name]: (name === "weight" || name === "height") ? Number(value) || "" : value 
        }));
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (e.g., 2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                window.alert("Image size is too large. Please select an image smaller than 2MB.");
                return;
            }
            setBabyImage(file);
            setBabyImagePreview(URL.createObjectURL(file));
        }
    };
    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        setSuccess("");

        try {
            const formData = new FormData();
            const changedDataForLog = {};

            // Find changed textual data and append to formData
            Object.keys(babyData).forEach(key => {
                // Trim strings for comparison to avoid issues with whitespace
                const currentValue = typeof babyData[key] === 'string' ? babyData[key].trim() : babyData[key];
                const initialValue = typeof initialData[key] === 'string' ? initialData[key].trim() : initialData[key];

                if (currentValue !== initialValue) {
                    formData.append(key, currentValue);
                    changedDataForLog[key] = currentValue;
                }
            });

            // Append the new image file if it exists
            if (babyImage) {
                formData.append("image", babyImage);
                changedDataForLog.image = babyImage.name; // For logging purposes
            }

            // Check if there are any changes to submit
            // The `entries().next().done` is a way to check if FormData is empty without iterating through all entries.
            if (formData.entries().next().done) {
                setSuccess("No changes to update.");
                setLoading(false);
                return;
            }

            // Log the data being sent to the backend
            console.log("Data being sent to backend (for logging):", changedDataForLog);

            // Log the actual FormData content
            console.log("--- Actual FormData Content ---");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            console.log("-----------------------------");

            const hasTextChanges = Object.keys(changedDataForLog).some(key => key !== 'image');

            let res;
            if (babyImage) {
                // If there's an image, always send as FormData to the new endpoint
                const url = `https://carenest-serverside.vercel.app/babies/${idbaby}`;
                console.log(`Sending image update to: ${url}`);
                res = await axios.put(url, formData, {
                    headers: { Authorization: `${gettoken}` },
                });
            } else if (hasTextChanges) {
                // If only text changes, send as JSON to the original endpoint
                const url = `https://carenest-serverside.vercel.app/babies/${idbaby}`;
                console.log(`Sending text update to: ${url}`);
                // We need to send the object with changed data, not the whole formData
                const textDataToSend = {};
                for (const key in changedDataForLog) {
                    if (key !== 'image') {
                        textDataToSend[key] = changedDataForLog[key];
                    }
                }
                console.log("Sending this data (JSON):", textDataToSend);
                res = await axios.put(url, textDataToSend, {
                    headers: { Authorization: `${gettoken}` },
                });
            }

            // After the request, log the response
            if(res) console.log("Response from backend:", res);

            const updatedData = { ...initialData, ...babyData };
            if (babyImagePreview) {
                updatedData.imageUrl = babyImagePreview;
            }
            setinitialData(updatedData);

            setSuccess( "Baby updated successfully!");
            setTimeout(() => {
                Navigate("/mainhome");
            }, 2000);
        } catch (err) {
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

    return (
        <div>
            <div className={`Addbaby babybname${showAnim ? ' scale-in' : ''}${isClosing ? ' closingaddbaby' : ''}`} style={{borderRadius:'8px'}}> 
                {selectloadding ? (
                    <div className="updatebabyloader">
                        <div
                            className="titleloader"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background: 'linear-gradient(180deg, #e5e5e5 0%, #f0f0f0 50%, #fcfcfc 100%)',
                                color: "#999",
                             
                            
                                position: "relative"
                            }}
                        >
                            <div className="close" style={{ position: "absolute", left: 20, top: 20, cursor: "pointer", zIndex: 10, color:"white" , fontSize:"25px"}}
                                onClick={() => {
                                    setIsClosing(true);
                                    setShowAnim(false);
                                    setTimeout(() => { close(); }, 500);
                                }}
                            >
                                <IoMdCloseCircleOutline className='closecircle' />
                            </div>
                            <img src={addProfileImg} />
                            <p className="namebabyloader" style={{ height: 30, width: 180, background: "#e5e5e5", borderRadius: 8, margin: 0 }}></p>
                        </div>
                        <div className="babyloader-names"></div>
                        <div className="babyloaderdate"></div>
                        <div className="babyloaderweight">
                            <p></p>
                            <p></p>
                        </div>
                        <div className="babyloadergender">
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                ) : (
                        <>
                      <div className="NameBabyTitle" style={{ background: bgColor , display:"flex" , flexDirection:"column" }}>
                    <div className="close" onClick={() => {
                        setIsClosing(true);
                        setShowAnim(false);
                        setTimeout(() => { close(); }, 500);
                    }}>
                        <IoMdCloseCircleOutline className='closecircle'/>
                    </div>
                    <div className="bg-nameimgbaby upload-baby-img" onClick={handleImageClick} style={{cursor:'pointer', position:'relative'}}>
                        <img src={babyImagePreview  || addProfileImg} alt="Baby" style={{borderRadius:'50%', objectFit:'cover', width:'100%', height:'100%'}} />
                        <input type="file" accept="image/*" ref={fileInputRef} style={{display:'none'}} onChange={handleImageChange} />
                        <span className="camera-icon-overlay" style={{
                            color: gender === "Male" ? "#0A6AA6" : "#F488B8",
                            borderColor: gender === "Male" ? "#0A6AA6" : "#F488B8"
                        }}><i className="fa-solid fa-camera"></i></span>
                    </div>
                    <h2 className="updatebabyname" style={{ color: gender === "Male" ? "#0A6AA6" : "#F488B8" }}> { initialData.name} 'profile</h2>
                </div>
                <div className="name-baby">
                    <form className="name-baby-form" onSubmit={handleSubmit}>
                        <div className='posIcon'>
                            <i className={`fa-regular fa-face-grin iconn ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                            <input
                                type="text"
                                name="name"
                                value={babyData.name}
                                onChange={handleChange}
                                placeholder="Baby Name"
                                style={{ borderColor: inputBorderColor, color: bgColorFont }}
                                required
                            />
                        </div>
                        {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}
                        <div className='posIcon'>
                            <i className={`fa-regular fa-calendar-days icodate ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                            <DatePicker
                                selected={babyData.dateOfBirthOfBaby ? new Date(babyData.dateOfBirthOfBaby) : null}
                                onChange={(date) => setBabyData({ ...babyData, dateOfBirthOfBaby: date ? date.toISOString().split('T')[0] : "" })}
                                dateFormat="yyyy-MM-dd"
                                className={gender === "Male" ? "boycolor boy-placeholder" : "girlcolor girl-placeholder"}
                            />
                        </div>
                        {fieldErrors.dateOfBirthOfBaby && <span style={{ color: "red" }}>{fieldErrors.dateOfBirthOfBaby}</span>}
                        <div className="measurements">
                            <div className='posIcon'>
                                <i className={`fa-solid fa-weight-scale iconn ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                                <input
                                    type="number"
                                    name="weight"
                                    value={babyData.weight}
                                    onChange={handleChange}
                                    placeholder="Weight (kg)"
                                    style={{ borderColor: inputBorderColor, color: bgColorFont, paddingLeft: "40px" }}
                                    required
                                />
                            </div>
                            <div className='posIcon'>
                                <i className={`fa-solid fa-arrows-alt-v iconn ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                                <input
                                    type="number"
                                    name="height"
                                    value={babyData.height}
                                    onChange={handleChange}
                                    placeholder="Height (cm)"
                                    style={{ borderColor: inputBorderColor, color: bgColorFont }}
                                    required
                                />
                            </div>
                        </div>
                        {fieldErrors.weight && <span style={{ color: "red" }}>{fieldErrors.weight}</span>}
                        {fieldErrors.height && <span style={{ color: "red" }}>{fieldErrors.height}</span>}
                        <div className="gender">
                            <label className="genderr " style={{ color: gender === "Male" ? "#0A6AA6" : "#F488B8" }}
 >Gender:</label>
                            <div>
                                <label  style={{ color: gender === "Male" ? "#0A6AA6" : "#F488B8" }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={gender === "Female"}
                                        onChange={handleChange}
                                        className="radioGirl"
                                        disabled
                                       
                                    /> Girl
                                </label>
                                <label style={{ color: gender === "Male" ? "#0A6AA6" : "#F488B8" }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={gender === "Male"}
                                        onChange={handleChange}
                                        disabled
                                        
                                        
                                    /> Boy
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
                            {loading ? <div className="spinner-small"></div> : "Save"}
                        </button>
                    </form>
                    {success && <span style={{ color: "green" }}>{success}</span>}
                </div>
                </>   
                )}
             
              
            </div>
        </div>
    );
}





