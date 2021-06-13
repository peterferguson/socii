import algoliasearch from "algoliasearch"
import { firestore } from "./index"

// Config var initialisation
const ALGOLIA_ID = process.env.ALGOLIA_ID
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY

// Client Initialisation
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

/**
 * HTTP function to do an initial load of tickers in /tickers/:documentId/ to the
 * the search index.
 */
export const loadTickersToAlgolia = async (req, res) => {
  // This array will contain all records to be indexed in Algolia.
  // A record does not need to necessarily contain all properties of the Firestore
  // document, only the relevant ones.
  const algoliaRecords = []
  const indexName = "tickers" // Ensure collection and index match in name
  const collectionIndex = client.initIndex(indexName)

  // Retrieve all documents from the tickers collection.
  const querySnapshot = await firestore.collection(indexName).get()

  querySnapshot.docs.slice(0, 3).forEach(async (doc) => {
    const document = doc.data()

    const record = {
      objectID: doc.id, // use document id as the objectID
      ISIN: document.ISIN,
      longName: document.longName,
      shortName: document.shortName,
      tickerSymbol: document.tickerSymbol,
    }

    algoliaRecords.push(record)
  })

  collectionIndex.saveObjects(algoliaRecords, (_error, content) => {
    res.status(200).send("COLLECTION was indexed to Algolia successfully.")
  })
}

/**
 * Listens for new tickers added to /tickers/:documentId/ and updates
 * the search index every time a ticker is added to the database.
 */
export const onTickerCreated = (snap, context) => {
  // Get the ticker document
  const ticker = snap.data()

  // Add an 'objectID' field which Algolia requires
  ticker.objectID = context.params.isin

  // Write to the algolia index
  const index = client.initIndex(JSON.stringify(ticker))
  return index.saveObject(ticker)
}
