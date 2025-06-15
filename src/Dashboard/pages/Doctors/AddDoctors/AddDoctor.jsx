
// import { useState } from "react";
// import "./AddDoctor.css";
// import Dropzone from "react-dropzone";
// import uploadimg from "../../../../assets/upload_11918679.png";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { BsFillTelephonePlusFill } from "react-icons/bs";

import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";


// export default function AddDoctor() {
//   const cookies = new Cookies();
//   const getToken = cookies.get("Bearer");
//   const dayOptions = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const [tempDayData, setTempDayData] = useState({
//     type: "Saturday",
//     slots: [{ startTime: "", endTime: "" }],
//   });
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     date: "",
//     Email: "",
//     Specialty: "",
//     masterOf: "",
//     phones: ["", ""],
//     bookingPrice: "",
//     paymentMethodType: "cash",
//     promocode: [
//       {
//         code: "",
//         value: "",
//         expireAt: "",
//       },
//     ],
//     day: [],
//     role: "doctor",
//     About: "",
//     Location: {
//       type: "Point",

//       coordinates: ["31.2684898", "32.2658437"],
//       mainPlace: "",
//       address: "",
//     },
//     images: [],
//     image: null,
//   });
//   const [Loading, setLoading] = useState(false);
//   const [donedetalis, setdonedetalis] = useState(false);
//   const [doneaddres, setdoneaddres] = useState(false);

//   // ============================== (1) التنقل بين الخطوات ==============================
//   const handleNextStep = () => {
//     if (step === 1) {
//       const validationErrors = validateFormStep1();
//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       } else {
//         setdonedetalis(true);
//       }
//     }
//     if (step === 2) {
//       const validationErrors = validateFormStep2();
//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       } else {
//         setdoneaddres(true);
//       }
//     }
    
//     setStep((prev) => (prev < 3 ? prev + 1 : prev));
//   };

//   const handlePrevStep = () => {
//     setStep((prev) => (prev > 1 ? prev - 1 : prev));
//   };

//   // ============================== (2) التحقق في الخطوة الأولى ==============================
//   function validateFormStep1() {
//     const validationErrors = {};

//     // firstName
//     if (!form.firstName) {
//       validationErrors.firstName = "first name required";
//     } else if (form.firstName.length < 3) {
//       validationErrors.firstName = "first name must be at least 3 characters long";
//     } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
//       validationErrors.firstName = "firstname should only contain English letters";
//     }

//     // lastName
//     if (!form.lastName) {
//       validationErrors.lastName = "last name required";
//     } else if (form.lastName.length < 3) {
//       validationErrors.lastName = "last name must be at least 3 characters long";
//     } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
//       validationErrors.lastName = "lastname should only contain English letters";
//     }

//     // email
//     if (!form.Email) {
//       validationErrors.Email = "Email required";
//     } else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(form.Email)) {
//       validationErrors.Email =
//         "email must start with a character, match the '@' symbol, and end with 'gmail.com'";
//     }

//     // specialty
//     if (!form.Specialty) {
//       validationErrors.Specialty = "Specialty must be either Pediatricians or Gynecologists";
//     }

//     // day
//     if (form.day.length === 0) {
//       validationErrors.day = "please select at least one day";
//     }

//     return validationErrors;
//   }
//     // ============================== التحقق في الخطوة الثانية  ==============================
//     function validateFormStep2() {
//       const validationErrors = {};
  
//       // firstName
//       if (form.Location.coordinates.length!==2) {
//         validationErrors.coordinates = "please enter both lat and long ";
//       }
//       if (!form.Location.mainPlace) {
//         validationErrors.mainPlace = "please enter your main place";
//       }  if (!form.Location.address) {
//         validationErrors.address = "please enter youraddres";
//       }
  
  
//       return validationErrors;
//     }

//   // ============================== (4) دوال تحديث الحقول ==============================
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

