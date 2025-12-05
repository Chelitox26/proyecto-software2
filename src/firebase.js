
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyCgpRdw_n3o6YOAGBLNqMYIU6n6NuGQZlg",
  authDomain: "db-software2.firebaseapp.com",
  projectId: "db-software2",
  storageBucket: "db-software2.firebasestorage.app",
  messagingSenderId: "104129330300",
  appId: "1:104129330300:web:c32f6b1bd44ee994e25df9",
  measurementId: "G-D1Q2JVS5LF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
