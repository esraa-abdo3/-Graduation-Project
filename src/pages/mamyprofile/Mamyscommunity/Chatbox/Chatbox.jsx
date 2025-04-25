
// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';
// import { MdDelete } from "react-icons/md";


// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");
//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const endOfMessagesRef = useRef(null);
//   const[recordopen,setrecordopen]=useState(false)

//   async function getAllMessages() {
//     try {
//       const res = await axios.get(
//         'https://carenest-serverside.vercel.app/community/',
//         { headers: { Authorization: Bearer } }
//       );
//       setMessages(Array.isArray(res.data) ? res.data : []);
//       console.log(res)
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     getAllMessages();
//   }, []);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   function convertToMillis(ts) {
//     if (ts && typeof ts === "object" && "_seconds" in ts) return ts._seconds * 1000;
//     if (typeof ts === "number") return ts;
//     return Date.now();
//   }
//   function formatTime(ts) {
//     const diff = Math.floor((Date.now() - convertToMillis(ts)) / 1000);
//     if (diff < 60) return "Just now";
//     if (diff < 3600) return `${Math.floor(diff/60)} minute${Math.floor(diff/60)!==1?'s':''} ago`;
//     if (diff < 86400) return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)!==1?'s':''} ago`;
//     return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)!==1?'s':''} ago`;
//   }


//   async function sendMessage() {
//     const text = messagetosend.trim();
//     if (!text) return;
//     try {
//       await axios.post(
//         'https://carenest-serverside.vercel.app/community/',
//         { message: text },
//         { headers: { Authorization: Bearer } }
//       );
//       setMessagetosend("");
//       getAllMessages();
//     } catch (err) {
//       console.error(err);
//     }
//   }


//   function handleEmojiSelect(emoji) {
//     setMessagetosend(prev => prev + emoji.native);
//     setShowEmojiPicker(false);
//   }
//   async function deletemessages(id) {
//     try {
//       let res = await axios.delete(`https://carenest-serverside.vercel.app/community/${id}`, {
//         headers: {
//           Authorization:`${Bearer}`
//         }
//       })
//       console.log(res);
      
//     }
//     catch (err) {
//       console.log(err)
//     }

//   }


//   const messageCards = (Array.isArray(messages) ? messages : [])
//     .sort((a, b) => convertToMillis(a.timestamp) - convertToMillis(b.timestamp))
//     .map((e, i) => (
//       <>
//               <div style={{position:"relative"}}>
//             <div
//         key={i}
//         className={e.senderId === currentuser ? "messagecard ownpos" : "messagecard"}
//       >
//         {e.senderId !== currentuser && (
//           <span className="namesender">
//             {(e.fullName?.split(" ")[0]) || ""}
//           </span>
//         )}
//         <div  className={e.senderId === currentuser ? " flex-img father" : "flex-img"}>
//               {e.senderId !== currentuser && <img src={imgprofile} alt="mamy img" />}
              
//           <div style={{ display: "flex", flexDirection: "column" }} >
//             <div className={e.senderId === currentuser ? "messagecontent own" : "messagecontent"}>
//                   <p>{e.message || ""}</p>

//             </div>
//             <div className="time">
//               <span>{formatTime(e.timestamp)}</span>
//             </div>
//               </div>
//               <div className="icondelete" onClick={()=> deletemessages(e._id)}>
// < MdDelete />
//         </div>
//         </div>
//         </div>

        
//  </div>
//       </>
     

    
   
      
//     ));



  
//   return (
//     <div className="Chatbox">
//       <div className="header">
//         <h3>Mamy's chat</h3>
//       </div>
//       <div className="chatArea">
//         {messageCards}
//         <div ref={endOfMessagesRef} />
//       </div>


//       <div className="writeMessage">

        
        
//             <input
//             type="text"
//             placeholder="Write Your Message"
//             value={messagetosend}
//             onChange={e => setMessagetosend(e.target.value)}
//           />
   
  
//         <div className="option">
//           <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}>
//             <FiSmile size={20} className="icon-option" />
//           </div>

//           {showEmojiPicker && (
//             <div className="emoji-picker">
//               <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none"  navPosition="bottom" skinTonePosition="none"/>
//             </div>
//           )}

