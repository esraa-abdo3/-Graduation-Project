
// import { useState } from "react";
// import ImageUploader from "../../../dropzone/DropZone";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";

// export default function AddTip() {
//     const cookies = new Cookies();
//     const getToken = cookies.get("Bearer");

//     const [form, setform] = useState({
//         target: "",
//         category: "",
//         advice: "",
//         header: "",
//         month: "",
//         image: "",
//         tip: [
//             {
//                 title: "",
//                 description: ""
//             }
//         ]
//     });

//     const [error, setErrors] = useState({});

//     function validateForm() {
//         const errors = {};

//         if (!form.target) {
//             errors.target = "Article target is required";
//         }

//         if (!form.category) {
//             errors.category = "Article category is required";
//         }

//         if (!form.month && form.target !== "Mama") {
//             errors.month = "Month is required";
//         } else if (form.month && (form.month < 1 || form.month > 12)) {
//             errors.month = "Month must be between 1 and 12";
//         }

//         return errors;
//     }

//     function handlechange(e) {
//         const { name, value } = e.target;
//         let newForm = { ...form, [name]: value };
//         let newErrors = { ...error };

//         if (name === "title" || name === "description") {
//             const updatedTips = [...form.tip];
//             updatedTips[0] = { ...updatedTips[0], [name]: value };
//             newForm = { ...form, tip: updatedTips };
//         } else if (name === "month") {
//             let monthValue = parseInt(value, 10);
//             if (!isNaN(monthValue) && monthValue >= 1 && monthValue <= 12) {
//                 newForm = { ...form, month: monthValue };
//             } else {
//                 newForm = { ...form, month: "" };
//             }
//         }

//         // إزالة الخطأ عند بدء الكتابة
//         delete newErrors[name];

//         // عند اختيار "Mama"، إزالة خطأ month تلقائيًا
//         if (name === "target" && value === "Mama") {
//             delete newErrors.month;
//         }

//         setform(newForm);
//         setErrors(newErrors);
//     }

//     async function handlesubmit(e) {
//         e.preventDefault();
//         const errorsafter = validateForm();
//         if (Object.keys(errorsafter).length > 0) {
//             setErrors(errorsafter);
//             return;
//         }

//         const requestData = { ...form };

//         if (form.target === "Mama") {
//             delete requestData.month;
//         } else {
//             requestData.month = form.month ? Number(form.month) : null;
//         }

//         try {
//             let res = await axios.post(
//                 `https://carenest-serverside.vercel.app/tips/?target=${form.target}`,
//                 requestData,
//                 {
//                     headers: {
//                         "Authorization": `${getToken}`,
//                     },
//                 }
//             );

//             console.log(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="AddTip">
//             <div className="header">
//                 <div className="head">
//                     <h2>Add new tip</h2>
//                     <p>Tips given across your site</p>
//                 </div>
//             </div>
//             <form onSubmit={handlesubmit}>
//                 <div className="tip-all">
//                     <div className="insideTips">
//                         <div className="content-tip">
//                             <div className="Tip-title">
//                                 <label>Tip Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     placeholder="Write title here"
//                                     value={form.tip[0].title}
//                                     onChange={handlechange}
//                                 />
//                             </div>
//                             <div className="tip-description">
//                                 <label>Tip Description</label>
//                                 <textarea
//                                     name="description"
//                                     placeholder="Write a description here..."
//                                     value={form.tip[0].description}
//                                     onChange={handlechange}
//                                 ></textarea>
//                             </div>
//                             <div className="iconadd">
//                                 < IoAddCircle/>

//                             </div>
//                         </div>
//                         <div style={{ paddingTop: "5px" }}>
//                             <label style={{ fontWeight: "600", textTransform: "capitalize", fontSize: "20px" }}>
//                                 Display Image
//                             </label>
//                             <ImageUploader />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="Organize">
//                     <h3>Organize</h3>
//                     <div className="Article-target">
//                         <label htmlFor="target">Article Target</label>
//                         <select id="target" name="target" value={form.target} onChange={handlechange}>
//                             <option value="">Select a target</option>
//                             <option value="Mama">Mama</option>
//                             <option value="Father">Father</option>
//                             <option value="Baby">Baby</option>
//                         </select>
//                         {error.target && <p className="error">{error.target}</p>}
//                     </div>

//                     <div className="Article-Category">
//                         <label htmlFor="category">Article Category</label>
//                         <input
//                             type="text"
//                             name="category"
//                             id="category"
//                             value={form.category}
//                             onChange={handlechange}
//                         />
//                         {error.category && <p className="error">{error.category}</p>}
//                     </div>

//                     <div className="Article-months">
//                         <label htmlFor="month">Target Months</label>
//                         <input
//                             type="text"
//                             name="month"
//                             id="month"
//                             value={form.month}
//                             onChange={handlechange}
//                         />
//                         {error.month && <p className="error">{error.month}</p>}
//                     </div>

//                     <div className="tip-header">
//                         <label>Article Header</label>
//                         <input
//                             type="text"
//                             name="header"
//                             id="header"
//                             value={form.header}
//                             onChange={handlechange}
//                         />
//                     </div>

//                     <div className="tip-advice">
//                         <label>Article Advice</label>
//                         <input
//                             type="text"
//                             name="advice"
//                             id="advice"
//                             value={form.advice}
//                             onChange={handlechange}
//                         />
//                     </div>
//                 </div>
//                 <button className="submit">Publish Tip</button>
//             </form>
//         </div>
//     );
// }

