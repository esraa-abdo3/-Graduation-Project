

// import { useEffect, useState } from "react";


// import namebabyimg from '../../../assets/Group 85 (1).png';
// import namebabyBoy from '../../../assets/boy.png';
// import namebabyGirl from '../../../assets/Group 81 (1).png';
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { useNavigate, useParams } from "react-router-dom";
// import "../NameBaby/NameBaby.css";
// import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar"
// import Features from "../Mainhome/Features";


// export default function Babydetails() {
   
//     const { id, scheduleId , idbaby } = useParams();
//     console.log(id);
//     console.log(scheduleId)
//     const cookie = new Cookies();
//     const gettoken = cookie.get("Bearer");
//     const [loading, setLoading] = useState(false);
//     const [selectloadding, setselectLoadding] = useState(true);
//     const [fieldErrors, setFieldErrors] = useState({});
//     const [success, setSuccess] = useState("");
//     const Navigate = useNavigate();
//     const [imgGender, setImgGender] = useState(namebabyimg);
//     const [bgColorFont, setBgColorFont] = useState("linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)");
//     const [bgColor, setBgColor] = useState("linear-gradient(180deg, #418FBF 0%, #948EC3 30%, #E68CC7 55%, #F3C6E3 80%, #FFFFFF 100%)");
//     const [inputBorderColor, setInputBorderColor] = useState("linear-gradient(180deg, #418FBF 0%, #E68CC7 100%)");
//     const [initialData, setinitialData] = useState({
//         name: "",
//         weight: "",
//         height: "",
//         dateOfBirthOfBaby: "",
   
//     });
   
//     const [babyData, setBabyData] = useState({
//         name: "",
//         weight: "",
//         height: "",
//         dateOfBirthOfBaby: "",
//         ...initialData,
//     });
   
//     const [gender, setgender] = useState("")
  
//   /// change style
//     useEffect(() => {
//         if (gender === "Female") {
//             setBgColor('linear-gradient(180deg, #DC5AB0 0%, #E483C3 25%, #ECABD6 50%, #F4D3E9 75%, #F8E7F2 87.5%, #FAF2F7 93.75%, #FCFCFC 100%)');
//             setBgColorFont("#E68CC7");
//             setInputBorderColor("#E68CC7");
//             setImgGender(namebabyGirl);
//         } else if (gender === "Male") {
//             setBgColor('linear-gradient(180deg, #0A6AA6 0%, #468EBB 25%, #83B3D1 50%, #BFD7E6 75%, #DDE9F1 87.5%, #ECF2F6 93.75%, #FCFCFC 100%)');
//             setBgColorFont("#418FBF");
//             setInputBorderColor("#418FBF");
//             setImgGender(namebabyBoy);
//         } else {
//             setImgGender(namebabyimg);
//         }
//     }, [gender]);
 

//     useEffect(() => {
//         async function getBabyData() {
//             try {
//                 let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${idbaby}`, {
//                     headers: {
//                         Authorization: `${gettoken}`
//                     }
//                 });
//                 console.log(response.data.data)
//                 setselectLoadding(false)
                
//                 const baby = response.data.data;
            
                
//                 const formattedDate = baby.birthDay
//                     ? new Date(baby.birthDay).toISOString().split("T")[0]
//                     : "";



//                 setinitialData({
//                     name: baby.name,
//                     weight: `${baby.weight}`,
//                     height: `${baby.height}`,
//                     dateOfBirthOfBaby: formattedDate,
                
//                 });
//                 setgender(baby.gender);
//             } catch (error) {
//                 console.log("Error fetching baby details:", error);
//                 setselectLoadding(false)
//             }
//         }

//         getBabyData();
//     }, [idbaby, gettoken]);
  

//     useEffect(() => {
//         if (initialData && Object.keys(initialData).length > 0) {
//             const formattedDate = initialData.dateOfBirthOfBaby ? new Date(initialData.dateOfBirthOfBaby).toISOString().split('T')[0] : "";

