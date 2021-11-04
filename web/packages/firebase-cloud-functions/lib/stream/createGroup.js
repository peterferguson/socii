"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = void 0;
const logger_1 = require("firebase-functions/lib/logger");
const index_1 = require("../index");
const streamClient_1 = require("../utils/streamClient");
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
        const channel = streamClient_1.streamClient.channel("group", groupName.replace(/\s/g, "-"), {
            name: `${groupName} Group Chat`,
            created_by: { id: founderUsername },
        });
        try {
            await channel.create();
            await channel.addMembers([founderUsername]);
        }
        catch (err) {
            (0, logger_1.error)(err);
        }
    }
    else if (!change.after.exists) {
        // Deleting document: delete the group chat
        const channel = streamClient_1.streamClient.channel("group", groupName.replace(/\s/g, "-"));
        try {
            await channel.delete();
        }
        catch (err) {
            (0, logger_1.error)(err);
        }
    }
    return;
};
exports.createGroup = createGroup;
//# sourceMappingURL=createGroup.js.map