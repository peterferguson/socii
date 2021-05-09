"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverTimestamp = exports.increment = exports.firestore = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);
exports.firestore = admin.firestore();
exports.increment = admin.firestore.FieldValue.increment;
exports.serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
process.env.STREAM_API_SECRET = functions.config().stream.secret;
process.env.STREAM_API_KEY = functions.config().stream.api_key;
const streamChat = require("./streamChat.js");
const algoliaSearch = require("./algoliaSearch.js");
const trades = require("./trades.js");
const london = "europe-west2";
module.exports = {
    tradeToFirestore: functions.region(london).https.onRequest(trades),
    generateToken: functions
        .region(london)
        .https.onCall(streamChat.generateToken),
    createGroup: functions.region(london).https.onCall(streamChat.createGroup),
    loadTickersToAlgolia: functions
        .region(london)
        .https.onRequest(algoliaSearch.loadTickersToAlgolia),
    onTickerCreated: functions
        .region(london)
        .firestore.document("ticker/{isin}")
        .onCreate(algoliaSearch.onTickerCreated),
};
//# sourceMappingURL=index.js.map