// import { useState } from "react";
// import ImageUploader from "../../../dropzone/DropZone";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";

// export default function AddTip() {
//     const cookies = new Cookies();
//     const getToken = cookies.get("Bearer");

//     const [form, setForm] = useState({
//         target: "",
//         category: "",
//         advice: "",
//         header: "",
//         month: "",
//         image: "",
//         tip: [
//             { title: "", description: "" } // أول عنصر افتراضيًا
//         ]
//     });

//     const [activeIndex, setActiveIndex] = useState(0); // لتحديد أي إدخال يتم عرضه حاليًا
//     const [error, setErrors] = useState({});

//     function handleChange(e, index) {
//         const { name, value } = e.target;
//         let newForm = { ...form };
//         let newErrors = { ...error };

//         if (name === "title" || name === "description") {
//             const updatedTips = [...form.tip];
//             updatedTips[index] = { ...updatedTips[index], [name]: value };
//             newForm = { ...form, tip: updatedTips };
//         } else {
//             newForm = { ...form, [name]: value };
//         }

//         delete newErrors[name];
//         setForm(newForm);
//         setErrors(newErrors);
//     }

//     function addNewTip() {
//         setForm((prev) => ({
//             ...prev,
//             tip: [...prev.tip, { title: "", description: "" }]
//         }));
//         setActiveIndex(form.tip.length); // الانتقال للعنصر الجديد تلقائيًا
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         const errorsAfter = validateForm();
//         if (Object.keys(errorsAfter).length > 0) {
//             setErrors(errorsAfter);
//             return;
//         }

//         const requestData = { ...form };
//         if (form.target === "Mama") {
//             delete requestData.month;
//         }

//         try {
//             let res = await axios.post(
//                 `https://carenest-serverside.vercel.app/tips/?target=${form.target}`,
//                 requestData,
//                 { headers: { Authorization: `${getToken}` } }
//             );
//             console.log(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="AddTip">
//             <div className="header">
//                 <h2>Add new tip</h2>
//                 <p>Tips given across your site</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="tip-all">
//                     <div className="insideTips">
//                         <div className="tabs">
//                             {form.tip.map((_, index) => (
//                                 <button
//                                     key={index}
//                                     className={activeIndex === index ? "active" : ""}
//                                     onClick={() => setActiveIndex(index)}
//                                 >
//                                     Tip {index + 1}
//                                 </button>
//                             ))}
//                         </div>

//                         <div className="content-tip">
//                             <div className="Tip-title">
//                                 <label>Tip Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     placeholder="Write title here"
//                                     value={form.tip[activeIndex].title}
//                                     onChange={(e) => handleChange(e, activeIndex)}
//                                 />
//                             </div>
//                             <div className="tip-description">
//                                 <label>Tip Description</label>
//                                 <textarea
//                                     name="description"
//                                     placeholder="Write a description here..."
//                                     value={form.tip[activeIndex].description}
//                                     onChange={(e) => handleChange(e, activeIndex)}
//                                 ></textarea>
//                             </div>
//                             <div className="iconadd" onClick={addNewTip}>
//                                 <IoAddCircle />
//                             </div>
//                         </div>
                        
//                         <div style={{ paddingTop: "5px" }}>
//                             <label className="image-label">Display Image</label>
//                             <ImageUploader />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="Organize">
//                     <h3>Organize</h3>
//                     <div className="Article-target">
//                         <label>Article Target</label>
//                         <select name="target" value={form.target} onChange={handleChange}>
//                             <option value="">Select a target</option>
//                             <option value="Mama">Mama</option>
//                             <option value="Father">Father</option>
//                             <option value="Baby">Baby</option>
//                         </select>
//                         {error.target && <p className="error">{error.target}</p>}
//                     </div>

//                     <div className="Article-Category">
//                         <label>Article Category</label>
//                         <input
//                             type="text"
//                             name="category"
//                             value={form.category}
//                             onChange={handleChange}
//                         />
//                         {error.category && <p className="error">{error.category}</p>}
//                     </div>

//                     <div className="Article-months">
//                         <label>Target Months</label>
//                         <input
//                             type="text"
//                             name="month"
//                             value={form.month}
//                             onChange={handleChange}
//                         />
//                         {error.month && <p className="error">{error.month}</p>}
//                     </div>

//                     <div className="tip-header">
//                         <label>Article Header</label>
//                         <input
//                             type="text"
//                             name="header"
//                             value={form.header}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="tip-advice">
//                         <label>Article Advice</label>
//                         <input
//                             type="text"
//                             name="advice"
//                             value={form.advice}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>

//                 <button className="submit">Publish Tip</button>
//             </form>
//         </div>
//     );
// }
///////////////////////////////////////////////////////////////////////
// import { useState } from "react";
// import ImageUploader from "../../../dropzone/DropZone";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";
// import Slider from "react-slick";

// export default function AddTip() {
//     const cookies = new Cookies();
//     const getToken = cookies.get("Bearer");

//     const [form, setForm] = useState({
//         target: "",
//         category: "",
//         advice: "",
//         header: "",
//         month: "",
//         image: "",
//         tip: [{ title: "", description: "" }]
//     });

