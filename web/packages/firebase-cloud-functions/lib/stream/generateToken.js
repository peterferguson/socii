"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const logger_1 = require("firebase-functions/lib/logger");
const index_1 = require("../index");
const streamClient_1 = require("../utils/streamClient");
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
    (0, logger_1.log)(`Creating a Stream User Token for ${username}`);
    // TODO: redesign user collection to have profile & secret parts
    // TODO: Store this as a field on the users secrets subcollection
    const tokenDocRef = index_1.firestore
        .collection(`users/${uid}/stream`)
        .doc(process.env.NODE_ENV === "production" ? "production" : "development");
    tokenDocRef.set({ token: streamClient_1.streamClient.createToken(username) });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map