import React, { useState, useRef, useEffect } from "react";
// import uploadImg from '../../../../assets/dashimgvid.png'
import { FaPlus } from "react-icons/fa";
import "../Voices/AddVoiceModal.css";
import axios from "axios";
import Cookies from "universal-cookie";
import ClipLoader from "react-spinners/ClipLoader";

export default function AddVideoModal({ isOpen, onClose , fetchData,selectedChannel }) {
  if (!isOpen) return null;

  const [videoURL, setVideoURL] = useState(null);
  const [imgFile, setImgeFile] = useState('');
  const [name, setName] = useState("");
  const [errormsg ,setErrormsg] = useState('')
  const [Donemsg ,setDonemsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');

  const resetDataVideo = () => {
    setErrormsg(""); 
    setDonemsg(""); 
    setName('');
    setVideoURL(null);
    setImgeFile('');
  }

  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgeFile(imageUrl);
    }
  };

  const extractYoutubeThumbnail = (url) => {
    let videoId = null;
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        videoId = parsedUrl.pathname.split("/")[1];
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        videoId = new URLSearchParams(parsedUrl.search).get("v");
      }
      if (!videoId) return null;
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    } catch (error) {
      console.error("Invalid URL", error);
      return null;
    }
  };

  useEffect(() => {
    if (videoURL) {
      const thumbnail = extractYoutubeThumbnail(videoURL);
      if (thumbnail) setImgeFile(thumbnail);
    }
  }, [videoURL]);

  const createFunVideo = async () => {
    setIsLoading(true);
    setErrormsg(""); 
    setDonemsg("");  

    if (!videoURL || !name) {
      setErrormsg("Please provide all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.patch(
        `https://carenest-serverside.vercel.app/channels/${selectedChannel}`,
        {
          video: {
            name: name,
            url: videoURL
          }
        },
        {
          headers: {
            Authorization: `${gettoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Uploaded successfully:", res.data);
      setDonemsg("Fun Video uploaded!");
      await fetchData(); 
      onClose();            
    } catch (err) {
      console.error("Error uploading:", err.response ? err.response.data : err);
      setErrormsg("Something went wrong!");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Add new Fun Video</h2>

        <div className="modal-formVid">
          <div className="dataVoicebox1">
            
            {/* صورة الفيديو */}
            <div className="form-group" onClick={handleImageClick}>
              <img src={imgFile || uploadImg} alt="uploadImg" />
              {imgFile && (
                <div className="overlay-check">
                  <i className="fa-solid fa-check"></i>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {/* اسم الفيديو */}
            <div className="form-group">
              <label>Video Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter video name"
              />
            </div>

            {/* لينك الفيديو */}
            <div className="form-group">
              <label>Video URL</label>
              <input
                type="text"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
                placeholder="Enter YouTube video link"
              />
            </div>
          </div>

          {errormsg && <p className="error-message">{errormsg}</p>}
          {Donemsg && <p className="success-message">{Donemsg}</p>}
          <div className="btn-voiceForm">
            <button  className="reset-button" onClick={resetDataVideo}>
            <i className="fa-solid fa-repeat"></i> Reset all
            </button>
          <button className="add-button" onClick={createFunVideo} disabled={isLoading}>
            {isLoading ? <ClipLoader size={20} color="#fff" /> : "Add Video"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
