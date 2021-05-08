const functions = require("firebase-functions");
// Config var initialisation
// process.env.ALGOLIA_ID = functions.config().algolia.app_id;
// process.env.ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
process.env.STREAM_API_SECRET = functions.config().stream.secret;
process.env.STREAM_API_KEY = functions.config().stream.api_key;
const streamChat = require("./streamChat.js");
const trades = require("./trades.js");
// const algoliaSearch = require("./algoliaSearch.js");
const london = "europe-west2";
module.exports = {
    tradeToFirestore: functions.region(london).https.onRequest(trades),
    generateToken: functions.region(london).https.onRequest(streamChat),
};
//# sourceMappingURL=index.js.map