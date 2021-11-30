import { doc, getDoc } from "firebase/firestore"
import { db } from "app/lib/firebase"

/*
 * Gets a users notification settings from users/{uid}/:notifications
 * @param  {string} uid
 */

export const getUserNotificationSettings = async (uid: string) => {
  const userRef = doc(db, `users/${uid}`)
  const snapshot = await getDoc(userRef)
  return snapshot.data()?.notifications
}
