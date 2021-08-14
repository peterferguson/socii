import FirebaseUser from "@models/FirebaseUser"
import { arrayUnion, doc, serverTimestamp, writeBatch } from "firebase/firestore"
import { firestore } from "."

/*
 * Create a group document at groups/{groupId} with data.
 * If group document exists overwrites old
 *
 * @param  {string} user
 * @param  {string} username
 * @param  {string} groupName
 * @param  {string} privacyOption
 * @param  {object} depositOption
 * @param  {object} lumpSumOption
 * @param  {string} groupDescription
 */

export async function createGroup(
  user: FirebaseUser,
  username: string,
  groupName: string,
  privacyOption: { name: string; description: string },
  depositOption: { amount: number },
  lumpSumOption: { amount: number },
  groupDescription: string
) {
  const userGroupRef = doc(firestore, `users/${user.uid}`)
  const groupRef = doc(firestore, `groups/${groupName}`)
  const investorsRef = doc(firestore, `groups/${groupName}/investors/${username}`)

  const batch = writeBatch(firestore)
  batch.update(userGroupRef, { groups: arrayUnion(groupName) })
  batch.set(groupRef, {
    groupDescription,
    groupName,
    privacyOption,
    groupType: "",
    cashBalance: depositOption.amount + lumpSumOption.amount,
    initialDeposit: lumpSumOption.amount,
    subscriptionAmount: depositOption.amount,
    startDate: serverTimestamp(),
    investorCount: 1, // TODO: Increment this on addition of new investors
  })
  batch.set(investorsRef, {
    isFounder: true,
    joinDate: serverTimestamp(),
    uid: user.uid,
  })

  await batch.commit()
}
