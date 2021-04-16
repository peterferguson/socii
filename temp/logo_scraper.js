// Load T212 ISIN mapping
const tickerMapping = require("/Users/peter/Projects/socii/temp/t212_tickers.json");
const bent = require("bent");
const admin = require("firebase-admin");
const serviceAccount = require("/Users/peter/Projects/socii/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sociiinvest.appspot.com/",
});

const downloadLogo = async (instrumentCode) => {
  uri = `https://trading212equities.s3.eu-central-1.amazonaws.com/${instrumentCode}.png`;
  const getBuffer = bent("buffer");
  return await getBuffer(uri);
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const uploadLogo = (ticker) => {
  fileUrl = `logos/${ticker.isin}.png`;

    const bucket = admin.storage().bucket();
    const file = bucket.file(fileUrl);
    file.exists().then(async (data) => {
      const exists = data[0];
      if (exists) {
        console.log(`File ${fileUrl} was already exists`);
      } else {
        const buffer = await downloadLogo(ticker.instrumentCode);
        file.save(buffer, (err) => {
          if (!err) {
            console.log(`Sucessfully uploaded ${fileUrl}`);
          } else {
            console.log(
              `There was an error while saving the file ${fileUrl}:\n ${err}`
            );
          }
        });
      }
    });
}

const loadLogos = async () => {
  var count = 0;
  for await (const ticker of tickerMapping) {
    // Makes reference to the storage bucket location
    uploadLogo(ticker)
    await sleep(500);
    if (count > 100) break;
    count += 1;
  }
};

// loadLogos();

const popularTickersLogos = async () => {
  popularTickers=["US98980L1017" ,"LU1778762911" ,"US01609W1027" ,"US0231351067" ,"US0378331005" ,"US36467W1099" ,"US64110L1061" ,"US67066G1040" ,"US88160R1014" ,"US88339J1051" ,"US90353T1007"]
  uploaded = [];
  for await ( const ticker of tickerMapping) {
    if (popularTickers.includes(ticker.isin) && !uploaded.includes(ticker.isin)) {
      uploadLogo(ticker)
      uploaded.push(ticker.isin)
    }
  }

}

popularTickersLogos()