//     const [error, setErrors] = useState({});
//     function validateForm() {
//         const errors = {};

//         if (!form.target) {
//             errors.target = "Article target is required";
//         }

//         if (!form.category) {
//             errors.category = "Article category is required";
//         }

//         if (!form.month && form.target !== "Mama") {
//             errors.month = "Month is required";
//         } else if (form.month && (form.month < 1 || form.month > 12)) {
//             errors.month = "Month must be between 1 and 12";
//         }

//         return errors;
//     }

  
//       function handleChange(e, index) {
//         const { name, value } = e.target;
//         setForm((prevForm) => {
//             let newForm = { ...prevForm };
//             let newErrors = { ...error };
    
//             if (name === "title" || name === "description") {
//                 const updatedTips = [...prevForm.tip];
//                 updatedTips[index] = { ...updatedTips[index], [name]: value };
//                 newForm = { ...prevForm, tip: updatedTips };
//             } else {
//                 newForm = { ...prevForm, [name]: value };
//             }
    
//             delete newErrors[name];
//             setErrors(newErrors);
//             return newForm;
//         });
//     }
    

//     const handleImageUpload = (imageData) => {
//         // تحويل Base64 إلى ملف
//         const byteCharacters = atob(imageData.split(',')[1]);
//         const byteArrays = [];
        
//         for (let i = 0; i < byteCharacters.length; i += 512) {
//             const slice = byteCharacters.slice(i, i + 512);
//             const byteNumbers = new Array(slice.length);
//             for (let j = 0; j < slice.length; j++) {
//                 byteNumbers[j] = slice.charCodeAt(j);
//             }
//             byteArrays.push(new Uint8Array(byteNumbers));
//         }
    
//         const imageFile = new File(byteArrays, "uploaded-image.png", { type: "image/png" });
    
//         // تحديث الفورم بالصورة
//         setForm((prev) => ({ ...prev, image: imageFile }));
    
//         // طباعة الصورة في الكونسول
//         console.log("تم تحويل الصورة إلى ملف:", imageFile);
//     };
    


//     function addNewTip() {
//         setForm((prev) => ({
//             ...prev,
//             tip: [...prev.tip, { title: "", description: "" }]
//         }));
//     }
    

 
//     async function handleSubmit(e) {
//         e.preventDefault();
    
//         const errorsAfter = validateForm();
//         if (Object.keys(errorsAfter).length > 0) {
//             setErrors(errorsAfter);
//             return;
//         }
    
//         // نسخ البيانات الموجودة في الفورم
//         const requestData = { ...form };
    
//         // حذف `month` إذا كان target هو "Mama"
//         if (requestData.target === "Mama") {
//             delete requestData.month;
//         }
    
//         // تنظيف قائمة tips وإزالة العناصر الفارغة
//         if (Array.isArray(requestData.tip)) {
//             requestData.tip = requestData.tip.filter(tip => tip.title.trim() !== "" || tip.description.trim() !== "");
//         }
    
//         // إنشاء `FormData`
//         const formData = new FormData();
    
//         // التحقق من أن الصورة موجودة وإضافتها
//         if (requestData.image instanceof File) {
//             console.log("الصورة المراد إرسالها:", requestData.image); // تحقق هل الصورة موجودة
//             formData.append("image", requestData.image, requestData.image.name);
//         } else {
//             console.log("⚠ لا توجد صورة في الفورم!");
//         }
    
//         // إضافة باقي الحقول إلى `FormData`
//         for (const key in requestData) {
//             if (key !== "image") { // استثناء الصورة لأنها أضيفت مسبقًا
//                 if (key === "tip") {
//                     formData.append("tip", JSON.stringify(requestData.tip)); // تحويلها إلى JSON نصي
//                 } else {
//                     formData.append(key, requestData[key]);
//                 }
//             }
//         }
    
//         try {
//             let res = await axios.post(
//                 `https://carenest-serverside.vercel.app/tips/?target=${requestData.target}`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `${getToken}`,
//                         // ❌ لا نضيف Content-Type هنا لأن axios يضيفه تلقائيًا
//                     },
//                 }
//             );
    
//             console.log("🚀 تم الإرسال بنجاح:", res.data);
//         } catch (error) {
//             console.log("❌ حدث خطأ أثناء الإرسال:", error.response?.data || error);
//         }
//     }
    
//     console.log(form)
    
//     const sliderSettings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };
//     console.log(form.image)

//     return (
//         <div className="AddTip">
//             <div className="header">
//                 <div className="head">

             
//                 <h2>Add new tip</h2>
//                     <p>Tips displayed across your site to help and guide users</p>
//                     </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="tip-all">
//                     <div className="insideTips">
//                         <Slider {...sliderSettings}>
//                             {form.tip.map((tip, index) => (
//                                 <div key={index} className="content-tip">
//                                     <div className="Tip-title">
//                                         <label>Tip Title</label>
//                                         <input
//                                             type="text"
//                                             name="title"
//                                             placeholder="Write title here"
//                                             value={tip.title}
//                                             onChange={(e) => handleChange(e, index)}
//                                         />
//                                     </div>
//                                     <div className="tip-description">
//                                         <label>Tip Description</label>
//                                         <textarea
//                                             name="description"
//                                             placeholder="Write a description here..."
//                                             value={tip.description}
//                                             onChange={(e) => handleChange(e, index)}
//                                         ></textarea>
//                                     </div>
//                                 </div>
//                             ))}
//                         </Slider>

