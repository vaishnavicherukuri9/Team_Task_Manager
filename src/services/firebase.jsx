import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBotIt7PXOYsqfVt-IfUqMfpvt2vY9eddg",
  authDomain: "startup-intern-task.firebaseapp.com",
  projectId: "startup-intern-task",
  storageBucket: "startup-intern-task.appspot.com", // 🔧 corrected domain suffix
  messagingSenderId: "140731401019",
  appId: "1:140731401019:web:2731069440d09aded16d1e",
  measurementId: "G-XMVKJYEXZL"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); // Optional but useful for insights

// ✅ Single export block to avoid duplication
export { auth, db };