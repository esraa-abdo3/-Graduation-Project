// import { Navigate, Route, Routes } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';

// import './App.css'
// import Signup from './pages/Auth/Signup'
// import Auth from './pages/Auth/Auth'
// import Home from './pages/Home/Home'
// import ConfirmEmail from './pages/Auth/ConfirmEmail'
// import Login from './pages/Auth/Login/Login'
// import ForgetPass from './pages/Auth/ForgetPassword/ForgetPass'
// import ConfirmPass from './pages/Auth/ConfirmPass/ConfirmPass'
// import SetNewPass from './pages/Auth/SetNewPass/SetNewPass'
// import Reminders from './pages/reminder'
// import RequierAuth from './pages/Auth/RequireAuth'
// import Mainprofile from './pages/mamyprofile/Mainprofile'
// import Mybabies from './pages/mamyprofile/my babies/Mybabies'
// import NameBaby from './pages/mamyprofile/NameBaby/NameBaby'
// import Babydetails from './pages/mamyprofile/my babies/updatebaby'
// import AddMedicine from './pages/mamyprofile/reminders/Addmedicine/Addmedicine'
// import MedicinePage from './pages/mamyprofile/reminders/MedicinePage/MedicinePage'
// import Updatemedicine from './pages/mamyprofile/reminders/Addmedicine/Updatemedicine'
// import { useEffect, } from 'react'
// import { generatetoken  , messaging} from './Notification/firebase-config'
// import { onMessage } from 'firebase/messaging'
// import Vaccines from './pages/mamyprofile/vaccine/Vaccines'
// import { BabyProvider } from "./context/BabyContext";
// import Mainhome from './pages/mamyprofile/Mainhome/Mainhome'
// import GrowthBaby from './pages/mamyprofile/GrowthBaby/GrowthBaby'
// import MamyTips from './pages/mamyprofile/MamyTips/MamyTips'
// import Dashboard from './Dashboard/pages/Dashboard'
// import Allusers from './Dashboard/pages/Allusers/AllUsers'
// import TipDetalis from './pages/mamyprofile/MamyTips/TipDetalis'
// import Videos from './pages/mamyprofile/EnterTemint/Videos/Videos'
// import SleepMusic from './pages/mamyprofile/EnterTemint/SleepMusic/SleepMusic'
// import Babystory from './pages/mamyprofile/EnterTemint/babystory/Babyatory'
// import StoryDetalis from './pages/mamyprofile/EnterTemint/babystory/StoryDetalis'
// import EnterTiemnt from './pages/mamyprofile/EnterTemint/EnterTemints'
// import CarenestTips from './Dashboard/pages/Tips/AllTips'
// import AddTip from './Dashboard/pages/Tips/AddTip/AddTip'
// import NearDoctors from './pages/mamyprofile/Doctors/NearDoctors/NearDoctors'
// import NearPlaces from './pages/mamyprofile/Doctors/NearDoctors/NearPlaces'
// import AddDoctor from './Dashboard/pages/Doctors/AddDoctors/AddDoctor'
// import AllDoctors from './Dashboard/pages/Doctors/Alldoctors/AllDoctors'
// import UpdateDoctor from "./Dashboard/pages/Doctors/UpdateDoctors/UpdateDoctor"
// import ProfileDoctor from './pages/mamyprofile/Doctors/ProfileDoctor/ProfileDoctor'
// import Appointment from './pages/mamyprofile/Doctors/Appointment/Appointment'
// import Community from './pages/mamyprofile/Mamyscommunity/Community/Community'
// import Mainpage from './Dashboard/pages/Mainpage/MainPage'
// import Addpromocode from './Dashboard/pages/Mainpage/Promocode/AddPromocod/Addpromocode'
// import Babies from './Dashboard/pages/Babies/Babies'
// import Voices from './Dashboard/pages/Entertainment/Voices/Voices'
// import AddVoiceModal from './Dashboard/pages/Entertainment/Voices/AddVoiceModal'
// // import Record from './pages/mamyprofile/Community/Record'
// import VideosDash from './Dashboard/pages/Entertainment/Videos/Videos'
// import DoctorDashboard from './DoctorDashboard/DoctorDashboard';
// import ProfileDoctorDash from './DoctorDashboard/ProfileDoctor/ProfileDoctor';
// import Forbidden from './protectedRoutes/ProtectDoctorRoutes/Forbidden/Forbidden';
// import RequireDoctorRole from './protectedRoutes/ProtectDoctorRoutes/ProtectDoctorRoutes';





