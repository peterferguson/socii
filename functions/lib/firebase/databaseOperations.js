"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.initialDeposit = exports.subscribeToGroupTopic = exports.incrementInvestors = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("./index.js");
const index_js_2 = require("./firestore/index.js");
const streamClient_1 = require("./utils/streamClient");
const index_js_3 = require("../shared/alpaca/index.js");
const getInvestorFcmTokens_js_1 = require("./firestore/db/getInvestorFcmTokens.js");
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
const incrementInvestors = async (change, context) => {
    const { groupName, investorUsername } = context.params;
    if (!change.before.exists) {
        // New document Created : add one to count
        index_js_1.firestore.doc(`groups/${groupName}`).update({ investorCount: (0, index_js_2.increment)(1) });
    }
    else if (change.before.exists && change.after.exists) {
        // Updating existing document : Update chat members
        const channel = streamClient_1.streamClient.channel("group", groupName.replace(/\s/g, "-"));
        try {
            await channel.addMembers([investorUsername]);
        }
        catch (err) {
            firebase_functions_1.logger.error(err);
        }
    }
    else if (!change.after.exists) {
        // Deleting document : subtract one from count
        index_js_1.firestore.doc(`groups/${groupName}`).update({ investorCount: (0, index_js_2.increment)(-1) });
    }
    return;
};
exports.incrementInvestors = incrementInvestors;
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
const subscribeToGroupTopic = async (change, context) => {
    const { groupName } = context.params;
    const fcmTokens = await (0, getInvestorFcmTokens_js_1.getInvestorFcmTokens)(groupName);
    if (!change.after.exists) {
        // Deleting investors: make sure they are unsubscribed from the group topic
        index_js_1.messaging
            .unsubscribeFromTopic(fcmTokens, `group-${groupName}`)
            .then((response) => {
            console.log("Successfully unsubscribed from topic:", response);
        })
            .catch((error) => {
            console.log("Error unsubscribing from topic:", error);
        });
    }
    else {
        // Adding investors: make sure all investors are subscribed to the group topic
        index_js_1.messaging
            .subscribeToTopic(fcmTokens, `group-${groupName}`)
            .then((response) => {
            console.log("Successfully subscribed from topic:", response);
        })
            .catch((error) => {
            console.log("Error subscribing from topic:", error);
        });
    }
    return;
};
exports.subscribeToGroupTopic = subscribeToGroupTopic;
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
const initialDeposit = async (snapshot, context) => {
    const { groupName } = context.params;
    const fundClient = new index_js_3.FundingApi((0, index_js_3.config)(process.env.ALPACA_KEY, process.env.ALPACA_SECRET));
    // - Get the investor from the snapshot
    const { uid } = snapshot.data();
    const userRef = index_js_1.firestore.doc(`users/${uid}`);
    const groupRef = index_js_1.firestore.doc(`groups/${groupName}`);
    const fundingRef = index_js_1.firestore.doc(`users/${uid}/funding/${groupName}`);
    const groupData = (await groupRef.get()).data();
    const initialDeposit = groupData.initialDeposit;
    const subscriptionAmount = groupData.subscriptionAmount;
    const totalAmount = initialDeposit + subscriptionAmount;
    const { alpacaAccountId, alpacaACH } = (await userRef.get()).data();
    if (totalAmount === 0)
        return;
    // - Execute the funding transaction
    if (totalAmount > 0 && alpacaACH && alpacaAccountId) {
        try {
            const postTransfer = await fundClient.postTransfers(alpacaAccountId, index_js_3.TransferData.from({
                amount: totalAmount,
                transferType: "ach",
                relationshipId: alpacaACH,
                direction: "INCOMING",
            }));
            fundingRef.set({
                subscriptionAmount,
                initialDeposit,
                startDate: (0, index_js_2.serverTimestamp)(),
                deposits: [
                    {
                        amount: totalAmount,
                        date: postTransfer.createdAt,
                        id: postTransfer.id,
                        direction: postTransfer.direction,
                    },
                ],
            });
        }
        catch (error) {
            firebase_functions_1.logger.error(error);
        }
    }
    else {
        firebase_functions_1.logger.error(`User with id ${uid} was missing alpacaAccountId or alpacaACH`);
    }
    return;
};
exports.initialDeposit = initialDeposit;
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
const deleteGroup = async (change, context) => {
    const { groupName } = context.params;
    const data = change.data();
    // TODO: serach investor sub-collection and delete the group from the groups field of
    // TODO: each investors user collection.
    return;
};
exports.deleteGroup = deleteGroup;
//# sourceMappingURL=databaseOperations.js.map