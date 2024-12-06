// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
//     authDomain: "carenest-438417.firebaseapp.com",
//     projectId: "carenest-438417",
//     storageBucket: "carenest-438417.firebasestorage.app",
//     messagingSenderId: "675853062971",
//     appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
//     measurementId: "G-DT7T2V1JG4"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
// onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: payload.notification.image,
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// استخدم importScripts لتحميل مكتبات Firebase
/////////////////////////////////////////////////////////////////////////////////
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
    authDomain: "carenest-438417.firebaseapp.com",
    projectId: "carenest-438417",
    storageBucket: "carenest-438417.firebasestorage.app",
    messagingSenderId: "675853062971",
    appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
    measurementId: "G-DT7T2V1JG4"
};

firebase.initializeApp(firebaseConfig);

// إعداد Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // تخصيص الإشعار
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
 













// importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js');

// // تهيئة Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyAduR3n-Hhueu10matOF-2Ga4sIuEcptBY",
//     authDomain: "carenest-438417.firebaseapp.com",
//     projectId: "carenest-438417",
//     storageBucket: "carenest-438417.firebasestorage.app",
//     messagingSenderId: "675853062971",
//     appId: "1:675853062971:web:599efb25eac0ca4a249d1e",
//     measurementId: "G-DT7T2V1JG4"
// };

// firebase.initializeApp(firebaseConfig);

// // إعداد Firebase Messaging
// const messaging = firebase.messaging();

// // استلام الرسائل في الخلفية
// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     // تخصيص الإشعار
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.image,
//     };

//     // تخزين بيانات الإشعار في IndexedDB
//     saveNotificationToIndexedDB({
//         title: notificationTitle,
//         body: payload.notification.body,
//         icon: payload.notification.image,
//     });

//     // عرض الإشعار
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // دالة لحفظ الإشعار في IndexedDB
// function saveNotificationToIndexedDB(notification) {
//     const request = indexedDB.open('notificationsDB', 1);

//     request.onupgradeneeded = function(event) {
//         const db = event.target.result;
//         if (!db.objectStoreNames.contains('notifications')) {
//             db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
//         }
//     };

//     request.onsuccess = function(event) {
//         const db = event.target.result;
//         const transaction = db.transaction('notifications', 'readwrite');
//         const store = transaction.objectStore('notifications');
//         store.add(notification);
//     };

//     request.onerror = function(event) {
//         console.error('Error opening IndexedDB:', event.target.error);
//     };
// }

// // تفعيل عرض الإشعار عند العودة للموقع
// self.addEventListener('notificationclick', function(event) {
//     event.notification.close();

//     // تحقق مما إذا كان هناك إشعار مخزن في IndexedDB
//     getLastNotificationFromIndexedDB().then((lastNotification) => {
//         if (lastNotification) {
//             // عرض الإشعار المخزن
//             console.log('Last notification:', lastNotification);
//             // يمكنك هنا إظهار إشعار أو تحديث واجهة المستخدم حسب الحاجة
//             self.registration.showNotification(lastNotification.title, {
//                 body: lastNotification.body,
//                 icon: lastNotification.icon,
//             });
//         }
//     });
// });

// // دالة لاسترجاع آخر إشعار من IndexedDB
// function getLastNotificationFromIndexedDB() {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open('notificationsDB', 1);

//         request.onsuccess = function(event) {
//             const db = event.target.result;
//             const transaction = db.transaction('notifications', 'readonly');
//             const store = transaction.objectStore('notifications');
//             const cursorRequest = store.openCursor();

//             cursorRequest.onsuccess = function(event) {
//                 const cursor = event.target.result;
//                 if (cursor) {
//                     resolve(cursor.value);  // إرجاع آخر إشعار تم تخزينه
//                     cursor.continue();
//                 } else {
//                     resolve(null);  // إذا لم يتم العثور على إشعارات
//                 }
//             };

//             cursorRequest.onerror = function(event) {
//                 console.error('Error retrieving notifications:', event.target.error);
//                 reject(event.target.error);
//             };
//         };

//         request.onerror = function(event) {
//             console.error('Error opening IndexedDB:', event.target.error);
//             reject(event.target.error);
//         };
//     });
// }