// function App() {
//   if ('serviceWorker' in navigator) {

//     navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
//       console.log('Service Worker registered:', registration);
  
//       // تحقق من حالة التفعيل
//       if (registration.active) {
//           console.log('Service Worker is active');
//         generatetoken();

//       } else {
//           registration.addEventListener('statechange', (event) => {
//               if (event.target.state === 'activated') {
//                   console.log('Service Worker is activated');
//                 generatetoken(); // استدعاء التوكن بعد التفعيل
              
//               }
//           });
//       }
//   }).catch((error) => {
//       console.error('Service Worker registration failed:', error);
//   });
  
//   }
  



//   useEffect(() => {
//     generatetoken()
//     onMessage(messaging, (payload) => {
//       console.log(payload)
      
//     })
    
//   }, [])
//   const location = useLocation();
// const isDashboard = location.pathname.startsWith('/Dashboard') || location.pathname.startsWith('/DoctorDashboard');


  
//   // to get the notfication
//   // useEffect(() => {
   

//   //   async function getallnotication() {
//   //     try {
//   //       let res = await axios.get('https://carenest-serverside.vercel.app/user/notifications/all', {
//   //         headers: {
//   //           Authorization:`${gettoken}`
//   //         }
          
//   //       })
//   //       setallnotication(res.data.data)
        
        
//   //     }
//   //     catch (error) {
//   //       console.log(error)
//   //     }
//   //   }
//   //   getallnotication()
//   // }, [gettoken])
//   // console.log(allnotification)


//   return (
//     <>
//       <BabyProvider>
//         <div className={isDashboard ? "dashboard-body" : "normal-body"}>
//          <Routes>
//   {/* Public Routes */}
//   <Route path="/403" element={<Forbidden />} />
//   <Route path='/' element={<Home />} />
//   <Route path='/Auth' element={<Auth />}>
//     <Route path='Signup' element={<Signup />} />
//     <Route path='Confirmemail' element={<ConfirmEmail />} />
//     <Route path='Login' element={<Login />} />
//     <Route path='ForgetPassword' element={<ForgetPass />} />
//     <Route path='ConfirmPassword' element={<ConfirmPass />} />
//     <Route path='SetNewPass' element={<SetNewPass />} />
//   </Route>

//   {/* باقي الروتات العامة */}
//   <Route path='mainhome' element={<Mainhome />} />
//   <Route path=":idbaby" element={<Babydetails />} />
//   <Route path="/NameBaby" element={<NameBaby />} />
//   <Route path="/reminders" element={<MedicinePage />} />
//   <Route path='/medicine/:scheduleIdd' element={<Updatemedicine />} />
//   <Route path='/vaccines/:nameid' element={<Vaccines />} />
//   <Route path='/addmedicine' element={<AddMedicine />} />
//   <Route path='/growthBaby' element={<GrowthBaby />} />
//   <Route path='/MamyTips' element={<MamyTips />} />
//   <Route path="/MamyTips/:tipid" element={<TipDetalis />} />
//   <Route path='/EnterTiemnt' element={<EnterTiemnt />} />
//   <Route path='/Entertainment/SleepMusic' element={<SleepMusic />} />
//   <Route path='/babystoeies' element={<Babystory />} />
//   <Route path="/babystories/:storyid" element={<StoryDetalis />} />
//   <Route path='/Videos' element={<Videos />} />
//   <Route path='/nearPlaces' element={<NearPlaces />} />
//   <Route path='/Doctorprofile/:doctorid' element={<ProfileDoctor />} />
//   <Route path='/appointment' element={<Appointment />} />
//   <Route path='/Community' element={<Community />} />

//   {/* Dashboard Routes */}
//   <Route path='/Dashboard' element={<Dashboard />}>
//     <Route index element={<Navigate to="mainpage" replace />} />
//     <Route path="mainpage" element={<Mainpage />} />
//     <Route path='Babies' element={<Babies />} />
//     <Route path='Addpromocode' element={<Addpromocode />} />
//     <Route path='Allusers' element={<Allusers />} />
//     <Route path='CarenestTips' element={<CarenestTips />} />
//     <Route path='AddTip' element={<AddTip />} />
//     <Route path='AddDoctor' element={<AddDoctor />} />
//     <Route path='AllDoctors' element={<AllDoctors />} />
//     <Route path="/Dashboard/AllDoctors/:docid" element={<UpdateDoctor />} />
//     <Route path='/Dashboard/Entertainment/Voices' element={<Voices />} />
//     <Route path='/Dashboard/Entertainment/Voices/add' element={<AddVoiceModal />} />
//     <Route path='/Dashboard/Entertainment/Videos' element={<VideosDash />} />
//   </Route>

