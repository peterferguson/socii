const functions = require("firebase-functions")
import admin from "firebase-admin"
import * as algoliaSearch from "./algoliaSearch.js"
import * as commands from "./commands/index.js"
import * as data from "./data.js"
import * as databaseOperations from "./databaseOperations.js"
// * Import function modules
import * as streamChat from "./streamChat.js"
import * as trading from "./trading/index.js"
const serviceAccount = require("../serviceAccountKey.json")
const { Client } = require("iexjs")

// * Constant initialisation
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig)

process.env.ALPACA_KEY = functions.config().alpaca.key
process.env.ALPACA_SECRET = functions.config().alpaca.secret
process.env.STREAM_API_SECRET = functions.config().stream.secret
process.env.STREAM_API_KEY = functions.config().stream.api_key
process.env.IEX_API_VERSION = functions.config().iex.api_version
process.env.IEX_TOKEN = functions.config().iex.api_key
// TODO when we align to one alpaca test broker this should change to function.config
//process.env.ALPACA_FIRM_ACCOUNT = functions.config().ALPACA_FIRM_ACCOUNT

export const iexClient = new Client({ version: process.env.IEX_API_VERSION })

const london = "europe-west2"

// * Exportable utils
export const firestore = admin.firestore()
export const increment = admin.firestore.FieldValue.increment
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export type Timestamp = admin.firestore.Timestamp
export const Timestamp = admin.firestore.Timestamp
export const arrayUnion = admin.firestore.FieldValue.arrayUnion
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
  // 2 HTTPS Triggers
  // 2.1 onRequest
  loadTickersToAlgolia: functions // TODO: Convert to use new firebase extension
    .region(london)
    .https.onRequest(algoliaSearch.loadTickersToAlgolia),
  commands: functions.region(london).https.onRequest(commands.handleCommand),
  storeTimeseries: functions.region(london).https.onRequest(data.storeTimeseries),
  // 2.2 onCall
  alphaVantageQuery: functions.region(london).https.onCall(data.alphaVantageQuery),
  tradeSubmission: functions.region(london).https.onCall(trading.tradeSubmission),
  updateHolding: functions.region(london).https.onCall(trading.updateHolding),
}
