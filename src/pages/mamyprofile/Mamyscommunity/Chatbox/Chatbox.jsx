import { useState, useRef , useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import chatimg from "../../../../assets/smartchatbot.png";
import userAvatar from "../../../../assets/default_avatar.gif";
import "./Chatbox.css";
import { FiSend } from "react-icons/fi";

export default function ChatBox() {
  const cookie = new Cookies();
  const Bearer = cookie.get("Bearer");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("");
  console.log(age);
  console.log(language)
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [advice, setAdvice] = useState("");
  const [chatHistory, setChatHistory] = useState([

  ]);
  const [loading, setLoading] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const[error,seterror]=useState("")
  const endOfMessagesRef = useRef(null);

  // const handleSetup = async (e) => {
  //   e.preventDefault();
    

  //   if (age < 0 || age > 12) {
  //     seterror("Age must be between 0 and 12");
  //     return;
  //   }

  //   if (language !== "ar" && language !== "en") {
  //     seterror("Language must be either Arabic (ar) or English (en)");
  //     return;
  //   }

  //   const Bearer = cookie.get("Bearer");
  //   try {
  //     const res = await axios.post(
  //       "https://carenest-serverside.vercel.app/chatbot",
  //       {
  //         age: parseInt(age),
  //         language,
  //         ...(currentQuestion && { current_question: currentQuestion }),
  //         ...(answer && { answer }),
  //         ...(Object.keys(answers).length > 0 && { answers }),
  //         ...(advice && { advice })
  //       },
  //       {
  //         headers: {
  //           Authorization: Bearer,
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     console.log(res);
  //     setTimeout(() => {
  //       setChatHistory((prev) => {
  //         const newHistory = [...prev];
  //         newHistory[0] = {
  //           ...newHistory[0],
  //           advice: res.data.advice,
  //         };
  //         return newHistory;
  //       });
  //     }, 1000);
  //     setSetupDone(true);
  //   } catch (error) {
  //     console.error("Error setting up chat:", error);
  //     seterror("Failed to setup chat. Please try again.");
  //   }
  // };
const handleSetup = async (e) => {
  e.preventDefault();

  if (age < 0 || age > 12) {
    seterror("Age must be between 0 and 12");
    return;
  }

  if (language !== "ar" && language !== "en") {
    seterror("Language must be either Arabic (ar) or English (en)");
    return;
  }
  const payload = {
    age: parseInt(age),
    language
  };
    console.log("Data being sent to API:", payload); 
  try {
    const res = await axios.post(
      "https://child-amd9ewetewc6aygz.polandcentral-01.azurewebsites.net/chat",
        payload,
      {
        headers: {
          Authorization: `${Bearer}`,
          "Content-Type": "application/json"
        }
      }
    );
console.log(res)
    const question = res.data?.chat?.current_question;
    if (question) {
      setCurrentQuestion(question);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          question: question
        }
      ]);
    } else {
      seterror("فشل بدء المحادثة. حاول مرة أخرى.");
    }

    setSetupDone(true);
  } catch (error) {
     setSetupDone(false);
    console.error("Error setting up chat:", error);
    seterror("فشل بدء المحادثة. حاول مرة أخرى.");
  }
};

  // const sendMessage = async () => {
  //   if (!answer.trim()) return;
  //   setLoading(true);
  //   setChatHistory((prev) => [
  //     ...prev,
  //     {
  //       type: "user",
  //       question: currentQuestion,
  //       answer,
  //     }
  //   ]);
  //   setIsTyping(true);
  //   setChatHistory((prev) => [
  //     ...prev,
  //     { type: "bot", advice: "typing...", isTyping: true }
  //   ]);
  //   setCurrentQuestion("");
  //   setAnswer("");
  //   try {
  //     const res = await axios.post(
  //       "https://carenest-serverside.vercel.app/chatbot",
  //       {
  //         age: Number(age),
  //         language,
  //         current_question: currentQuestion,
  //         answer,
  //       },
  //       {
  //         headers: {
  //           Authorization: Bearer,
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  //     console.log(res)
  //     setTimeout(() => {
  //       setChatHistory((prev) => {
  //         const filtered = prev.filter((msg) => !msg.isTyping);
  //         return [
  //           ...filtered,
  //           {
  //             type: "bot",
  //             advice: res.data?.chat?.advice || ""
  //           }
  //         ];
  //       });
  //       setIsTyping(false);
  //     }, 900);
  //   } catch (err) {
  //     alert("حدث خطأ أثناء إرسال الرسالة!");
  //     setIsTyping(false);
  //   }
  //   setLoading(false);
  // };
