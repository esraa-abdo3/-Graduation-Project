import React, { useState } from 'react';
import './ChatBot.css';
import { Link } from 'react-router-dom';

export default function ChatBot() {
    const [age, setAge] = useState("");
    const [language, setLanguage] = useState("en");

    
  return (
    <div className='chatBotContent'>
      <div className="bot-text">
        <h2>Hey Mama, I'm your baby care assistant!</h2>
        <p>Tell me your baby’s age and let’s figure things out together</p>
        
        <div className="bot-container">
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bot-select"
        >
          <option value="">Select Age</option>
          {[...Array(24).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {month + 1} {month + 1 === 1 ? "Month" : "Months"}
            </option>
          ))}
        </select>
      

      
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bot-select"
        >
          <option value="ar">Arabic</option>
          <option value="en">English</option>
        </select>

      </div>
        <button
        onClick={() => {
            localStorage.setItem("babyAge", age);
            localStorage.setItem("language", language);
        }}
        ><Link style={{color:"white",textDecorationLine:'none'}} to='/ChatBot/Chat'>Start Now </Link> </button>
      </div>
    </div>
  );
}
