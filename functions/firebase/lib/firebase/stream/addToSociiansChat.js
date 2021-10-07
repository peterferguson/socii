"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToSociiansChat = void 0;
const firebase_functions_1 = require("firebase-functions");
const streamClient_js_1 = require("../utils/streamClient.js");
/*
 * Add/remove new users to the sociians team chat when a new username is created/deleted
 * Usage as follows:
 *
 * functions.firestore.document('usernames/{username}').onWrite(addToSociiansChat)
 *
 * @param change
 * @param context
 * @returns
 */
const channel = streamClient_js_1.streamClient.channel("team", "sociians", {});
const addToSociiansChat = async (change, context) => {
    const { username } = context.params;
    firebase_functions_1.logger.log(`Adding new user ${username} to sociians chat!`);
    if (!change.before.exists) {
        // - New user Created
        try {
            // ! Ensure user already exists in stream
            await streamClient_js_1.streamClient.upsertUser({ id: username });
            await channel.addMembers([username], {
                user_id: "socii",
                text: `Welcome the latest sociian, ${username} 🥳`,
            });
        }
        catch (err) {
            firebase_functions_1.logger.error(err);
        }
    }
    else if (!change.after.exists) {
        // - Deleting document: remove the user from the chat
        try {
            await channel.removeMembers([username], {
                user_id: "socii",
                text: `👋 ${username} has left the chat`,
            });
        }
        catch (err) {
            firebase_functions_1.logger.error(err);
        }
    }
    return;
};
exports.addToSociiansChat = addToSociiansChat;
//# sourceMappingURL=addToSociiansChat.js.map