//           <div className="files">
//             <label htmlFor="file-input">
//               <FiPaperclip size={20} className="icon-option" />
//             </label>
//             <input id="file-input" type="file" style={{ display: "none" }} />
//           </div>

//           <div className="send">
//           <button className="send-message" onClick={() => { sendMessage(); setMessagetosend(""); }}>

//               <FiSend className="icon-option" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import { MdDelete, MdMic, MdStop, MdClose } from "react-icons/md";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';
// import { useReactMediaRecorder } from "react-media-recorder";

// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");
//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordDuration, setRecordDuration] = useState(0);
//   const [durationInterval, setDurationInterval] = useState(null);
//   const endOfMessagesRef = useRef(null);
//   const [audioBlob, setAudioBlob] = useState(null);
//   console.log(audioBlob)

//   const {
//     startRecording,
//     stopRecording,
//     mediaBlobUrl
//   } = useReactMediaRecorder({ audio: true });

//   useEffect(() => {
//     getAllMessages();
//   }, []);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Track recording duration
//   useEffect(() => {
//     if (isRecording) {
//       const interval = setInterval(() => {
//         setRecordDuration(prev => prev + 1);
//       }, 1000);
//       setDurationInterval(interval);
//     } else if (durationInterval) {
//       clearInterval(durationInterval);
//       setDurationInterval(null);
//     }
//     return () => durationInterval && clearInterval(durationInterval);
//   }, [isRecording]);

//   // Format to mm:ss
//   function formatDuration(sec) {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s.toString().padStart(2, '0')}`;
//   }

//   async function getAllMessages() {
//     try {
//       const res = await axios.get(
//         'https://carenest-serverside.vercel.app/community/',
//         { headers: { Authorization: Bearer } }
//       );
//       setMessages(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   function convertToMillis(ts) {
//     if (ts && typeof ts === "object" && "_seconds" in ts) return ts._seconds * 1000;
//     if (typeof ts === "number") return ts;
//     return Date.now();
//   }
//   function formatTime(ts) {
//     const diff = Math.floor((Date.now() - convertToMillis(ts)) / 1000);
//     if (diff < 60) return "Just now";
//     if (diff < 3600) return `${Math.floor(diff/60)} minute${Math.floor(diff/60)!==1?'s':''} ago`;
//     if (diff < 86400) return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)!==1?'s':''} ago`;
//     return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)!==1?'s':''} ago`;
//   }