//   }
//   // phones
//   const handlePhoneChange = (index, newValue) => {
//     setForm((prev) => {
//       const updatedPhones = [...prev.phones];
//       updatedPhones[index] = newValue;
//       return { ...prev, phones: updatedPhones };
//     });
//   };
//   // to add new filed we need to add new element and map on it
//   const addPhoneField = () => {
//     setForm((prev) => ({
//       ...prev,
//       phones: [...prev.phones, ""],
//     }));
//   };

//   // promo change all filelds
//   const handlePromoChange = (field, newValue) => {
//     setForm((prev) => {
//       const updatedPromo = [...prev.promocode];
  
//       // التأكد من تحويل `value` إلى رقم
//       updatedPromo[0][field] = field === "value" ? Number(newValue) : newValue;
  
//       return { ...prev, promocode: updatedPromo };
//     });
//   };
  

//   function handleDropProfile(acceptedFiles) {
//     const file = acceptedFiles[0];
//     if (file.size > 2 * 1024 * 1024) {
//       alert("حجم الصورة كبير جدًا، الرجاء اختيار صورة أقل من 2MB");
//       return;
//     }
//     setForm((prev) => ({ ...prev, image: file }));
//   }
//   function handleDropImages(acceptedFiles) {
//     setForm((prev) => ({
//       ...prev,
//       images: [...prev.images, ...acceptedFiles],
//     }));
//   }

//   // Location (Step 2)
//   const handleLocationChange = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       Location: {
//         ...prev.Location,
//         [field]: value,
//       },
//     }));
//   };
//   const handleLocationCoordinatesChange = (index, newValue) => {
//     setForm((prev) => {
//       const coordsCopy = [...prev.Location.coordinates];
//       coordsCopy[index] = newValue; // خزنها نصًا
//       return {
//         ...prev,
//         Location: {
//           ...prev.Location,
//           coordinates: coordsCopy,
//         },
//       };
//     });
//   };

//   // ============================== (5) إدارة day ==============================
//   const handleDaySelection = (dayName) => {
//     // إذا كان اليوم المختار بالفعل هو نفسه في tempDayData
//     if (tempDayData && tempDayData.type === dayName) {
//       setTempDayData(null);
//     } else {
//       // هل هو موجود في form.day؟
//       const savedDay = form.day.find((d) => d.type === dayName);
//       if (savedDay) {
//         setTempDayData(savedDay);
//       } else {
//         // يوم جديد
//         setTempDayData({ type: dayName, slots: [{ startTime: "", endTime: "" }] });
//       }
//     }
//   };

//   const handleTempTimeChange = (field, value, slotIndex) => {
//     if (tempDayData) {
//       setTempDayData((prev) => ({
//         ...prev,
//         slots: prev.slots.map((slot, idx) =>
//           idx === slotIndex ? { ...slot, [field]: value } : slot
//         ),
//       }));
//     }
//   };

//   const handleSaveDay = () => {
//     if (!tempDayData) return;
//     setForm((prevForm) => {
//       // هل اليوم موجود مسبقًا؟
//       const dayExists = prevForm.day.some((d) => d.type === tempDayData.type);
//       if (dayExists) {
//         // تحديث
//         return {
//           ...prevForm,
//           day: prevForm.day.map((d) => (d.type === tempDayData.type ? tempDayData : d)),
//         };
//       } else {
//         // إضافة
//         return {
//           ...prevForm,
//           day: [...prevForm.day, tempDayData],
//         };
//       }
//     });
//     setTempDayData(null);
//   };

//   const handleCancelSavedDay = (dayName) => {
//     const dayData = form.day.find((d) => d.type === dayName);
//     if (!dayData) return;
//     setForm((prevForm) => ({
//       ...prevForm,
//       day: prevForm.day.filter((d) => d.type !== dayName),
//     }));
//     setTempDayData(dayData);
//   };

