import { OAuthCredential } from "@firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Create failedLogin document at failedLogins/{email}.
 *
 * @param  {string} uid
 * @param  {any} data
 */

export async function storeFailedLogin(email: string, credential: OAuthCredential) {
  return await setDoc(doc(firestore, "failedLogins", email), {
    email,
    credential,
    timestamp: serverTimestamp(),
  })
}
