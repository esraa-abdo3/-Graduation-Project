// import  { useEffect, useRef, useState } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   query,
//   orderBy,
 
// } from "firebase/firestore";
// import { addDoc, serverTimestamp } from "firebase/firestore";
// import {
//   doc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore"; // لازم تضيفي دول


// // firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
//   authDomain: "carenest-438417.firebaseapp.com",
//   projectId: "carenest-438417",
//   storageBucket: "carenest-438417.firebasestorage.app",
//   messagingSenderId: "675853062971",
//   appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
//   measurementId: "G-DT7T2V1JG4",
// };

// import Cookies from "universal-cookie";
// import "./MessagesPage.css"
// import { FiSend } from "react-icons/fi";
// import axios from "axios";
// import { onSnapshot } from "firebase/firestore";
// import Picker from '@emoji-mart/react';
// import data from '@emoji-mart/data';
// import { FaRegSmile } from "react-icons/fa";
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


// const timeAgo = (timestampSeconds) => {
//   const now = Date.now();
//   const messageTime = timestampSeconds * 1000;
//   const diffMs = now - messageTime;

//   const seconds = Math.floor(diffMs / 1000);
//   const minutes = Math.floor(diffMs / (1000 * 60));
//   const hours = Math.floor(diffMs / (1000 * 60 * 60));
//   const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (seconds < 60) return "Just now";
//   if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
//   if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
//   return `${days} day${days === 1 ? "" : "s"} ago`;
// };


// export default function MessagesPage() {
//   const [messages, setMessages] = useState([]);
//   const cookie = new Cookies();
//   const myUserId = cookie.get("id");
//   const gettoken =cookie.get("Bearer")
//   const lastMessageRef = useRef(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [userImage, setUserImage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [loading, setLoading] = useState(true);


  


// useEffect(() => {
//     async function getmamydetalis() {
     
//         try {
//             const res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
//                 headers: { Authorization: `${gettoken}` }
//             });

       
//             setUserImage(res.data.data.image  ? res.data.data.image :"");
//         } catch (error) {
//             console.log(error);
          
//         }
//     }
//     getmamydetalis();
// }, [gettoken]);



