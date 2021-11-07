import * as functions from "firebase-functions"
import { firestore, messaging } from "./index.js"
import { increment, serverTimestamp } from "./firestore/index.js"
import { streamClient } from "./utils/streamClient"
import { config, FundingApi, TransferData } from "./shared/alpaca/index.js"
import { getInvestorFcmTokens } from "./firestore/db/getInvestorFcmTokens.js"

const logger = functions.logger

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
export const incrementInvestors = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const { groupName, investorUsername } = context.params
  const { acceptedInvite = null } = change.before?.data() || {}

  if (!change.before.exists) {
    // New document Created : add one to count
    if (acceptedInvite)
      firestore.doc(`groups/${groupName}`).update({ investorCount: increment(1) })
  } else if (change.before.exists && change.after.exists) {
    // Updating existing document: Update chat members
    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))

    try {
      await channel.addMembers([investorUsername])
    } catch (err) {
      logger.error(err)
    }
  } else if (!change.after.exists) {
    // Deleting document: subtract one from count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(-1) })
    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))

    try {
      await channel.removeMembers([investorUsername])
    } catch (err) {
      logger.error(err)
    }
  }
  return
}

/*
 * Add the new investor to the group stream chat when a new investor is added to
 * the investors sub-collection
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onWrite(incrementInvestors)
 *
 * @param change
 * @param context
 * @returns
 */
export const updateGroupChatOnInvestorChange = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const { groupName, investorUsername } = context.params
  const { acceptedInvite = null } = change.before?.data() || {}
  const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))

  try {
    if (change.before.exists && change.after.exists) {
      // Updating existing document: Add chat member
      if (!acceptedInvite) return
      await channel.addMembers([investorUsername])
    } else if (!change.after.exists) {
      // Updating existing document: remove chat member
      await channel.removeMembers([investorUsername])
    }
  } catch (err) {
    logger.error(err)
  }
  return
}

/*
 * When a new investor is added to the investors collection
 * subscribe them to the group stream chat push notification topic
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onWrite(subscribeToGroupTopic)
 *
 * @param change
 * @param context
 * @returns
 */
export const subscribeToGroupTopic = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const { groupName } = context.params

  const fcmTokens = await getInvestorFcmTokens(groupName)

  if (!change.after.exists) {
    // Deleting investors: make sure they are unsubscribed from the group topic
    messaging
      .unsubscribeFromTopic(fcmTokens, `group-${groupName}`)
      .then(response => {
        console.log("Successfully unsubscribed from topic:", response)
      })
      .catch(error => {
        console.log("Error unsubscribing from topic:", error)
      })
  } else {
    // Adding investors: make sure all investors are subscribed to the group topic
    messaging
      .subscribeToTopic(fcmTokens, `group-${groupName}`)
      .then(response => {
        console.log("Successfully subscribed from topic:", response)
      })
      .catch(error => {
        console.log("Error subscribing from topic:", error)
      })
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
export const initialDeposit = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
) => {
  const { groupName } = context.params

  const fundClient = new FundingApi(
    config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
  )

  // - Get the investor from the snapshot
  const { uid } = snapshot.data()

  const userRef = firestore.doc(`users/${uid}`)
  const groupRef = firestore.doc(`groups/${groupName}`)
  const fundingRef = firestore.doc(`users/${uid}/funding/${groupName}`)
  const groupData = (await groupRef.get()).data()

  const initialDeposit: number = groupData.initialDeposit
  const subscriptionAmount: number = groupData.subscriptionAmount

  const totalAmount = initialDeposit + subscriptionAmount

  const { alpacaAccountId, alpacaACH } = (await userRef.get()).data()

  if (totalAmount === 0) return

  // - Execute the funding transaction
  if (totalAmount > 0 && alpacaACH && alpacaAccountId) {
    try {
      const postTransfer = await fundClient.postTransfers(
        alpacaAccountId,
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
      logger.error(error)
    }
  } else {
    logger.error(`User with id ${uid} was missing alpacaAccountId or alpacaACH`)
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
// export const deleteGroup = async (change, context) => {
//   const { groupName } = context.params

//   const data = change.data()

//   // TODO: serach investor sub-collection and delete the group from the groups field of
//   // TODO: each investors user collection.

//   return
// }
