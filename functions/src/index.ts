const functions = require("firebase-functions")
const { Client } = require("iexjs")
import admin from "firebase-admin"

// * Import function modules
import * as accounts from "./accounts/index.js"
import * as algoliaSearch from "./algoliaSearch.js"
import * as commands from "./commands/index.js"
import * as data from "./data.js"
import * as databaseOperations from "./databaseOperations.js"
import * as events from "./events/index.js"
import * as streamChat from "./streamChat.js"
import * as trading from "./trading/index.js"


// * Constant initialisation
process.env.ALPACA_KEY = functions.config().alpaca.key
process.env.ALPACA_SECRET = functions.config().alpaca.secret
process.env.ALPACA_FIRM_ACCOUNT = functions.config().alpaca.firm_account
process.env.STREAM_API_SECRET = functions.config().stream.secret
process.env.STREAM_API_KEY = functions.config().stream.api_key
process.env.IEX_API_VERSION = functions.config().iex.api_version
process.env.IEX_TOKEN = functions.config().iex.api_key

export const firestoreClient = admin.initializeApp()
export const firestore = admin.firestore()
export const iexClient = new Client({ version: process.env.IEX_API_VERSION })

const london = "europe-west2"
export const HttpsError = functions.https.HttpsError

module.exports = {
  // 1 Document Listeners
  tradeConfirmation: functions
    .region(london)
    .firestore.document("groups/{groupName}/trades/{messageId}")
    .onWrite(trading.tradeConfirmation),
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
  // 2 HTTPS Triggers
  // 2.1 onRequest
  loadTickersToAlgolia: functions // TODO: Convert to use new firebase extension
    .region(london)
    .https.onRequest(algoliaSearch.loadTickersToAlgolia),
  commands: functions.region(london).https.onRequest(commands.handleCommand),
  storeTimeseries: functions.region(london).https.onRequest(data.storeTimeseries),
  alpacaEvents: functions.region(london).https.onRequest(events.alpacaEvents),
  // 2.2 onCall
  alphaVantageQuery: functions.region(london).https.onCall(data.alphaVantageQuery),
  tradeSubmission: functions.region(london).https.onCall(trading.tradeSubmission),
  updateHolding: functions.region(london).https.onCall(trading.updateHolding),
  createAccount: functions.region(london).https.onCall(accounts.createAccount),
}
