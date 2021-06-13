import * as functions from "firebase-functions"
import admin from "firebase-admin"
import serviceAccount from "../serviceAccountKey.json"

// * Constant initialisation
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(JSON.stringify(serviceAccount))
admin.initializeApp(adminConfig)

process.env.STREAM_API_SECRET = functions.config().stream.secret
process.env.STREAM_API_KEY = functions.config().stream.api_key
process.env.IEX_API_VERSION = functions.config().iex.api_version
process.env.IEX_TOKEN = functions.config().iex.api_key
const london = "europe-west2"

// * Exportable utils
export const firestore = admin.firestore()
export const increment = admin.firestore.FieldValue.increment
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export const arrayUnion = admin.firestore.FieldValue.arrayUnion
export const HttpsError = functions.https.HttpsError

// * Import function modules
import * as streamChat from "./streamChat.js"
import * as commands from "./commands/index.js"
import * as algoliaSearch from "./algoliaSearch.js"
import * as trades from "./trades.js"
import * as data from "./data.js"
import * as databaseOperations from "./databaseOperations.js"

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
}
