import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import "./MyProfie.css";
import axios from "axios";
import addProfileImg from '../../../../assets/userprofile.jpg';
import { CiEdit } from "react-icons/ci";

export default function Myprofile() {
        const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const [babyImagePreview, setBabyImagePreview] = useState(null);
    const fileInputRef = useRef();
    const [imgGender] = useState(addProfileImg);
    const [babyImage, setBabyImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [updatedone, setupdatedone] = useState("");
    const [updatefail, setupdatefail] = useState("");

    const [mamyinfo, setmamyinfo] = useState({
        firstName: "",
        lastName: "",
        Email: "",
        dateOfBirthOfMam: "",
    }); 


    const [originalData, setOriginalData] = useState({});
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dateOfBirthRef = useRef();

useEffect(() => {
    async function getmamydetalis() {
        setloading(true)
        try {
            const res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
                headers: { Authorization: `${gettoken}` }
            });
setloading(false)
            const updatedMamyInfo = {
                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
                dateOfBirthOfMam: res.data.data.BirthDay,
                Email: res.data.data.Email,
            };

            setmamyinfo(updatedMamyInfo);
            setOriginalData(updatedMamyInfo); // 🆕
            setBabyImagePreview(res.data.data.image || addProfileImg);
        } catch (error) {
            console.log(error);
            setloading(false)
        }
    }
    getmamydetalis();
}, [gettoken]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setmamyinfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBabyImage(file);
            setBabyImagePreview(URL.createObjectURL(file));
        }
    };
async function handleupdate() {
    setloading(true);

    try {
        const changedData = {};
        Object.keys(originalData).forEach((key) => {
            if (mamyinfo[key] !== originalData[key]) {
                changedData[key] = mamyinfo[key];
            }
        });

        if (Object.keys(changedData).length === 0 && !babyImage) {
            setloading(false);
            setupdatedone("No changes to update.");
            setTimeout(() => setupdatedone(""), 2000);
            return;
        }

        if (Object.keys(changedData).length > 0) {
            console.log("Changed fields being sent:", Object.keys(changedData));
            for (let key in changedData) {
                console.log(key, changedData[key]);
            }

            await axios.put(
                "https://carenest-serverside.vercel.app/users/updateMe",
                changedData,
                {
                    headers: {
                        Authorization: `${gettoken}`
                    },
                }
            );
        }

        // إرسال الصورة في طلب منفصل إذا تم تغييرها
        if (babyImage) {
            const formData = new FormData();
            formData.append("image", babyImage);
            await axios.put(
                "https://carenest-serverside.vercel.app/users/updateImage",
                formData,
                {
                    headers: {
                        Authorization: `${gettoken}`
                    },
                }
            );
        }

        setloading(false);
        setupdatedone("Profile updated successfully ✅");
        setTimeout(() => setupdatedone(""), 2000);
    } catch (error) {
        console.error("Update error:", error);
        setloading(false);
        setupdatefail("Update failed. Please try again ❌");
        setTimeout(() => setupdatefail(""), 2000);
    }
}




    return (
        <div className="MyProfile">
            {
                loading ? (
                    <div className="loader-account">
                        <div className="img-loading-account">
                        </div>
                             <div className="names-loading-account">
                            <p></p>
                            <p></p>
                        </div>
                             <div className="birth-loading-account">
                        </div>
                             <div className="birth-loading-account">
                        </div>
                          
                        </div>

                )
                    : (
                              <div className="basicdetalis">
                <div className="bg-nameimgbaby upload-baby-img" onClick={handleImageClick} style={{cursor:'pointer', position:'relative'}}>
                    <img src={babyImagePreview || imgGender} alt="Baby" style={{borderRadius:'50%', objectFit:'cover', width:'100%', height:'100%'}} />
                    <input type="file" accept="image/*" ref={fileInputRef} style={{display:'none'}} onChange={handleImageChange} />
                    <span className="camera-icon-overlay"><i className="fa-solid fa-camera"></i></span>
                </div>
                <div className="namesmama">
                    <div className="firstname">
                        <span onClick={() => firstNameRef.current && firstNameRef.current.focus()} style={{cursor:'pointer'}}> <CiEdit/></span>
                        <label htmlFor=""> first name</label>
                        <input type="text" name="firstName" value={mamyinfo.firstName} onChange={handleChange} ref={firstNameRef}/>
                    </div>
                    <div className="lastname">
                        <span onClick={() => lastNameRef.current && lastNameRef.current.focus()} style={{cursor:'pointer'}}> <CiEdit/></span>
                        <label htmlFor=""> last name</label>
                        <input type="text" name="lastName" value={mamyinfo.lastName} onChange={handleChange} ref={lastNameRef}/>
                    </div>
                </div>
                <div className="mamabirth">
                    <span onClick={() => dateOfBirthRef.current && dateOfBirthRef.current.focus()} style={{cursor:'pointer'}}> <CiEdit/></span>
                    <label htmlFor=""> Date Of Birth</label>
                    <input type="date" name="dateOfBirthOfMam" value={mamyinfo.dateOfBirthOfMam ? new Date(mamyinfo.dateOfBirthOfMam).toISOString().split('T')[0] : ""} onChange={handleChange} ref={dateOfBirthRef} />
                </div>
                <div className="mamaemail">
                    <span> <CiEdit/></span>
                    <label htmlFor="">Email</label>
                    <p className="input">{mamyinfo.Email}</p>
                </div>
                <div className="save-button-container">
                <button className="Save" onClick={handleupdate}>
                        {loading ?  <div className="spinner-small"></div> : "Save"}
                    </button>
                </div>
                {
                    updatedone.length > 0 && (
                        <span className="sucess"> { updatedone}</span>
                    )
                }
                {
                    updatefail.length > 0 && (
                        <span className="fail"> { updatefail}</span>
                    )
                }
            </div>
                        
          )  }
      
        </div>
    )
}
