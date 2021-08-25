import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Store the FCM token on the user document.
 *
 * @param  {string} uid
 * @param  {string} fcmToken
 */

export async function storeFcmToken(uid: string, fcmToken: string) {
  return await setDoc(
    doc(firestore, "users", uid),
    {
      fcmToken,
      fcmTokenLastUpdated: serverTimestamp(),
    },
    { merge: true }
  )
}