//                         <div className="AddAnother-tip" onClick={addNewTip}>
//                             <span>    <IoAddCircle /> add another tip</span>
                         
//                         </div>

//                         <div style={{ paddingTop: "5px" }}>
//                             <label className="image-label">Display Image</label>
//                             <ImageUploader onImageUpload={handleImageUpload} image={ form.image} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="Organize">
//                     <h3>Organize</h3>
//                     <div className="Article-target">
//                         <label>Article Target</label>
//                         <select name="target" value={form.target} onChange={handleChange}>
//                             <option value="">Select a target</option>
//                             <option value="Mama">Mama</option>
//                             <option value="Father">Father</option>
//                             <option value="Baby">Baby</option>
//                         </select>
//                         {error.target && <p className="error">{error.target}</p>}
//                     </div>

//                     <div className="Article-Category">
//                         <label>Article Category</label>
//                         <input
//                             type="text"
//                             name="category"
//                             value={form.category}
//                             onChange={handleChange}
//                         />
//                         {error.category && <p className="error">{error.category}</p>}
//                     </div>

//                     <div className="Article-months">
//                         <label>Target Months</label>
//                         <input
//                             type="text"
//                             name="month"
//                             value={form.month}
//                             onChange={handleChange}
//                         />
//                         {error.month && <p className="error">{error.month}</p>}
//                     </div>

//                     <div className="tip-header">
//                         <label>Article Header</label>
//                         <input
//                             type="text"
//                             name="header"
//                             value={form.header}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="tip-advice">
//                         <label>Article Advice</label>
//                         <input
//                             type="text"
//                             name="advice"
//                             value={form.advice}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>

//                 <button  type= "submit" className="submit">Publish Tip</button>
//             </form>
//         </div>
//     );
// }



// import { useState } from "react";
// import ImageUploader from "../../../dropzone/DropZone";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";
// import Slider from "react-slick";

// export default function AddTip() {
//   const cookies = new Cookies();
//   const getToken = cookies.get("Bearer");
//   const [form, setForm] = useState({
//     target: "",
//     category: "",
//     advice: "",
//     header: "",
//     month: "",
//     image: "",
//     tip: [{ title: "", description: "" }],
//   });
//   const [error, setErrors] = useState({});
//   function validateForm() {
//     const errors = {};
//     if (!form.target) {
//       errors.target = "Article target is required";
//     }
//     if (!form.category) {
//       errors.category = "Article category is required";
//     }
//     if (!form.month && form.target !== "Mama") {
//       errors.month = "Month is required";
//     } else if (form.month && (form.month < 1 || form.month > 12)) {
//       errors.month = "Month must be between 1 and 12";
//     }
//     return errors;
//   }
//   function handleChange(e, index) {
//     const { name, value } = e.target;
//     setForm((prevForm) => {
//       let newForm = { ...prevForm };
//       let newErrors = { ...error };

//       if (name === "title" || name === "description") {
//         const updatedTips = [...prevForm.tip];
//         updatedTips[index] = { ...updatedTips[index], [name]: value };
//         newForm = { ...prevForm, tip: updatedTips };
//       } else {
//         newForm = { ...prevForm, [name]: value };
//       }

//       delete newErrors[name];
//       setErrors(newErrors);
//       return newForm;
//     });
//   }

//   const handleImageUpload = (imageData) => {
//     console.log("📸 الصورة المستقبلة كـ Base64:", imageData);
  
//     const byteCharacters = atob(imageData.split(",")[1]);
//     const byteArrays = [];
  
//     for (let i = 0; i < byteCharacters.length; i += 512) {
//       const slice = byteCharacters.slice(i, i + 512);
//       const byteNumbers = new Array(slice.length);
//       for (let j = 0; j < slice.length; j++) {
//         byteNumbers[j] = slice.charCodeAt(j);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }
  
//     const imageFile = new File(byteArrays, "uploaded-image.png", { type: "image/png" });
  
//     console.log("✅ تم تحويل Base64 إلى ملف:", imageFile);
//     setForm((prev) => ({ ...prev, image: imageFile }));
//   };
  

//   function addNewTip() {
//     setForm((prev) => ({
//       ...prev,
//       tip: [...prev.tip, { title: "", description: "" }],
//     }));
//   }

//   // إرسال البيانات عند الضغط على "Publish Tip"
//   async function handleSubmit(e) {
//     e.preventDefault();

//     const errorsAfter = validateForm();
//     if (Object.keys(errorsAfter).length > 0) {
//       setErrors(errorsAfter);
//       return;
//     }
//     const requestData = { ...form };

//     // حذف month إذا كان target = "Mama"
//     if (requestData.target === "Mama") {
//       delete requestData.month;
//     }
//     if (Array.isArray(requestData.tip)) {
//       requestData.tip = requestData.tip.filter(
//         (tip) => tip.title.trim() !== "" || tip.description.trim() !== ""
//       );
//     }
//     const formData = new FormData();

//     if (requestData.image instanceof File) {
     