const sendMessage = async () => {
  if (!answer.trim()) return;

  setLoading(true);
  setIsTyping(true);

  
  setChatHistory((prev) => [
    ...prev,
    {
      type: "user",
      question: currentQuestion,
      answer,
    },
    {
      type: "bot",
      advice: "typing...",
      isTyping: true
    }
  ]);

  try {
    const res = await axios.post(
      "https://carenest-serverside.vercel.app/chatbot",
      {
        age: Number(age),
        language,
        current_question: currentQuestion,
        answer
      },
      {
        headers: {
          Authorization: Bearer,
          "Content-Type": "application/json"
        }
      }
    );

    const { chat } = res.data;

    // حذف "typing..." ثم إضافة الرد الجديد
    setTimeout(() => {
      setChatHistory((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping);
        const newMessages = [];

        if (chat.advice) {
          newMessages.push({
            type: "bot",
            advice: chat.advice
          });
        }

        if (chat.current_question) {
          newMessages.push({
            type: "bot",
            advice: chat.current_question
          });
          setCurrentQuestion(chat.current_question);
        } else {
          setCurrentQuestion("");
        }

        return [...filtered, ...newMessages];
      });

      setIsTyping(false);
    }, 1000);
  } catch (err) {
    console.error("Error sending message:", err);
    alert("حدث خطأ أثناء إرسال الرسالة!");
    setIsTyping(false);
  }

  setAnswer("");
  setLoading(false);
};

  return (
    <div className="Chatbox">
      <div className="header"><h3>BabyBot</h3></div>
      <div className="chatArea">
        {chatHistory.map((item, i) => (
          <div key={i} className={`message-wrapper ${item.type === "user" ? "user-msg" : "bot-msg"}`}>
            <div className={`messagecard ${item.type === "user" ? "ownpos" : ""}`}>
              {item.type === "user" && (
                <div className="messagecontent own">
                  <span style={{display:'flex',alignItems:'center',gap:8,justifyContent:'flex-end'}}>
                    <span style={{flex:1}}>
                      <b>سؤال:</b> {item.question}<br/>
                      <b>إجابتك:</b> {item.answer}
                    </span>
                    <img src={userAvatar} alt="user" style={{width:28, height:28, borderRadius:'50%'}} />
                  </span>
                </div>
              )}
              {item.type === "bot" && !item.isTyping && (
                <div className="messagecontent bot">
                  <span style={{display:'flex',alignItems:'center',gap:8}}>
                    <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                    {!setSetupDone ?(
                      <span> Hi there! How can I help you today?</span>
                    ):  <span> {item.question}</span>
                  }
                  
                  </span>
                </div>
              )}
              {item.isTyping && (
                <div className="messagecontent bot">
                  <span style={{display:'flex',alignItems:'center',gap:8}}>
                    <img src={chatimg} alt="chatbot" style={{width:28, height:28, borderRadius:'50%'}} />
                    <span className="typing-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="writeMessage">
        {!setupDone ? (
          <>
            <div className="startbox">

           
            <form  className="chatbotform" onSubmit={handleSetup}>
            <select value={age} onChange={e => setAge(e.target.value)} required style={{flex:1}}>
              <option value="">Month</option>
              {[...Array(13)].map((_,i) => <option key={i} value={i}>{i}</option>)}
            </select>
            <select value={language} onChange={e => setLanguage(e.target.value)} required style={{flex:1}}>
              <option value="">language</option>
              <option value="ar">عربي</option>
              <option value="en">English</option>
            </select>
      
              </form>
              {error.length > 0 && (
                <p className="errorschatbot"> { error}</p>
              )}
              <button type="submit" className="setup-btn" style={{ minWidth: 90 }} onClick={handleSetup}>start</button>
               </div>
          </>
   
        ) : (
            <>
              <div className="responseinput">
            <input
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
    
              style={{ flex: 1, marginRight: 8 }}
              disabled={loading || isTyping}
              onKeyDown={e => {
                if (e.key === 'Enter' && answer.trim() && !loading && !isTyping) sendMessage();
              }}
            />
          
           
         
              <FiSend  className="sendicon" onClick={sendMessage}
              disabled={loading || isTyping || !answer.trim()} />
              </div>
       
          </>
        )}
      </div>
                {error.length > 0 && (
                <p className="errorschatbot" style={{marginTop:"50px"}}> { error}</p>
              )}
    </div>
  );
}

export function ChatBotButton() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) setAnimate(true);
  }, [open]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setOpen(false), 350);
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
      >
        <img
          src={chatimg}
          alt="chatbot"
          style={{ width: 48, height: 48 }}
        />
      </button>
      {open && (
        <div className={`chatbot-popup ${animate ? "chatbot-popup-open" : "chatbot-popup-close"}`}>
          <div className="chatbot-popup-inner">
            <button className="chatbot-close" onClick={handleClose}>&times;</button>
            <ChatBox />
          </div>
        </div>
      )}
    </>
  );
}











