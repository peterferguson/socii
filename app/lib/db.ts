import { firestore } from "./firebase"

/*
!
! This file is for functions which perform CRUD operations on Firebase
!
*/

/*
 * Create user document at users/{uid} with data. If user document exists overwrites old
 * values and adds new ones.
 * @param  {string} uid
 * @param  {any} data
 */
export async function createUser(uid: string, data: any) {
  return await firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
