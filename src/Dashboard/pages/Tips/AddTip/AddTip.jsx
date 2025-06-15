
import { useRef, useState } from "react";
import "./AddTip.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Slider from "react-slick";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../assets/Oval.png"
import reseticon from "../../../../assets/Vectorreset.svg";
import PropTypes from "prop-types"; 

import { IoIosCloseCircle } from "react-icons/io";
AddTip.propTypes = {
  onClose: PropTypes.func.isRequired,
  onload:PropTypes.func.isRequire,
};
export default function AddTip({onClose , onload}) {
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
  const [isbaby, setisbaby] = useState(false)



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
      onClose()
      onload()
    

        console.log("✅ تم الإرسال بنجاح:", res.data);
    } catch (error) {
        setloading(false);
        console.error("❌ خطأ أثناء الإرسال:", error.response?.data || error);
    }
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
         <h2>Add new article</h2>
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

