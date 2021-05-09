"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const StreamChat = require("stream-chat").StreamChat;
const index_1 = require("./index");
const apiSecret = process.env.STREAM_API_SECRET;
const apiKey = process.env.STREAM_API_KEY;
const generateToken = (data, context) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = context.auth.uid;
    const client = new StreamChat(apiKey, apiSecret);
    const token = client.createToken(data.username);
    const tokenDocRef = index_1.firestore
        .collection(`users/${uid}/stream`)
        .doc(uid);
    tokenDocRef.set({ token });
});
const createGroup = (data, context) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new StreamChat(apiKey, apiSecret);
    const admin = { id: "admin" };
    const channel = client.channel("team", "group-chat", {
        name: data.groupName,
        created_by: admin,
    });
    try {
        yield channel.create();
        yield channel.addMembers([...data.memberUsernames, "admin"]);
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = {
    generateToken,
    createGroup,
};
//# sourceMappingURL=streamChat.js.map