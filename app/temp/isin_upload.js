const tickerMapping = require("/Users/peter/Projects/socii/app/temp/t212_tickers.json");

const fs = require("fs");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sociiinvest.appspot.com/",
});

firestore = admin.firestore();

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

async function uploadTickerISIN() {
  const tickersRef = firestore.collection("tickers");

  for await (const ticker of tickerMapping) {
    await tickersRef.doc(ticker.isin).set({ tickerSymbol: "" });
  }
}

// uploadTickerISIN();

async function deleteEmptyTicker() {
  const tickersRef = firestore
    .collection("tickers")
    .where("exchangeAbbreviation", "==", "");

  const emptyTickers = (await tickersRef.get()).docs;

  const tickerInfo = tickerMapping.filter((ticker) =>
    emptyTickers.map((doc) => doc.data().ISIN).includes(ticker?.isin)
  );

  const fileUrl = (ticker) => `logos/${ticker.ISIN}.png`;
  const bucket = admin.storage().bucket();

  for await (const doc of emptyTickers) {
    const ticker = doc.data();

    console.log(`deleting ${ticker.ISIN}`);

    const logoUrl = fileUrl(ticker);
    // * Delete the logo
    const file = bucket.file(logoUrl);
    file
      .exists()
      .then(await file.delete((err, apiResponse) => {}))
      .catch(console.log(`No logo existed at ${logoUrl}`));

    // * Delete firestore document
    await doc.ref.delete();
  }

  console.log(tickerInfo);

  storeData(
    tickerInfo,
    "/Users/peter/Projects/socii/app/temp/deletedTickers.json"
  );
}

// deleteEmptyTicker();

async function addExchangeToTicker() {
  const tickersWithDataRef = firestore.collectionGroup("data");

  const tickersWithDataDocs = (await tickersWithDataRef.get()).docs;
  for await (const doc of tickersWithDataDocs) {
    const data = doc.data();
    if ("exchange" in data) {
      console.log(data.symbol);
      const tickerRef = firestore.doc(doc.ref.path.split("/data")[0]);
      tickerRef.update({ exchange: data.exchange });
    }
  }
}

// addExchangeToTicker();
