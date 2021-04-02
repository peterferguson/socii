const tickerMapping = require('/Users/peter/Projects/socii/temp/t212_tickers.json');

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sociiinvest.appspot.com/",
});

firestore = admin.firestore();

async function uploadTickerISIN() {
  const tickersRef = firestore.collection('tickers');
    
  for await (const ticker of tickerMapping) {
    await tickersRef.doc(ticker.isin).set({tickerSymbol: ""})
  }
}

uploadTickerISIN()