//         formData.append("image", requestData.image, requestData.image.name);
//       } else {
//         console.log("⚠ لا توجد صورة في الفورم!");
//       }
      

 
//     for (const key in requestData) {
//       if (key !== "image") {
//         if (key === "tip") {
//           formData.append("tip", JSON.stringify(requestData.tip));
//         } else {
//           formData.append(key, requestData[key]);
//         }
//       }
//     }

//     if (!requestData.image) {
//         console.error("❌ لا توجد صورة، تأكد من رفعها قبل الإرسال!");
//         return;
//       }
      
//     // إرسال الطلب
//     try {
//       let res = await axios.post(
//         `https://carenest-serverside.vercel.app/tips/?target=${requestData.target}`,
//         formData,
//         {
//           headers: {
//             Authorization: `${getToken}`,
            
//           },
//         }
//       );

//       console.log( res.data);
//     } catch (error) {
//       console.log(error.response?.data || error);
//     }
//   }


//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   console.log(form);
//   console.log(form.image);

//   return (
//     <div className="AddTip">
//       <div className="header">
//         <div className="head">
//           <h2>Add new tip</h2>
//           <p>Tips displayed across your site to help and guide users</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="tip-all">
//           <div className="insideTips">
//             <Slider {...sliderSettings}>
//               {form.tip.map((tip, index) => (
//                 <div key={index} className="content-tip">
//                   <div className="Tip-title">
//                     <label>Tip Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       placeholder="Write title here"
//                       value={tip.title}
//                       onChange={(e) => handleChange(e, index)}
//                     />
//                   </div>
//                   <div className="tip-description">
//                     <label>Tip Description</label>
//                     <textarea
//                       name="description"
//                       placeholder="Write a description here..."
//                       value={tip.description}
//                       onChange={(e) => handleChange(e, index)}
//                     ></textarea>
//                   </div>
//                 </div>
//               ))}
//             </Slider>

//             <div className="AddAnother-tip" onClick={addNewTip}>
//               <span>
//                 <IoAddCircle /> add another tip
//               </span>
//             </div>

//             <div style={{ paddingTop: "5px" }}>
//               <label className="image-label">Display Image</label>
//               <ImageUploader onImageUpload={handleImageUpload} image={form.image} />
//             </div>
//           </div>
//         </div>

//         <div className="Organize">
//           <h3>Organize</h3>
//           <div className="Article-target">
//             <label>Article Target</label>
//             <select name="target" value={form.target} onChange={handleChange}>
//               <option value="">Select a target</option>
//               <option value="Mama">Mama</option>
//               <option value="Father">Father</option>
//               <option value="Baby">Baby</option>
//             </select>
//             {error.target && <p className="error">{error.target}</p>}
//           </div>

//           <div className="Article-Category">
//             <label>Article Category</label>
//             <input
//               type="text"
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//             />
//             {error.category && <p className="error">{error.category}</p>}
//           </div>

//           <div className="Article-months">
//             <label>Target Months</label>
//             <input
//               type="text"
//               name="month"
//               value={form.month}
//               onChange={handleChange}
//             />
//             {error.month && <p className="error">{error.month}</p>}
//           </div>

//           <div className="tip-header">
//             <label>Article Header</label>
//             <input
//               type="text"
//               name="header"
//               value={form.header}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="tip-advice">
//             <label>Article Advice</label>
//             <input
//               type="text"
//               name="advice"
//               value={form.advice}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <button type="submit" className="submit">
//           Publish Tip
//         </button>
//       </form>
//     </div>
//   );
// }
// import { useState } from "react";
// import ImageUploader from "../../../dropzone/DropZone";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";
// import Slider from "react-slick";

// export default function AddTip() {
//   const cookies = new Cookies();
//   const getToken = cookies.get("Bearer");

//   const [form, setForm] = useState({
//     target: "",
//     category: "",
//     advice: "",
//     header: "",
//     month: "",
//     image: null,
//     tip: [{ title: "", description: "" }],
//   });

//   const [error, setErrors] = useState({});

//   function validateForm() {
//     const errors = {};
//     if (!form.target) errors.target = "Article target is required";
//     if (!form.category) errors.category = "Article category is required";
//     if (!form.month && form.target !== "Mama") {
//       errors.month = "Month is required";
//     } else if (form.month && (form.month < 1 || form.month > 12)) {
//       errors.month = "Month must be between 1 and 12";
//     }
//     return errors;
//   }

//   function handleChange(e, index) {
//     const { name, value } = e.target;
//     setForm((prev) => {
//       let newForm = { ...prev };
//       let newErrors = { ...error };

//       if (name === "title" || name === "description") {
//         const updatedTips = [...prev.tip];
//         updatedTips[index] = { ...updatedTips[index], [name]: value };
//         newForm.tip = updatedTips;
//       } else {
//         newForm[name] = value;
//       }

//       delete newErrors[name];
//       setErrors(newErrors);
//       return newForm;
//     });
//   }

//   const handleImageUpload = (imageData) => {
//     console.log("📸 الصورة المستقبلة كـ Base64:", imageData);
  
//     if (!imageData) {
//       console.error("⚠ لم يتم استلام صورة!");
//       return;
//     }
  
//     // تحويل Base64 إلى ملف
//     const byteCharacters = atob(imageData.split(",")[1]);
//     const byteArrays = [];
    
