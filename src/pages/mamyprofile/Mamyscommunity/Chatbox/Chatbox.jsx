
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

// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import { MdDelete} from "react-icons/md";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';

// import WaveSurfer from "wavesurfer.js";
// import RecordPlugin from "wavesurfer.js/dist/plugins/record";
// import { IoMdMic } from "react-icons/io";


// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");
//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const endOfMessagesRef = useRef(null);

//   useEffect(() => {
//     getAllMessages();
//   }, []);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  



//   console.log(messages)

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
//     if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
//     return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
//   }

 
//   async function sendMessage() {
//     const text = messagetosend.trim();

  
//     try {
     
//       const res = await axios.post(
//         "https://carenest-serverside.vercel.app/community/",
//         { message: text },
//         {
//           headers: {
//             Authorization: `${Bearer}`,
  
//           },
//         }
//       );
//       console.log(res.data);
  
//   setMessagetosend("");
//   getAllMessages();
// } catch (err) {
//       console.error("Send Message Error:", err);
//     }
//   }
  
  

//   function handleEmojiSelect(emoji) {
//     setMessagetosend(prev => prev + emoji.native);
//     setShowEmojiPicker(false);
//   }

  
//   const micRef = useRef(null);
//   const playRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const recordPluginRef = useRef(null);

//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedUrl, setRecordedUrl] = useState(null);
//   const [seconds, setSeconds] = useState(0);
//   const timerRef = useRef(null);

//   // إنشاء الموجة و البلجن
//   useEffect(() => {
//     if (!micRef.current) return;

//     const ws = WaveSurfer.create({
//       container: micRef.current,
//       waveColor: "#eee",
//       progressColor: "#bbb",
//       cursorWidth: 0,
//       height: 80,
//       barWidth: 2,
//       barGap: 2,
//     });
//     wavesurferRef.current = ws;

//     const rp = RecordPlugin.create({
//       bufferSize: 4096,
//       mediaTrackConstraints: { audio: true }
//     });
//     recordPluginRef.current = rp;
//     ws.registerPlugin(rp);

//     rp.once("record-end", (blob) => {
//       const url = URL.createObjectURL(blob);
//       setRecordedUrl(url);
//       ws.load(url);

//       // طباعة بيانات الصوت في الكونسول
//       console.log("Audio Blob:", blob);
//       console.log("Audio URL:", url);
//       console.log("Audio Duration:", blob.duration);
//     });

//     return () => ws.destroy();
//   }, []);

//   // عدّاد الثواني
//   useEffect(() => {
//     if (isRecording) {
//       timerRef.current = setInterval(() => {
//         setSeconds(sec => sec + 1);
//       }, 1000);
//     } else {
//       clearInterval(timerRef.current);
//       setSeconds(0);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [isRecording]);

//   const handleRecord = () => {
//     const rp = recordPluginRef.current;
//     if (!rp) return;

//     if (!isRecording) {
//       rp.startMic()
//         .then(() => rp.startRecording())
//         .then(() => setIsRecording(true))
//         .catch(console.error);
//     } else {
//       rp.stopRecording();
//       rp.stopMic();
//       setIsRecording(false);
//     }
//   };

//   const formatTimee = (sec) => {
//     const m = Math.floor(sec/60).toString().padStart(2, "0");
//     const s = (sec%60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };


  

  
//   // async function deletemessages(id) {
//   //   try {
//   //     await axios.delete(`https://carenest-serverside.vercel.app/community/${id}`, {
//   //       headers: { Authorization: Bearer }
//   //     });
//   //     getAllMessages();
//   //   } catch (err) {
//   //     console.error(err.data);
//   //   }
//   // }

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
//         <div className={ isRecording ?"width record":"record"}>
//         <div className="controls">
//         <button
//           className={`btn-record ${isRecording ? "recording" : ""}`}
//           onClick={handleRecord}
//               >
//                   <IoMdMic className="mic" />

