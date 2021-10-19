import Constants from "expo-constants"
import { initializeApp } from "firebase/app"
import { initializeFirestore } from "firebase/firestore"

export const londonRegion = "europe-west2"

const { firebase } = Constants.manifest.extra

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } =
  firebase

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = initializeFirestore(app, { experimentalForceLongPolling: true })
