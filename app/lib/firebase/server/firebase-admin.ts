import admin from "firebase-admin"

// * Constant initialisation
if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })

const firestore = admin.firestore()
const auth = admin.auth()

const arrayUnion = admin.firestore.FieldValue.arrayUnion
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
const fromDate = admin.firestore.Timestamp.fromDate

const DocumentReference = typeof admin.firestore.DocumentReference

export { firestore, auth, arrayUnion, fromDate, serverTimestamp, DocumentReference }
