const functions = require("firebase-functions")
const Client = require("iexjs").Client
const StreamChat = require("stream-chat").StreamChat
import admin from "firebase-admin"
import { config, TradingApi } from "../shared/alpaca/index.js"
// * Import function modules
import * as accounts from "./accounts/index.js"
import * as algoliaSearch from "./algoliaSearch"
import * as data from "./data"
import * as databaseOperations from "./databaseOperations"
import * as events from "./events/index.js"
import * as stream from "./stream/index.js"
import * as trading from "./trading/index.js"

// * Constant initialisation
export const functionConfig = functions.config()
process.env.ALPACA_KEY = functionConfig.alpaca.key
process.env.ALPACA_SECRET = functionConfig.alpaca.secret
process.env.ALPACA_FIRM_ACCOUNT = functionConfig.alpaca.firm_account
process.env.STREAM_API_KEY = functionConfig.stream.api_key
process.env.STREAM_API_SECRET = functionConfig.stream.secret
process.env.IEX_API_VERSION = functionConfig.iex.api_version
process.env.IEX_TOKEN = functionConfig.iex.api_key

// INITIALISE CLIENTS
export const iexClient = new Client({ version: process.env.IEX_API_VERSION })
export const streamClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
export const tradeClient = new TradingApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)
export const firestoreClient = admin.initializeApp()
export const firestore = admin.firestore()
export const messaging = admin.messaging()

const london = "europe-west2"
export const HttpsError = functions.https.HttpsError

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
  alphaVantageQuery: functions.region(london).https.onCall(data.alphaVantageQuery),
  tradeSubmission: functions.region(london).https.onCall(trading.tradeSubmission),
  updateHolding: functions.region(london).https.onCall(trading.updateHolding),
  createAccount: functions.region(london).https.onCall(accounts.createAccount),
  updateUserData: functions.region(london).https.onCall(accounts.updateUserData),
}
