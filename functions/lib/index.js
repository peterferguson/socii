"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsError = exports.arrayUnion = exports.serverTimestamp = exports.increment = exports.firestore = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);
exports.firestore = admin.firestore();
exports.increment = admin.firestore.FieldValue.increment;
exports.serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
exports.arrayUnion = admin.firestore.FieldValue.arrayUnion;
exports.HttpsError = functions.https.HttpsError;
process.env.STREAM_API_SECRET = functions.config().stream.secret;
process.env.STREAM_API_KEY = functions.config().stream.api_key;
const london = "europe-west2";
const streamChat = require("./streamChat.js");
const commands = require("./commands/index.js");
const algoliaSearch = require("./algoliaSearch.js");
const trades = require("./trades.js");
const data = require("./data.js");
const documentListeners = require("./documentListeners.js");
module.exports = {
    tradeToFirestore: functions.region(london).https.onRequest(trades),
    alphaVantageQuery: functions.region(london).https.onCall(data.alphaVantageQuery),
    generateToken: functions
        .region(london)
        .firestore.document("users/{userId}")
        .onCreate(streamChat.generateToken),
    createGroup: functions.region(london).https.onCall(streamChat.createGroup),
    loadTickersToAlgolia: functions
        .region(london)
        .https.onRequest(algoliaSearch.loadTickersToAlgolia),
    incrementInvestors: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onWrite(documentListeners.incrementInvestors),
    onTickerCreated: functions
        .region(london)
        .firestore.document("ticker/{isin}")
        .onCreate(algoliaSearch.onTickerCreated),
    commands: functions.region(london).https.onRequest(commands.handleCommand),
};
//# sourceMappingURL=index.js.map