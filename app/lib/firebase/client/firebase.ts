// import "firebase/performance"
import { initializeApp } from "firebase/app"
import { EmailAuthProvider, getAuth, RecaptchaVerifier } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions"

const londonRegion = "europe-west2"

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
  messagingSenderId: "584929113403",
  appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
  measurementId: "G-F7JH023N5Q",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
const functions = getFunctions(app, londonRegion)
export const firestore = getFirestore(app)
// export const functions = firebase.app().functions(londonRegion)

// if (
//   process.env.NODE_ENV === "development" &&
//   "_delegate" in firestore &&
//   !firestore?.["_delegate"]._settings.host?.includes("local")
//   // ! Stops NextJS hot reloading from re-executing this code
// ) {
//   firestore.useEmulator("localhost", 8080)
//   functions.useEmulator("localhost", 5001)
// }

// - Utilities
export const recaptchaVerifier = RecaptchaVerifier
export const credentialWithLink = EmailAuthProvider.credentialWithLink

// - Callable Functions
export const alphaVantageQuery = httpsCallable(functions, "alphaVantageQuery")
export const tradeSubmission = httpsCallable(functions, "tradeSubmission")
export const tradeConfirmation = httpsCallable(functions, "tradeConfirmation")
export const createAccounts = httpsCallable(functions, "createAccounts")
// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance();
