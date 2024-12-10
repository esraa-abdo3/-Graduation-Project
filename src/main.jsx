
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { BrowserRouter as BrowserRouter } from 'react-router-dom';
// import { BabyProvider } from './context/activebaby.jsx'; // استيراد الـ Provider



// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; 


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
 
);