//         </button>
//         {isRecording && (
//           <div className="indicator">
//             <span className="dot" />
//             <span className="timer">{formatTimee(seconds)}</span>
//           </div>
//         )}
//       </div>
//         </div>
//         {!isRecording && (
//               <input
//               type="text"
//               placeholder="Write Your Message"
//               value={messagetosend}
//               onChange={e => setMessagetosend(e.target.value)}
//             />
          
//         )}
  
      
      


//         <div className= "option">
  
//             <>
//               <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}><FiSmile size={20} className="icon-option" /></div>
//               {showEmojiPicker && (<div className="emoji-picker"><Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" /></div>)}
//               <div className="files"><label htmlFor="file-input"><FiPaperclip size={20} className="icon-option" /></label><input id="file-input" type="file" style={{ display: "none" }} /></div>
//             </>
    

//           <div className="send">
//             <button className="send-message" onClick={sendMessage} disabled={(!messagetosend.trim())}>
//               <FiSend className="icon-option" />
//             </button>
//           </div>
//         </div>

//       </div>
//       {/* <div className="recorder-container">

//       <div ref={micRef} className="waveform" />
//       {recordedUrl && (
//         <div className="playback">
//           <button
//             className="btn-play"
//             onClick={() => wavesurferRef.current.playPause()}
//           >
//             تشغيل / إيقاف
//           </button>
//         </div>
//       )}
//     </div> */}

//     </div>

   
//   );
// }
// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import { MdDelete} from "react-icons/md";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';
// import WaveSurfer from "wavesurfer.js";
// import RecordPlugin from "wavesurfer.js/dist/plugins/record";
// import { IoMdMic } from "react-icons/io";


// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");
//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const endOfMessagesRef = useRef(null);
//   const micRef = useRef(null);
//   const playRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const recordPluginRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedUrl, setRecordedUrl] = useState(null);
//   const [seconds, setSeconds] = useState(0);
//   const timerRef = useRef(null);
//   console.log(isRecording)



//   useEffect(() => {
//     getAllMessages();
//   }, []);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

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
//     if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
//     return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
//   }

//   async function sendMessage() {
//     const text = messagetosend.trim();
//     try {
//       const res = await axios.post(
//         "https://carenest-serverside.vercel.app/community/",
//         { message: text },
//         {
//           headers: {
//             Authorization: `${Bearer}`,
//           },
//         }
//       );
//       setMessagetosend("");
//       getAllMessages();
//     } catch (err) {
//       console.error("Send Message Error:", err);
//     }
//   }

//   function handleEmojiSelect(emoji) {
//     setMessagetosend(prev => prev + emoji.native);
//     setShowEmojiPicker(false);
//   }
//   useEffect(() => {
//     if (!micRef.current) return;

//     const ws = WaveSurfer.create({
//       container: micRef.current,
//       waveColor: "#eee",
//       progressColor: "#bbb",
//       cursorWidth: 0,
//       height: 80,
//       barWidth: 2,
//       barGap: 2,
//     });
//     wavesurferRef.current = ws;

//     const rp = RecordPlugin.create({
//       bufferSize: 4096,
//       mediaTrackConstraints: { audio: true }
//     });
//     recordPluginRef.current = rp;
//     ws.registerPlugin(rp);

//     rp.once("record-end", (blob) => {
//       const url = URL.createObjectURL(blob);
//       setRecordedUrl(url);
//       ws.load(url);

//       // طباعة بيانات الصوت في الكونسول
//       console.log("Audio Blob:", blob);
//       console.log("Audio URL:", url);
//       console.log("Audio Duration:", blob.duration);
//     });

//     return () => ws.destroy();
//   }, []);
//   useEffect(() => {
//     if (isRecording) {
//       timerRef.current = setInterval(() => {
//         setSeconds(sec => sec + 1);
//       }, 1000);
//     } else {
//       clearInterval(timerRef.current);
//       setSeconds(0);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [isRecording]);
//   const handleRecord = () => {
//     const rp = recordPluginRef.current;
//     if (!rp) return;

//     if (!isRecording) {
//       rp.startMic()
//         .then(() => rp.startRecording())
//         .then(() => setIsRecording(true))
//         .catch(console.error);
//     } else {
//       rp.stopRecording();      // يفعل event "record-end"
//       rp.stopMic();
//       setIsRecording(false);
//     }
//   };