//   async function sendMessage() {
//     const text = messagetosend.trim();
//     if (!text && !mediaBlobUrl) return;
//     try {
//       if (mediaBlobUrl) {
//         const blob = await fetch(mediaBlobUrl).then(r => r.blob());
//         const formData = new FormData();
//         formData.append('voice', blob, 'voice.webm');
//         formData.append('message', text);
//         await axios.post(
//           'https://carenest-serverside.vercel.app/community/',
//           formData,
//           {
//             headers: {
//               Authorization: Bearer,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         );
//       } else {
//         await axios.post(
//           'https://carenest-serverside.vercel.app/community/',
//           { message: text },
//           { headers: { Authorization: Bearer } }
//         );
//       }
//       setMessagetosend("");
//       if (isRecording) handleStop();
//       getAllMessages();
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   function handleEmojiSelect(emoji) {
//     setMessagetosend(prev => prev + emoji.native);
//     setShowEmojiPicker(false);
//   }

//   function handleStart() {
//     setIsRecording(true);
//     setRecordDuration(0);
//     startRecording();
//   }
  
//   function handleStop() {
//     setIsRecording(false);
//     stopRecording();
//     if (mediaBlobUrl) {
//       // حفظ الصوت في المتغير
//       fetch(mediaBlobUrl)
//         .then(response => response.blob())
//         .then(blob => {
//           setAudioBlob(blob);  // تخزين الصوت في متغير
//         });
//     }
//   }

//   async function deletemessages(id) {
//     try {
//       await axios.delete(`https://carenest-serverside.vercel.app/community/${id}`, {
//         headers: { Authorization: Bearer }
//       });
//       getAllMessages();
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const messageCards = (Array.isArray(messages) ? messages : [])
//     .sort((a, b) => convertToMillis(a.timestamp) - convertToMillis(b.timestamp))
//     .map((e, i) => (
//       <div key={i} className="message-wrapper">
//         <div className={e.senderId === currentuser ? "messagecard ownpos" : "messagecard"}>
//           {e.senderId !== currentuser && <span className="namesender">{e.fullName?.split(" ")[0] || ""}</span>}
//           <div className={e.senderId === currentuser ? "flex-img father" : "flex-img"}>
//             {e.senderId !== currentuser && <img src={imgprofile} alt="mamy img" />}
//             <div className="content-col">
//               {e.voiceUrl && <audio src={e.voiceUrl} controls preload="metadata" />}
//               <div className={e.senderId === currentuser ? "messagecontent own" : "messagecontent"}>
//                 <p>{e.message || ""}</p>
//               </div>
//               <div className="time"><span>{formatTime(e.timestamp)}</span></div>
//             </div>
//             <div className="icondelete" onClick={() => deletemessages(e._id)}><MdDelete /></div>
//           </div>
//         </div>
//       </div>
//     ));
  
//   return (
//     <div className="Chatbox">
//       <div className="header"><h3>Mamy's chat</h3></div>
//       <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

//       <div className="writeMessage">
//       <div className={isRecording? "record width" :"record"}>
//             {!isRecording
//               ? <button  className="startrecord"onClick={handleStart}><MdMic size={24} style={{color:"#777"}} /></button>
//             : <>
//               <div className="div-record">

//                 <div style={{display:"flex" , alignItems:"center" , gap:"5px"}}>
                  
//                 <button className="" onClick={() => { stopRecording(); setIsRecording(false); }}><MdClose size={20} /></button>
//                   <button onClick={handleStop}><MdStop size={24} /></button>
//                   <span className="duration">{formatDuration(recordDuration)}</span>
//                 </div>
    
               
//                 </div>
//                 </>
//             }
//         </div>
//         {isRecording===false && (
//                <input
//                type="text"
//                placeholder="Write Your Message"
//                value={messagetosend}
//                onChange={e => setMessagetosend(e.target.value)}
             
//              />
          
//         )}
   
//         <div className={isRecording ?"option st" :"option"}>
//           {isRecording === false && (
//             <>
//               <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}><FiSmile size={20} className="icon-option" /></div>
//               {showEmojiPicker && (<div className="emoji-picker"><Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" /></div>)}
//               <div className="files"><label htmlFor="file-input"><FiPaperclip size={20} className="icon-option" /></label><input id="file-input" type="file" style={{ display: "none" }} /></div>
//             </>
//           )
//           }

  
//           <div className="send">
//             <button className="send-message" onClick={sendMessage} disabled={(!messagetosend.trim() && !mediaBlobUrl)}>
//               <FiSend className="icon-option" />
//             </button>
//           </div>
//         </div>
       
//       </div>
//     </div>
//   );
// }

import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { MdDelete, MdMic, MdStop, MdClose } from "react-icons/md";
import "./Chatbox.css";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import imgprofile from "../../../../assets/mamyprofile.png";
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useReactMediaRecorder } from "react-media-recorder";

