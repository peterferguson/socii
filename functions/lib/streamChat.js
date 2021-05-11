"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamChat = require("stream-chat").StreamChat;
const index_1 = require("./index");
const apiSecret = process.env.STREAM_API_SECRET;
const apiKey = process.env.STREAM_API_KEY;
const generateToken = async (data, context) => {
    const uid = context.auth.uid;
    const client = new StreamChat(apiKey, apiSecret);
    const token = client.createToken(data.username);
    const tokenDocRef = index_1.firestore
        .collection(`users/${uid}/stream`)
        .doc(uid);
    tokenDocRef.set({ token });
};
const createGroup = async (data, context) => {
    const client = new StreamChat(apiKey, apiSecret);
    const admin = { id: "admin" };
    const channel = client.channel("team", "group-chat", {
        name: data.groupName,
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