//     for (let i = 0; i < byteCharacters.length; i += 512) {
//       const slice = byteCharacters.slice(i, i + 512);
//       const byteNumbers = new Array(slice.length);
//       for (let j = 0; j < slice.length; j++) {
//         byteNumbers[j] = slice.charCodeAt(j);
//       }
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }
  
//     const imageFile = new File(byteArrays, "uploaded-image.png", { type: "image/png" });
  
//     console.log("✅ تم تحويل Base64 إلى ملف:", imageFile);
  
//     // تحديث حالة `form`
//     setForm((prev) => {
//       const updatedForm = { ...prev, image: imageFile };
//       console.log("📥 تحديث الفورم بالصورة:", updatedForm);
//       return updatedForm;
//     });
//   };
  
  

//   function addNewTip() {
//     setForm((prev) => ({
//       ...prev,
//       tip: [...prev.tip, { title: "", description: "" }],
//     }));
//   }
//   async function handleSubmit(e) {
//     e.preventDefault();
  
//     const errorsAfter = validateForm();
//     if (Object.keys(errorsAfter).length > 0) {
//       setErrors(errorsAfter);
//       return;
//     }
  
//     console.log("📋 بيانات الفورم قبل الإرسال:", form);
  
//     if (!form.image) {
//       console.error("❌ لا توجد صورة، تأكد من رفعها قبل الإرسال!");
//       return;
//     }
  
//     const requestData = { ...form };
  
//     if (requestData.target === "Mama") {
//       delete requestData.month;
//     }
//     if (Array.isArray(requestData.tip)) {
//       requestData.tip = requestData.tip.filter(
//         (tip) => tip.title.trim() !== "" || tip.description.trim() !== ""
//       );
//     }
  
//     const formData = new FormData();
//     formData.append("image", requestData.image);
  
//     for (const key in requestData) {
//       if (key !== "image") {
//         if (key === "tip") {
//           formData.append("tip", JSON.stringify(requestData.tip));
//         } else {
//           formData.append(key, requestData[key]);
//         }
//       }
//     }
  
//     try {
//       let res = await axios.post(
//         `https://carenest-serverside.vercel.app/tips/?target=${requestData.target}`,
//         formData,
//         {
//           headers: {
//             Authorization: `${getToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       console.log("✅ تم الإرسال بنجاح:", res.data);
//     } catch (error) {
//       console.log("❌ خطأ أثناء الإرسال:", error.response?.data || error);
//     }
//   }
  

//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="AddTip">
//       <div className="header">
//         <div className="head">
//           <h2>Add new tip</h2>
//           <p>Tips displayed across your site to help and guide users</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="tip-all">
//           <div className="insideTips">
//             <Slider {...sliderSettings}>
//               {form.tip.map((tip, index) => (
//                 <div key={index} className="content-tip">
//                   <div className="Tip-title">
//                     <label>Tip Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       placeholder="Write title here"
//                       value={tip.title}
//                       onChange={(e) => handleChange(e, index)}
//                     />
//                   </div>
//                   <div className="tip-description">
//                     <label>Tip Description</label>
//                     <textarea
//                       name="description"
//                       placeholder="Write a description here..."
//                       value={tip.description}
//                       onChange={(e) => handleChange(e, index)}
//                     ></textarea>
//                   </div>
//                 </div>
//               ))}
//             </Slider>

//             <div className="AddAnother-tip" onClick={addNewTip}>
//               <span>
//                 <IoAddCircle /> add another tip
//               </span>
//             </div>

//             <div style={{ paddingTop: "5px" }}>
//               <label className="image-label">Display Image</label>
//               <ImageUploader onImageSelect={handleImageUpload} image={form.image} />

//             </div>
//           </div>
//         </div>

//         <div className="Organize">
//           <h3>Organize</h3>
//           <div className="Article-target">
//             <label>Article Target</label>
//             <select name="target" value={form.target} onChange={handleChange}>
//               <option value="">Select a target</option>
//               <option value="Mama">Mama</option>
//               <option value="Father">Father</option>
//               <option value="Baby">Baby</option>
//             </select>
//             {error.target && <p className="error">{error.target}</p>}
//           </div>

//           <div className="Article-Category">
//             <label>Article Category</label>
//             <input type="text" name="category" value={form.category} onChange={handleChange} />
//             {error.category && <p className="error">{error.category}</p>}
//           </div>

//           <div className="Article-months">
//             <label>Target Months</label>
//             <input type="text" name="month" value={form.month} onChange={handleChange} />
//             {error.month && <p className="error">{error.month}</p>}
//           </div>

//           <div className="tip-header">
//             <label>Article Header</label>
//             <input type="text" name="header" value={form.header} onChange={handleChange} />
//           </div>

//           <div className="tip-advice">
//             <label>Article Advice</label>
//             <input type="text" name="advice" value={form.advice} onChange={handleChange} />
//           </div>
//         </div>

//         <button type="submit" className="submit">
//           Publish Tip
//         </button>
//       </form>
//     </div>
//   );
// }
// AddTip.jsx
// import { useState } from "react";
// import "./AddTip.css";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { IoAddCircle } from "react-icons/io5";
// import Slider from "react-slick";

// export default function AddTip() {
//   const cookies = new Cookies();
//   const getToken = cookies.get("Bearer");

//   const [form, setForm] = useState({
//     target: "",
//     category: "",
//     advice: "",
//     header: "",
//     month: "",
//     image: null,
//     tip: [{ title: "", description: "" }],
//   });

