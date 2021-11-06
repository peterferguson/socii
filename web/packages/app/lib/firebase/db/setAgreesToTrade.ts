import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from ".."

/*
 * Check if user with `uid` has agreed to trade with `messageId` in group with `groupName`
 * @param  {string} groupName
 * @param  {string} messgeId
 * @param  {string} uid
 * @param  {string} alpacaAccountId
 */

export const setAgreesToTrade = async (
  groupName: string,
  messageId: string,
  uid: string,
  alpacaAccountId: string
) => {
  const tradesRef = doc(db, `groups/${groupName}/trades/${messageId}`)
  await updateDoc(tradesRef, {
    agreesToTrade: arrayUnion(`users/${uid}/${alpacaAccountId}`),
  })
}
