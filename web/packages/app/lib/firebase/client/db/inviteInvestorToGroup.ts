import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../.."

/*
 * Add a user with `uid` to a group with name `groupName` in the `investors` subcollection.
 * @param  {string} groupName
 * @param  {string} username
 * @param  {string} uid
 * @param  {string} alpacaAccountId
 */
export const inviteInvestorToGroup = async (
  groupName: string,
  username: string,
  uid: string,
  alpacaAccountId: string
) => {
  const investorsRef = doc(db, `groups/${groupName}/investors/${username}`)
  await setDoc(investorsRef, {
    isFounder: false,
    joinDate: serverTimestamp(),
    uid: uid,
    alpacaAccountId: alpacaAccountId,
    acceptedInvite: false,
  })
}
