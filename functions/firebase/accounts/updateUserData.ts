import { firestore } from "../index"

/*
 * Update user document at users/{uid} with passed data.
 * @param  {string} uid
 * @param  {any} data
 */

// TODO make generic for all userdata

export async function updateUserData(data, context) {
  const {uid , updateData} = data
  const userRef = firestore.collection('users').doc(uid)

  userRef.set({ ...updateData }, { merge: true })

  return {status: "success"}
}
