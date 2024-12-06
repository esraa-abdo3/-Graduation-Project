
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./firebase-messaging-sw.js', { type: 'module' })
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((err) => {
//       console.log('Service Worker registration failed:', err);
//     });
// }