//   const [error, setErrors] = useState({});

//   function validateForm() {
//     const errors = {};
//     if (!form.target) errors.target = "Article target is required";
//     if (!form.category) errors.category = "Article category is required";
//     if (!form.month && form.target !== "Mama") {
//       errors.month = "Month is required";
//     } else if (form.month && (form.month < 1 || form.month > 12)) {
//       errors.month = "Month must be between 1 and 12";
//     }
//     return errors;
//   }

//   function handleChange(e, index) {
//     const { name, value } = e.target;
//     setForm((prev) => {
//       const newForm = { ...prev };
//       const newErrors = { ...error };

//       if (name === "title" || name === "description") {
//         const updatedTips = [...prev.tip];
//         updatedTips[index] = { ...updatedTips[index], [name]: value };
//         newForm.tip = updatedTips;
//       } else {
//         newForm[name] = value;
//       }

//       delete newErrors[name];
//       setErrors(newErrors);
//       return newForm;
//     });
//   }




//   function addNewTip() {
//     setForm((prev) => ({
//       ...prev,
//       tip: [...prev.tip, { title: "", description: "" }],
//     }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
  
//     const errorsAfter = validateForm();
//     if (Object.keys(errorsAfter).length > 0) {
//       setErrors(errorsAfter);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", form.image);

//     const requestData = { ...form };
//     if (requestData.target === "Mama") delete requestData.month;
    
//     Object.keys(requestData).forEach(key => {
//       if (key !== "image" && key !== "tip") {
//         formData.append(key, requestData[key]);
//       }
//     });

//     if (Array.isArray(requestData.tip)) {
//       formData.append("tip", JSON.stringify(requestData.tip));
//     }

//     try {
//       const res = await axios.post(
//         `https://carenest-serverside.vercel.app/tips/?target=${requestData.target}`,
//         formData,
//         {
//           headers: {
//             Authorization: `${getToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("✅ تم الإرسال بنجاح:", res.data);
//     } catch (error) {
//       console.error("❌ خطأ أثناء الإرسال:", error.response?.data || error);
//     }
//   }

//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="AddTip">
//            <div className="header">
//              <div className="head">
//                <h2>Add new tip</h2>
//                <p>Tips displayed across your site to help and guide users</p>
//              </div>
//            </div>
    
//            <form onSubmit={handleSubmit}>
//              <div className="tip-all">
//                <div className="insideTips">
//              <Slider {...sliderSettings}>
//                  {form.tip.map((tip, index) => (
//                     <div key={index} className="content-tip">
//                       <div className="Tip-title">
//                         <label>Tip Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           placeholder="Write title here"
//                           value={tip.title}
//                           onChange={(e) => handleChange(e, index)}
//                         />
//                       </div>
//                       <div className="tip-description">
//                         <label>Tip Description</label>
//                         <textarea
//                           name="description"
//                           placeholder="Write a description here..."
//                           value={tip.description}
//                           onChange={(e) => handleChange(e, index)}
//                         ></textarea>
//                       </div>
//                     </div>
//                   ))}
//                 </Slider>
    
//                 <div className="AddAnother-tip" onClick={addNewTip}>
//                   <span>
//                     <IoAddCircle /> add another tip
//                   </span>
//                 </div>
    
//                 <div style={{ paddingTop: "5px" }}>
//                   <label className="image-label">Display Image</label>
//                   {/* <ImageUploader onImageSelect={handleImageUpload} image={form.image} /> */}
//                   <input
//                 type="file"
//                 name="image"
//   accept="image/*"
//   onChange={handleChange}
// />


//                 </div>
//               </div>
//             </div>
    
//             <div className="Organize">
//               <h3>Organize</h3>
//               <div className="Article-target">
//                 <label>Article Target</label>
//                 <select name="target" value={form.target} onChange={handleChange}>
//                   <option value="">Select a target</option>
//                   <option value="Mama">Mama</option>
//                   <option value="Father">Father</option>
//                   <option value="Baby">Baby</option>
//                 </select>
//                 {error.target && <p className="error">{error.target}</p>}
//               </div>
    
//               <div className="Article-Category">
//                 <label>Article Category</label>
//                 <input type="text" name="category" value={form.category} onChange={handleChange} />
//                 {error.category && <p className="error">{error.category}</p>}
//               </div>
    
//               <div className="Article-months">
//                 <label>Target Months</label>
//                 <input type="text" name="month" value={form.month} onChange={handleChange} />
//                 {error.month && <p className="error">{error.month}</p>}
//               </div>
    
//               <div className="tip-header">
//                 <label>Article Header</label>
//                 <input type="text" name="header" value={form.header} onChange={handleChange} />
//               </div>
    
//               <div className="tip-advice">
//                 <label>Article Advice</label>
//                 <input type="text" name="advice" value={form.advice} onChange={handleChange} />
//               </div>
//             </div>
    
//             <button type="submit" className="submit">
//               Publish Tip
//             </button>
//           </form>
//         </div>
 
//   );
// }
import { useState } from "react";
import "./AddTip.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { IoAddCircle } from "react-icons/io5";
import Slider from "react-slick";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../assets/upload_11918679.png";