//   const handleAddSlotTemp = () => {
//     if (tempDayData) {
//       setTempDayData((prev) => ({
//         ...prev,
//         slots: [...prev.slots, { startTime: "", endTime: "" }],
//       }));
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // create formdata to sent filles as imges to server
//     const data = new FormData();
//     // الحقول النصية (مباشرة)
//     data.append("firstName", form.firstName);
//     data.append("lastName", form.lastName);
//     data.append("gender", form.gender);
//     data.append("date", form.date);
//     data.append("Email", form.Email);
//     data.append("Specialty", form.Specialty);
//     data.append("masterOf", form.masterOf);
//     data.append("bookingPrice", form.bookingPrice);
//     data.append("paymentMethodType", form.paymentMethodType);
//     data.append("role", form.role);
//     data.append("About", form.About);
//     // phones
//     form.phones.forEach((phone) => {
//       data.append("phones", phone);
//     });
    


//     data.append("day", JSON.stringify(form.day));


//     // قبل إضافة Location، نحول الإحداثيات من نص إلى رقم
//     const long = parseFloat(form.Location.coordinates[0]) || 0;
//     const lat = parseFloat(form.Location.coordinates[1]) || 0;

//     // Location -> JSON
//     data.append(
//       "Location",
//       JSON.stringify({
//         type: form.Location.type,
//         coordinates: [long, lat],
//         mainPlace: form.Location.mainPlace,
//         address: form.Location.address,
//       })
//     );

//  // تحويل المصفوفة إلى JSON وإرسالها مباشرةً مع البيانات
// data.append("promocode", JSON.stringify(form.promocode));


//     // صورة البروفايل
//     if (form.image) {
//       data.append("image", form.image);
//     }

//     // صور إضافية (Address Images)
//     form.images.forEach((file) => {
//       data.append("images", file);
//     });
//     // طباعة محتوى FormData
// for (let pair of data.entries()) {
//   console.log(pair[0], pair[1]);
// }

// setLoading(true)
//     try {
//       const res = await axios.post(
//         "https://carenest-serverside.vercel.app/doctor",
//         data,
//         {
//           headers: {
//             Authorization: `${getToken}`,
//           },
         

//         }
//       );
//       setLoading(false)
 

//       console.log("Doctor created successfully:", res);
    
//     } catch (err) {
//       setLoading(false)
//       console.log(err);
//       console.error("Error creating doctor:", err);
    
//     }
//   };

//   // ============================== (6) واجهة النموذج ==============================
//   console.log(form);

//   return (
//     <div className="Add-Doctor">
//       <div className="header">
//         <div className="head">
//           <h2>Add New Doctor</h2>
//           <p>Manage and register doctors in the system with their details, availability, and specialties.</p>
//         </div>
//       </div>

//       <div className="circle">
//         <div className={donedetalis? "active" : ""}>Details</div>
//         <div className={doneaddres ? "active" : ""}>Address</div>
//         <div className={step === 3 ? "active" : ""}>Profile</div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* ======== STEP 1 ======== */}
//         {step === 1 && (
//           <>
//             <div className="detalis-side">
//               {/* Basic Information */}
//               <div className="Basic-Information">
//                 <div className="header">Basic Information</div>
//                 <div className="names">
//                   <div className="firstname">
//                     <label>First Name :</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={form.firstName}
//                       onChange={handleChange}
//                     />
//                     {errors.firstName && <p className="error">{errors.firstName}</p>}
//                   </div>
//                   <div className="lastname">
//                     <label>Last Name :</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={form.lastName}
//                       onChange={handleChange}
//                     />
//                     {errors.lastName && <p className="error">{errors.lastName}</p>}
//                   </div>
//                 </div>

//                 <div className="dateirrth-gender">
//                   <div className="date-of-birth-label">
//                     <label>birthday :</label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={form.date}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="gender">
//                     <label>Gender :</label>
//                     <select
//                       name="gender"
//                       value={form.gender}
//                       onChange={handleChange}
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Specialty & Expertise */}
//               <div className="Specialty-Expertise">
//                 <div className="header">Specialty & Expertise</div>
//                 <div className="Specialty">
//                   <label>Specialty : </label>
//                   <div className="radio">
//                     <div>
//                       <input
//                         type="radio"
//                         value="Pediatricians"
//                         name="Specialty"
//                         checked={form.Specialty === "Pediatricians"}
//                         onChange={handleChange}
//                       />
//                       <label>Pediatricians</label>
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         value="Gynecologists"
//                         name="Specialty"
//                         checked={form.Specialty === "Gynecologists"}
//                         onChange={handleChange}
//                       />
//                       <label>Gynecologists</label>
//                     </div>
//                   </div>
               