//   const formatTimee = (sec) => {
//     const m = Math.floor(sec/60).toString().padStart(2, "0");
//     const s = (sec%60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

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
//             <div className="icondelete"><MdDelete /></div>
//           </div>
//         </div>
//       </div>
//     ));
//   console.log(isRecording)

//   return (
//     <div className="Chatbox">
//       <div className="header"><h3>Mamy's chat</h3></div>
//       <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

//       <div className="writeMessage">
//         <div className={isRecording  ?"width record":"record"}>
        
//       <div className="controls">
//         <button
//           className={`btn-record ${isRecording ? "recording" : ""}`}
//           onClick={handleRecord}
//               >
//                   <IoMdMic className="mic" />

//         </button>
//         {isRecording && (
//           <div className="indicator">
//             <span className="dot" />
//             <span className="timer">{formatTimee(seconds)}</span>
//           </div>
//         )}
//           </div>
//           </div>
//       {/* <div ref={micRef} className="waveform" />
//       {recordedUrl && (
//         <div className="playback">
//           <button
//             className="btn-play"
//             onClick={() => wavesurferRef.current.playPause()}
//           >
//             تشغيل / إيقاف
//           </button>
//         </div>
//       )}
//     </div> */}
   
  
//         {!isRecording && (
//                <input
//                type="text"
//                placeholder="Write Your Message"
//                value={messagetosend}
//                onChange={e => setMessagetosend(e.target.value)}
//              />
          
// )}
    
     
      

//         <div className="option">
        
//             <>
//                      <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}>
//             <FiSmile size={20} className="icon-option" />
//           </div>
//           {showEmojiPicker && (
//             <div className="emoji-picker">
//               <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" />
//             </div>
//           )}
//           <div className="files">
//             <label htmlFor="file-input">
//               <FiPaperclip size={20} className="icon-option" />
//             </label>
//             <input id="file-input" type="file" style={{ display: "none" }} />
//           </div>
//             </>
            

   
//           <div className="send">
//             <button className="send-message" onClick={sendMessage} disabled={(!messagetosend.trim())}>
//               <FiSend className="icon-option" />
//             </button>
//           </div>
//         </div>
//       </div>
      
      
      
//     </div>
//   );
// }
// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import { MdDelete } from "react-icons/md";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';
// import WaveSurfer from "wavesurfer.js";
// import RecordPlugin from "wavesurfer.js/dist/plugins/record";
// import { IoMdMic } from "react-icons/io";
// import RecordStyled from "../Voicerecorder/Voic";

// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");
//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const endOfMessagesRef = useRef(null);


//   useEffect(() => {
//     getAllMessages();
//   }, []);

//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

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
//     if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
//     return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
//   }

//   async function sendMessage() {
//     const text = messagetosend.trim();
//     try {
//       const res = await axios.post(
//         "https://carenest-serverside.vercel.app/community/",
//         { message: text },
//         {
//           headers: {
//             Authorization: `${Bearer}`,
//           },
//         }
//       );
//       setMessagetosend("");
//       getAllMessages();
//     } catch (err) {
//       console.error("Send Message Error:", err);
//     }
//   }

//   function handleEmojiSelect(emoji) {
//     setMessagetosend(prev => prev + emoji.native);
//     setShowEmojiPicker(false);
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
//             <div className="icondelete"><MdDelete /></div>
//           </div>
//         </div>
//       </div>
//     ));

//   return (
//    <div className="Chatbox">
//     <div className="header"><h3>Mamy's chat</h3></div>
//     <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

//       <div className="writeMessage">



//         <input
//           type="text"
//           placeholder="Write Your Message"
//           value={messagetosend}
//           onChange={e => setMessagetosend(e.target.value)}
//         />


//       <div className="option">
//         <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}>
//           <FiSmile size={20} className="icon-option" />
//         </div>
//         {showEmojiPicker && (
//           <div className="emoji-picker">
//             <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" />
//           </div>
//         )}
//         <div className="files">
//           <label htmlFor="file-input">
//             <FiPaperclip size={20} className="icon-option" />
//           </label>
//           <input id="file-input" type="file" style={{ display: "none" }} />
//         </div>