//             setBabyData(prevState => ({
//                 ...prevState,
//                 ...initialData,
//                 dateOfBirthOfBaby: formattedDate,
//             }));
//         }
//     }, [initialData]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBabyData({ ...babyData, [name]: value });
//         setFieldErrors({ ...fieldErrors, [name]: "" });
//     };
   
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setFieldErrors({});
//         setSuccess("");

       

//         try {
//             const res = await axios.put(`https://carenest-serverside.vercel.app/babies/${idbaby}`, babyData, {headers: { Authorization: `${gettoken}` } })
//              console.log(res.status)
//             setSuccess( "Baby updated successfully!");
//             setTimeout(() => {
//                 Navigate("/mainhome");
//             }, 3000);
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.errors) {
//                 const errors = err.response.data.errors;
//                 const formattedErrors = {};
//                 errors.forEach((error) => {
//                     formattedErrors[error.path] = error.msg;
//                 });
//                 setFieldErrors(formattedErrors);
//             } else {
//                 console.error("Error:", err);
//             }
//         } finally {
//             setLoading(false);
//         }
//         console.log(babyData);
//     };
//     return (
//         <>
//             <Mainnavbar />
//             <Features/>
            
//             <div className="Addbaby babybname">
//                 {selectloadding ? (<>
//                     <div className="skeleton-header" style={{ background: bgColor }}>
//                     <div className="bg-nameimgbaby-skeleton">
                        
//                     </div>
//                     <h2> { initialData.name}</h2>
//                     </div>
                
//                     <div className="name-baby">
          

//           <form className="skeleton-form"  onSubmit={handleSubmit}  >
           
               
//    <input disabled  />

//     <input type="date" disabled />
        

//               <div className="measurements"> <input type="number" disabled />
//            <input type="number" disabled />
//               </div>
//               <div className="gender">
//                   <label className="genderr" style={{color:"black"}}>Gender:</label>
//                   <div>
//                       <label>
//                           <input
//                               type="radio"
//                               name="gender"
//                               value="Female"
                    
//                               className="radioGirl"
//                               disabled
//                           />{" "}
//                           Girl
//                       </label>
//                       <label>
//                           <input
//                               type="radio"
//                               name="gender"
//                                   value="Male"
//                                   checked={gender === "Male"}
//                               onChange={handleChange}
//                               disabled
//                           />{" "}
//                           Boy
//                       </label>
//                   </div>
//               </div>
     
//               <button
//               >
//           save
//               </button>
//           </form>
//       </div>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
//                 </>) : (<>
//                     <div className="NameBabyTitle" style={{ background: bgColor }}>
//                     <div className="bg-nameimgbaby">
//                         <img src={imgGender} alt="Baby" />
//                     </div>
//                     <h2> { initialData.name}</h2>
//                 </div>
//             <div className="name-baby">
          

//                 <form className="name-baby-form"  onSubmit={handleSubmit}  >
                 
                     
//                     <input
                    
//                       type="text"
//                       name="name"
//                       value={babyData.name}
//                       onChange={handleChange}
//                       placeholder="Baby Name"
//                       style={{
//                           borderColor: inputBorderColor,
//                           color: bgColorFont
//                       }}
//                       required
//                   />
     
                   
                

                 
                
//                     {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}

//                      <input
//                         type="date"
//                         name="dateOfBirthOfBaby"
//                         value={babyData.dateOfBirthOfBaby}
//                         onChange={handleChange}
//                         placeholder="Date Of Birth"
//                         style={{
//                             borderColor: inputBorderColor,
//                             color: bgColorFont
//                         }}
//                         required
//                     />
//                 {fieldErrors.dateOfBirthOfBaby && <span style={{ color: "red" }}>{fieldErrors.dateOfBirthOfBaby}</span>}

//                     <div className="measurements">
//                         <input
//                             type="number"
//                             name="weight"
//                             value={babyData.weight}
//                             onChange={handleChange}
//                             placeholder="Weight (kg)"
//                             style={{
//                                 borderColor: inputBorderColor,
//                                 color: bgColorFont
//                             }}
//                             required
//                         />

//                         <input
//                             type="number"
//                             name="height"
//                             value={babyData.height}
//                             onChange={handleChange}
//                             placeholder="Height (cm)"
//                             style={{
//                                 borderColor: inputBorderColor,
//                                 color: bgColorFont
//                             }}
//                             required
//                         />
//                     </div>
//                     {fieldErrors.weight && <span style={{ color: "red" }}>{fieldErrors.weight}</span>}
//                     {fieldErrors.height && <span style={{ color: "red" }}>{fieldErrors.height}</span>}

//                     <div className="gender">
//                         <label className="genderr">Gender:</label>
//                         <div>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Female"
//                                         onChange={handleChange}
//                                         checked={gender === "Female"}
//                                     className="radioGirl"
//                                     disabled
//                                 />{" "}
//                                 Girl
//                             </label>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                         value="Male"
//                                         checked={gender === "Male"}
//                                     onChange={handleChange}
//                                     disabled
//                                 />{" "}
//                                 Boy
//                             </label>
//                         </div>
//                     </div>
//                     {fieldErrors.gender && <span style={{ color: "red" }}>{fieldErrors.gender}</span>}
//                     <button
//                         type="submit"
//                         className="submit-button"
//                         style={{ background: bgColorFont }}
//                         disabled={loading}
//                     >
//                         {loading ? <div className="spinner-small"></div> : "Save"}
//                     </button>
//                 </form>
//                 {success && <span style={{ color: "green" }}>{success}</span>}
//             </div>
//                 </>)}
     
//         </div>
//         </>
      
//     );
// }


import { useEffect, useState } from "react";
import namebabyimg from '../../../assets/Group 85 (1).png';
import namebabyBoy from '../../../assets/boy.png';
import namebabyGirl from '../../../assets/Group 81 (1).png';
import axios from "axios";
import Cookies from "universal-cookie"; 
import { useNavigate, useParams } from "react-router-dom";
import "../NameBaby/NameBaby.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Featurs from "../Mainhome/Features"
import Mainnavbar from "../../../Componets/mainhomeprofile/Mainnavbar";



export default function Babydetails() {
   
    const { id, scheduleId,idbaby} = useParams();  
    console.log(id);
    console.log(scheduleId)
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

   
    const [gender, setgender] = useState("")
    
  
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
            try {
                let response = await axios.get(`https://carenest-serverside.vercel.app/babies/${idbaby }`, {
                    headers: {
                        Authorization: `${gettoken}`  
                    }
                });
                console.log(response.data.data)
                setselectLoadding(false)
                
                const baby = response.data.data;
            
                
                const formattedDate = baby.birthDay 
                    ? new Date(baby.birthDay).toISOString().split("T")[0]  
                    : "";
                    const lastHeightEntry = response.data.data.height
                    .filter(entry => entry.height !== null) // استبعاد القيم الفارغة
                    .at(-1); // أخذ آخر عنصر في القائمة
                  
                  // جلب آخر قيمة مسجلة للوزن
                  const lastWeightEntry =response.data.data.weight
                    .filter(entry => entry.weight !== null) // استبعاد القيم الفارغة
                    .at(-1); // أخذ آخر عنصر في القائمة



                setinitialData({
                    name: baby.name,
                    weight: (lastWeightEntry) ? `${lastWeightEntry.weight}` : null,
                    height:(lastHeightEntry )? `${lastHeightEntry.height}` : null,
                    dateOfBirthOfBaby: formattedDate,  
                
                });
                setgender(baby.gender);
            } catch (error) {
                console.log("Error fetching baby details:", error);
                setselectLoadding(false)
            }
        }

        getBabyData();
    }, [idbaby , gettoken]);  
  

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            const formattedDate = initialData.dateOfBirthOfBaby ? new Date(initialData.dateOfBirthOfBaby).toISOString().split('T')[0] : "";

            setBabyData(prevState => ({
                ...prevState,
                ...initialData,
                dateOfBirthOfBaby: formattedDate, 
            }));
        }
    }, [initialData]);


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setBabyData({ ...babyData, [name]: value });
    //     setFieldErrors({ ...fieldErrors, [name]: "" }); 
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBabyData(prevState => ({
            ...prevState,
            [name]: (name === "weight" || name === "height") ? Number(value) || "" : value 
        }));
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({});
        setSuccess("");

        try {
            const res = await axios.put(`https://carenest-serverside.vercel.app/babies/${idbaby }`, babyData, {headers: { Authorization: `${gettoken}` } })
             console.log(res.status)
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
        console.log(babyData);
    };
    console.log(initialData)
    console.log(babyData)
    return (
        <>
       
            <Mainnavbar />
            <Featurs/>
            <div className="Addbaby babybname">
                {selectloadding ? (<>
                    <div className="skeleton-header" style={{ background: bgColor }}>
                    <div className="bg-nameimgbaby-skeleton">
                        
                    </div>
                    <h2>  { initialData.name}</h2>
                    </div>
                
                    <div className="name-baby">
          

          <form className="skeleton-form"  onSubmit={handleSubmit}  >
           
               
   <input disabled  />

    <input type="date" disabled /> 
        

              <div className="measurements"> <input type="number" disabled />
           <input type="number" disabled />              
              </div>
              <div className="gender">
                  <label className="genderr" style={{color:"black"}}>Gender:</label>
                  <div>
                      <label>
                          <input
                              type="radio"
                              name="gender"
                              value="Female"
                    
                              className="radioGirl"
                              disabled
                          />{" "}
                          Girl
                      </label>
                      <label>
                          <input
                              type="radio"
                              name="gender"
                                  value="Male"
                                  checked={gender === "Male"} 
                              onChange={handleChange}
                              disabled
                          />{" "}
                          Boy
                      </label>
                  </div>
              </div>
     
              <button
              >
          save
              </button>
          </form>
      </div>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                </>) : (<>
                    <div className="NameBabyTitle" style={{ background: bgColor }}>
                    <div className="bg-nameimgbaby">
                        <img src={imgGender} alt="Baby" />
                    </div>
                    <h2> { initialData.name} 'profile</h2>
                </div>
            <div className="name-baby">
          

                <form className="name-baby-form"  onSubmit={handleSubmit}  >
                 
                <div className='posIcon'>
                    <i className={`fa-regular fa-face-grin iconn ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                            
                    <input
                    
                      type="text"
                      name="name"
                      value={babyData.name}
                      onChange={handleChange}
                      placeholder="Baby Name"
                      style={{
                          borderColor: inputBorderColor,
                          color: bgColorFont
                      }}
                      required
                  />
                  </div>
                   
                

                 
                
                    {fieldErrors.name && <span style={{ color: "red" }}>{fieldErrors.name}</span>}

                     {/* <input
                        type="date"
                        name="dateOfBirthOfBaby"
                        value={babyData.dateOfBirthOfBaby}
                        onChange={handleChange}
                        placeholder="Date Of Birth"
                        style={{
                            borderColor: inputBorderColor,
                            color: bgColorFont
                        }}
                        required
                    />  */}
                    <div className='posIcon'>
                    <i className={`fa-regular fa-calendar-days icodate ${gender === "Male" ? "boycolor" : "girlcolor"}`}></i>
                            
                    <DatePicker
                    selected={babyData.dateOfBirthOfBaby ? new Date(babyData.dateOfBirthOfBaby) : null}
                    onChange={(date) =>
                    setBabyData({
                    ...babyData,
                    dateOfBirthOfBaby: date ? date.toISOString().split('T')[0] : "",
                    })
                    }    
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
                            style={{
                                borderColor: inputBorderColor,
                                color: bgColorFont,
                                paddingLeft:"40px"
                            }}
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
                            style={{
                                borderColor: inputBorderColor,
                                color: bgColorFont
                            }}
                            required
                        />
                    </div>
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
                                        onChange={handleChange}
                                        checked={gender === "Female"}
                                    className="radioGirl"
                                    disabled
                                />{" "}
                                Girl
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                        value="Male"
                                        checked={gender === "Male"} 
                                    onChange={handleChange}
                                    disabled
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
                </>)}
     
        </div>
        </>
      
    );
}