//                 </div>
//                 {errors.Specialty && <p className="error" style={{marginLeft:"-4px"}}>{errors.Specialty}</p>}
//                 <div className="Additional-Expertise">
//                   <label>masterOf :</label>
//                   <input
//                     type="text"
//                     name="masterOf"
//                     value={form.masterOf}
//                     onChange={handleChange}
//                     style={{marginLeft:"15px"}}
//                   />
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div className="Contact-Information">
//                 <div className="header">Contact Information</div>
//                 <div className="moblie">
//                 <div className="mobilenumbers">
//                   {form.phones.map((phoneValue, index) => (
//                     <div className="numberphone" key={index}>
//                       <label>Mobile No. {index + 1}:</label>
//                       <input
//                         type="text"
//                         value={phoneValue}
//                         onChange={(e) => handlePhoneChange(index, e.target.value)}
//                       />
//                     </div>
//                   ))}
          
//                   </div>

//                 </div>
               
//                 <div className="dateemail">
//                   <label>Email :</label>
//                   <input
//                     type="email"
//                     name="Email"
//                     value={form.Email}
//                     onChange={handleChange}
//                   />
//                   {errors.Email && <p className="error">{errors.Email}</p>}
//                 </div>
//                 <span  className="addphone"type="button" onClick={addPhoneField} >
//                   <BsFillTelephonePlusFill/>
//                   </span>
//               </div>
//             </div>
//             <div className="availability-side" style={{ marginTop: "10px" }}>
//               <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "7px 30px" }}>
//                 <div className="header">availability</div>
//                 <div className="availability">
//                   <div className="days">
//                     {dayOptions.map((dayName) => (
//                       <span
//                         key={dayName}
//                         onClick={() => handleDaySelection(dayName)}
//                         className={
//                           (tempDayData && tempDayData.type === dayName) ||
//                           form.day.some((d) => d.type === dayName)
//                             ? "active"
//                             : ""
//                         }
//                       >
//                         {dayName.slice(0, 3)}
//                       </span>
//                     ))}
//                   </div>

//                   {tempDayData && (
//                     <div className="from-to">
//                       {tempDayData.slots.map((slot, slotIndex) => (
//                         <div key={slotIndex} className="slot-group">
//                           <div className="from">
//                             <label>From:</label>
//                             <input
//                               type="time"
//                               value={slot.startTime}
//                               onChange={(e) =>
//                                 handleTempTimeChange("startTime", e.target.value, slotIndex)
//                               }
//                             />
//                           </div>
//                           <div className="to">
//                             <label>To:</label>
//                             <input
//                               type="time"
//                               value={slot.endTime}
//                               onChange={(e) =>
//                                 handleTempTimeChange("endTime", e.target.value, slotIndex)
//                               }
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <div className="buttons">
//                     {tempDayData && form.day.some((d) => d.type === tempDayData.type) ? (
//                       <>
//                         <span type="button" onClick={handleSaveDay}>
//                           Update
//                         </span>
//                         <span
//                           type="button"
//                           onClick={() => {
//                             // إلغاء اليوم المحفوظ
//                             handleCancelSavedDay(tempDayData.type);
//                           }}
//                         >
//                           Cancel
//                         </span>
//                         <span type="button" onClick={handleAddSlotTemp}>
//                           Add Another
//                         </span>
//                       </>
//                     ) : tempDayData ? (
//                       <>
//                         <span type="button" onClick={handleAddSlotTemp}>
//                           Add Another
//                         </span>
//                         <span type="button" onClick={handleSaveDay}>
//                           Save
//                         </span>
//                       </>
//                     ) : null}
//                   </div>
//                 </div>
//                 {errors.day && <p className="error">{errors.day}</p>}
//               </div>

