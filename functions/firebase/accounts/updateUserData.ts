import { firestore } from "../index"

/*
 * Update user document at users/{uid} with passed data.
 * @param  {string} uid
 * @param  {any} data
 */

// TODO make generic for all userdata
const usernameUpdate = async (uid, updateData) =>{
  var usernameRef = firestore.collection('usernames').where("uid", "==", uid).limit(1)
  let docData
  usernameRef.get().then((snap) => {
      snap.forEach(async (doc) => {
        docData = doc.data()
        // saves to new username doc
        await firestore.collection('usernames').doc(updateData.username).set(docData)
        // deletes old doc
        await doc.ref.delete()
      })
    })
}

export async function updateUserData(data, context) {
  const {uid , updateData} = data
  const userRef = firestore.collection('users').doc(uid)

  if (Object.keys(updateData).includes("username")) (await usernameUpdate(uid, updateData))

  userRef.set({ ...updateData }, { merge: true })

  return {status: "success"}
}