export default function AddTip() {
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");
  const[loading,setloading]=useState(false)

  const [form, setForm] = useState({
    target: "",
    category: "",
    advice: "",
    header: "",
    month: "",
    image: null,
    tip: [{ title: "", description: "" }],
  });
  console.log(form)

  const [error, setErrors] = useState({});

  function validateForm() {
    const errors = {};
    if (!form.target) errors.target = "Article target is required";
    if (!form.category) errors.category = "Article category is required";
    if (!form.month && form.target !== "Mama") {
      errors.month = "Month is required";
    } else if (form.month && (form.month < 1 || form.month > 12)) {
      errors.month = "Month must be between 1 and 12";
    }
    return errors;
  }


  function handleChange(e, index) {
    const { name, value, type, files } = e.target;
  
    setForm((prev) => {
      const newForm = { ...prev };
  
      if (type === "file") {
        if (files.length > 0) {
          const file = files[0];
          const maxSize = 2 * 1024 * 1024; // 2MB الحد الأقصى
          if (file.size > maxSize) {
            alert("حجم الصورة كبير جدًا، الرجاء اختيار صورة أقل من 2MB");
            return prev;
          }
          newForm.image = file;
        } else {
          newForm.image = null;
        }
      } else if (name === "title" || name === "description") {
        const updatedTips = [...prev.tip];
        updatedTips[index] = { ...updatedTips[index], [name]: value };
        newForm.tip = updatedTips;
      } else {
        newForm[name] = value;
      }
  
      return newForm;
    });
  }
  

  function addNewTip() {
    setForm((prev) => ({
      ...prev,
      tip: [...prev.tip, { title: "", description: "" }],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const errorsAfter = validateForm();
    if (Object.keys(errorsAfter).length > 0) {
        setErrors(errorsAfter);
        return;
    }

    const formData = new FormData();
    formData.append("target", form.target);
    formData.append("category", form.category);
    formData.append("advice", form.advice);
    formData.append("header", form.header);
    formData.append("month", form.month);

    if (form.image) {
        formData.append("image", form.image);
    }

    form.tip.forEach((tip, index) => {
        formData.append(`tip[${index}][title]`, tip.title);
        formData.append(`tip[${index}][description]`, tip.description);
    });

    console.log("🔍 البيانات التي سيتم إرسالها:", Object.fromEntries(formData.entries()));

    setloading(true);

    try {
        const res = await axios.post(
            `https://carenest-serverside.vercel.app/tips/?target=${form.target}`,
            formData,
            {
                headers: {
                    Authorization: `${getToken}`,
                },
            }
        );
        setloading(false);
        console.log("✅ تم الإرسال بنجاح:", res.data);
    } catch (error) {
        setloading(false);
        console.error("❌ خطأ أثناء الإرسال:", error.response?.data || error);
    }
  }
  function handleDrop(acceptedFiles) {
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جدًا، الرجاء اختيار صورة أقل من 2MB");
      return;
    }
    setForm((prev) => ({ ...prev, image: file }));
  }

  console.log(loading)

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div className="AddTip">
      <div className="header">
        <div className="head">
          <h2>Add new tip</h2>
          <p>Tips displayed across your site to help and guide users</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <div className="tip-all">
          <div className="insideTips">
            <Slider {...sliderSettings}>
              {form.tip.map((tip, index) => (
                <div key={index} className="content-tip">
                  <div className="Tip-title">
                    <label>Tip Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Write title here"
                      value={tip.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="tip-description">
                    <label>Tip Description</label>
                    <textarea
                      name="description"
                      placeholder="Write a description here..."
                      value={tip.description}
                      onChange={(e) => handleChange(e, index)}
                    ></textarea>
                  </div>
                </div>
              ))}
            </Slider>

            <div className="AddAnother-tip" onClick={addNewTip}>
              <span>
                <IoAddCircle /> add another tip
              </span>
            </div>

            <div style={{ paddingTop: "5px" }}>
            
              <label className="image-label">Display Image</label>
              <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
  {({ getRootProps, getInputProps }) => (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag your photo here or <span className="browse">Browse from device</span></p>
        <div className="preview">
          <img 
            src={form.image ? URL.createObjectURL(form.image) : uploadimg} 
            alt="Uploaded preview" 
            className="uploaded-image" 
          />
        </div>
      </div>
    </div>
  )}
</Dropzone>

            </div>
          </div>
        </div>

        <div className="Organize">
          <h3>Organize</h3>
          <div className="Article-target">
            <label>Article Target</label>
            <select name="target" value={form.target} onChange={handleChange}>
              <option value="">Select a target</option>
              <option value="Mama">Mama</option>
              <option value="Father">Father</option>
              <option value="Baby">Baby</option>
            </select>
            {error.target && <p className="error">{error.target}</p>}
          </div>

          <div className="Article-Category">
            <label>Article Category</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} />
            {error.category && <p className="error">{error.category}</p>}
          </div>

          <div className="Article-months">
            <label>Target Months</label>
            <input type="text" name="month" value={form.month} onChange={handleChange} />
            {error.month && <p className="error">{error.month}</p>}
          </div>

          <div className="tip-header">
            <label>Article Header</label>
            <input type="text" name="header" value={form.header} onChange={handleChange} />
          </div>

          <div className="tip-advice">
            <label>Article Advice</label>
            <input type="text" name="advice" value={form.advice} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="submit">
          Publish Tip
        </button>
      </form>
    </div>
  );
}

