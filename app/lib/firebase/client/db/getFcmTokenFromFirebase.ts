import { firestore } from "."
import { doc, getDoc } from "firebase/firestore"

export const getFcmTokenFromFirebase = async (uid: string): Promise<string> => {
  return (await getDoc(doc(firestore, "users", uid))).data()?.fcmToken
}