//               {/* Payment Details & Promocode */}
//               <div
//                 className="payment-details"
//                 style={{ backgroundColor: "white", borderRadius: "8px", padding: "7px 30px" }}
//               >
//                 <div className="header">Payment Details & promocode</div>

//                 <div className="detalis">
//                   <div className="price">
//                     <label>Booking Price:</label>
//                     <input
//                       type="text"
//                       name="bookingPrice"
//                       value={form.bookingPrice}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="payment">
//                     <label>Payment Method:</label>
//                     <select
//                       name="paymentMethodType"
//                       value={form.paymentMethodType}
//                       onChange={handleChange}
//                     >
//                       <option value="credit-card">Credit Card</option>
//                       <option value="cash">Cash</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="detalis">
//                   <div className="promomcode">
//                     <label>promo code:</label>
//                     <input
//                       type="text"
//                       value={form.promocode[0].code}
//                       onChange={(e) => handlePromoChange("code", e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label>value :</label>
//                     <input
//                       type="text"
//                       value={form.promocode[0].value}
//                       onChange={(e) => handlePromoChange("value", e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="detalis">
//                   <div>
//                     <label>StartAt :</label>
//                     <input
//                       type="date"
//                       value={form.promocode[0].startAt}
//                       onChange={(e) => handlePromoChange("startAt", e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label>expireAt :</label>
//                     <input
//                       type="date"
//                       value={form.promocode[0].expireAt}
//                       onChange={(e) => handlePromoChange("expireAt", e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ======== STEP 2 ======== */}
//         {step === 2 && (
//           <>
//             <div className="detalis-side">
//               <div className="Basic-Information">
//                 <div className="header">Doctor's Location Information</div>
//                 <div className="names">
//                   <div className="firstname">
//                     <label>address :</label>
//                     <input
//                       type="text"
//                       value={form.Location.address}
//                       onChange={(e) => handleLocationChange("address", e.target.value)}
//                     />
//                        {errors.address && <p className="error">{errors.address}</p>}
//                   </div>
               
//                   <div className="lastname">
//                     <label>mainPlace :</label>
//                     <input
//                       type="text"
//                       value={form.Location.mainPlace}
//                       onChange={(e) => handleLocationChange("mainPlace", e.target.value)}
//                     />
//                     {errors.mainPlace && <p className="error">{errors.mainPlace}</p>}
//                   </div>
                  
//                 </div>
//                 <div className="names">
//                   <div className="lastname" style={{display:"flex" , flexDirection:"column", gap:"7px"}}>
//                     <label>Longitude :</label>
//                     <input
//                       type="text"
//                       value={form.Location.coordinates[0]}
//                       onChange={(e) => handleLocationCoordinatesChange(0, e.target.value)}
//                     />
//                   </div>
//                   <div className="lastname" style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
//                     <label>latitude :</label>
//                     <input
//                       type="text"
//                       value={form.Location.coordinates[1]}
//                       onChange={(e) => handleLocationCoordinatesChange(1, e.target.value)}
//                     />
//                   </div>
//                   {errors.coordinates && <p className="mainPlace">{errors.coordinates}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* رفع صور إضافية (images) */}
//             <div className="availability-side imgside">
//               <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
//                 <div className="header">Upload Address Images</div>
//                 <Dropzone onDrop={handleDropImages} accept="image/*" multiple={true}>
//                   {({ getRootProps, getInputProps }) => (
//                     <div className="upload-container">
//                       <div {...getRootProps()} className="dropzone">
//                         <input {...getInputProps()} />
//                         <p>
//                           Drag your photos here or{" "}
//                           <span className="browse">Browse from device</span>
//                         </p>
//                         <div className="preview">
//                         {form.images.length > 0 ? (
//                           form.images.map((file, i) => (
//                             <img
//                               style={{ width: "30px" }}
//                               key={i}
//                               src={URL.createObjectURL(file)}
//                               alt="Additional"
//                               className="uploaded-image"
//                             />
//                           ))
//                         ) : (
//                           <img
//                             style={{ width: "30px" }}
//                             src={uploadimg}
//                             alt="No uploaded images"
//                             className="uploaded-image"
//                           />
//                         )}
//                       </div>
//                       </div>
//                       {/* عرض الصور المرفوعة */}
                     
