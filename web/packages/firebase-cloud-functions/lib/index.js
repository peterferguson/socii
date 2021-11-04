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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsError = exports.messaging = exports.firestore = exports.firestoreClient = exports.tradeClient = exports.streamClient = exports.iexClient = exports.functionConfig = void 0;
const index_js_1 = require("./shared/alpaca/index.js");
const admin = __importStar(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
const streamChat = __importStar(require("stream-chat"));
// * Import function modules
const accounts = __importStar(require("./accounts/index.js"));
const algoliaSearch = __importStar(require("./algoliaSearch"));
const data = __importStar(require("./data"));
const databaseOperations = __importStar(require("./databaseOperations"));
const events = __importStar(require("./events/index.js"));
const stream = __importStar(require("./stream/index.js"));
const trading = __importStar(require("./trading/index.js"));
const Client = require("iexjs").Client;
const StreamChat = streamChat.StreamChat;
// * Constant initialisation
exports.functionConfig = functions.config();
process.env.ALPACA_KEY = exports.functionConfig.alpaca.key;
process.env.ALPACA_SECRET = exports.functionConfig.alpaca.secret;
process.env.ALPACA_FIRM_ACCOUNT = exports.functionConfig.alpaca.firm_account;
process.env.STREAM_API_KEY = exports.functionConfig.stream.api_key;
process.env.STREAM_API_SECRET = exports.functionConfig.stream.secret;
process.env.IEX_API_VERSION = exports.functionConfig.iex.api_version;
process.env.IEX_TOKEN = exports.functionConfig.iex.api_key;
// INITIALISE CLIENTS
exports.iexClient = new Client({ version: process.env.IEX_API_VERSION });
exports.streamClient = new StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
exports.tradeClient = new index_js_1.TradingApi((0, index_js_1.config)(process.env.ALPACA_KEY, process.env.ALPACA_SECRET));
exports.firestoreClient = admin.initializeApp();
exports.firestore = admin.firestore();
exports.messaging = admin.messaging();
const london = "europe-west2";
exports.HttpsError = functions.https.HttpsError;
module.exports = {
    // 1 Document Listeners
    tradeConfirmation: functions
        .region(london)
        .firestore.document("groups/{groupName}/trades/{tradeId}")
        .onWrite(trading.tradeConfirmation),
    generateToken: functions
        .region(london)
        .firestore.document("users/{userId}")
        .onCreate(stream.generateToken),
    createGroup: functions
        .region(london)
        .firestore.document("groups/{groupName}")
        .onWrite(stream.createGroup),
    addToSociiansChat: functions
        .region(london)
        .firestore.document("usernames/{username}")
        .onWrite(stream.addToSociiansChat),
    incrementInvestors: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onWrite(databaseOperations.incrementInvestors),
    updateGroupChatOnInvestorChange: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onWrite(databaseOperations.updateGroupChatOnInvestorChange),
    initialDeposit: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onCreate(databaseOperations.initialDeposit),
    onTickerCreated: functions
        .region(london)
        .firestore.document("ticker/{isin}")
        .onCreate(algoliaSearch.onTickerCreated),
    checkTradeStatus: functions
        .region(london)
        .firestore.document("tradesEvents/{orderId}")
        .onCreate(trading.checkTradeStatus),
    subscribeToGroupTopic: functions
        .region(london)
        .firestore.document("groups/{groupName}/investors/{investorUsername}")
        .onWrite(databaseOperations.subscribeToGroupTopic),
    // 2 HTTPS Triggers
    // 2.1 onRequest
    loadTickersToAlgolia: functions // TODO: Convert to use new firebase extension
        .region(london)
        .https.onRequest(algoliaSearch.loadTickersToAlgolia),
    storeTimeseries: functions.region(london).https.onRequest(data.storeTimeseries),
    alpacaEvents: functions.region(london).https.onRequest(events.alpacaEvents),
    // 2.2 onCall
    tradeSubmission: functions.region(london).https.onCall(trading.tradeSubmission),
    createAccount: functions.region(london).https.onCall(accounts.createAccount),
};
//# sourceMappingURL=index.js.map