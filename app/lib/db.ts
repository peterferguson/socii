import { firestore } from "./firebase"

export async function createUser(uid: string, data: any) {
  return await firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