export default function ChatBox() {
  const cookie = new Cookies();
  const Bearer = cookie.get("Bearer");
  const currentuser = cookie.get("id");
  const [messages, setMessages] = useState([]);
  const [messagetosend, setMessagetosend] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [durationInterval, setDurationInterval] = useState(null);
  const endOfMessagesRef = useRef(null);
  const [audioBlob, setAudioBlob] = useState(null);
  console.log(audioBlob)

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track recording duration
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
      setDurationInterval(interval);
    } else if (durationInterval) {
      clearInterval(durationInterval);
      setDurationInterval(null);
    }
    return () => durationInterval && clearInterval(durationInterval);
  }, [isRecording]);

  // Format to mm:ss
  function formatDuration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  console.log(messages)

  async function getAllMessages() {
    try {
      const res = await axios.get(
        'https://carenest-serverside.vercel.app/community/',
        { headers: { Authorization: Bearer } }
      );
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  }

  function convertToMillis(ts) {
    if (ts && typeof ts === "object" && "_seconds" in ts) return ts._seconds * 1000;
    if (typeof ts === "number") return ts;
    return Date.now();
  }

  function formatTime(ts) {
    const diff = Math.floor((Date.now() - convertToMillis(ts)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
  }

 
  async function sendMessage() {
    const text = messagetosend.trim();
    if (!text && !audioBlob) return;
  
    try {
      if (audioBlob) {
        const file = new File([audioBlob], "recording.wav", { type: audioBlob.type });
        const formData = new FormData();
        formData.append("audio", file);
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
  
        const res = await axios.post(
          "https://carenest-serverside.vercel.app/community/",
          formData,
          {
            headers: {
              Authorization: `${Bearer}`, 
            },
          }
        );
        console.log(res.data);
      } else {
        const res = await axios.post(
          "https://carenest-serverside.vercel.app/community/",
          { message: text },
          {
            headers: {
              Authorization: `${Bearer}`,
  
            },
          }
        );
        console.log(res.data);
      }
  
      setMessagetosend("");
      setAudioBlob(null);
      if (isRecording) handleStop();
      getAllMessages();
    } catch (err) {
      console.error("Send Message Error:", err);
    }
  }
  
  

  function handleEmojiSelect(emoji) {
    setMessagetosend(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  }

  function handleStart() {
    setIsRecording(true);
    setRecordDuration(0);
    startRecording();
  }

  function handleStop() {
    setIsRecording(false);
    stopRecording(); 
  }
  
  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then(res => res.blob())
        .then(blob => {
          setAudioBlob(blob);
          console.log("Audio Blob set:", blob);
        })
        .catch(err => {
          console.error("Error fetching blob:", err);
        });
    }
  }, [mediaBlobUrl]);
  
  async function deletemessages(id) {
    try {
      await axios.delete(`https://carenest-serverside.vercel.app/community/${id}`, {
        headers: { Authorization: Bearer }
      });
      getAllMessages();
    } catch (err) {
      console.error(err.data);
    }
  }

  const messageCards = (Array.isArray(messages) ? messages : [])
    .sort((a, b) => convertToMillis(a.timestamp) - convertToMillis(b.timestamp))
    .map((e, i) => (
      <div key={i} className="message-wrapper">
        <div className={e.senderId === currentuser ? "messagecard ownpos" : "messagecard"}>
          {e.senderId !== currentuser && <span className="namesender">{e.fullName?.split(" ")[0] || ""}</span>}
          <div className={e.senderId === currentuser ? "flex-img father" : "flex-img"}>
            {e.senderId !== currentuser && <img src={imgprofile} alt="mamy img" />}
            <div className="content-col">
              {e.voiceUrl && <audio src={e.voiceUrl} controls preload="metadata" />}
              <div className={e.senderId === currentuser ? "messagecontent own" : "messagecontent"}>
                <p>{e.message || ""}</p>
              </div>
              <div className="time"><span>{formatTime(e.timestamp)}</span></div>
            </div>
            <div className="icondelete" onClick={() => deletemessages(e._id)}><MdDelete /></div>
          </div>
        </div>
      </div>
    ));
   
    

  return (
    <div className="Chatbox">
      <div className="header"><h3>Mamy's chat</h3></div>
      <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

      <div className="writeMessage">
        <div className={isRecording ? "record width" : "record"}>
          {!isRecording
            ? <button className="startrecord" onClick={handleStart}><MdMic size={24} style={{ color: "#777" }} /></button>
            : <>
              <div className="div-record">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <button className="" onClick={() => { stopRecording(); setIsRecording(false); }}><MdClose size={20} /></button>
                  <button onClick={handleStop}><MdStop size={24} /></button>
                  <span className="duration">{formatDuration(recordDuration)}</span>
                </div>
              </div>
            </>
          }
        </div>
        {isRecording === false && (
          <input
            type="text"
            placeholder="Write Your Message"
            value={messagetosend}
            onChange={e => setMessagetosend(e.target.value)}
          />
        )}

        <div className={isRecording ? "option st" : "option"}>
          {isRecording === false && (
            <>
              <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}><FiSmile size={20} className="icon-option" /></div>
              {showEmojiPicker && (<div className="emoji-picker"><Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" /></div>)}
              <div className="files"><label htmlFor="file-input"><FiPaperclip size={20} className="icon-option" /></label><input id="file-input" type="file" style={{ display: "none" }} /></div>
            </>
          )}

          <div className="send">
            <button className="send-message" onClick={sendMessage} disabled={(!messagetosend.trim() && !audioBlob)}>
              <FiSend className="icon-option" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}





