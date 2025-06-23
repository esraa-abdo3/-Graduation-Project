import { useEffect,  useState } from "react";
import "./ProfileDoctor.css";
import Dropzone from "react-dropzone";
import uploadimg from "../../assets/upload_11918679.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import DoctorNavbarr from "../DoctorNavbar/DoctorNavbar";
export default function ProfileDoctorDash() {

  const [doctordetalis,setdoctordetalis] = useState({});
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");
  const docid = cookies.get("id");
  console.log(docid)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    date: "", 
    Email: "",
    Specialty: "",
    masterOf: "",
    phones: ["", ""],
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
  const dayOptions = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [tempDayData, setTempDayData] = useState({
    type: "",
    slots: [{ startTime: "", endTime: "" }],
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);
  const [donedetalis, setdonedetalis] = useState(false);
  const [doneaddres, setdoneaddres] = useState(false);
  const [dataloader, setdataloder] = useState(false);
  const [updatesucess, setupdatesucess] = useState("")
  const[updatefali,setupdatefail]=useState("")
  useEffect(() => {
    if (form.day.length > 0) {
      setTempDayData({
        type: form.day[0].type || "", 
        slots: form.day[0].slots.map(slot => ({
          startTime: slot.startTime, 
          endTime: slot.endTime
        })) || [{ startTime: "", endTime: "" }]
      });
    }
  }, [form.day]); 
 // first get the doctor detalis
  useEffect(() => {
    async function getDoctor() {
      setdataloder(true)
      try {
        const response = await axios.get(`https://carenest-serverside.vercel.app/doctor/${docid} `, {
          headers: {
            "Authorization": `${getToken}`
          }
        });
            setdataloder(false)
              
        console.log("backdata", response.data.data);
        const doctorData = response.data.data;
        setForm((prevForm) => ({
          ...prevForm,
          paymentMethodType:doctorData.paymentMethodType||"cash",
          firstName: doctorData.user.firstName || "",
          lastName: doctorData.user.lastName || "",
          Specialty: doctorData.Specialty || "",
          masterOf: doctorData.masterOf || "",
          phones: doctorData.phones.length > 0 ? doctorData.phones : ["", ""],
          bookingPrice: doctorData.bookingPrice || "",
          About: doctorData.About || "",
          Location: {
            type: "Point",
            coordinates: doctorData.Location.coordinates || ["", ""],
            mainPlace: doctorData.Location.mainPlace || "",
            address: doctorData.Location.address || "",
          },
          images: doctorData.images || [],
          image: doctorData.image || null,
          day: doctorData.day || [],
          gender:doctorData.gender||"",
        
          promocode: doctorData.promocode?.length >=1
            ? doctorData.promocode
            : [
                {
                  code: "",
                  value: "",
                  expireAt: "",
                },
              ],
        }));
        // copy data to compare
        setdoctordetalis({
          paymentMethodType:doctorData.paymentMethodType||"cash",
          firstName: doctorData.user.firstName || "",
          lastName: doctorData.user.lastName || "",
          Specialty: doctorData.Specialty || "",
          masterOf: doctorData.masterOf || "",
          phones: doctorData.phones.length > 0 ? doctorData.phones : ["", ""],
          bookingPrice: doctorData.bookingPrice || "",
          About: doctorData.About || "",
          Location: {
            type: "Point",
            coordinates: doctorData.Location.coordinates || ["", ""],
            mainPlace: doctorData.Location.mainPlace || "",
            address: doctorData.Location.address || "",
          },
          images: doctorData.images || [],
          image: doctorData.image || null,
          day: doctorData.day || [],
          gender:doctorData.gender||"",
        
          promocode: doctorData.promocode?.length >=1
            ? doctorData.promocode
            : [
                {
                  code: "",
                  value: "",
                  expireAt: "",
                },
              ],
        })
    
             
 
      } catch (error) {
        console.log("Error fetching babies:", error);
        setdataloder(false)
        
      }
    }
    if (getToken) {
      getDoctor();
    }
        
  }, [getToken, docid]);
 // ============================== (1) التنقل بين الخطوات ==============================
    
  const handleNextStep = () => {
    if (step === 1) {
      const validationErrors = validateFormStep1();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      } else {
        setdonedetalis(true);
      }
    }
    if (step === 2) {
      const validationErrors = validateFormStep2();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      } else {
        setdoneaddres(true);
      }
    }
    
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // ============================== (2) التحقق في الخطوة الأولى ==============================
  function validateFormStep1() {
    const validationErrors = {};

    // firstName
    if (!form.firstName) {
      validationErrors.firstName = "first name required";
    } else if (form.firstName.length < 3) {
      validationErrors.firstName = "first name must be at least 3 characters long";
    } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
      validationErrors.firstName = "firstname should only contain English letters";
    }

    // lastName
    if (!form.lastName) {
      validationErrors.lastName = "last name required";
    } else if (form.lastName.length < 3) {
      validationErrors.lastName = "last name must be at least 3 characters long";
    } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
      validationErrors.lastName = "lastname should only contain English letters";
    }



    // specialty
    if (!form.Specialty) {
      validationErrors.Specialty = "Specialty must be either Pediatricians or Gynecologists";
    }

    // day
    if (form.day.length === 0) {
      validationErrors.day = "please select at least one day";
    }

    return validationErrors;
  }
    // ============================== التحقق في الخطوة الثانية  ==============================
    function validateFormStep2() {
      const validationErrors = {};
  
      // firstName
      if (form.Location.coordinates.length!==2) {
        validationErrors.coordinates = "please enter both lat and long ";
      }
      if (!form.Location.mainPlace) {
        validationErrors.mainPlace = "please enter your main place";
      }  if (!form.Location.address) {
        validationErrors.address = "please enter youraddres";
      }
  
  
      return validationErrors;
    }

  // ============================== (4) دوال تحديث الحقول ==============================
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

  }
  // phones
  const handlePhoneChange = (index, newValue) => {
    setForm((prev) => {
      const updatedPhones = [...prev.phones];
      updatedPhones[index] = newValue;
      return { ...prev, phones: updatedPhones };
    });
  };
  // to add new filed we need to add new element and map on it 
  const addPhoneField = () => {
    setForm((prev) => ({
      ...prev,
      phones: [...prev.phones, ""],
    }));
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
  
  function handleDropProfile(acceptedFiles) {
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

  // Location (Step 2)
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
      coordsCopy[index] = newValue; // خزنها نصًا
      return {
        ...prev,
        Location: {
          ...prev.Location,
          coordinates: coordsCopy,
        },
      };
    });
  };

  // ============================== (5) إدارة day ==============================
  const handleDaySelection = (dayName) => {
    // إذا كان اليوم المختار بالفعل هو نفسه في tempDayData
    if (tempDayData && tempDayData.type === dayName) {
      setTempDayData(null);
    } else {
      // هل هو موجود في form.day؟
      const savedDay = form.day.find((d) => d.type === dayName);
      if (savedDay) {
        setTempDayData(savedDay);
      } else {
        // يوم جديد
        setTempDayData({ type: dayName, slots: [{ startTime: "", endTime: "" }] });
      }
    }
  };

  const handleTempTimeChange = (field, value, slotIndex) => {
    if (tempDayData) {
      setTempDayData((prev) => ({
        ...prev,
        slots: prev.slots.map((slot, idx) =>
          idx === slotIndex ? { ...slot, [field]: value } : slot
        ),
      }));
    }
  };

  const handleSaveDay = () => {
    if (!tempDayData) return;
    setForm((prevForm) => {
      // هل اليوم موجود مسبقًا؟
      const dayExists = prevForm.day.some((d) => d.type === tempDayData.type);
      if (dayExists) {
        // تحديث
        return {
          ...prevForm,
          day: prevForm.day.map((d) => (d.type === tempDayData.type ? tempDayData : d)),
        };
      } else {
        // إضافة
        return {
          ...prevForm,
          day: [...prevForm.day, tempDayData],
        };
      }
    });
    setTempDayData(null);
  };

  const handleCancelSavedDay = (dayName) => {
    const dayData = form.day.find((d) => d.type === dayName);
    if (!dayData) return;
    setForm((prevForm) => ({
      ...prevForm,
      day: prevForm.day.filter((d) => d.type !== dayName),
    }));
    setTempDayData(dayData);
  };

  const handleAddSlotTemp = () => {
    if (tempDayData) {
      setTempDayData((prev) => ({
        ...prev,
        slots: [...prev.slots, { startTime: "", endTime: "" }],
      }));
    }
  };

  // ============================== (6) واجهة النموذج ==============================
  // const getUpdatedFields = (newData, oldData) => { 
  //   let updatedFields = {};
  //   const oldDataActual = oldData.current ? oldData.current : oldData;

  //   Object.keys(newData).forEach((key) => {
  //     const newValue = newData[key];
  //     const oldValue = oldDataActual[key];
  //     const normalizedNewValue = newValue === undefined ? null : newValue;
  //     const normalizedOldValue = oldValue === undefined ? null : oldValue;
  //     const cleanNewValue = typeof normalizedNewValue === "string" ? normalizedNewValue.trim() : normalizedNewValue;
  //     const cleanOldValue = typeof normalizedOldValue === "string" ? normalizedOldValue.trim() : normalizedOldValue;    
  //     const hasChanged = typeof cleanNewValue === "object" && cleanNewValue !== null
  //           ? JSON.stringify(cleanNewValue) !== JSON.stringify(cleanOldValue)
  //           : cleanNewValue !== cleanOldValue;
      
  //     if (hasChanged) {
  //       updatedFields[key] = newValue;
  //       console.log(`المفتاح ${key} اتغير`);
  //     }
  //   });
    

  //   return updatedFields;
  // };
  const getUpdatedFields = (newData, oldData) => { 
    let updatedFields = {};
    const oldDataActual = oldData.current ? oldData.current : oldData;

    Object.keys(newData).forEach((key) => {
        const newValue = newData[key];
        const oldValue = oldDataActual[key];

        const normalizedNewValue = newValue === undefined ? null : newValue;
        const normalizedOldValue = oldValue === undefined ? null : oldValue;
        
        const cleanNewValue = typeof normalizedNewValue === "string" ? normalizedNewValue.trim() : normalizedNewValue;
        const cleanOldValue = typeof normalizedOldValue === "string" ? normalizedOldValue.trim() : normalizedOldValue;

        const hasChanged = typeof cleanNewValue === "object" && cleanNewValue !== null
            ? JSON.stringify(cleanNewValue) !== JSON.stringify(cleanOldValue)
            : cleanNewValue !== cleanOldValue;

        // ✅ إضافة المفتاح إذا كان غير موجود في `oldData`
        if (hasChanged || !(key in oldDataActual)) { 
            updatedFields[key] = newValue;
            console.log(`المفتاح ${key} تم تحديثه أو إضافته`);
        }
    });

    return updatedFields;
};




