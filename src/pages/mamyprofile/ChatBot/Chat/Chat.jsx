import React, { useEffect, useState } from 'react'
import './Chat.css'
import axios from 'axios';
import imgbot from '../../../../assets/bot.jpeg'

export default function Chat() {
  const age = localStorage.getItem('babyAge');
  const language = localStorage.getItem('language');

  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [firstQ,setFirstQ] = useState('');
  const [loading ,setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    const startChat = async () => {
      try {
        const res = await axios.post('https://child-amd9ewetewc6aygz.polandcentral-01.azurewebsites.net/chat', {
          age: Number(age),
          language: language
        });

        
        setCurrentQuestion(res.data.question);
        setFirstQ(res.data.question)
        console.log('start',firstQ);
      } catch (err) {
        console.log('Error starting chat:', err);
      }
    };

    startChat();
  }, [age, language]);

  const sendData = async () => {
  if (!currentAnswer) return;

  const userResponse = currentAnswer;
  setCurrentAnswer(""); 
  setLoading(true);

  
  setChatHistory(prev => [
    ...prev,
    {
      userAnswer: userResponse,
      advice: null,
      nextQuestion: null
    }
  ]);

  try {
    const res = await axios.post('https://child-amd9ewetewc6aygz.polandcentral-01.azurewebsites.net/chat', {
      age: Number(age),
      language: language,
      current_question: currentQuestion,
      answer: userResponse
    });

    setLoading(false);

    
    setIsTyping(true);
    setTimeout(() => {
      setChatHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1].advice = res.data.advice;
        return updated;
      });

   
      setTimeout(() => {
        setChatHistory(prev => {
          const updated = [...prev];
          updated[updated.length - 1].nextQuestion = res.data.next_question;
          return updated;
        });

        setCurrentQuestion(res.data.next_question);
        setIsTyping(false);
      }, 1500); 

    }, 1500); 

  } catch (err) {
    console.log('Error sending answer:', err);
    setLoading(false);
    setIsTyping(false);
  }
};


  return (
    <div className='chatBotContent2'>
    <div className='ChatPage'>
        <h2>Baby Assistant Chat</h2>
        <div className="chat-history">
          <div className='imTex'>
            <img src={imgbot} alt="imgbot" />
            <div className="chat-item bot">{firstQ}</div>
          </div>
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-group">
              {chat.userAnswer && <div className="chat-item user">{chat.userAnswer}</div>}

              {chat.advice && (
                <div className='imTex'>
                  <img src={imgbot} alt="imgbot" />
                  <div className="chat-item bot">{chat.advice}</div>
                </div>
              )}

              {chat.nextQuestion && (
                <div className='imTex'>
                  <img src={imgbot} alt="imgbot" />
                  <div className="chat-item bot">{chat.nextQuestion}</div>
                </div>
              )}
            </div>
          ))}


          {isTyping && (
          <div className="imTex">
              <img src={imgbot} alt="imgbot" />
              <div className="chat-item bot typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
              </div>
          </div>
          )}
        </div>
        {currentQuestion && (
        <div className="chat-current">
          
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer..."
          />
          <button onClick={sendData} disabled={loading}><i className="fa-solid fa-paper-plane"></i></button>
        </div>
      )}

      
    </div>
    </div>
  );
}
