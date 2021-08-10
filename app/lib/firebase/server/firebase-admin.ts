import admin from "firebase-admin"

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
}

// * Constant initialisation
if (!admin.apps.length) admin.initializeApp(config)

const firestore = admin.firestore()
const auth = admin.auth()

const arrayUnion = admin.firestore.FieldValue.arrayUnion
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
const fromDate = admin.firestore.Timestamp.fromDate

const DocumentReference = typeof admin.firestore.DocumentReference

export { firestore, auth, arrayUnion, fromDate, serverTimestamp, DocumentReference }
