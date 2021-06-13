"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementInvestors = void 0;
const index_js_1 = require("./index.js");
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
        index_js_1.firestore.doc(`groups/${groupName}`).update({ investorCount: index_js_1.increment(1) });
    }
    else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing
        // TODO: update chat members
    }
    else if (!change.after.exists) {
        // Deleting document : subtract one from count
        index_js_1.firestore.doc(`groups/${groupName}`).update({ investorCount: index_js_1.increment(-1) });
    }
    return;
};
exports.incrementInvestors = incrementInvestors;
//# sourceMappingURL=databaseOperations.js.map