/* ═══════════════════════════════════════════════════════════════
   Metacognition — firebase-config.js
   Single source of truth for Firebase configuration.
   Include this file ONCE in every page that uses Firebase,
   BEFORE any other Firebase usage scripts.

   Security note: Firebase Web API keys are designed to be public.
   Real security lives in Firebase Console → Firestore Rules.
   Keep your Firestore Rules tight (never allow read/write: if true).
   ═══════════════════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey: "AIzaSyDFu_w-MmLJRdiOOZoLii8-SQBN9FUtG60",
  authDomain: "Metacognition-c9be9.firebaseapp.com",
  projectId: "Metacognition-c9be9",
  storageBucket: "Metacognition-c9be9.firebasestorage.app",
  messagingSenderId: "903301545011",
  appId: "1:903301545011:web:84a6c4ba643a9b255d7746"
};

// Guard: only initialize once even if script is loaded multiple times
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
