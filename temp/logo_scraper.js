// Load T212 ISIN mapping
const tickerMapping = require("/Users/peter/Projects/socii/t212_tickers.json");
const bent = require("bent");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

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

const loadLogos = async () => {
  var count = 0;
  for await (const ticker of tickerMapping) {
    // Makes reference to the storage bucket location
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
    await sleep(500);
    if (count > 100) break;
    count += 1;
  }
};

loadLogos();