// useEffect(() => {
//   const messagesRef = collection(db, "messages");
//   const q = query(messagesRef, orderBy("timestamp", "asc"));

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const updatedMessages = snapshot.docs.map((doc) => {
//       const data = doc.data();
//       return {
//         id: doc.id,
//         ...data,
//         timeAgo: timeAgo(data.timestamp?.seconds || Date.now() / 1000),
//       };
//     });
//     setMessages(updatedMessages);
//     setLoading(false)
//   });

//   // Cleanup
//   return () => unsubscribe();
// }, []);

//     useEffect(() => {
//     // ✅ سكرول لآخر رسالة بعد التحديث
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//     }, [messages]);
// const sendMessage = async () => {
//   if (newMessage.trim() === "") return;

//   try {
//     const docRef = await addDoc(collection(db, "messages"), {
//       message: newMessage,
//       timestamp: serverTimestamp(),
//       userId: myUserId,
//       userImage:  userImage || "",
//     });

//     console.log("Message sent successfully with ID:", docRef.id);
//     setNewMessage("");
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
//   };
//     const handleEmojiSelect = (emoji) => {
//     setNewMessage(newMessage + emoji.native);
//     setShowEmojiPicker(false);
//   };



//   const messagecard=messages.map((msg,index) => {
//     const isMine = msg.userId === myUserId;
//      const isLast = index === messages.length - 1;
//         return (
//           <div className={isMine ? "ismine onemessage" : "onemessage"} key={msg.id}
//            ref={isLast ? lastMessageRef : null}
//           >
  
//             {!isMine && (
//               <img
//                 src={msg.userImage}
//                 alt="User"
//                 width={40}
//                 height={40}
//                 style={{
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   marginLeft: "8px",
//                 }}
//               />
//             )}
//             <div style={{display:"flex" , flexDirection:"column" , gap:"10px"}}>
//            <div className="message-detalis" >
//               <p >{msg.message}</p>
           
//             </div>
//                <small>
//                 {msg.timeAgo}
//               </small>
//             </div>
         
//           </div>
//         );
//       })

//   return (
//     <div className="message-page">
//       <h2>Moms' Corner 💬💖</h2>
//       <div className="chatareapage">
// {loading ? (
//   <div className="loader">جارٍ تحميل الرسائل...</div>
// ) : messages.length > 0 ? (
//   messagecard
// ) : (
//  <p className="nomessages">No messages in this group yet. Start the conversation </p>

// )}

//       </div>
//       <div className="WriteMessage-messagepage">
//         <input type="text" name="" id="" placeholder="write a message"     value={newMessage}
//     onChange={(e) => setNewMessage(e.target.value)} />
//         <div className="optionssend">
//                            <div
          
//             className="emoji-picker-btn"
//             style={{marginLeft: 0, fontSize: 20}}
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
           
//           >
//              <FaRegSmile/>
//           </div>
//           <div className="sendmeesage">
//             <span onClick={sendMessage}><FiSend/></span>
//           </div>
 
       
//         </div>
//                 {showEmojiPicker && (
//           <div className="emoji-picker-popup">
        
//         <Picker
//   data={data}
//   onEmojiSelect={handleEmojiSelect}
//   theme="light"
//   locale="en"
//   previewPosition="none"
// />

//             </div>
//           )}

//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import Cookies from "universal-cookie";
import "./MessagesPage.css";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaRegSmile } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
  authDomain: "carenest-438417.firebaseapp.com",
  projectId: "carenest-438417",
  storageBucket: "carenest-438417.firebasestorage.app",
  messagingSenderId: "675853062971",
  appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
  measurementId: "G-DT7T2V1JG4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const timeAgo = (timestampSeconds) => {
  const now = Date.now();
  const messageTime = timestampSeconds * 1000;
  const diffMs = now - messageTime;
  

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const cookie = new Cookies();
  const myUserId = cookie.get("id");
  const gettoken = cookie.get("Bearer");
  const lastMessageRef = useRef(null);

  // ✅ Get current user image and then set online
  useEffect(() => {
    async function getUserDetailsAndSetOnline() {
      try {
        const res = await axios.get("https://carenest-serverside.vercel.app/users/getMe", {
          headers: { Authorization: `${gettoken}` },
        });
          console.log(res.data.data)
        const image = res.data.data.image || "";
        const firstName = res.data.data.firstName;
                const lastName = res.data.data.lastName;
        setUserImage(image);

        // ✅ بعد ما نجيب الصورة نضيف المستخدم كـ Online
        const userRef = doc(db, "onlineUsers", myUserId);
        await setDoc(userRef, {
          userId: myUserId,
          userImage: image,
           firstName: firstName || "",
        lastName: lastName || "",
          timestamp: serverTimestamp(),
        });

        // ✅ نحدد التنظيف عند الخروج
        const cleanup = async () => {
          await deleteDoc(userRef);
        };
        window.addEventListener("beforeunload", cleanup);
        return () => {
          cleanup();
          window.removeEventListener("beforeunload", cleanup);
        };
      } catch (error) {
        console.log(error);
      }
    }

    if (myUserId) {
      getUserDetailsAndSetOnline();
    }
  }, [gettoken, myUserId]);



  // ✅ Get messages
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timeAgo: timeAgo(data.timestamp?.seconds || Date.now() / 1000),
        };
      });
      setMessages(updatedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Scroll to last message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        message: newMessage,
        timestamp: serverTimestamp(),
        userId: myUserId,
        userImage: userImage || "",
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const messagecard = messages.map((msg, index) => {
    const isMine = msg.userId === myUserId;
    const isLast = index === messages.length - 1;

    return (
      <div
        className={isMine ? "ismine onemessage" : "onemessage"}
        key={msg.id}
        ref={isLast ? lastMessageRef : null}
      >
        {!isMine && (
          <img
            src={msg.userImage}
            alt="User"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              marginLeft: "8px",
            }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="message-detalis">
            <p>{msg.message}</p>
          </div>
          <small>{msg.timeAgo}</small>
        </div>
      </div>
    );
  });

  return (
    <div className="message-page">
      <div className="messagepageheader">

      
        <h2>Moms' Corner</h2>
        <span onClick={()=> nav("/Members")}><MdGroups />
          <p className="onlineicon"></p>
        </span>
        
        </div>
      {/* ✅ Chat Messages Section */}
      <div className="chatareapage">
        {loading ? (
          <div className="loader">جارٍ تحميل الرسائل...</div>
        ) : messages.length > 0 ? (
          messagecard
        ) : (
          <p className="nomessages">No messages in this group yet. Start the conversation 💬</p>
        )}
      </div>

      {/* ✅ Input Section */}
      <div className="WriteMessage-messagepage">
        <input
          type="text"
          placeholder="Write a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="optionssend">
          <div
            className="emoji-picker-btn"
            style={{ marginLeft: 0, fontSize: 20 }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaRegSmile />
          </div>
          <div className="sendmeesage">
            <span onClick={sendMessage}>
              <FiSend />
            </span>
          </div>
        </div>
      </div>

      {showEmojiPicker && (
        <div className="emoji-picker-popup">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            locale="en"
            previewPosition="none"
          />
        </div>
      )}
    </div>
  );
}

