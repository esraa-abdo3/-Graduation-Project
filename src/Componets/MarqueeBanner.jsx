
// import "./MarqueeBanner.css";

// const messages = {
//   en: [
//     "Download the Cry Analyzer app now completely free and enjoy accurate baby cry analysis anytime, anywhere with just a few taps!",
//     "Find the nearest pediatric doctor or hospital in seconds and book your visit easily through the app — no phone calls needed!",
//     "Use the discount code: HEY10 on your first order and enjoy exclusive offers specially made for moms like you!",
//     "Ask anything you want! Our friendly AI chatbot is here 24/7 to support you with expert answers about your baby’s health and care",
//     "Join our growing mom community — share your experiences, get support, and connect with other moms who truly understand your journey.",
//   ],
//   ar: [
//     "حمّلي تطبيق كراي أنلايزز الآن مجانًا، واستمتعي بتحليل بكاء طفلك بدقة وسهولة في أي وقت ومن أي مكان!",
//     "استخدمي كود الخصم: HEY10 على أول طلب ليكي، ووفّري فلوسك واستفيدي من أقوى عروضنا المخصصة للأمهات",
//     "دلوقتي تقدري تلاقي أقرب دكتور أطفال حواليكي في ثواني، وتحجزي موعد بسهولة ومن غير أي مجهود",
//     "استمتعي بأقوى الخصومات والعروض الخاصة على خدمات الأمهات والرضع، عشان نكون دايمًا معاكي خطوة بخطوة",
//   ],
// };

// export default function MarqueeBanner({ language = "en" }) {
//   // كرري الرسائل مرتين لملء المساحة بسلاسة
// const repeatedMessages = [];
// for (let i = 0; i < 4; i++) {
//   repeatedMessages.push(...messages[language]);
// }


//   return (
//     <div className={`marquee-container ${language === "ar" ? "rtl" : ""}`}>
//       <div className="marquee-track">
//         {repeatedMessages.map((msg, idx) => (
//           <span key={idx} className="marquee-message">
//             {msg}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
import "./MarqueeBanner.css";

const messages = {
  en: [
    "Download the Cry Analyzer app now completely free and enjoy accurate baby cry analysis anytime, anywhere with just a few taps!",
    "Find the nearest pediatric doctor or hospital in seconds and book your visit easily through the app — no phone calls needed!",
    "Benefit from special offers and discounts when booking appointments with pediatricians and healthcare professionals via CareNest!",
    "Ask anything you want! Our friendly AI chatbot is here 24/7 to support you with expert answers about your baby’s health and care.",
    "Join our growing mom community — share your experiences, get support, and connect with other moms who truly understand your journey.",
  ],
  ar: [
    "حمّلي تطبيق كراي أنلايزز الآن مجانًا، واستمتعي بتحليل بكاء طفلك بدقة وسهولة في أي وقت ومن أي مكان!",
    "استخدمي كود الخصم: HEY10 على أول طلب ليكي، ووفّري فلوسك واستفيدي من أقوى عروضنا المخصصة للأمهات",
    "دلوقتي تقدري تلاقي أقرب دكتور أطفال حواليكي في ثواني، وتحجزي موعد بسهولة ومن غير أي مجهود",
    "استمتعي بأقوى الخصومات والعروض الخاصة على خدمات الأمهات والرضع، عشان نكون دايمًا معاكي خطوة بخطوة",
  ],
};

export default function MarqueeBanner({ language = "en" }) {
  const items = messages[language];

  return (
    <div className={`marquee-container ${language === "ar" ? "rtl" : ""}`}>
      <div className="marquee-track">
        {[...items, ...items].map((msg, idx) => (
          <span key={idx} className="marquee-message">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
