import { firestore, increment } from "./index.js"

// ! This is going to be an incrementing function factory where we can increase/decrease
// ! a count in firestore. Returns a funtion that can be used in conjunction with a
// ! document triggered cloud function.

// TODO: Update the function to gather the document ref of the document listener

/**
 * Increment the investorCount value on a group when a new investor is added to the investors collection
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onWrite(incrementInvestors)
 *
 * @param change
 * @param context
 * @returns
 */
const incrementInvestors = async (change, context) => {
  const { groupName } = context.params

  if (!change.before.exists) {
    // New document Created : add one to count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(1) })
  } else if (change.before.exists && change.after.exists) {
    // Updating existing document : Do nothing
  } else if (!change.after.exists) {
    // Deleting document : subtract one from count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(-1) })
  }
  return
}

module.exports = { incrementInvestors }
