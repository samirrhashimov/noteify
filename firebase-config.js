
// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDI37ePX-s5JKXqO4r7o9UkQvOchaK4Hr8",
    authDomain: "notepad-linzaapp.firebaseapp.com",
    projectId: "notepad-linzaapp",
    storageBucket: "notepad-linzaapp.firebasestorage.app",
    messagingSenderId: "625884524445",
    appId: "1:625884524445:web:9bd53ef63f061e9abd0974",
    measurementId: "G-631HB9C9W5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Enable offline persistence
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Multiple tabs open, offline persistence disabled');
    } else if (err.code == 'unimplemented') {
      // The current browser doesn't support offline persistence
      console.warn('Current browser does not support offline persistence');
    }
});
