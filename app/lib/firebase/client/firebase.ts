import { initializeApp } from "firebase/app"

export const londonRegion = "europe-west2"

export function initialize() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: "sociiinvest.firebaseapp.com",
    projectId: "sociiinvest",
    storageBucket: "sociiinvest.appspot.com",
    messagingSenderId: "584929113403",
    appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
    measurementId: "G-F7JH023N5Q",
  }

  return initializeApp(firebaseConfig)
}
