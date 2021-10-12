import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"

export const londonRegion = "europe-west2"

const firebaseConfig = {
  apiKey: "AIzaSyBQw3aLVDyR66szb7Ehdyb19PUpq7Fiz1s",
  authDomain: "socii-development.firebaseapp.com",
  projectId: "socii-development",
  storageBucket: "socii-development.appspot.com",
  messagingSenderId: "1030307422946",
  appId: "1:1030307422946:web:05361d94261912a406f4bb",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
