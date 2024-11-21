import React, { useState } from 'react';
import './NameBaby.css';
import ProfileNav from '../../../Componets/profilenav/ProfileNav';
import namebabyimg from '../../../assets/babyNameImg.png';
import namebabyBoy from '../../../assets/babyNameBoy.png';
import namebabyGirl from '../../../assets/babyNameGirl.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function NameBaby() {
    const [babyData, setBabyData] = useState({
        name: "",
        weight: "",
        height: "",
        dateOfBirthOfBaby: "",
        gender: "",
    });
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [success, setSuccess] = useState("");
    const Navigate= useNavigate();

    const [imgGender, setImgGender] = useState(namebabyimg);
    const [bgColorFont, setBgColorFont] = useState('linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)');
    const [bgColor, setBgColor] = useState('linear-gradient(180deg, #418FBF 0%, #948EC3 30%, #E68CC7 55%, #F3C6E3 80%, #FFFFFF 100%)');
    const [inputBorderColor, setInputBorderColor] = useState('linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setBabyData({ ...babyData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: "" }); 
    };

    const handleGenderChange = (e) => {
        const gender = e.target.value;
        setBabyData({ ...babyData, gender });

        if (e.target.value === 'Female') {
            setBgColor('#E68CC7');
            setBgColorFont('#E68CC7');
            setInputBorderColor('#E68CC7');
            setImgGender(namebabyGirl);
        } else {
            setBgColor('#418FBF');
            setBgColorFont('#418FBF');
            setInputBorderColor('#418FBF');
            setImgGender(namebabyBoy);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        setSuccess("");

        const cookies = new Cookies();
        const token = cookies.get("resetToken");

        // console.log("Data to send:", babyData);
        // console.log("Token:", token); 

        
        try {
            const res = await axios.post('https://carenest-serverside.vercel.app/babies', babyData, {
                headers: {
                    "Authorization": `${token}`
                }
            });
            setSuccess("Baby added successfully!");
            console.log("Response ID:", res.data.data._id);
            Navigate('/myprofile/mybabies');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = err.response.data.errors;
                const formattedErrors = {};
                errors.forEach(error => {
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
            <ProfileNav />
            <div className="Addbaby">
                <div className="name-baby">
                    <div className="NameBabyTitle" style={{ background: bgColor }}>
                        <div className="bg-nameimgbaby">
                            <img src={imgGender} alt="Baby" />
                        </div>
                        <h2>Baby Name</h2>
                    </div>

                    <form className="name-baby-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={babyData.name}
                            onChange={handleChange}
                            placeholder="Baby Name"
                            style={{
                                borderColor: inputBorderColor,
                            }}
                            required
                        />
                        {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}

                        <input
                            type="date"
                            name="dateOfBirthOfBaby"
                            value={babyData.dateOfBirthOfBaby}
                            onChange={handleChange}
                            placeholder="Date Of Birth"
                            style={{
                                borderColor: inputBorderColor,
                            }}
                            required
                        />
                        {fieldErrors.dateOfBirthOfBaby && <span style={{ color: "red" }}>{fieldErrors.dateOfBirthOfBaby}</span>}

                        <div className="measurements">
                            <input
                                type="number"
                                name="weight"
                                value={babyData.weight}
                                onChange={handleChange}
                                placeholder="Weight (kg)"
                                style={{
                                    borderColor: inputBorderColor,
                                }}
                                required
                            />

                            <input
                                type="number"
                                name="height"
                                value={babyData.height}
                                onChange={handleChange}
                                placeholder="Height (cm)"
                                style={{
                                    borderColor: inputBorderColor,
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.weight && <span style={{ color: "red" }}>{fieldErrors.weight}</span>}
                        {fieldErrors.height && <span style={{ color: "red" }}>{fieldErrors.height}</span>}

                        <div className="gender">
                            <label className="genderr">Gender:</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        onChange={handleGenderChange}
                                        className="radioGirl"
                                    />{" "}
                                    Girl
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        onChange={handleGenderChange}
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
                            {loading ? <div className="spinner-small"></div> : "Save"}
                        </button>
                    </form>
                    {success && <span style={{ color: "green" }}>{success}</span>}
                </div>
            </div>
        </div>
    );
}
