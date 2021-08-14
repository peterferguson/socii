import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Check if user with `uid` has agreed to trade with `messageId` in group with `groupName`
 * @param  {string} groupName
 * @param  {string} messgeId
 * @param  {string} uid
 */

export const agreesToTrade = async (
  groupName: string,
  messageId: string,
  uid: string
) => {
  const tradesRef = doc(firestore, `groups/${groupName}/trades/${messageId}`)
  await updateDoc(tradesRef, { agreesToTrade: arrayUnion(`users/${uid}`) })
}
