import { useState, useRef , useEffect} from "react";
import PropTypes from 'prop-types';
import Cookies from "universal-cookie";
import axios from "axios";
import chatimg from "../../../../assets/smartchatbot.png";
import "./Chatbox.css";
import { FiSend } from "react-icons/fi";
import chatbotimg from "../../../../assets/chatbotbackground2.png"
import userimg from "../../../../assets/mamyprofile.png"

export default function ChatBox({ setupDone, setSetupDone }) {
  const cookie = new Cookies();
  const Bearer = cookie.get("Bearer");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([

  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const[error,seterror]=useState("")
  const endOfMessagesRef = useRef(null);
 


  useEffect(() => {
    if (!setupDone) {
      setChatHistory([]);
    }
  }, [setupDone]);


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

  setSetupDone(true);

  try {
    // 1. Fetch previous chat history
    const historyRes = await axios.get('https://carenest-serverside.vercel.app/chatbot?page=1&limit=20', {
      headers: {
        Authorization: `${Bearer}`,
        "Content-Type": "application/json"
      }
    });

    let formattedHistory = [];

    if (historyRes.data?.chats?.length > 0) {
      const lastTwoChats = historyRes.data.chats.slice(-2);
      formattedHistory = lastTwoChats.reduce((acc, chat) => {
        if (chat.current_question) acc.push({ type: 'bot', question: chat.current_question });
        if (chat.answer) acc.push({ type: 'user', answer: chat.answer });
        if (chat.advice) acc.push({ type: 'bot', advice: chat.advice });
        return acc;
      }, []);
    }

    // 2. Show old messages first
    setChatHistory(formattedHistory);

    // ⬇️ Scroll to bottom after rendering old messages
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // slight delay to ensure messages rendered

    // 3. Wait before showing typing...
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', advice: 'typing...', isTyping: true }]);
      setIsTyping(true);

      // 4. After 4 sec fetch question
      setTimeout(async () => {
        try {
          const payload = {
            age: parseInt(age),
            language
          };

          const res = await axios.post("/chat-api/chat", payload, {
            headers: {
              Authorization: `${Bearer}`,
              "Content-Type": "application/json"
            }
          });

          const question = res.data?.question || res.data?.chat?.current_question;

          if (question) {
            setCurrentQuestion(question);

            // Save in DB
            const savePayload = {
              age: parseInt(age),
              language,
              current_question: question
            };

            axios.post("https://carenest-serverside.vercel.app/chatbot", savePayload, {
              headers: {
                Authorization: `${Bearer}`,
                "Content-Type": "application/json"
              }
            }).catch(err => console.error("Save failed:", err));

            // Replace typing with question
            setChatHistory(prev => {
              const filtered = prev.filter((msg) => !msg.isTyping);
              return [...filtered, { type: 'bot', question }];
            });

            // scroll to bottom again after question appears
            setTimeout(() => {
              endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);

          } else {
            seterror("فشل بدء المحادثة. حاول مرة أخرى.");
            setChatHistory(prev => prev.filter((msg) => !msg.isTyping));
          }

        } catch (fetchError) {
          console.error("Error fetching question:", fetchError);
          seterror("فشل بدء المحادثة. حاول مرة أخرى.");
          setChatHistory(prev => prev.filter((msg) => !msg.isTyping));
          setSetupDone(false);
        } finally {
          setIsTyping(false);
        }

      }, 4000);

    }, 2000); 

  } catch (error) {
    console.error("Setup error:", error);
    seterror("فشل تحميل المحادثة.");
    setSetupDone(false);
  }
};


  const sendMessage = async () => {
    if (!answer.trim()) return;

    const userAnswer = answer.trim();
    const questionBeingAnswered = currentQuestion; 

    // Update UI
    setLoading(true);
    setIsTyping(true);
    setChatHistory(prev => [
      ...prev,
      { type: "user", answer: userAnswer },
      { type: "bot", advice: "typing...", isTyping: true }
    ]);
    setAnswer("");

    try {
      // 1. Get AI response
      const aiResponse = await axios.post("/chat-api/chat", {
        age: Number(age),
        language,
        current_question: questionBeingAnswered,
        answer: userAnswer
      }, { headers: { Authorization: `${Bearer}`, "Content-Type": "application/json" } });

      const { advice, next_question } = aiResponse.data;

      // 2. Save the complete interaction
      const savePayload = {
        age: Number(age),
        language,
        current_question: questionBeingAnswered,
        answer: userAnswer,
        advice: advice,
        next_question: next_question
      };
      
      Object.keys(savePayload).forEach(key => (savePayload[key] === undefined || savePayload[key] === null) && delete savePayload[key]);

      await axios.post("https://carenest-serverside.vercel.app/chatbot", savePayload, {
        headers: { Authorization: `${Bearer}`, "Content-Type": "application/json" }
      });

      // 3. Update UI with AI response
      setChatHistory(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return advice ? [...filtered, { type: 'bot', advice }] : filtered;
      });

      if (next_question) {
        // Wait a moment after showing the advice
        setTimeout(() => {
          // Show typing indicator for the next question
          setChatHistory(prev => [...prev, { type: "bot", advice: "typing...", isTyping: true }]);
          
          // Wait while "typing"
          setTimeout(() => {
            setChatHistory(prev => {
              const filtered = prev.filter(msg => !msg.isTyping);
              return [...filtered, { type: 'bot', question: next_question }];
            });
            setCurrentQuestion(next_question);
            setIsTyping(false);
            setLoading(false);
          }, 1500); // Typing duration
        }, 1000); // Delay after advice
      } else {
        setCurrentQuestion("");
        setIsTyping(false);
        setLoading(false);
      }

    } catch (error) {
      console.error("Error in sendMessage:", error);
      setChatHistory(prev => prev.filter(msg => !msg.isTyping));
      setIsTyping(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <div className="Chatbox">
      <div className="chat-container">
        <div className="header"><h3>BabyBot</h3></div>
        {/* <div className="chatArea">
          {chatHistory.map((item, i) => (
            <div key={i} className={`message-wrapper ${item.type === "user" ? "user-msg" : "bot-msg"}`}>
              <div className={`messagecard ${item.type === "user" ? "ownpos" : ""}`}>
                {item.type === "user" && (
                  <div className="message-container user">
                    <div className="messagecontent own">
                      <span>{item.answer}</span>
                    </div>
                    <img src={userimg} alt="user" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  </div>
                )}
                {item.type === "bot" && !item.isTyping && (
                  <div className="message-container bot">
                    <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                    <div className="messagecontent bot">
                      <span>{item.advice || item.question || ""}</span>
                    </div>
                  </div>
                )}
                {item.type === "bot" && item.isTyping && (
                  <div className="message-container bot">
                    <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                    <div className="messagecontent bot">
                      <span className="typing-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div> */}
        <div className="chatArea">

  {/* Loading placeholder before real messages show */}
  {chatHistory.length === 0 && isTyping && (
    <div className="loading-placeholder">
      {[...Array(2)].map((_, idx) => (
        <div key={idx}>
          {/* 3 رسائل من البوت */}
          {[...Array(3)].map((_, i) => (
            <div className="message-wrapper bot-msg" key={`bot-${idx}-${i}`}>
              <div className="messagecard">
                <div className="message-container bot">
                  <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  <div className="messagecontent bot meesage-loading" >
                    <div className="card-story-loading" style={{ width: "150px", height: "18px", margin: "4px 0" }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* رسالة من المستخدم (الأم) */}
          <div className="message-wrapper user-msg">
            <div className="messagecard ownpos">
              <div className="message-container user">
                <div className="messagecontent own meesage-loading " style={{backgroundColor:chatHistory.length===0 && isTyping && "transparent "}}>
                  <div className="card-story-loading" style={{ width: "120px", height: "18px", margin: "4px 0" }}></div>
                </div>
                <img src={userimg} alt="user" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Actual chat messages */}
  {chatHistory.map((item, i) => (
    <div key={i} className={`message-wrapper ${item.type === "user" ? "user-msg" : "bot-msg"}`}>
      <div className={`messagecard ${item.type === "user" ? "ownpos" : ""}`}>
        {item.type === "user" && (
          <div className="message-container user">
            <div className="messagecontent own">
              <span style={{color:"white"}}>{item.answer}</span>
            </div>
            <img src={userimg} alt="user" style={{ width: 28, height: 28, borderRadius: '50%' }} />
          </div>
        )}
        {item.type === "bot" && !item.isTyping && (
          <div className="message-container bot">
            <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            <div className="messagecontent bot">
              <span>{item.advice || item.question || ""}</span>
            </div>
          </div>
        )}
        {item.type === "bot" && item.isTyping && (
          <div className="message-container bot">
            <img src={chatimg} alt="chatbot" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            <div className="messagecontent bot">
              <span className="typing-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}

  <div ref={endOfMessagesRef} />
</div>

        <div className="writeMessage">
          {!setupDone ? (
            <div className="startbox">
              <div>        <h2>Hello mum<br>
              
              </br>I&apos;m Nunu!</h2>
              <p>Here to make baby care easier
      </p></div>
      
              <img src={chatbotimg} alt="" />
              
              <form className="chatbotform" onSubmit={handleSetup}>
                <div style={{display:"flex" , gap:'10px', width:"100%"}}>

                
                  <select value={age} onChange={e => setAge(e.target.value)} required style={{flex:1}}>
                    <option value="">Month</option>
                    {[...Array(13)].map((_,i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <select value={language} onChange={e => setLanguage(e.target.value)} required style={{flex:1}}>
                    <option value="">language</option>
                    <option value="ar">عربي</option>
                    <option value="en">English</option>
                  </select>
                    </div>
                  <button type="submit" className="sendicon" disabled={!age || !language}>
                    Start
                  </button>
              </form>
                {error.length > 0 && (
                  <p className="errorschatbot">{error}</p>
                )}
            
            </div>
          ) : (
            <>
              <div className="responseinput">
                <input
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  style={{ flex: 1, marginRight: 8 }}
                  disabled={loading || isTyping}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && answer.trim() && !loading && !isTyping) sendMessage();
                  }}
                />
                <FiSend className="sendicon" onClick={sendMessage}
                  disabled={loading || isTyping || !answer.trim()} />
              </div>
            </>
          )}
        </div>
        {error.length > 0 && (
          <p className="errorschatbot" style={{marginTop:"50px"}}> { error}</p>
        )}
      </div>
    </div>
  );
}

ChatBox.propTypes = {
  setupDone: PropTypes.bool.isRequired,
  setSetupDone: PropTypes.func.isRequired,
};

export function ChatBotButton() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [setupDone, setSetupDone] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimate(true);
    } else {
      // Reset setupDone when the chat is closed
      setSetupDone(false);
    }
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
            <button 
              className={`chatbot-close ${!setupDone ? 'initial' : 'chatting'}`} 
              onClick={handleClose}
            >
              &times;
            </button>
            <ChatBox setupDone={setupDone} setSetupDone={setSetupDone} />
          </div>
        </div>
      )}
    </>
  );
}