function createFormData() {
  const data = new FormData();
  let updates = getUpdatedFields(form, doctordetalis);
  console.log("updates", updates);

  if (Object.keys(updates).length === 0) {
    console.log("no updates");
    return null; 
  }

  let hasUpdates = false; 

  Object.entries(updates).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
          data.append("image", value);
          hasUpdates = true;
      } 
      else if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => {
              if (file instanceof File) {
                  data.append("images", file);
                  hasUpdates = true;
              }
          });
      } 
      else if (key === "phones" && Array.isArray(value)) { // ✅ إرسال الأرقام كمصفوفة
          value.forEach((phone) => {
              data.append("phones", phone);
          });
          hasUpdates = true;
      } 

      else if (key === "Location" && typeof value === "object" && value !== null) { 
          data.append("Location[type]", value.type);
          data.append("Location[mainPlace]", value.mainPlace);
          data.append("Location[address]", value.address);
          data.append("Location[coordinates][0]", value.coordinates[0]);
          data.append("Location[coordinates][1]", value.coordinates[1]);
          hasUpdates = true;
      } 
      else if (key === "promocode" && Array.isArray(value)) { 

        data.append("promocode", JSON.stringify(value[0]));
        hasUpdates = true;
      }
      else if (key === "day" && typeof value === "object" && value !== null) {
        data.append("day", JSON.stringify(value)); 
      }
        
     
      else { 
          data.append(key, value || "");
          hasUpdates = true;
      }
  });

  console.log("📦 FormData Content:");
  for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
  }

  return hasUpdates ? data : null; 
}

  
  

  async function handleupdate(e) {
    e.preventDefault();
    
    console.log("current data here:", form);
    console.log("original data", doctordetalis);
    
    let updates = createFormData();
    
    if (!updates) {  // التأكد من أن updates ليست null
      console.log("no updates");
      return;
    }
    for (let pair of updates.entries()) {
      if (pair[1] instanceof File) {
        console.log(`📸 ملف مرفوع: ${pair[0]} - الاسم: ${pair[1]}`);
      } else {
        console.log(`📄 بيانات: ${pair[0]} - القيمة: ${pair[1]}`);
      }
    }
    

    setLoading(true);
    
    try {
        let res = await axios.put(
            `https://carenest-serverside.vercel.app/doctor`, 
             updates , 
            {
                headers: {
                Authorization: ` ${getToken}`,
                   "Content-Type": "multipart/form-data"
                }
            }
        );
        
      console.log("✅ update done", res.data);
      setupdatesucess(" update done successfuly")
      setTimeout(() => {
        setStep(1)
        setupdatesucess("")
}, 1000); 

      
        
    } catch (err) {
      console.error("❌ خطأ أثناء التحديث:", err);
      setupdatefail(" somthing go wrongplease try again")
          setTimeout(() => {
            setStep(1)
                  setupdatefail("")
}, 1000); 
    }
    
    setLoading(false);
}



    return (
        <>
            <DoctorNavbarr/>
                  <div className="DoctorProfileDash">
          {dataloader ? (
            <>
                                       <section className="dots-container">
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
</section>
            </>
          ) : 
              <>
                <div className="Add-Doctor">
      <div className="header">
        <div className="head">
          <h2>Update your profile</h2>
        <p>View and complete your profile details to ensure accurate information is available in the system.</p>

        </div>
      </div>

      <div className="circle">
        <div className={donedetalis? "active" : ""}>Details</div>
        <div className={doneaddres ? "active" : ""}>Address</div>
        <div className={step === 3 ? "active" : ""}>Profile</div>
      </div>

      <form onSubmit={handleupdate}>
        {/* ======== STEP 1 ======== */}
        {step === 1 && (
          <>
            <div className="detalis-side">
              {/* Basic Information */}
              <div className="Basic-Information">
                <div className="header">Basic Information</div>
                <div className="names">
                  <div className="firstname">
                    <label>First Name :</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </div>
                  <div className="lastname">
                    <label>Last Name :</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="dateirrth-gender">
                  <div className="date-of-birth-labelprofile">
                    <label>birthday :</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="gender">
                    <label>Gender :</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Specialty & Expertise */}
              <div className="Specialty-Expertise">
                <div className="header">Specialty & Expertise</div>
                <div className="Specialty">
                  <label>Specialty : </label>
                  <div className="radio">
                    <div>
                      <input
                        type="radio"
                        value="Pediatricians"
                        name="Specialty"
                        checked={form.Specialty === "Pediatricians"}
                        onChange={handleChange}
                      />
                      <label>Pediatricians</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="Gynecologists"
                        name="Specialty"
                        checked={form.Specialty === "Gynecologists"}
                        onChange={handleChange}
                      />
                      <label>Gynecologists</label>
                    </div>
                  </div>
               
                </div>
                {errors.Specialty && <p className="error" style={{marginLeft:"-4px"}}>{errors.Specialty}</p>}
                <div className="Additional-Expertise">
                  <label>masterOf :</label>
                  <input
                    type="text"
                    name="masterOf"
                    value={form.masterOf}
                    onChange={handleChange}
                    style={{marginLeft:"15px"}}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="Contact-Information">
                <div className="header">Contact Information</div>
                <div className="moblie">
                <div className="mobilenumbers">
                  {form.phones.map((phoneValue, index) => (
                    <div className="numberphone" key={index}>
                      <label>Mobile No. {index + 1}:</label>
                      <input
                        type="text"
                        value={phoneValue}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                      />
                    </div>
                  ))}
          
                  </div>

                </div>
               
                <span  className="addphone"type="button" onClick={addPhoneField} >
                  <BsFillTelephonePlusFill/>
                  </span>
              </div>
            </div>
            <div className="availability-side" style={{ marginTop: "10px" }}>
              <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "7px 30px" }}>
                <div className="header">availability</div>
                <div className="availability">
                  <div className="days">
                    {dayOptions.map((dayName) => (
                      <span
                        key={dayName}
                        onClick={() => handleDaySelection(dayName)}
                        className={
                          (tempDayData && tempDayData.type === dayName) ||
                          form.day.some((d) => d.type === dayName)
                            ? "active"
                            : ""
                        }
                      >
                        {dayName.slice(0, 3)}
                      </span>
                    ))}
                  </div>

                  {tempDayData && (
                    <div className="from-to">
                      {tempDayData.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="slot-group">
                          <div className="from">
                            <label>From:</label>
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) =>
                                handleTempTimeChange("startTime", e.target.value, slotIndex)
                              }
                            />
                          </div>
                          <div className="to">
                            <label>To:</label>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) =>
                                handleTempTimeChange("endTime", e.target.value, slotIndex)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="buttons">
                    {tempDayData && form.day.some((d) => d.type === tempDayData.type) ? (
                      <>
                        <span type="button" onClick={handleSaveDay}>
                          Update
                        </span>
                        <span
                          type="button"
                          onClick={() => {
                            // إلغاء اليوم المحفوظ
                            handleCancelSavedDay(tempDayData.type);
                          }}
                        >
                          Cancel
                        </span>
                        <span type="button" onClick={handleAddSlotTemp}>
                          Add Another
                        </span>
                      </>
                    ) : tempDayData ? (
                      <>
                        <span type="button" onClick={handleAddSlotTemp}>
                          Add Another
                        </span>
                        <span type="button" onClick={handleSaveDay}>
                          Save
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
                {errors.day && <p className="error">{errors.day}</p>}
              </div>

              {/* Payment Details & Promocode */}
              <div
                className="payment-details"
                style={{ backgroundColor: "white", borderRadius: "8px", padding: "7px 30px" }}
              >
                <div className="header">Payment Details & promocode</div>

                <div className="detalis">
                  <div className="price" style={{color:"black"}}>
                    <label>Booking Price:</label>
                    <input
                      type="text"
                      name="bookingPrice"
                      value={form.bookingPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="payment">
                    <label>Payment Method:</label>
                    <select
                      name="paymentMethodType"
                      value={form.paymentMethodType}
                      onChange={handleChange}
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>

                <div className="detalis">
                  <div className="promomcode">
                    <label>promo code:</label>
                    <input
                      type="text"
                      value={form.promocode[0].code}
                      onChange={(e) => handlePromoChange("code", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>value :</label>
                    <input
                      type="text"
                      value={form.promocode[0].value}
                      onChange={(e) => handlePromoChange("value", e.target.value)}
                    />
                  </div>
                </div>

                <div className="detalis">
                  <div>
                    <label>StartAt :</label>
                    <input
                      type="date"
                      value={form.promocode[0].startAt}
                      onChange={(e) => handlePromoChange("startAt", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>expireAt :</label>
                    <input
                      type="date"
                      value={form.promocode[0].expireAt}
                      onChange={(e) => handlePromoChange("expireAt", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ======== STEP 2 ======== */}
        {step === 2 && (
          <>
            <div className="detalis-side">
              <div className="Basic-Information">
                <div className="header">Doctor's Location Information</div>
                <div className="names">
                  <div className="firstname">
                    <label>address :</label>
                    <input
                      type="text"
                      value={form.Location.address}
                      onChange={(e) => handleLocationChange("address", e.target.value)}
                    />
                       {errors.address && <p className="error">{errors.address}</p>}
                  </div>
               
                  <div className="lastname">
                    <label>mainPlace :</label>
                    <input
                      type="text"
                      value={form.Location.mainPlace}
                      onChange={(e) => handleLocationChange("mainPlace", e.target.value)}
                    />
                    {errors.mainPlace && <p className="error">{errors.mainPlace}</p>}
                  </div>
                  
                </div>
                <div className="names">
                  <div className="lastname" style={{display:"flex" , flexDirection:"column", gap:"7px"}}>
                    <label>Longitude :</label>
                    <input
                      type="text"
                      value={form.Location.coordinates[0]}
                      onChange={(e) => handleLocationCoordinatesChange(0, e.target.value)}
                    />
                  </div>
                  <div className="lastname" style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <label>latitude :</label>
                    <input
                      type="text"
                      value={form.Location.coordinates[1]}
                      onChange={(e) => handleLocationCoordinatesChange(1, e.target.value)}
                    />
                  </div>
                  {errors.coordinates && <p className="mainPlace">{errors.coordinates}</p>}
                </div>
              </div>
            </div>

            {/* رفع صور إضافية (images) */}
            <div className="availability-side imgside">
              <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <div className="header">Upload Address Images</div>
                <Dropzone onDrop={handleDropImages} accept="image/*" multiple={true}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="upload-container">
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p style={{padding:"7px 0" , color:"#777"}}>
                          Drag your photos here
                          {/* <span className="browse">Browse from device</span> */}
                        </p>
                 
                        <div className="preview" style={{paddingBottom:"3px"}}>
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
            style={{ width: "30px" }}
          />
        ) : (
          <img 
            src={URL.createObjectURL(file)} 
            alt="Additional" 
            className="uploaded-image" 
            style={{ width: "30px" }}
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
      style={{ width: "30px" }}
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
          </>
        )}

        {/* ======== STEP 3 ======== */}
        {step === 3 && (
          <>
            <div className="detalis-side">
              <div className="Basic-Information">
                <div className="header">Doctor's Profile</div>
                <div className="about" style={{display:"flex" , flexDirection:"column", gap:"7px"}}>
                  <label  style={{paddingTop:"7px"}}>About :</label>
                  <textarea
                    style={{ height: "118px", width: "100%",  padding:"10px 20px" , marginBottom:"15px"}}
                    placeholder="Write something about yourself"
                    name="About"
                    value={form.About}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

         
            <div className="availability-side imgside">
              <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <div className="header">Upload Profile Image</div>
                <Dropzone onDrop={handleDropProfile} accept="image/*" multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div className="upload-container">
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p style={{padding:"7px 0" , color:"#777"}}>
                          Drag your photo here or 
                        </p>
<div className="preview">
  {form.image ? (
    <div className="image-wrapper" style={{  position:"relative" ,display: "flex",alignItems:"center" , gap:"10px" }}>
      {typeof form.image === "string" ? (
        <img src={form.image} alt="Profile" className="uploaded-image" />
      ) : (
        <img src={URL.createObjectURL(form.image)} alt="Profile" className="uploaded-image" />
      )}
     
      <button 
        onClick={() => setForm((prev) => ({ ...prev, image: null }))}
        style={{
          position: "absolute",
          top:"10px",

          backgroundColor: "#b1a8a8",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "15px",
          height: "15px",
          cursor: "pointer"
        }}
      >
        X
      </button>
    </div>
  ) : (
    <img src={uploadimg} alt="No profile" className="uploaded-image" />
  )}
</div>


                      </div>
                  
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </>
        )}
      </form>

      <div className="navigation-buttons">
        {step > 1 && (
          <span onClick={handlePrevStep} className={step === 2 ? "active" : ""}>
            Previous
          </span>
        )}
        {step < 3 && (
          <span onClick={handleNextStep} className={step === 1 ? "end":""}>
            Next
          </span>
        )}
        {step === 3 && (
          <button onClick={handleupdate} className={step === 1 || step === 2 ? "active" : "submittt"}>
           {Loading ? <div className="spinner-small"></div> : "update"}
          </button>
        )}
                </div>
                {updatesucess.length > 0 && (
                  <p style={{color:"green" , textAlign:"center"}}> { updatesucess}</p>
                )}
                     {updatefali.length > 0 && (
                  <p style={{color:"red" , textAlign:"center"}}> { updatefali}</p>
                )}
            </div>
              </>
   }
    
            </div>
            </>

  );
}
