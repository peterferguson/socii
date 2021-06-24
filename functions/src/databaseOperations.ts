import { error } from "firebase-functions/lib/logger"
import { firestore, increment } from "./index.js"
import { streamClient } from "./utils/helper.js"

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
    // Updating existing document : Update chat members
    const channel = streamClient.channel("messaging", groupName.split(" ").join("-"))

    try {
      await channel.addMembers([investorUsername])
    } catch (err) {
      error(err)
    }
  } else if (!change.after.exists) {
    // Deleting document : subtract one from count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(-1) })
  }
  return
}

/*
 * Clean up group arrays on users collection on deletion of a group
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}')
 * .onDelete(deleteGroup)
 *
 * @param change
 * @param context
 * @returns
 */
export const deleteGroup = async (change, context) => {
  const { groupName } = context.params

  const data = change.data()

  // TODO: serach investor sub-collection and delete the group from the groups field of
  // TODO: each investors user collection.

  return
}
