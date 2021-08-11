import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase"

/*
 * Gets a users stream token from users/{uid}/stream subcollection
 * @param  {string} username
 */

export const getUserStreamToken = async (uid: string) => {
  const tokenRef = doc(
    firestore,
    `users/${uid}/stream/${
      process.env.NODE_ENV === "production" ? "production" : "development"
    }`
  )
  const snapshot = await getDoc(tokenRef)
  return snapshot.data()?.token
}
