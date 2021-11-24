import FirebaseUser from "@models/FirebaseUser"
import { arrayUnion, doc, serverTimestamp, writeBatch } from "firebase/firestore"
import { db } from ".."

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
  groupName: string,
  groupType: { label: string; description: string },
  initialDeposit: number,
  monthlySubscription,
  groupDescription: string = ""
) {
  const userGroupRef = doc(db, `users/${user.uid}`)
  const groupRef = doc(db, `groups/${groupName}`)
  const investorsRef = doc(db, `groups/${groupName}/investors/${user?.username}`)

  const batch = writeBatch(db)
  batch.update(userGroupRef, { groups: arrayUnion(groupName) })
  batch.set(groupRef, {
    groupDescription,
    groupName,
    initialDeposit,
    privacyOption: groupType.label.toLowerCase(),
    groupType: "", // TODO: change this to groupTags: DeFi, growth, dividend, etc
    cashBalance: initialDeposit + monthlySubscription,
    subscriptionAmount: monthlySubscription,
    startDate: serverTimestamp(),
    investorCount: 1,
    investors: [user?.username],
  })
  batch.set(investorsRef, {
    isFounder: true,
    joinDate: serverTimestamp(),
    uid: user.uid,
    alpacaAccountId: user.alpacaAccountId,
  })

  await batch.commit()
}
