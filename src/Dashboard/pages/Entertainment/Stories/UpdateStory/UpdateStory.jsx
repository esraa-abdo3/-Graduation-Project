import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import Dropzone from "react-dropzone";
import uploadimg from "../../../../../assets/Oval.png";
import { IoIosCloseCircle } from "react-icons/io";
import reseticon from "../../../../../assets/Vectorreset.svg";
import { useEffect, useState } from "react";
import "../AddStory/Addstory.css";

Updatestory.propTypes = {
  onClose: PropTypes.func.isRequired,
  getStories: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // ✅ ID of story to update
};

export default function Updatestory({ onClose, getStories, id }) {
  const cookies = new Cookies();
  const token = cookies.get("Bearer");

  const [loading, setLoading] = useState(false);
  const [original, setOriginal] = useState(null); // fetched story data
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
    imageWeb: null,
  });
  const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoadingContent, setIsLoadingContent] = useState(true);


  useEffect(() => {
      async function fetchStory() {
        
      try {
        const res = await axios.get(
          `https://carenest-serverside.vercel.app/stories/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        const story = res.data.data;

        setOriginal({
          title: story.title || "",
          content: story.content || "",
          image: story.image || "",
          imageWeb: story.webimage || story.imageWeb || "", // handle both keys
        });

        setForm({
          title: story.title || "",
          content: story.content || "",
          image: null, // don’t fill with URL
          imageWeb: null,
        });
          setIsLoadingContent(false);

      } catch (error) {
        console.error("❌ Failed to load story:", error);
        setErrorMessage("❌ Failed to load story data");
      }
    }

    fetchStory();
  }, [id]);

  function handleDrop(type, files) {
    const file = files[0];
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("❌ Image too large. Max size is 2MB.");
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

    if (!form.title.trim() || !form.content.trim()) {
      setErrorMessage(" Please fill in all fields");
      setSuccess(null);
      return;
    }

    const formData = new FormData();
    if (form.title !== original?.title) formData.append("title", form.title);
    if (form.content !== original?.content) formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);
    if (form.imageWeb) formData.append("imageWeb", form.imageWeb);

    if ([...formData.keys()].length === 0) {
      setErrorMessage(" No changes made.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `https://carenest-serverside.vercel.app/stories/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("✅ Story updated!");
      setErrorMessage(null);
      setLoading(false);

      setTimeout(() => {
        getStories();
        onClose();
      }, 1500);
    } catch (err) {
      console.error("❌ Error updating story:", err);
      setErrorMessage("Failed to update story please try again");
      setLoading(false);
    }
  }

  return (
    <div className="Addstory AddTip">
      <div className="header">
        <IoIosCloseCircle className="close" onClick={onClose} />
        <h2>Update Story</h2>
      </div>

      <div className="content" >
        <div className="images">
          <Dropzone onDrop={(files) => handleDrop("image", files)} accept="image/*" multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={
                    form.image
                      ? URL.createObjectURL(form.image)
                      : original?.image || uploadimg
                  }
                  alt="Mobile"
                  className="uploaded-image"
                />
                <p>Upload mobile image</p>
              </div>
            )}
          </Dropzone>

          <Dropzone onDrop={(files) => handleDrop("imageWeb", files)} accept="image/*" multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={
                    form.imageWeb
                      ? URL.createObjectURL(form.imageWeb)
                      : original?.imageWeb || uploadimg
                  }
                  alt="Web"
                  className="uploaded-image"
                />
                <p>Upload web image</p>
              </div>
            )}
          </Dropzone>
        </div>

           {isLoadingContent ? (
  <div className="skeleton-wrapper">
    <div className="skeleton-input title-skeleton"></div>
    <div className="skeleton-textarea content-skeleton"></div>
  </div>
) : (
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
        placeholder="Story content..."
        rows={6}
        required
      />
    </div>
  </div>
)}

              </div>

        <div className="buttons">
          <button
            type="button"
            className="reset"
            onClick={() => {
              setForm({
                title: original?.title || "",
                content: original?.content || "",
                image: null,
                imageWeb: null,
              });
              setErrorMessage(null);
              setSuccess(null);
            }}
          >
            <img src={reseticon} alt="reset" />
            <p className="restp">Reset all</p>
          </button>

          <button type="submit" className="submitcode" onClick={handleSubmit}>
            {loading ? <div className="spinner-small"></div> : "Update"}
          </button>
        </div>

        {success && <p className="success-message">{success}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    
    </div>
  );
}

