// Load T212 ISIN mapping
const tickerMapping = require("/Users/peter/Projects/socii/app/temp/t212_tickers.json")
const bent = require("bent")
const admin = require("firebase-admin")
const serviceAccount = require("/Users/peter/Projects/socii/app/serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sociiinvest.appspot.com/",
})

async function makePublic(file) {
  await file.makePublic()

  console.log(`gs://${bucketName}/${fileName} is now public.`)
}

makePublic().catch(console.error)

const downloadLogo = async (instrumentCode) => {
  uri = `https://trading212equities.s3.eu-central-1.amazonaws.com/${instrumentCode}.png`
  const getBuffer = bent("buffer")
  return await getBuffer(uri)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const uploadLogo = (ticker) => {
  fileUrl = `logos/${ticker.isin}.png`

  const bucket = admin.storage().bucket()
  const file = bucket.file(fileUrl)
  file.exists().then(async (data) => {
    const exists = data?.[0]
    if (exists) {
      console.log(`File ${fileUrl} was already exists`)
      makePublic(file)
      // } else {
      //   const buffer = await downloadLogo(ticker.instrumentCode);
      //   file.save(buffer, (err) => {
      //     if (!err) {
      //       console.log(
      //         `Sucessfully uploaded logo for ${ticker.instrumentCode} at ${fileUrl}`
      //       );
      //     } else {
      //       console.log(
      //         `There was an error while saving the file ${fileUrl}:\n ${err}`
      //       );
      //     }
      //   });
      //   makePublic(file)
    }
  })
}

const loadLogos = async () => {
  let count = 0
  for await (const ticker of tickerMapping) {
    // Makes reference to the storage bucket location
    uploadLogo(ticker)
    await sleep(500)
    if (count > 100) break
    count += 1
  }
}

// loadLogos();

const popularTickersLogos = async () => {
  uploaded = []
  const tickers = tickerMapping.filter((ticker) => ticker.isin?.includes("US"))
  for await (const ticker of tickers) {
    if (!uploaded.includes(ticker.isin)) {
      uploadLogo(ticker)
      uploaded.push(ticker.isin)
    }
  }
}

popularTickersLogos()
