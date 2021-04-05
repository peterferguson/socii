const algoliasearch = require("algoliasearch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("/Users/peter/Projects/socii/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sociiinvest.appspot.com/",
});

// Config var initialisation
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = "tickers";

// Client Initialisation
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const firestore = admin.firestore();

/**
 * Listens for new tickers added to /tickers/:documentId/ and updates
 * the search index every time a ticker is added to the database.
 */
exports.onTickerCreated = functions.firestore
  .document("ticker/{isin}")
  .onCreate((snap, context) => {
    // Get the ticker document
    const ticker = snap.data();

    // Add an 'objectID' field which Algolia requires
    ticker.objectID = context.params.isin;

    // Write to the algolia index
    const index = client.initIndex(ticker);
    return index.saveObject(ticker);
  });

/**
 * HTTP function to do an initial load of tickers in /tickers/:documentId/ to the
 * the search index.
 */
exports.loadTickersToAlgolia = functions.https.onRequest(async (req, res) => {
  // This array will contain all records to be indexed in Algolia.
  // A record does not need to necessarily contain all properties of the Firestore
  // document, only the relevant ones.
  const algoliaRecords = [];
  const indexName = "tickers"; // Ensure collection and index match in name
  const collectionIndex = client.initIndex(indexName);

  // Retrieve all documents from the tickers collection.
  const querySnapshot = await firestore.collection(indexName).get();

  querySnapshot.docs.forEach(async (doc) => {
    const document = doc.data();

    const { hits } = await collectionIndex.search(document.tickerSymbol, {
      attributesToRetrieve: ["ISIN"],
      hitsPerPage: 1,
    });

    if (!hits) {
      console.log(document);
    }
    // const record = {
    //   objectID: doc.id, // use document id as the objectID
    //   ISIN: document.ISIN,
    //   longName: document.longName,
    //   shortName: document.shortName,
    //   tickerSymbol: document.tickerSymbol,
    // };

    // algoliaRecords.push(record);
  });

  // collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
  //   res.status(200).send("COLLECTION was indexed to Algolia successfully.");
  // });
});
