import { useState } from "react";
import "./Addstory.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../../assets/Oval.png";
import PropTypes from "prop-types";
import { IoIosCloseCircle } from "react-icons/io";
import reseticon from "../../../../../assets/Vectorreset.svg";

Addstory.propTypes = {
    onClose: PropTypes.func.isRequired,
    getStories:PropTypes.func.isRequired,
};

export default function Addstory({ onClose  , getStories}) {
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    imageWeb: null,
  });
    console.log(form);
 const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    


  function handleDrop(type, acceptedFiles) {
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جدًا، الرجاء اختيار صورة أقل من 2MB");
      return;
    }

    setForm((prev) => ({
      ...prev,
      [type]: file,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


    async function handleSubmit(e) {
  e.preventDefault();

  // Unified validation
  if (
    !form.title.trim() ||
    !form.content.trim() ||
    !form.image ||
    !form.imageWeb
  ) {
    setErrorMessage("❌ Please fill in all fields and upload both images");
    setSuccess(null);
    return;
  }

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("content", form.content);
  formData.append("image", form.image);
  formData.append("imageWeb", form.imageWeb);

  setLoading(true);
  try {
    const response = await axios.post(
      "https://carenest-serverside.vercel.app/stories/",
      formData,
      {
        headers: {
          Authorization: `${getToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setSuccess("✅ Story added successfully!");
    setErrorMessage(null);
    setForm({
      title: "",
      content: "",
      image: null,
      imageWeb: null,
    });

    setLoading(false);
    setTimeout(() => {
      getStories();
      onClose();
    }, 1500);
  } catch (error) {
    setLoading(false);
    console.error("❌ Error adding story:", error);
    setErrorMessage("An error occurred while adding the story. Please try again.");
    setSuccess(null);
  }
}


  return (
    <div className="Addstory AddTip">
      <div className="header">
        <IoIosCloseCircle className="close" onClick={onClose} />
        <h2>Add new Story</h2>
      </div>

      <div className="content" onSubmit={handleSubmit}>
        <div className="images">
          <div className="mobileimg">
            <Dropzone
              onDrop={(files) => handleDrop("image", files)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="upload-container">
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <div className="preview" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <img
                        src={form.image ? URL.createObjectURL(form.image) : uploadimg}
                        alt="Uploaded preview"
                        className="uploaded-image"
                      />
                      <p className="headerUpload">Upload mobile image (PNG, JPEG)</p>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          </div>

          <div className="webimage">
            <Dropzone
              onDrop={(files) => handleDrop("imageWeb", files)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="upload-container">
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <div className="preview" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <img
                        src={form.imageWeb ? URL.createObjectURL(form.imageWeb) : uploadimg}
                        alt="Uploaded preview"
                        className="uploaded-image"
                      />
                      <p className="headerUpload">Upload web image (PNG, JPEG)</p>
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          </div>
        </div>

        <div className="inputs">
          <div className="titlestory">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Story title"
              required
            />
          </div>

          <div className="contentarea">
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write story content..."
              rows={6}
              required
            />
          </div>
        </div>

       
          </div>
             <div className="buttons">
                 <button className="reset">
                 <img src={reseticon} alt="" />
                <p className="restp" onClick={()=>    setForm({
      title: "",
      content: "",
      image: null,
      imageWeb: null,
    })
}>Reset all</p>
                </button>
                <button type="submit" className="submitcode" onClick={handleSubmit}>
                {loading ?  <div className="spinner-small"></div> : "Add"}
                </button>
          </div>
          {success && <p className="success-message">{success}</p>}
{errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}
