"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsError = exports.arrayUnion = exports.serverTimestamp = exports.increment = exports.firestore = void 0;
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("../serviceAccountKey.json"));
// * Constant initialisation
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = firebase_admin_1.default.credential.cert(JSON.stringify(serviceAccountKey_json_1.default));
firebase_admin_1.default.initializeApp(adminConfig);
process.env.STREAM_API_SECRET = functions.config().stream.secret;
process.env.STREAM_API_KEY = functions.config().stream.api_key;
process.env.IEX_API_VERSION = functions.config().iex.api_version;
process.env.IEX_TOKEN = functions.config().iex.api_key;
const london = "europe-west2";
// * Exportable utils
exports.firestore = firebase_admin_1.default.firestore();
exports.increment = firebase_admin_1.default.firestore.FieldValue.increment;
exports.serverTimestamp = firebase_admin_1.default.firestore.FieldValue.serverTimestamp;
exports.arrayUnion = firebase_admin_1.default.firestore.FieldValue.arrayUnion;
exports.HttpsError = functions.https.HttpsError;
// * Import function modules
const streamChat = __importStar(require("./streamChat.js"));
const commands = __importStar(require("./commands/index.js"));
const algoliaSearch = __importStar(require("./algoliaSearch.js"));
const trades = __importStar(require("./trades.js"));
const data = __importStar(require("./data.js"));
const databaseOperations = __importStar(require("./databaseOperations.js"));
module.exports = {
    // 1 Document Listeners
    tradeConfirmation: functions
        .region(london)
        .firestore.document("groups/{groupName}/trades/{messageId}")
        .onWrite(trades.tradeConfirmation),
    generateToken: functions
        .region(london)
        .firestore.document("users/{userId}")
        .onCreate(streamChat.generateToken),
    createGroup: functions
        .region(london)
        .firestore.document("groups/{groupName}")
        .onWrite(streamChat.createGroup),
    incrementInvestors: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onWrite(databaseOperations.incrementInvestors),
    onTickerCreated: functions
        .region(london)
        .firestore.document("ticker/{isin}")
        .onCreate(algoliaSearch.onTickerCreated),
    // 2 HTTPS Triggers
    // 2.1 onRequest
    loadTickersToAlgolia: functions // TODO: Convert to use new firebase extension
        .region(london)
        .https.onRequest(algoliaSearch.loadTickersToAlgolia),
    commands: functions.region(london).https.onRequest(commands.handleCommand),
    // 2.2 onCall
    alphaVantageQuery: functions.region(london).https.onCall(data.alphaVantageQuery),
    tradeSubmission: functions.region(london).https.onCall(trades.tradeSubmission),
};
//# sourceMappingURL=index.js.map