//         <div className="send">
//           <button className="send-message" onClick={sendMessage} disabled={(!messagetosend.trim())}>
//             <FiSend className="icon-option" />
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>

    
    
   
//   );
// }
// import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
// import { MdDelete } from "react-icons/md";
// import { IoMdMic } from "react-icons/io";
// import "./Chatbox.css";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import imgprofile from "../../../../assets/mamyprofile.png";
// import Picker from '@emoji-mart/react';
// import emojiData from '@emoji-mart/data';
// import WaveSurfer from "wavesurfer.js";
// import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
// import { FaCirclePause } from "react-icons/fa6";


// export default function ChatBox() {
//   const cookie = new Cookies();
//   const Bearer = cookie.get("Bearer");
//   const currentuser = cookie.get("id");

//   const [messages, setMessages] = useState([]);
//   const [messagetosend, setMessagetosend] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showRecorder, setShowRecorder] = useState(false);
//   const [scrollingWaveform, setScrollingWaveform] = useState(false);
//   const [continuousWaveform, setContinuousWaveform] = useState(true);

//   const endOfMessagesRef = useRef(null);
//   const micContainerRef = useRef(null);
//   const progressRef = useRef(null);
//   const pauseButtonRef = useRef(null);
//   const recordButtonRef = useRef(null);

//   const wavesurferRef = useRef(null);
//   const recordRef = useRef(null);

//   useEffect(() => { getAllMessages(); }, []);
//   useEffect(() => { endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   useEffect(() => {
//     if (!showRecorder) return;

//     if (wavesurferRef.current) {
//       wavesurferRef.current.destroy();
//       wavesurferRef.current = null;
//       recordRef.current = null;
//     }

//     const ws = WaveSurfer.create({
//       container: micContainerRef.current,
//       waveColor: '#d5e2ea',
//       progressColor: '#0A6AA6',
//       backgroundColor: '#fff',
//       height: 50,
//       barWidth: 2,
//       cursorWidth: 0,
//     });
//     const plugin = RecordPlugin.create({
//       renderRecordedAudio: false,
//       scrollingWaveform,
//       continuousWaveform,
//       continuousWaveformDuration: 30,
//     });
//     ws.registerPlugin(plugin);

//     wavesurferRef.current = ws;
//     recordRef.current = plugin;

//     recordRef.current.on('record-progress', updateProgress);
//     recordRef.current.on('record-end', (blob) => {
//       const formData = new FormData();
//       formData.append('voice', blob, 'voice.webm');
//       axios.post(
//         'https://carenest-serverside.vercel.app/community/',
//         formData,
//         { headers: { Authorization: Bearer, 'Content-Type': 'multipart/form-data' } }
//       ).then(getAllMessages);
//     });

//     recordButtonRef.current.textContent = 'Record';
//     pauseButtonRef.current.style.display = 'none';
//   }, [showRecorder, scrollingWaveform, continuousWaveform]);

//   const updateProgress = (time) => {
//     const m = Math.floor((time % 3600000) / 60000);
//     const s = Math.floor((time % 60000) / 1000);
//     if (progressRef.current) {
//       progressRef.current.textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
//     }
//   };

//   async function getAllMessages() {
//     try {
//       const res = await axios.get(
//         'https://carenest-serverside.vercel.app/community/',
//         { headers: { Authorization: Bearer } }
//       );
//       setMessages(Array.isArray(res.data) ? res.data : []);
//     } catch (err) { console.error(err); }
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
//     } catch (err) { console.error(err); }
//   }

//   function convertToMillis(ts) {
//     if (ts && typeof ts === 'object' && '_seconds' in ts) return ts._seconds * 1000;
//     if (typeof ts === 'number') return ts;
//     return Date.now();
//   }
//   function formatTime(ts) {
//     const diff = Math.floor((Date.now() - convertToMillis(ts)) / 1000);
//     if (diff < 60) return 'Just now';
//     if (diff < 3600) return `${Math.floor(diff/60)} minute${Math.floor(diff/60)!==1?'s':''} ago`;
//     if (diff < 86400) return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)!==1?'s':''} ago`;
//     return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)!==1?'s':''} ago`;
//   }