//   {/* ✅ Doctor Protected Routes فقط */}
// <Route element={<RequireDoctorRole />}>
//   <Route path="/DoctorDashboard" element={<DoctorDashboard/>}>
//     <Route index element={<DoctorDashboard />} />
//     <Route path="/DoctorDashboard/profile" element={<ProfileDoctorDash />} />
//     {/* ممكن تزودي هنا أي مسارات خاصة بالدكتور */}
//   </Route>
// </Route>


//   {/* Catch All */}
//   <Route path="*" element={<Navigate to="/403" replace />} />
// </Routes>

//         </div>
//       </BabyProvider>
//     </>
//   );
// }

// export default App;

import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

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
import Mainprofile from './pages/mamyprofile/Mainprofile'
import Mybabies from './pages/mamyprofile/my babies/Mybabies'
import NameBaby from './pages/mamyprofile/NameBaby/NameBaby'
import Babydetails from './pages/mamyprofile/my babies/updatebaby'
import AddMedicine from './pages/mamyprofile/reminders/Addmedicine/Addmedicine'
import MedicinePage from './pages/mamyprofile/reminders/MedicinePage/MedicinePage'
import Updatemedicine from './pages/mamyprofile/reminders/Addmedicine/Updatemedicine'
import { useEffect } from 'react'
import { generatetoken, messaging } from './Notification/firebase-config'
import { onMessage } from 'firebase/messaging'
import Vaccines from './pages/mamyprofile/vaccine/Vaccines'
import { BabyProvider } from "./context/BabyContext";
import Mainhome from './pages/mamyprofile/Mainhome/Mainhome'
import GrowthBaby from './pages/mamyprofile/GrowthBaby/GrowthBaby'
import MamyTips from './pages/mamyprofile/MamyTips/MamyTips'
import Dashboard from './Dashboard/pages/Dashboard'
import Allusers from './Dashboard/pages/Allusers/AllUsers'
import TipDetalis from './pages/mamyprofile/MamyTips/TipDetalis'
import Videos from './pages/mamyprofile/EnterTemint/Videos/Videos'
import SleepMusic from './pages/mamyprofile/EnterTemint/SleepMusic/SleepMusic'
import Babystory from './pages/mamyprofile/EnterTemint/babystory/Babyatory'
import StoryDetalis from './pages/mamyprofile/EnterTemint/babystory/StoryDetalis'
import EnterTiemnt from './pages/mamyprofile/EnterTemint/EnterTemints'
import CarenestTips from './Dashboard/pages/Tips/AllTips'
import AddTip from './Dashboard/pages/Tips/AddTip/AddTip'
import NearPlaces from './pages/mamyprofile/Doctors/NearDoctors/NearPlaces'
import AddDoctor from './Dashboard/pages/Doctors/AddDoctors/AddDoctor'
import AllDoctors from './Dashboard/pages/Doctors/Alldoctors/AllDoctors'
import UpdateDoctor from "./Dashboard/pages/Doctors/UpdateDoctors/UpdateDoctor"
import ProfileDoctor from './pages/mamyprofile/Doctors/ProfileDoctor/ProfileDoctor'
import Appointment from './pages/mamyprofile/Doctors/Appointment/Appointment'
import Community from './pages/mamyprofile/Mamyscommunity/Community/Community'
import Mainpage from './Dashboard/pages/Mainpage/MainPage'
import Addpromocode from './Dashboard/pages/Mainpage/Promocode/AddPromocod/Addpromocode'
import Babies from './Dashboard/pages/Babies/Babies'
import Voices from './Dashboard/pages/Entertainment/Voices/Voices'
import AddVoiceModal from './Dashboard/pages/Entertainment/Voices/AddVoiceModal'
import VideosDash from './Dashboard/pages/Entertainment/Videos/Videos'
import DoctorDashboard from './DoctorDashboard/DoctorDashboard';
import ProfileDoctorDash from './DoctorDashboard/ProfileDoctor/ProfileDoctor';
import Forbidden from './protectedRoutes/ProtectDoctorRoutes/Forbidden/Forbidden';
import RequireDoctorRole from './protectedRoutes/ProtectDoctorRoutes/ProtectDoctorRoutes';
import RequireNotDoctorRole from './protectedRoutes/RequireNotDoctor';
import Users from './Dashboard/pages/Users/Users';
import Admins from './Dashboard/pages/Admins/Admins'
import Notifications from './Dashboard/pages/Notifications/Notifications';
import Reports from './Dashboard/pages/Reports/Reports';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/Dashboard') || location.pathname.startsWith('/DoctorDashboard');

  useEffect(() => {
    generatetoken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);

  return (
    <BabyProvider>
      <div className={isDashboard ? "dashboard-body" : "normal-body"}>
        <Routes>
          <Route path="/403" element={<Forbidden />} />
               <Route path='/' element={<Home />} />

          {/* ✅ منع الدكتور من دخول كل المسارات العامة */}
          <Route element={<RequireNotDoctorRole />}>
       
            <Route path='/Auth' element={<Auth />}>
              <Route path='Signup' element={<Signup />} />
              <Route path='Confirmemail' element={<ConfirmEmail />} />
              <Route path='Login' element={<Login />} />
              <Route path='ForgetPassword' element={<ForgetPass />} />
              <Route path='ConfirmPassword' element={<ConfirmPass />} />
              <Route path='SetNewPass' element={<SetNewPass />} />
            </Route>

            {/* باقي الروتات العامة */}
            <Route path='mainhome' element={<Mainhome />} />
            <Route path=":idbaby" element={<Babydetails />} />
            <Route path="/NameBaby" element={<NameBaby />} />
            <Route path="/reminders" element={<MedicinePage />} />
            <Route path='/medicine/:scheduleIdd' element={<Updatemedicine />} />
            <Route path='/vaccines/:nameid' element={<Vaccines />} />
            <Route path='/addmedicine' element={<AddMedicine />} />
            <Route path='/growthBaby' element={<GrowthBaby />} />
            <Route path='/MamyTips' element={<MamyTips />} />
            <Route path="/MamyTips/:tipid" element={<TipDetalis />} />
            <Route path='/EnterTiemnt' element={<EnterTiemnt />} />
            <Route path='/Entertainment/SleepMusic' element={<SleepMusic />} />
            <Route path='/babystoeies' element={<Babystory />} />
            <Route path="/babystories/:storyid" element={<StoryDetalis />} />
            <Route path='/Videos' element={<Videos />} />
            <Route path='/nearPlaces' element={<NearPlaces />} />
            <Route path='/Doctorprofile/:doctorid' element={<ProfileDoctor />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/Community' element={<Community />} />

            {/* Admin Dashboard */}
            <Route path='/Dashboard' element={<Dashboard />}>
              <Route index element={<Navigate to="mainpage" replace />} />
              <Route path="mainpage" element={<Mainpage />} />
              <Route path='Babies' element={<Babies />} />
              <Route path='Addpromocode' element={<Addpromocode />} />
              <Route path='Allusers' element={<Allusers />} />
              <Route path='CarenestTips' element={<CarenestTips />} />
              <Route path='AddTip' element={<AddTip />} />
              <Route path='AddDoctor' element={<AddDoctor />} />
              <Route path='AllDoctors' element={<AllDoctors />} />
              <Route path="/Dashboard/AllDoctors/:docid" element={<UpdateDoctor />} />
              <Route path='/Dashboard/Entertainment/Voices' element={<Voices />} />
              <Route path='/Dashboard/Entertainment/Voices/add' element={<AddVoiceModal />} />
              <Route path='/Dashboard/Entertainment/Videos' element={<VideosDash />} />
              <Route path='/Dashboard/Users' element={<Users/>} />
              <Route path='/Dashboard/Admins' element={<Admins/>}/>
              <Route path='/Dashboard/Notifications' element={<Notifications />} />
              <Route path='/Dashboard/Reports' element={<Reports />} />
            </Route>
          </Route>

          {/* ✅ الدكتور فقط يدخل للمسارات دي */}
          <Route element={<RequireDoctorRole />}>
            <Route path="/DoctorDashboard" element={<DoctorDashboard />}/>
     
              <Route path="/DoctorDashboard/profile" element={<ProfileDoctorDash/>} />
            
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/403" replace />} />
        </Routes>
      </div>
    </BabyProvider>
  );
}

export default App;
