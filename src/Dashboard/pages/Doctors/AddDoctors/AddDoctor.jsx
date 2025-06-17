import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import "./Doctors.css"
import { BsFillTelephonePlusFill } from "react-icons/bs";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../assets/Oval.png"
import axios from "axios";
import Cookies from "universal-cookie";

AddDoctor.propTypes = {
  onClose: PropTypes.func.isRequired,
  // onload:PropTypes.func.isRequire,
};


export default function AddDoctor({ onClose }) {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
  const [step, setstep] = useState("1")
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

  }
    const handleDaySlotChange = (dayName, slotIndex, field, value) => {
    setForm(prev => {
      const dayIndex = prev.day.findIndex(d => d.type === dayName);
      
      if (dayIndex === -1) {
        // إذا لم يكن اليوم موجوداً، قم بإنشائه مع سلوتين فارغين
        return {
          ...prev,
          day: [...prev.day, {
            type: dayName,
            slots: [
              { startTime: "", endTime: "" },
              { startTime: "", endTime: "" }
            ]
          }]
        };
      }

      // إذا كان اليوم موجوداً، قم بتحديث السلوت المحدد
      const updatedDay = { ...prev.day[dayIndex] };
      updatedDay.slots[slotIndex] = {
        ...updatedDay.slots[slotIndex],
        [field]: value
      };

      const updatedDays = [...prev.day];
      updatedDays[dayIndex] = updatedDay;
      return { ...prev, day: updatedDays };
    });
  };
  const handleLocationChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      Location: {
        ...prev.Location,
        [field]: value,
      },
    }));
  };
  const handleLocationCoordinatesChange = (index, newValue) => {
    setForm((prev) => {
      const coordsCopy = [...prev.Location.coordinates];
      coordsCopy[index] = newValue; // Store as string in state
      return {
        ...prev,
        Location: {
          ...prev.Location,
          coordinates: coordsCopy,
        },
      };
    });
  };
  const handlePromoChange = (field, newValue) => {
    setForm((prev) => {
   
      const updatedPromo = prev.promocode.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            [field]: field === "value" ? Number(newValue) : newValue,
          };
        }
        return item;
      });
    
      return { ...prev, promocode: updatedPromo };
    });
  };
    const handlePhoneChange = (index, newValue) => {
    setForm((prev) => {
      const updatedPhones = [...prev.phones];
      updatedPhones[index] = newValue;
      return { ...prev, phones: updatedPhones };
    });
  };
  const addPhoneField = () => {
    if (form.phones.length >= 4) {
      setErrors((prev) => ({
        ...prev,
        phones: "Maximum 4 phone numbers allowed"
      }));
      return;
    }

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
  function handleDropImages(acceptedFiles) {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
  }
  const validateStep1 = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.date) newErrors.date = "Birthday is required";
    if (!form.Email.trim()) newErrors.Email = "Email is required";
    if (!form.phones.some(p => p.trim())) newErrors.phones = "At least one phone is required";
    if (!form.Specialty) newErrors.Specialty = "Specialty is required";
    if (!form.About.trim()) newErrors.About = "About is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const cleanedDays = form.day.filter((day) => {
      const validSlots = day.slots.filter(
        (slot) => slot.startTime && slot.endTime
      );
      return validSlots.length > 0;
    });

    if (cleanedDays.length === 0) {
      setErrors((prev) => ({
        ...prev,
        day: "Please add at least one valid day with time slots.",
      }));
      return false;
    }

    // Update the form with cleaned days
    setForm((prev) => ({
      ...prev,
      day: cleanedDays.map(day => ({
        ...day,
        slots: day.slots.filter(slot => slot.startTime && slot.endTime)
      }))
    }));

    setErrors((prev) => ({
      ...prev,
      day: "",
    }));

    return true;
  };

  const validateStep3 = () => {
    const newErrors = {};
    const promo = form.promocode[0];

    // Check if any promocode field is filled
    const hasPromoFields = promo.code || promo.value || promo.startAt || promo.expireAt;

    if (hasPromoFields) {
      // If any field is filled, validate all required fields
      if (!promo.code) newErrors.promoCode = "Promo code is required";
      if (!promo.value) newErrors.promoValue = "Promo value is required";
      if (!promo.startAt) newErrors.promoStartAt = "Start date is required";
      if (!promo.expireAt) newErrors.promoExpireAt = "Expiry date is required";

      // Validate dates
      if (promo.startAt && promo.expireAt) {
        const startDate = new Date(promo.startAt);
        const expireDate = new Date(promo.expireAt);
      
        if (startDate >= expireDate) {
          newErrors.promoDates = "Expiry date must be after start date";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === "1") {
      if (!validateStep1()) {
        return;
      }
    }
    if (step === "2") {
      if (!validateStep2()) {
        return;
      }
    }
    setstep((prev) => (Number(prev) < 3 ? String(Number(prev) + 1) : prev));
  };

  const handlePrevStep = () => {
    setstep((prev) => (Number(prev) > 1 ? String(Number(prev) - 1) : prev));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      
      // Create FormData object to handle file uploads
      const formData = new FormData();
      
      // Add the main image
      if (form.image) {
        formData.append('image', form.image);
      }
      
      // Add additional images
      form.images.forEach((image) => {
        formData.append(`images`, image);
      });

      // Clean up the day data - remove empty slots
      const cleanedDays = form.day.map(day => ({
        ...day,
        slots: day.slots.filter(slot => slot.startTime && slot.endTime)
      })).filter(day => day.slots.length > 0);

      // Convert coordinates to numbers
      const locationData = {
        ...form.Location,
        coordinates: form.Location.coordinates.map(coord => Number(coord))
      };

      // Add all other form data
      const formDataToSend = {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        date: form.date,
        Email: form.Email,
        Specialty: form.Specialty,
        masterOf: form.masterOf,
        phones: form.phones.filter(phone => phone.trim() !== ""),
        bookingPrice: form.bookingPrice,
        paymentMethodType: form.paymentMethodType,
        promocode: form.promocode[0].code ? [form.promocode[0]] : [],
        day: cleanedDays,
        About: form.About,
        Location: locationData
      };

      // Append all form data
      Object.keys(formDataToSend).forEach(key => {
        if (key === 'promocode' || key === 'day' || key === 'Location') {
          formData.append(key, JSON.stringify(formDataToSend[key]));
        } else {
          formData.append(key, formDataToSend[key]);
        }
      });

      const response = await axios.post('https://carenest-serverside.vercel.app/doctor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `${gettoken}`
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Doctor added successfully!');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage('Error adding doctor. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="AddTip adddoctortodash">
         <div>
                <IoIosCloseCircle className="close" onClick={onClose} />
                </div>
  
      <div className="doctorsdataoptions">
        <div className={`${step === "1" ? "active" : ""} ${Number(step) > 1 ? "completed" : ""}`}>
          <span>1</span>
          <p>Details</p>
        </div>
        <div className={`${step === "2" ? "active" : ""} ${Number(step) > 2 ? "completed" : ""}`}>
          <span>2</span>
          <p>Availability</p>
        </div>
        <div className={`${step === "3" ? "active" : ""}`}>
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
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error-input" : ""}
                  
                />
                <p className={errors.firstName ? "error-label" : "without"}>First Name :</p>
         
              </div>
              <div className="lastname">
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error-input" : ""}
               
                />
                <p className={errors.lastName ? "error-label" : "without"}>Last Name :</p>
         
              </div>
            </div>
      {(errors.firstName || errors.lastName) && (
  <span className="error-message">Please enter your first and last name</span>
)}

             
            <div className="persondata">
              <div className="genderr">
                <p className={errors.gender ? "error-label" : "without"}>Gender :</p>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={errors.gender ? "error-input" : ""}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
  
              </div>
      
          
              <div className="dateirrth-gender">
                 
                <p className={errors.date ? "error-label" : "without"}>birthday :</p>
                <input
                  style={{ margin: "0", display: "block" }}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={errors.date ? "error-input" : ""}
                />
         
              </div>
             
            </div>
        {(errors.gender || errors.date ) &&(
                <span className="error-message"> gener and Birthday is required</span>
              )}
            <div className="doctoremail">
              <input
                type="email"
               
                name="Email"
                value={form.Email}
                onChange={handleChange}
                className={errors.Email ? "error-input" : ""}
              />
              <p className={errors.Email ? "error-label" : "without"}>Email :</p>
        
            </div>
                  {errors.Email && (
                <span className="error-message">{errors.Email}</span>
              )}
            <div className="mobiles">
              <p>Mobile :</p>
              <div className="contianerMobiles">
                {form.phones.map((phoneValue, index) => (
                  <div className="numberphone" key={index}>
          
                    <input
                      type="text"
                      value={phoneValue}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      className={errors.phones ? "error-input" : ""}
                      placeholder="phone"
                    />
                  </div>
                ))}
              </div>
              <span className="addphone" type="button" onClick={addPhoneField} >
                <BsFillTelephonePlusFill />
              </span>
                
            </div>
            {errors.phones && (
              <span className="error-message">{errors.phones}</span>
            )}
            <div className="about">
              <input
                type="text"
             
                name="About"
                value={form.About}
                onChange={handleChange}
                className={errors.About ? "error-input" : ""}
              />
              <p className={errors.About ? "error-label" : ""}>About :</p>
            </div>
            {errors.About && (
              <span className="error-message">{errors.About}</span>
            )}
            <div className="studies" style={{marginBottom:"30px"}}>
              <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div className="upload-container" style={{border:"none" , marginTop:"7px" , padding:"7px"}} >
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <div className="preview" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                <div className="header-studes" style={{ color: "#0A6AA6", fontWeight: "700", fontSize: "13px" }}>Specialty : </div>
                
                     
               
                <div className="Specialty" style={{ margin: "0" }}>
                              
             
                  <div className="radio">
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        value="Pediatricians"
                        name="Specialty"
                        checked={form.Specialty === "Pediatricians"}
                        onChange={handleChange}
                        className={errors.Specialty ? "error-input" : ""}
                      />
                      <label>Pediatricians</label>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="radio"
                        value="Gynecologists"
                        name="Specialty"
                        checked={form.Specialty === "Gynecologists"}
                        onChange={handleChange}
                        className={errors.Specialty ? "error-input" : ""}
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
                    onChange={handleChange}
                    style={{ marginLeft: "15px" }}
                    placeholder="Master of"
                  />
                </div>
                {errors.Specialty && (
                  <span className="error-message">{errors.Specialty}</span>
                )}
              </div>
            </div>
      

          </div>
              
          
        
        )
      }
      {
        step == "2"
        && (
          <div className="step-Availabty">
            <div className="dayess">
              {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((dayName) => {
                const dayData = form.day.find(d => d.type === dayName);
                const slots = dayData?.slots || [
                  { startTime: "", endTime: "" },
                  { startTime: "", endTime: "" }
                ];
                
                return (
                  <div key={dayName} className={`${dayName} dayy`}>
                    <input type="text" value={dayName} disabled />
                    <p>{dayName} :</p>
                    <div className="slotsnew">
                      <div className="firstsolt">
                        <input
                          type="time"
                          value={slots[0]?.startTime || ""}
                          onChange={(e) => handleDaySlotChange(dayName, 0, "startTime", e.target.value)}
                        />
                        <input
                          type="time"
                          value={slots[0]?.endTime || ""}
                          onChange={(e) => handleDaySlotChange(dayName, 0, "endTime", e.target.value)}
                        />
                      </div>
                      <div className="secondslot">
                        <input
                          type="time"
                          value={slots[1]?.startTime || ""}
                          onChange={(e) => handleDaySlotChange(dayName, 1, "startTime", e.target.value)}
                        />
                        <input
                          type="time"
                          value={slots[1]?.endTime || ""}
                          onChange={(e) => handleDaySlotChange(dayName, 1, "endTime", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.day && (
              <p className="error-message">{errors.day}</p>
            )}
            {/* <div className="button" onClick={() => {
              if (validateStep2()) {
              setstep("3");
              }
            }}>
              next
            </div> */}
          </div>
        )
      }
      {
        step == "3" && (
          <>
            <div className="StepAddress">
              <div className="section1">
                <div className="imgsideplaces" style={{ marginTop: "24px" , padding:"10px" }} >
                  <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
                    <Dropzone onDrop={handleDropImages} accept="image/*" multiple={true}>
                      {({ getRootProps, getInputProps }) => (
                        <div className="upload-container">
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p style={{ padding: "7px 0", color: "#777" }}>
                              Drag your photos here
                              {/* <span className="browse">Browse from device</span> */}
                            </p>
                                 
                            <div className="preview" style={{ paddingBottom: "3px" }}>
                              {form.images.length > 0 ? (
                                form.images.map((file, i) => (
                                  <div
                                    key={i}
                                    className="image-wrapper"
                                    style={{
                                      position: "relative",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px"
                                    }}
                                  >
                                    {typeof file === "string" ? (
                                      <img
                                        src={file}
                                        alt="Additional"
                                        className="uploaded-image"
                         
                                      />
                                    ) : (
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt="Additional"
                                        className="uploaded-image"
                           
                                      />
                                    )}
                                    <button
                                      onClick={() =>
                                        setForm((prev) => ({
                                          ...prev,
                                          images: prev.images.filter((_, index) => index !== i),
                                        }))
                                      }
                                      style={{
                                        position: "absolute",
                                        top: "0px",
                                        right: "0px",
                                        backgroundColor: "#b1a8a8",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "15px",
                                        height: "15px",
                                        cursor: "pointer",
                                      }}
                                    >
                                      X
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <img
                      
                                  src={uploadimg}
                                  alt="No uploaded images"
                                  className="uploaded-image"
                                />
                              )}
                            </div>
                
                
                          </div>
                                    
                                     
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className="placesdetlais">
                  <div className="address">
                    <input
                    
                      type="text"
                      value={form.Location.address}
                      onChange={(e) => handleLocationChange("address", e.target.value)} />
                    <p className="paragrah">address :</p>

                  </div>
                  <div className="MainPlace">
                    <input
                      type="text"
                      value={form.Location.mainPlace}
                      onChange={(e) => handleLocationChange("mainPlace", e.target.value)}
                    />
                    <p className="paragrah">MainPlace :</p>

                  </div>
                  <div className="map">
                    <div className="lang">
                      <input
                        type="text"
                        value={form.Location.coordinates[0]}
                        onChange={(e) => handleLocationCoordinatesChange(0, e.target.value)}
                      />
                      <p className="paragrah">Long:</p>

                    </div>
                    <div className="lat">
                      <input
                        type="text"
                        value={form.Location.coordinates[1]}
                        onChange={(e) => handleLocationCoordinatesChange(1, e.target.value)}
                      />
                      <p className="paragrah">Lat:
                        

                      </p>

                    </div>
                  </div>
                </div>

              </div>
              <div className="section2">
                <div className="payments">
                  <div className="bookprice">
                    <input
                      type="text"
                      name="bookingPrice"
                      value={form.bookingPrice}
                      onChange={handleChange}
                    />
                    <p className="paragrah">Booking price:</p>
                  </div>

                  <div className="method">
                    <select
                      name="paymentMethodType"
                      value={form.paymentMethodType}
                      onChange={handleChange}
                    
                    >
                      <option value="">Method</option>
                      <option value="cash">Cash</option>
                      <option value="credit">Credit</option>
                    </select>
                    <p className="paragrah">Payment methods:</p>
                  </div>
                </div>
                <div className="promocodee">
                  <div className="code">
                    <input
                    
                      type="text"
                      value={form.promocode[0].code}
                      onChange={(e) => handlePromoChange("code", e.target.value)}
                      className={errors.promoCode ? "error-input" : ""}
                    />
                    <p className="paragrah">promoCode:</p>
                    {errors.promoCode && <span className="error-message">{errors.promoCode}</span>}
                  </div>

               
                  <div className="value">
                    <input
                 
                      type="text"
                      value={form.promocode[0].value}
                      onChange={(e) => handlePromoChange("value", e.target.value)}
                      className={errors.promoValue ? "error-input" : ""}
                    />
                    <p className="paragrah">Value:</p>
                    {errors.promoValue && <span className="error-message">{errors.promoValue}</span>}

                  </div>
                </div>
                <div className="promocodeddate">
                  <div className="starttime">
                    <input
                    
                      type="date"
                      value={form.promocode[0].startAt}
                      onChange={(e) => handlePromoChange("startAt", e.target.value)}
                      className={errors.promoStartAt ? "error-input" : ""}
                    />
                    <p className="paragrah">startAt:</p>
                    {errors.promoStartAt && <span className="error-message">{errors.promoStartAt}</span>}
                  </div>

               
                  <div className="expireAt">
                    <input
                      type="date"
                      value={form.promocode[0].expireAt}
                      onChange={(e) => handlePromoChange("expireAt", e.target.value)}
                      className={errors.promoExpireAt ? "error-input" : ""}
                    />
               
                    <p className="paragrah">expireAt:</p>
                    {errors.promoExpireAt && <span className="error-message">{errors.promoExpireAt}</span>}

                  </div>
                </div>
                {errors.promoDates && <span className="error-message">{errors.promoDates}</span>}

              </div>
            </div>
            {/* <div className="buttonstepaddres" onClick={() => {
              if (validateStep3()) {
                handleSubmit();
              }
            }}>
              Submit
            </div> */}
          </>
          
              
        )
      }

      <div className="navigation-buttons">
        {step !== "1" && (
          <span onClick={handlePrevStep} className={step === "2" ? "active" : ""}>
            Previous
          </span>
        )}
        {step !== "3" && (
          <span onClick={handleNextStep} className={step === "1" ? "end" : ""}>
            Next
          </span>
        )}
        {step === "3" && (
          <button 
            onClick={handleSubmit} 
            className={step === "1" || step === "2" ? "active" : "submittt"}
            disabled={loading}
          >
            {loading ? <div className="spinner-small"></div> : "Submit"}
          </button>
        )}
      </div>
      
      {successMessage && (
        <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}
    </div>
  )
  
}






