//                     </div>
//                   )}
//                 </Dropzone>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ======== STEP 3 ======== */}
//         {step === 3 && (
//           <>
//             <div className="detalis-side">
//               <div className="Basic-Information">
//                 <div className="header">Doctor's Profile</div>
//                 <div className="about" style={{display:"flex" , flexDirection:"column", gap:"7px"}}>
//                   <label>About :</label>
//                   <textarea
//                     style={{ height: "119px", width: "100%",  padding:"10px 20px" , marginBottom:"15px"}}
//                     placeholder="Write something about yourself"
//                     name="About"
//                     value={form.About}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             {/* رفع صورة البروفايل (image) */}
//             <div className="availability-side imgside">
//               <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
//                 <div className="header">Upload Profile Image</div>
//                 <Dropzone onDrop={handleDropProfile} accept="image/*" multiple={false}>
//                   {({ getRootProps, getInputProps }) => (
//                     <div className="upload-container">
//                       <div {...getRootProps()} className="dropzone">
//                         <input {...getInputProps()} />
//                         <p>
//                           Drag your photo here or <span className="browse">Browse from device</span>
//                         </p>
//                         <div className="preview">
//                         {form.image ? (
//                           <img
//                             src={URL.createObjectURL(form.image)}
//                             alt="Profile"
//                             className="uploaded-image"
//                           />
//                         ) : (
//                           <img src={uploadimg} alt="No profile" className="uploaded-image" />
//                         )}
//                       </div>
//                       </div>
                  
//                     </div>
//                   )}
//                 </Dropzone>
//               </div>
//             </div>
//           </>
//         )}
//       </form>

//       <div className="navigation-buttons">
//         {step > 1 && (
//           <span onClick={handlePrevStep} className={step === 2 ? "active" : ""}>
//             Previous
//           </span>
//         )}
//         {step < 3 && (
//           <span onClick={handleNextStep} className={step === 1 ? "end":""}>
//             Next
//           </span>
//         )}
//         {step === 3 && (
//           <button onClick={handleSubmit} className={step === 1 || step === 2 ? "active" : "submittt"}>
//            {Loading ? <div className="spinner-small"></div> : "Save"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
AddDoctor.propTypes = {
  onClose: PropTypes.func.isRequired,
  // onload:PropTypes.func.isRequire,
};
import "./Doctors.css"
import { BsFillTelephonePlusFill } from "react-icons/bs";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../assets/Oval.png"

