import { useState } from 'react';
import './FAQ.css';
import Footer from "../Componets/Footer/Footer"
import Mainnavbar from "../Componets/mainhomeprofile/Mainnavbar"
import Navbar from "../Componets/Navbar/Navbar"
import Cookies from "universal-cookie";

const faqs = [
  {
    question: "1. What is this app about?",
    answer: "This app helps mothers care for their newborn babies by understanding their needs, tracking their health, and providing useful tools and guidance."
  },
  {
    question: "2. How does the baby cry analyzer work?",
    answer: "The app analyzes your baby's cry and identifies the reason from five types: (Hunger, Discomfort, Burping, Tiredness, and belly pain)."
  },
  {
    question: "3. Can I track my baby's health and growth?",
    answer: "Yes, you can monitor vaccinations, medications, and receive reminders, as well as record and track your baby's weekly weight and height updates."
  },
  {
    question: "4. Can I find doctors and hospitals nearby?",
    answer: "Yes, the app shows nearby pediatricians and children's hospitals, and you can book appointments directly through the app."
  },
  {
    question: "5. What extra features does the app provide?",
    answer: "We offer relaxing music, bedtime stories, daily tips for mothers, and a group chat for moms to share experiences and support each other."
  },
  {
    question: "6. Is the app free to use?",
    answer: "Basic features are free. Some premium features may require a subscription (optional)."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = idx => setOpenIndex(openIndex === idx ? -1 : idx);
     const cookie = new Cookies();
      const gettoken = cookie.get("Bearer");

  return (
    <>
     {gettoken ?   <Mainnavbar /> :<Navbar />}
      <div className="faq-page">
      <div className="faq-left">
        <h1>Any questions?<br/>We got you.</h1>
        <p className="faq-intro">
          If you have any questions about CareNest, you'll find the answers here. If you need more help, feel free to contact us!
        </p>
        
      </div>
      <div className="faq-right">
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div className="faq-question" onClick={() => toggle(idx)}>
                <span>{faq.question}</span>
                <span className="faq-toggle">{openIndex === idx ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer${openIndex === idx ? ' open' : ''}`}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer/>
    
    </>
    
  );
} 