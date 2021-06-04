const functions = require("firebase-functions")
const admin = require("firebase-admin")
const serviceAccount = require("../serviceAccountKey.json")

// * Constant initialisation
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig)
process.env.STREAM_API_SECRET = functions.config().stream.secret
process.env.STREAM_API_KEY = functions.config().stream.api_key
process.env.IEX_API_VERSION = functions.config().iex_api_version
process.env.IEX_API_KEY = functions.config().iex_api_key
const london = "europe-west2"

// * Exportable utils
export const firestore = admin.firestore()
export const increment = admin.firestore.FieldValue.increment
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export const arrayUnion = admin.firestore.FieldValue.arrayUnion
export const HttpsError = functions.https.HttpsError

// * Import function modules
const streamChat = require("./streamChat.js")
const commands = require("./commands/index.js")
const algoliaSearch = require("./algoliaSearch.js")
const trades = require("./trades.js")
const data = require("./data.js")
const documentListeners = require("./documentListeners.js")

module.exports = {
  tradeSubmission: functions.region(london).https.onCall(trades.tradeSubmission),
  tradeConfirmation: functions.region(london).https.onCall(trades.tradeConfirmation),
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
}
