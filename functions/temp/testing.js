// ! Testing alphavantage library
// const bent = require("bent")
// const alpha = require("alphavantage")({ key: "E9W8LZBTXVYZ31IO" })
// alpha.data.quote("TSLA").then((r) => console.log(r))
// alpha.fundamental.company_overview("EZJ.L").then((r) => console.log(r))
// alpha.data.search("IAG").then((r) => console.log(r))

// ! Testing iexjs library
// const { Client } = require("iexjs")
// const client = new Client({ version: "stable" })
// const fs = require("fs")

// client
//   .internationalExchanges()
//   .then((e) =>
//     // console.log(e.filter((e) => e.description.toLowerCase().includes("london")))
//     fs.writeFileSync("./iexMarkets.json", JSON.stringify(e))
//   )

// client.quote("KRX-ID").then((e) => console.log(e))

// ! Update the market information in firebase

// const admin = require("firebase-admin")
// const serviceAccount = require("../serviceAccountKey.json")

// // * Constant initialisation
// const adminConfig = {
//   storageBucket: "sociiinvest.appspot.com",
//   projectId: "sociiinvest",
// }
// adminConfig.credential = admin.credential.cert(serviceAccount)
// admin.initializeApp(adminConfig)
// const firestore = admin.firestore()

// // ! Be sure to export FIRESTORE_EMULATOR_HOST="localhost:8080"

// const iexMarkets = require("./iexMarkets.json")

const iexMarketSuffixMap = {
  "Euronext Dublin": "-ID",
}

// const ukTickersQuery = firestore
//   .collection("tickers")
//   .where("marketCountry", ">=", "Ireland")
//   .limit(5)

// ukTickersQuery.get().then((querySnapshot) => {
//   querySnapshot.docs.map((tickerDocSnapshot) => {
//     data = tickerDocSnapshot.data()

//     console.log(data)

//     const {
//       marketCountry,
//       marketName,
//       yahooMarketSuffix,
//       exchangeAbbreviation,
//       ...rest
//     } = data

//     console.log({
//       ...rest,
//       market: {
//         exchangeAbbreviation,
//         name: marketName,
//         country: marketCountry,
//         yahooSuffix: yahooMarketSuffix,
//       },
//     })
//   })
// })
