import { logger } from "firebase-functions"
import { firestore, increment } from "./index.js"

/*
 * Increment the investorCount value on a group when a new investor is added to the investors collection
 * Also add the new investor to the group stream chat
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onWrite(incrementInvestors)
 *
 * @param change
 * @param context
 * @returns
 */
export const incrementInvestors = async (change, context) => {
  const { groupName, investorUsername } = context.params

  if (!change.before.exists) {
    // New document Created : add one to count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(1) })
  } else if (change.before.exists && change.after.exists) {
    // Updating existing document : Do nothing
    // TODO: update chat members
  } else if (!change.after.exists) {
    // Deleting document : subtract one from count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(-1) })
  }
  return
}
