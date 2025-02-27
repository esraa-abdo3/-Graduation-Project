
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Auth/Signup'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import ConfirmEmail from './pages/Auth/ConfirmEmail'
import Login from './pages/Auth/Login/Login'
import ForgetPass from './pages/Auth/ForgetPassword/ForgetPass'
import ConfirmPass from './pages/Auth/ConfirmPass/ConfirmPass'
import SetNewPass from './pages/Auth/SetNewPass/SetNewPass'
import Reminders from './pages/reminder'
import RequierAuth from './pages/Auth/RequireAuth'
import Mainprofile from './pages/mamyprofile/Mainprofile'
import Mybabies from './pages/mamyprofile/my babies/Mybabies'
import NameBaby from './pages/mamyprofile/NameBaby/NameBaby'
import Babydetails from './pages/mamyprofile/my babies/updatebaby'
// import Mybabies from './pages/mamyprofile/my babies/Mybabies'
import AddMedicine from './pages/mamyprofile/reminders/Addmedicine/Addmedicine'
import MedicinePage from './pages/mamyprofile/reminders/MedicinePage/MedicinePage'
import Myaccount from './pages/mamyprofile/Myaccount/Myacoount'
import Updatemedicine from './pages/mamyprofile/reminders/Addmedicine/Updatemedicine'
import { useEffect, } from 'react'
import { generatetoken  , messaging} from './Notification/firebase-config'
import { onMessage } from 'firebase/messaging'
// import Cookies from 'universal-cookie';
// import axios from 'axios'
import ProfileNav from './Componets/profilenav/ProfileNav'
import Vaccines from './pages/mamyprofile/vaccine/Vaccines'
import { BabyProvider } from "./context/BabyContext";
import Mainhome from './pages/mamyprofile/Mainhome/Mainhome'
import GrowthBaby from './pages/mamyprofile/GrowthBaby/GrowthBaby'
import MamyTips from './pages/mamyprofile/MamyTips/MamyTips'
import Dashboard from './Dashboard/pages/Dashboard'
import Allusers from './Dashboard/pages/Allusers/AllUsers'
import TipDetalis from './pages/mamyprofile/MamyTips/TipDetalis'
import Videos from './pages/mamyprofile/Entertainment/videos/videos'


function App() {
  if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
      console.log('Service Worker registered:', registration);
  
      // تحقق من حالة التفعيل
      if (registration.active) {
          console.log('Service Worker is active');
        generatetoken();

      } else {
          registration.addEventListener('statechange', (event) => {
              if (event.target.state === 'activated') {
                  console.log('Service Worker is activated');
                generatetoken(); // استدعاء التوكن بعد التفعيل
              
              }
          });
      }
  }).catch((error) => {
      console.error('Service Worker registration failed:', error);
  });
  
  }
  
  // const cookie = new Cookies();
  // const gettoken = cookie.get('Bearer');
  // const[allnotification,setallnotication]=useState(null)


  useEffect(() => {
    generatetoken()
    onMessage(messaging, (payload) => {
      console.log(payload)
      
    })
    
  }, [])
  
  // to get the notfication
  // useEffect(() => {
   

  //   async function getallnotication() {
  //     try {
  //       let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
  //         headers: {
  //           Authorization:`${gettoken}`
  //         }
          
  //       })
  //       setallnotication(res.data.data)
        
        
  //     }
  //     catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getallnotication()
  // }, [gettoken])
  // console.log(allnotification)


  return (
    <>
          <BabyProvider>
      <Routes>
        <Route path='/' element={<Home />} />
    

       
    
        <Route path='/Auth' element={<Auth />}>
          <Route path='Signup' element={<Signup />} />
          <Route path='Confirmemail' element={<ConfirmEmail />} />
          <Route path ='Login' element={<Login />} />
          <Route path='ForgetPassword' element={<ForgetPass />} />
          <Route path='ConfirmPassword' element={<ConfirmPass />} />
          <Route path='SetNewPass' element={<SetNewPass />} />
        
        </Route>
  
          <Route path='mainhome' element={<Mainhome />}></Route>
          <Route path=":idbaby" element={<>  <Babydetails /> </>} />
          <Route path="/NameBaby" element={<>  <NameBaby /> </>} />
          <Route path="/reminders" element={<>   <MedicinePage /> </>} />
          <Route path='/medicine/:scheduleIdd' element={<>  <Updatemedicine /></>} />
          <Route path='/vaccines/:nameid' element={<Vaccines />} />
          <Route path='/addmedicine' element={ <> <AddMedicine/></>}></Route>
          <Route path='/growthBaby' element={<GrowthBaby />} />
          <Route path='/MamyTips' element={<MamyTips />}></Route>
          <Route  path="/MamyTips/:tipid" element={<TipDetalis/>}></Route>
          <Route path='/Videos' element={<Videos />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}>
            <Route path='Allusers' element={<Allusers />}></Route>
            
          </Route>
       
        </Routes>
        </BabyProvider>
    </>
  )
}

export default App;