//   const messageCards = messages
//     .sort((a,b) => convertToMillis(a.timestamp) - convertToMillis(b.timestamp))
//     .map((e,i) => (
//       <div key={i} className="message-wrapper">
//         <div className={e.senderId === currentuser ? "messagecard ownpos" : "messagecard"}>
//           {e.senderId !== currentuser && <span className="namesender">{e.fullName?.split(" ")[0]}</span>}
//           <div className={e.senderId === currentuser ? "flex-img father" : "flex-img"}>
//             {e.senderId !== currentuser && <img src={imgprofile} alt="mamy img" />}
//             <div className="content-col">
//               {e.voiceUrl && <audio src={e.voiceUrl} controls preload="metadata" />}
//               <div className={e.senderId === currentuser ? "messagecontent own" : "messagecontent"}>
//                 <p>{e.message}</p>
//               </div>
//               <div className="time"><span>{formatTime(e.timestamp)}</span></div>
//             </div>
//             <div className="icondelete"><MdDelete /></div>
//           </div>
//         </div>
//       </div>
//     ));

//   return (
//     <div className="Chatbox">
//       <div className="header"><h3>Mamy's chat</h3></div>
//       <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

//       {showRecorder && (
//         <div className="recorder-container">
//           <div ref={micContainerRef} id="mic" part="wrapper" />
//           <div style={{display:"flex"}}>
//           <p ref={progressRef} className="progress">00:00</p>
//           {/* <button ref={recordButtonRef} onClick={() => {
//             if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
//               recordRef.current.stopRecording();
//             } else {
//               recordButtonRef.current.disabled = true;
//               recordRef.current.startRecording().then(() => {
//                 recordButtonRef.current.textContent = 'Stop';
//                 recordButtonRef.current.disabled = false;
//                 pauseButtonRef.current.style.display = 'inline';
//               });
//             }
//           }}>Record</button> */}
//           <button ref={pauseButtonRef} onClick={() => {
//             if (recordRef.current.isPaused()) recordRef.current.resumeRecording(); else recordRef.current.pauseRecording();
//           }}>< FaCirclePause/></button>
        
//             </div>
  
//         </div>
//       )}

//       <div className="writeMessage">
//         {
//           !showRecorder ? (
//             <div className="mic-icon" onClick={async () => {
//               setShowRecorder(true);
            
//               if (!recordRef.current) return; // تأكدي انه موجود
            
//               if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
//                 recordRef.current.stopRecording();
//               } else {
//                 if (recordButtonRef.current) {
//                   recordButtonRef.current.disabled = true;
//                 }
//                 await recordRef.current.startRecording();
//                 if (recordButtonRef.current) {
//                   recordButtonRef.current.textContent = 'Stop';
//                   recordButtonRef.current.disabled = false;
//                 }
//                 if (pauseButtonRef.current) {
//                   pauseButtonRef.current.style.display = 'inline';
//                 }
//               }
//             }}>
//               <IoMdMic size={24} className="mic" />
//             </div>
            
            
            
//           ) : (
//               <div className="del-icon" onClick={()=>setShowRecorder(false)}>
//                 <MdDelete className="del" />
//                 </div>
//           )
//         }
  
//         {
//           !showRecorder && (
//             <input
//             type="text"
//             placeholder="Write Your Message"
//             value={messagetosend}
//             onChange={e => setMessagetosend(e.target.value)}
//           />
            
//           )
//         }
//         {!showRecorder && (
//             <div className="option">
//             <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}><FiSmile size={20} /></div>
//             {showEmojiPicker && (
//               <div className="emoji-picker">
//                 <Picker data={emojiData} onEmojiSelect={emoji => setMessagetosend(m => m + emoji.native)} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" />
//               </div>
//             )}
//             <div className="files"><label htmlFor="file-input"><FiPaperclip size={20} /></label><input id="file-input" type="file" style={{ display: 'none' }} /></div>
//             <div className="send"><button onClick={sendMessage} disabled={!messagetosend.trim()}><FiSend size={20} /></button></div>
          
