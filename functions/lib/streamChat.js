"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("firebase-functions/lib/logger");
const index_1 = require("./index");
const helper_js_1 = require("./utils/helper.js");
/*
 * Create a stream token when a new user is created
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}').onWrite(createGroup)
 *
 * @param change
 * @param context
 * @returns
 */
const generateToken = async (change, context) => {
    // - Get an object representing the user document
    const { username } = change.data();
    const uid = context.params.userId;
    logger_1.log(`Creating a Stream User Token for ${username}`);
    // TODO: redesign user collection to have profile & secret parts
    // TODO: Store this as a field on the users secrets subcollection
    const tokenDocRef = index_1.firestore.collection(`users/${uid}/stream`).doc(uid);
    tokenDocRef.set({ token: helper_js_1.streamClient.createToken(username) });
};
/*
 * Create/delete a stream group chat when a new group is created/deleted
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}').onWrite(createGroup)
 *
 * @param change
 * @param context
 * @returns
 */
const createGroup = async (change, context) => {
    const { groupName } = context.params;
    if (!change.before.exists) {
        // New group Created
        const founderUsername = (await index_1.firestore.collection(`groups/${groupName}/investors`).get()).docs[0].id;
        const channel = helper_js_1.streamClient.channel("messaging", groupName.split(" ").join("-"), {
            name: `${groupName} Group Chat`,
            created_by: founderUsername,
        });
        try {
            await channel.create();
            await channel.addMembers([founderUsername]);
        }
        catch (err) {
            logger_1.error(err);
        }
    }
    else if (!change.after.exists) {
        // Deleting document: delete the group chat
        const channel = helper_js_1.streamClient.channel("messaging", groupName.split(" ").join("-"));
        try {
            await channel.delete();
        }
        catch (err) {
            logger_1.error(err);
        }
    }
    return;
};
module.exports = { generateToken, createGroup };
//# sourceMappingURL=streamChat.js.map