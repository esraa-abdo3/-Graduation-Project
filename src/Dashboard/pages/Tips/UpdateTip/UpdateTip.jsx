import { useEffect, useRef, useState } from "react";
import "../AddTip/AddTip.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Slider from "react-slick";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../assets/Oval.png"
import reseticon from "../../../../assets/Vectorreset.svg";
import PropTypes from "prop-types"; 

import { IoIosCloseCircle } from "react-icons/io";

UpdateTip.propTypes = {
  onClose: PropTypes.func.isRequired,
    onload: PropTypes.func.isRequire,
    tipid: PropTypes.string.isRequired, 
};
export default function UpdateTip({onClose , onload , tipid}) {
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
  const [page, setpage] = useState("info")
  const sliderRef = useRef(null);
  const [error, setErrors] = useState({});
  const [isbaby, setisbaby] = useState(false);
  const [originalTip, setOriginalTip] = useState({
            target: "",
    category: "",
    advice: "",
    header: "",
    month: "",
    image: null,
    tip: [{ title: "", description: "" }],
        
  })
    const [updatemessgae, setupdatemessage] = useState("")   
 const[updateerror,setupdaterror]=useState('')   

async function gettip() {
                setloading(true)
                try {
                    const response = await axios.get(`https://carenest-serverside.vercel.app/tips/${tipid} `, {
                        headers: {
                            "Authorization": `${getToken}`
                        }
                    });
                    setloading(false)
                    console.log(response.data.data);
                    const tipData = response.data.data;
                    setForm({
  target: tipData.target || "",
  category: tipData.category || "",
  advice: tipData.advice || "",
  header: tipData.header || "",
  month: tipData.month || "",
  image: tipData.image || null,
  tip: tipData.tip || [{ title: "", description: "" }],
                    });
// عشان اقارن اي اللي اتغير ف التعديل واي اللي فضل ثابت لازم احتفظ بنسخه
setOriginalTip({
  target: tipData.target || "",
  category: tipData.category || "",
  advice: tipData.advice || "",
  header: tipData.header || "",
  month: tipData.month || "",
  image: tipData.image || null,
  tip: tipData.tip || [{ title: "", description: "" }],
});
                
                 
     
                } catch (error) {
                    setloading(false)
                    console.log("Error fetching babies:", error);
            
                }
            }
       
        useEffect(() => {
         
            if (getToken) {
                gettip();
            }
            
        }, [getToken])

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
    setForm((prev) => {
      const newTips = [...prev.tip, { title: "", description: "" }];
      setTimeout(() => {
        sliderRef.current?.slickGoTo(newTips.length - 1);
      }, 100);
  
      return { ...prev, tip: newTips };
    });
  }
  
    function hasFormChanged(form, original) {
  if (
    form.target !== original.target ||
    form.category !== original.category ||
    form.advice !== original.advice ||
    form.header !== original.header ||
    form.month !== original.month
  ) {
    return true;
  }

  // مقارنة الصورة (لو صورة جديدة مرفوعة)
  if (form.image && form.image !== original.image) {
    return true;
  }

  // مقارنة قائمة النصائح
  if (form.tip.length !== original.tip.length) {
    return true;
  }

  for (let i = 0; i < form.tip.length; i++) {
    if (
      form.tip[i].title !== original.tip[i]?.title ||
      form.tip[i].description !== original.tip[i]?.description
    ) {
      return true;
    }
  }

  return false; // لو مفيش أي اختلاف
}


  async function handleSubmit(e) {
    e.preventDefault();
    
    const errorsAfter = validateForm();
    if (Object.keys(errorsAfter).length > 0) {
        setErrors(errorsAfter);
        return;
    }

    const formData = new FormData();
      if (form.target !== originalTip.target) {
  formData.append("target", form.target);
}

if (form.category !== originalTip.category) {
  formData.append("category", form.category);
}

if (form.advice !== originalTip.advice) {
  formData.append("advice", form.advice);
}

if (form.header !== originalTip.header) {
  formData.append("header", form.header);
}

if (form.month !== originalTip.month) {
  formData.append("month", form.month);
}
if (form.image && form.image !== originalTip.image) {
  formData.append("image", form.image);
}
//   form.tip.forEach((tipItem, index) => {
//     const originalItem = originalTip.tip[index] || {};

//     // لو العنوان أو الوصف اختلفوا، نبعتهم سوا
//     if (
//       tipItem.title !== originalItem.title ||
//       tipItem.description !== originalItem.description
//     ) {
//       formData.append(`tip[${index}][title]`, tipItem.title);
//       formData.append(`tip[${index}][description]`, tipItem.description);
//     }
      //   });
      form.tip.forEach((tipItem, index) => {
  formData.append(`tip[${index}][title]`, tipItem.title);
  formData.append(`tip[${index}][description]`, tipItem.description);
});



      console.log("🔍 البيانات التي سيتم إرسالها:", Object.fromEntries(formData.entries()));
      if (!hasFormChanged(form, originalTip)) {
          setupdaterror("No changes were made to submit.")

  return;
}

      setloading(true);
      

    try {
        const res = await axios.put(
            `https://carenest-serverside.vercel.app/tips/${tipid}`,
            formData,
            {
                headers: {
                    Authorization: `${getToken}`,
                },
            }
        );
      setloading(false);
      onClose()
        onload()
        setupdatemessage("Update was successful.");
    } catch (error) {
        setloading(false);
setupdaterror("Update was successful please try again");

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
          <div>
          <IoIosCloseCircle className="close" onClick={onClose} />
          </div>
              <h2>  update  the  article</h2>
      </div>
      <div className="tipoptions">
        <button className={page ==="info" && "active"} onClick={()=>setpage("info")}>
         Article Info

        </button>
        <button
        className={page ==="tip" && "active"}
          onClick={() => setpage("tip")}>
        Tips list

        </button>

      </div>
      {
        page === "info" ?
          (
            <>
            <div className="firstpart" >
            <div >
                  
                  <label className="image-label">Display Image</label>
                  <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div className="upload-container" >
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <div className="preview" style={{display:"flex" , flexDirection:"column" , gap:"10px"}}>
              <img 
                src={form.image ? (form.image) : uploadimg} 
                alt="Uploaded preview" 
                className="uploaded-image" 
                          />
                           <p className="headerUpload">Upload car image (PNG, JPEG)</p>
            </div>
          </div>
        </div>
      )}
      </Dropzone>
      
              </div>
              <div className="art">
                <div className="ArticleTitle">
                  <input type="text" name="category" id="" placeholder="Article Title" style={{ padding: "0  0 0 90px" }}
                    value={form.category}
                    onChange={handleChange}
                  />
                    <p >Article Title :</p>
                    {error.category && (
                      <span className="error" style={{fontSize:"12px" , marginTop:"0"}}> { error.category}</span>

                    )}
                   
      
                </div>
                <div className="ArticleTarget">
                  <div className="Article-flex">
      
               
        <div className="headertargert">Article target:</div>
      
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="radio"
              name="target"
              id="baby"
              value="Baby"
               checked={form.target === "Baby"}
                          onClick={(e) => {
                            setisbaby(true)
                            handleChange(e);
                
                          }
              }
            />
            <label htmlFor="baby" style={{ color: "#05314DCC" }}>Baby</label>
          </div>
      
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
                          type="radio"
                          name="target"
                          id="mamy"
                          value="Mama"
                          checked={form.target === "Mama"}
                          onClick={(e) => {
                            setisbaby(false)
                            handleChange(e);
                          }
                          }
            />
            <label htmlFor="mami" style={{ color: "#05314DCC" }}>Mamy</label>
          </div>
                      </div>
              
                   
                  </div>
      
        
      
                  </div>
                  {error.target && (
                      <span className="error"  style={{fontSize:"12px" , marginTop:"0"}}> { error.target}</span>

                    )}
                
                <select
                  className="montharticle"
                  name="month"
        value={form.month}
        onChange={(e) => handleChange(e)}
        disabled={!isbaby}
      >
        <option value="" disabled hidden>
          Select Month
        </option>
        {[...Array(12)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
                  </select>
                  
      
      
                  {error.month && (
                      <span className="error" style={{fontSize:"12px" , marginTop:"0"}}> { error.month}</span>

                    )}
      
      
      
      
              </div>
              
            </div>
            <div className="secondpart">
              <div className="ArticleHeader">
                <input type="text" name="header"  placeholder="Here Are Five Simple Tips  "
                  value={form.header} 
                  style={{ padding: "0  0 0 110px" }}
                  onChange={handleChange}
                />
                <p>Article header :</p>
      
              </div>
              <div className="Article advice">
                <input type="text" name="advice" placeholder="Every feeding session is a step forward"
                  value={form.advice}
                  onChange={handleChange}
                style={{padding:"0  0 0 110px"}}/>
      <p>Article advice :</p>
              </div>
      
            </div>
           </>
          )
          : (
            <>
              <div className="tiplists">

             
              <div className="tip-numbers">
                <span>tip list (0)</span>
                <button className="newtip" onClick={addNewTip}>
                  <p>
                  Add new tip
                  </p>
               
                </button>

                </div>
                <Slider {...sliderSettings} ref={sliderRef} >
  {form.tip.map((tip, index) => (
    <div key={index} className="tip-content">
      <div className="Tip-title">
        <label>Tip Title</label>
        <input
          type="text"
          name="title"
          placeholder="tip title"
          style={{ paddingLeft: "15px" }}
          value={tip.title}
          onChange={(e) => handleChange(e, index)}
        />
      </div>
      <div className="Tip-title">
        <label>Tip Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={tip.description}
          onChange={(e) => handleChange(e, index)}
        />
      </div>
    </div>
  ))}
</Slider>

                </div>
              </>
          )
          }
          {
              updateerror.length>0
              && (
                  <span className="error" style={{textAlign:"center" , display:"inline-block"}}>{updateerror}</span>
              )}
                    {
              updatemessgae.length>0
              && (
                  <span className="error" style={{color:"green" , textAlign:"center" , display:"inline-block"}}>{updatemessgae}</span>
 )          }
      <div className="buttons">
         <button className="reset">
         <img src={reseticon} alt="" />
        <p className="restp">Reset all</p>
        </button>
        <button type="submit" className="submitcode" onClick={handleSubmit}>
        {loading ?  <div className="spinner-small"></div> : "Add"}
        </button>
      </div>


    </div>
  );
}