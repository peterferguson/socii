import { error } from "firebase-functions/lib/logger"
import { firestore, increment, serverTimestamp } from "./index.js"
import { streamClient } from "./utils/helper.js"
import { config, FundingApi, TransferData } from "./alpaca/broker/client/ts/index"

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
 * On a new investor joining a group, deposit the initial amount to the users balance
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onCreate(initiateDeposit)
 *
 * @param change
 * @param context
 * @returns
 */
export const initialDeposit = async (snapshot, context) => {
  const { groupName } = context.params

  const fundClient = new FundingApi(config)

  // - Get the investor from the snapshot
  const { uid } = snapshot.data()

  const userRef = firestore.doc(`users/${uid}`)
  const groupRef = firestore.doc(`groups/${groupName}`)
  const fundingRef = firestore.doc(`users/${uid}/funding/${groupName}`)
  const groupData = (await groupRef.get()).data()

  const initialDeposit: number = groupData.initialDeposit
  const subscriptionAmount: number = groupData.subscriptionAmount

  const totalAmount = initialDeposit + subscriptionAmount

  const { alpacaID, alpacaACH } = (await userRef.get()).data()

  if (totalAmount === 0) return

  // - Execute the funding transaction
  if (totalAmount > 0 && alpacaACH && alpacaID) {
    try {
      const postTransfer = await fundClient.postTransfers(
        alpacaID,
        TransferData.from({
          amount: totalAmount,
          transferType: "ach",
          relationshipId: alpacaACH,
          direction: "INCOMING",
        })
      )

      fundingRef.set({
        subscriptionAmount,
        initialDeposit,
        startDate: serverTimestamp(),
        deposits: [
          {
            amount: totalAmount,
            date: postTransfer.createdAt,
            id: postTransfer.id,
            direction: postTransfer.direction,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error(`User with id ${uid} was missing alpacaID or alpacaACH`)
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
