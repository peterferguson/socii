import { doc, setDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Create user document at users/{uid} with data. If user document exists overwrites old
 * values and adds new ones.
 * @param  {string} uid
 * @param  {any} data
 */

export async function createUser(uid: string, data: object) {
  return await setDoc(doc(firestore, "users", uid), { uid, ...data }, { merge: true })
}
