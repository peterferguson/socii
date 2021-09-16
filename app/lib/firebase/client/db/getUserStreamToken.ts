import { doc, getDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Gets a users stream token from users/{uid}/stream subcollection
 * @param  {string} username
 */

export const getUserStreamToken = async (uid: string) => {
  const tokenRef = doc(firestore, `users/${uid}/stream/production`)
  const snapshot = await getDoc(tokenRef)
  return snapshot.data()?.token
}