//           </div>
          
// )}
      
//       </div>
//     </div>
//   );
// }
import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdMic } from "react-icons/io";
import "./Chatbox.css";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import imgprofile from "../../../../assets/mamyprofile.png";
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { FaCirclePause } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

export default function ChatBox() {
  const cookie = new Cookies();
  const Bearer = cookie.get("Bearer");
  const currentuser = cookie.get("id");
  const [messages, setMessages] = useState([]);
  const [messagetosend, setMessagetosend] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const endOfMessagesRef = useRef(null);
  const micContainerRef = useRef(null);
  const progressRef = useRef(null);
  const pauseButtonRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  console.log(recordedBlob)

  console.log(isPaused)


  const wavesurferRef = useRef(null);
  const recordRef = useRef(null);

  useEffect(() => { getAllMessages(); }, []);
  useEffect(() => { endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // useEffect(() => {
  //   if (!showRecorder) {
  //     if (wavesurferRef.current) {
  //       wavesurferRef.current.destroy();
  //       wavesurferRef.current = null;
  //       recordRef.current = null;
  //     }
  //     return;
  //   }
  //   const container = micContainerRef.current.parentElement; // أو استخدم أي عنصر أب تريده
  //   const getWidth = () => Math.floor(container.getBoundingClientRect().width);

  //   const ws = WaveSurfer.create({
  //     container: micContainerRef.current,
  //     waveColor: '#d5e2ea',
  //     progressColor: '#0A6AA6',
  //     backgroundColor: '#fff',
  //     height: 50,
  //     barGap: 2,
  //     barRadius: 3,
  //     cursorWidth: 0,
   
  //          // عرض الموجة بالبيكسل أو يمكنك '300px'
  //     fillParent: true,       // حتى لا يتمدد ليملىء الحاوية بأكملها
  //     responsive: false,         // نعتمد يدويّاً على width
  //     width: getWidth(),
  //   });
  //   const plugin = RecordPlugin.create({
  //     continuousWaveform: true,
  //     continuousWaveformDuration: 200,
  //     scrollingWaveform: false, 
  //     renderRecordedAudio: false,
  //   });
    
    
    
  //   ws.registerPlugin(plugin);
  //   wavesurferRef.current = ws;
  //   recordRef.current = plugin;

  //   plugin.on('record-progress', updateProgress);
  //   plugin.on('record-end', handleRecordEnd);

  //   startRecording();

  //   if (pauseButtonRef.current) {
  //     pauseButtonRef.current.style.display = 'inline';
  //   }

  //   return () => {
  //     plugin.un('record-progress', updateProgress);
  //     plugin.un('record-end', handleRecordEnd);
  //     ws.destroy();
  //   };
    
  // }, [showRecorder]);
  useEffect(() => {
    if (!showRecorder) {
      // تدمير إذا كان موجود
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
      recordRef.current = null;
      return;
    }
  
    const container = micContainerRef.current.parentElement; // أو استخدم أي عنصر أب تريده
    const getWidth = () => Math.floor(container.getBoundingClientRect().width);
  
    // إنشاء الـ WaveSurfer مع عرض ديناميكي
    const ws = WaveSurfer.create({
      container: micContainerRef.current,
      waveColor: '#d5e2ea',
      progressColor: '#0A6AA6',
      backgroundColor: '#fff',
      height: 50,
      barGap: 2,
      barRadius: 3,
      cursorWidth: 0,
      fillParent: false,
      responsive: false,         // نعتمد يدويّاً على width
      width: getWidth(),
    });
  
    const plugin = RecordPlugin.create({
      renderRecordedAudio: false,
      continuousWaveform: true,
      continuousWaveformDuration: 50,
      scrollingWaveform: false,
    });
  
    ws.registerPlugin(plugin);
    wavesurferRef.current = ws;
    recordRef.current = plugin;
    plugin.on('record-progress', updateProgress);
    plugin.on('record-end', handleRecordEnd);
    startRecording();
  
    // دالة تتحكّم بإعادة ضبط العرض وإعادة الرسم
    const handleResize = () => {
      const w = getWidth();
      ws.setWidth(w);
      ws.drawBuffer();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      plugin.un('record-progress', updateProgress);
      plugin.un('record-end', handleRecordEnd);
      ws.destroy();
    };
  }, [showRecorder]);
  
  const startRecording = async () => {
    try {
      if (recordRef.current) {
        await recordRef.current.startRecording();
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleRecordEnd = async (blob) => {
    setRecordedBlob(blob); 
  };

  

  const updateProgress = (time) => {
    const m = Math.floor((time % 3600000) / 60000);
    const s = Math.floor((time % 60000) / 1000);
    if (progressRef.current) {
      progressRef.current.textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    }
  };
  
//   useEffect(() => {
//     if (!showRecorder) return;

//     if (wavesurferRef.current) {
//       wavesurferRef.current.destroy();
//       wavesurferRef.current = null;
//       recordRef.current = null;
//     }

//     const ws = WaveSurfer.create({
//       container: micContainerRef.current,
//       waveColor: '#d5e2ea',
//       progressColor: '#0A6AA6',
//       backgroundColor: '#fff',
//       height: 50,
//       barWidth: 2,
//       cursorWidth: 0,
//     });
//     const plugin = RecordPlugin.create({
//       renderRecordedAudio: false,
//       scrollingWaveform,
//       continuousWaveform,
//       continuousWaveformDuration: 30,
//     });
//     ws.registerPlugin(plugin);

//     wavesurferRef.current = ws;
//     recordRef.current = plugin;

//     recordRef.current.on('record-progress', updateProgress);
//     recordRef.current.on('record-end', (blob) => {
//       const formData = new FormData();
//       formData.append('voice', blob, 'voice.webm');
//       axios.post(
//         'https://carenest-serverside.vercel.app/community/',
//         formData,
//         { headers: { Authorization: Bearer, 'Content-Type': 'multipart/form-data' } }
//       ).then(getAllMessages);
//     });

//     recordButtonRef.current.textContent = 'Record';
//     pauseButtonRef.current.style.display = 'none';
//   }, [showRecorder, scrollingWaveform, continuousWaveform]);

//   const updateProgress = (time) => {
//     const m = Math.floor((time % 3600000) / 60000);
//     const s = Math.floor((time % 60000) / 1000);
//     if (progressRef.current) {
//       progressRef.current.textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
//     }
//   };

  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        'https://carenest-serverside.vercel.app/community/',
        { headers: { Authorization: Bearer } }
      );
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  const sendMessage = async (blob) => {
    try {
      if (recordedBlob) {
        const formData = new FormData();
        formData.append('audio', recordedBlob, 'voice.webm');
        for (const pair of formData.entries()) {
          console.log(pair[0] + ':', pair[1]);
        }
        await axios.post(
          'https://carenest-serverside.vercel.app/community/',
          formData,
          { headers: { Authorization: Bearer, 'Content-Type': 'multipart/form-data' } }
        );
        setRecordedBlob(null);
        setShowRecorder(false); 
        setIsPaused(false);
        getAllMessages();
      } else if (messagetosend.trim()) {
        await axios.post(
          'https://carenest-serverside.vercel.app/community/',
          { message: messagetosend.trim() },
          { headers: { Authorization: Bearer } }
        );
        setMessagetosend("");
        getAllMessages();
      }
    } catch (err) { console.error(err); }
  };
  

  const convertToMillis = (ts) => {
    if (ts && typeof ts === 'object' && '_seconds' in ts) return ts._seconds * 1000;
    if (typeof ts === 'number') return ts;
    return Date.now();
  };

  const formatTime = (ts) => {
    const diff = Math.floor((Date.now() - convertToMillis(ts)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff/60)} minute${Math.floor(diff/60)!==1?'s':''} ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)!==1?'s':''} ago`;
    return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)!==1?'s':''} ago`;
  };
  const sendVoiceMessage = async () => {
    if (recordRef.current && (recordRef.current.isRecording() || recordRef.current.isPaused())) {
      const blob = await recordRef.current.stopRecording();
      await handleRecordEnd(blob); // عادي تحدث الstate لو حابة
      sendMessage(blob); // بعت على طول
    } else {
      sendMessage();
    }
  };
  
  

  const messageCards = messages
    .sort((a,b) => convertToMillis(a.timestamp) - convertToMillis(b.timestamp))
    .map((e,i) => (
      <div key={i} className="message-wrapper">
        <div className={e.senderId === currentuser ? "messagecard ownpos" : "messagecard"}>
          {e.senderId !== currentuser && <span className="namesender">{e.fullName?.split(" ")[0]}</span>}
          <div className={e.senderId === currentuser ? "flex-img father" : "flex-img"}>
            {e.senderId !== currentuser && <img src={imgprofile} alt="mamy img" />}
            <div className="content-col">
              {e.voiceUrl && <audio src={e.voiceUrl} controls preload="metadata" />}
              {e.message && (
                <div className={e.senderId === currentuser ? "messagecontent own" : "messagecontent"}>
                  <p>{e.message}</p>
                </div>
              )}
              <div className="time"><span>{formatTime(e.timestamp)}</span></div>
            </div>
            <div className="icondelete"><MdDelete /></div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="Chatbox">
      <div className="header"><h3>Mamy's chat</h3></div>
      <div className="chatArea">{messageCards}<div ref={endOfMessagesRef} /></div>

 

      <div className="writeMessage">
        {!showRecorder ? (
          <div className="mic-icon" onClick={() => setShowRecorder(true)}>
            <IoMdMic size={24} className="mic" />
          </div>
        ) : (
            <>
              <div>
              <div className="del-icon" onClick={() => {
            if (recordRef.current) {
              if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
                recordRef.current.stopRecording();
              }
            }
                  setShowRecorder(false);
                  setIsPaused(false)
                  setRecordedBlob(null); 
          }}>
            <MdDelete className="del" />
          </div>
              </div>
                         <div className="audio-options">
        
          <button className="pasue" ref={pauseButtonRef} onClick={() => {
  if (!recordRef.current) return;
  if (recordRef.current.isPaused()) {
    recordRef.current.resumeRecording();
    setIsPaused(false); 
  } else if (recordRef.current.isRecording()) {
    recordRef.current.pauseRecording();
    setIsPaused(true); 
  }
}}>
  {isPaused ? <FaPlayCircle className="icon-pause" /> : <FaCirclePause className="icon-pause" />}
              </button>
              <p ref={progressRef} className="progress">00:00</p>

              
              </div>
            </>
 
      
          
        )}

        {!showRecorder ?(
          <>
            <input
              type="text"
              placeholder="Write Your Message"
              value={messagetosend}
              onChange={e => setMessagetosend(e.target.value)}
            />
            <div className="option">
              <div className="emojis" onClick={() => setShowEmojiPicker(v => !v)}><FiSmile size={20} style={{color:'#777'}} /></div>
              {showEmojiPicker && (
                <div className="emoji-picker">
                  <Picker data={emojiData} onEmojiSelect={emoji => setMessagetosend(m => m + emoji.native)} theme="light" previewPosition="none" navPosition="bottom" skinTonePosition="none" />
                </div>
              )}
              <div className="files">
                <label htmlFor="file-input"><FiPaperclip size={20} style={{color:'#777'}} /></label>
                <input id="file-input" type="file" style={{ display: 'none' }} />
              </div>
              <div className="send">
                <button onClick={sendMessage} disabled={!messagetosend.trim()}>
                  <FiSend size={20} className="se" />
                </button>
              </div>
            </div>
          </>
        ) :
          <>
            <div className="recorder-container">
        <div ref={micContainerRef} id="mic" part="wrapper" />
        <div style={{display:"flex"}} >
          


        </div>
        </div>
        <div className={showRecorder ? "send sendre" : "send"}>
  <button
    onClick={sendVoiceMessage} 
  >
    <FiSend size={20} className="se" />
  </button>
</div>

          </>
          
      }
      </div>
    </div>
  );
}











