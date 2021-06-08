"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("firebase-functions/lib/logger");
const index_1 = require("./index");
const helper_js_1 = require("./utils/helper.js");
const generateToken = async (snap, context) => {
    // Get an object representing the user document
    const { username } = snap.data();
    const uid = context.params.userId;
    logger_1.log(`Creating a Stream User Token for ${username}`);
    const tokenDocRef = index_1.firestore.collection(`users/${uid}/stream`).doc(uid);
    tokenDocRef.set({ token: helper_js_1.streamClient.createToken(username) });
};
const createGroup = async (data, context) => {
    const admin = { id: "admin" };
    const channel = helper_js_1.streamClient.channel("messaging", data.groupName, {
        name: `${data.groupName} Group Chat`,
        created_by: admin,
    });
    try {
        await channel.create();
        await channel.addMembers([...data.memberUsernames, "admin"]);
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = {
    generateToken,
    createGroup,
};
//# sourceMappingURL=streamChat.js.map