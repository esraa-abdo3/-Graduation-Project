

import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import Cookies from "universal-cookie";

const firebaseConfig = {
  apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
  authDomain: "carenest-438417.firebaseapp.com",
  projectId: "carenest-438417",
  storageBucket: "carenest-438417.firebasestorage.app",
  messagingSenderId: "675853062971",
  appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
  measurementId: "G-DT7T2V1JG4"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const cookie = new Cookies();
const Tokenmom = cookie.get("Bearer");

export const generatetoken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  
  if (permission === "granted") {
    const fcmtoken = await getToken(messaging, {
      vapidKey: "BLPy29GpzkCw6kJVd-mlZRbXW8R0wRNxu_PrLG9qMPuucQcUtTVxoOFVhtnAlzBRQJYwsxXGAHMoSSHoc8nLXCw"
    });
    console.log(`FCM Token: ${fcmtoken}`);
  

    if (fcmtoken) {
      try {
          const res = await axios.put("https://carenest-serverside.vercel.app/users/updateFcmToken", { fcmToken:fcmtoken}, {
              headers: {
                  Authorization :`${Tokenmom}`
              }

           
})

      
        console.log('Token sent successfully:', res.data);
      } catch (error) {
        console.error('Error sending token to backend:', error);
      }
    }
  }
};



























// import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// import Cookies from "universal-cookie";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
//   authDomain: "carenest-438417.firebaseapp.com",
//   projectId: "carenest-438417",
//   storageBucket: "carenest-438417.appspot.com",
//   messagingSenderId: "675853062971",
//   appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
//   measurementId: "G-DT7T2V1JG4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//  export const messaging = getMessaging(app);

// // Initialize cookies
// const cookie = new Cookies();
// const Tokenmom = cookie.get("Bearer"); // Retrieve your authentication token

// // Function to send FCM token to the backend
// const sendTokenToBackend = async (token) => {
//   try {
//     const res = await axios.put(
//       "https://carenest-serverside.vercel.app/users/updateFcmToken",
//       { fcmToken: token },
//       {
//         headers: {
//           Authorization: `${Tokenmom}`,
//         },
//       }
//     );
//     console.log("Token sent successfully:", res.data);
//   } catch (error) {
//     console.error("Error sending token to backend:", error);
//   }
// };

// // Function to generate a new FCM token
// // const generateAndSendToken = async () => {
// //   const permission = await Notification.requestPermission();
// //   if (permission === "granted") {
// //     try {
// //       const newToken = await getToken(messaging, {
// //         vapidKey: "BLPy29GpzkCw6kJVd-mlZRbXW8R0wRNxu_PrLG9qMPuucQcUtTVxoOFVhtnAlzBRQJYwsxXGAHMoSSHoc8nLXCw",
// //       });
// //       if (newToken) {
// //         console.log("Generated new FCM token:", newToken);
// //         cookie.set("fcm token", newToken); // Save the token in cookies
// //         sendTokenToBackend(newToken);      // Send the new token to the backend
// //       } else {
// //         console.warn("No FCM token generated.");
// //       }
// //     } catch (error) {
// //       console.error("Error generating FCM token:", error);
// //     }
// //   } else {
// //     console.warn("Notification permission denied.");
// //   }
// // };
// const generateAndSendToken = async () => {
//   const permission = await Notification.requestPermission();
//   if (permission === "granted") {
//     try {
//       const vapidKey = "BLPy29GpzkCw6kJVd-mlZRbXW8R0wRNxu_PrLG9qMPuucQcUtTVxoOFVhtnAlzBRQJYwsxXGAHMoSSHoc8nLXCw";
//       // تحقق من صلاحية vapidKey
//       if (!vapidKey) {
//         throw new Error("VAPID Key is missing");
//       }

//       const newToken = await getToken(messaging, {
//         vapidKey: vapidKey,
//       });

//       if (newToken) {
//         console.log("Generated new FCM token:", newToken);
//         cookie.set("fcm token", newToken); // Save the token in cookies
//         sendTokenToBackend(newToken); // Send the token to the backend
//       } else {
//         console.warn("No FCM token generated.");
//       }
//     } catch (error) {
//       console.error("Error generating FCM token:", error.message);
//     }
//   } else {
//     console.warn("Notification permission denied.");
//   }
// };


// // Main function to check or generate the token
// export const handleFCMToken = async () => {
//   const storedToken = cookie.get("fcm token"); // Check for existing token in cookies
//   if (storedToken) {
//     console.log("Using stored FCM token:", storedToken);
//     sendTokenToBackend(storedToken); // Send the stored token to the backend
//   } else {
//     console.log("No stored token found. Generating a new one...");
//     generateAndSendToken(); // Generate a new token if none exists
//   }
// };