export default function AddDoctor({ onClose }) {

  const [step, setstep] = useState("1")
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      gender: "",
      date: "", 
      Email: "",
      Specialty: "",
      masterOf: "",
      phones: [""],
      bookingPrice: "",
      paymentMethodType: "cash",
      promocode: [
        {
          code: "",
          value: "",
          expireAt: "",
        },
      ],
      day: [],
      About: "", 
      Location: {
        type: "Point",
  
        coordinates: ["31.2684898", "32.2658437"], 
        mainPlace: "",
        address: "",
      },
      images: [], 
      image: null, 
    });
    const handlePhoneChange = (index, newValue) => {
    setForm((prev) => {
      const updatedPhones = [...prev.phones];
      updatedPhones[index] = newValue;
      return { ...prev, phones: updatedPhones };
    });
  };
 const addPhoneField = () => {
  setForm((prev) => ({
    ...prev,
    phones: [...prev.phones, ""],
  }));

  setTimeout(() => {
    const phoneInputs = document.querySelectorAll(".numberphone input");

    for (let i = 0; i < phoneInputs.length - 1; i++) {
      phoneInputs[i].classList.add("active");
    }
  }, 0);
};
  function handleDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جدًا، الرجاء اختيار صورة أقل من 2MB");
      return;
    }
    setForm((prev) => ({ ...prev, image: file }));
  }

  return (
    <div>
      <div className="AddTip">
              {/* <div className="header">
                  <div>
                  <IoIosAddCircle className="close" onClick={onClose}  />
                  </div>
                 <h2>Add New Doctor</h2>
        </div> */}
        <div className="doctorsdataoptions">
          <div >
            <span>1</span>
          <p>  Details </p>

          </div>

    
          <div >
                  <span>2</span>
          <p>Availability</p>
            
          </div>
          <div >
                        <span>3</span>
          <p>Address</p>
            
            
          </div>
        </div>
        {/* step1 */}
        {
          step == "1"
          && (
            <div className="stepDetails">
             <div className="names">
                <div className="firstname">
                  <input type="text" name="First Name" id="First Name" />
                  <p>First Name :</p>
                </div>
                <div className="lastname">
                  <input type="text" name="Last Name" id="Last Name" />
                  <p>Last Name :</p>
                  </div>
              </div>
              <div className="persondata">
                           <div className="genderr">
                     <label>Gender :</label>
                     <select
                      name="gender"
                      // value={form.gender}
                      // onChange={handleChange}
                    >
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                    </select>
                </div>
          
       <div className="dateirrth-gender">
                 
                     <label>birthday :</label>
                  <input
                    style={{margin:"0" , display:"block"}}
                      type="date"
                      name="date"
                      // value={form.date}
                      // onChange={handleChange}
                    />
               
                </div>
             
              </div>
              <div className="doctoremail">
                <input type="email"  placeholder="example@gmail.com"/>
                <p>Email :</p>
              </div>
              <div className="mobiles">
                <p>Mobile :</p>
                <div className="contianerMobiles">
                       {form.phones.map((phoneValue, index) => (
                    <div className="numberphone" key={index}>
          
                      <input
                        type="text"
                        value={phoneValue}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                  <span  className="addphone"type="button" onClick={addPhoneField} >
                                  <BsFillTelephonePlusFill/>
                                  </span>
                
              </div>
              <div className="about">
             <input type="text" placeholder="Write  something about yourself" />
             <p>About :</p>
              </div>
              <div className="studies">
                              <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
                      {({ getRootProps, getInputProps }) => (
                        <div className="upload-container" >
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <div className="preview" style={{display:"flex" , flexDirection:"column" , gap:"10px"}}>
                              <img 
                                src={form.image ? URL.createObjectURL(form.image) : uploadimg} 
                                alt="Uploaded preview" 
                                className="uploaded-image" 
                                          />
                                           <p className="headerUpload">Upload car image (PNG, JPEG)</p>
                            </div>
                          </div>
                        </div>
                      )}
                </Dropzone>
                <div className="Specialty-Expertise">
                      <div className="header-studes" style={{color:"#0A6AA6" , fontWeight:"700" }}>Specialty : </div>  
                     
               
                  <div className="Specialty" style={{ margin: "0" }}>
                  
                
             
                  <div className="radio">
                    <div style={{display:"flex"}}>
                      <input
                        type="radio"
                        value="Pediatricians"
                        name="Specialty"
                        checked={form.Specialty === "Pediatricians"}
                        // onChange={handleChange}
                      />
                      <label>Pediatricians</label>
                    </div>
                    <div style={{display:"flex"}}>
                      <input
                        type="radio"
                        value="Gynecologists"
                        name="Specialty"
                        checked={form.Specialty === "Gynecologists"}
                        // onChange={handleChange}
                      />
                      <label>Gynecologists</label>
                    </div>
                  </div>
               
                </div>
                {/* {errors.Specialty && <p className="error" style={{marginLeft:"-4px"}}>{errors.Specialty}</p>} */}
                <div className="Additional-Expertise">
                  <p>masterOf :</p>
                  <input
                    type="text"
                    name="masterOf"
                    value={form.masterOf}
                    // onChange={handleChange}
                    style={{marginLeft:"15px"}}
                  />
                </div>
              </div>
              </div>

              </div>
              
          
        
          )
        }
      </div>
    </div>
  )
  
}




















