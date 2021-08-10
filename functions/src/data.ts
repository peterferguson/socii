import bent from "bent"
import { firestore, serverTimestamp, Timestamp } from "./index.js"
import { cleanJsonResponse } from "./utils/cleanJsonResponse"
import { filterKeys } from "./utils/filterKeys"

// TODO: convert to using `alphavantage` library
const alphaVantageCall = async (tickerSymbol, params) => {
  const base_url = "https://www.alphavantage.co/query?"
  const api_key = "&apikey=E9W8LZBTXVYZ31IO"
  const symbol = `&symbol=${tickerSymbol}`
  const keys = Object.keys(params)
  const queryParams = keys.map((key) => `${key}=${params[key]}`).join("&")
  const getJSON = bent("json")
  return await getJSON(base_url + queryParams + symbol + api_key)
}

const alphaVantageSummary = (tickerSymbol) => {
  return alphaVantageCall(tickerSymbol, { function: "OVERVIEW" })
}

/**
 * HTTP Cloud Function to query a alpha vantange and store in firebase.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 *
 *                     Request body must include the following attributes:
 *                      executorRef: Firestore reference to the user or group which executed the trade,
 *                      assetRef:   Firestore reference (also gives assetType)
 *                      orderType:  This will be from a set of order types so should ensure it is within those too
 *                      price:      Purchase amount (assumed to be in GBP unless currency is passed explicitly)
 *                      shares:     Float defining proportion of asset aquired
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

export const alphaVantageQuery = async (data, context) => {
  const query = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", data.tickerSymbol)
    .limit(1)

  const tickerSnapshot = await query.get()
  const tickerRef = tickerSnapshot.docs[0].ref
  const ticker = tickerSnapshot.docs[0].data()

  const dataRef = firestore.doc(`tickers/${ticker.ISIN}/data/alphaVantage`)

  const dataSnapshot = await dataRef.get()

  if (dataSnapshot.exists) {
    return filterKeys(dataSnapshot.data(), data.queryFields)
  } else {
    const response = await alphaVantageSummary(data.tickerSymbol)
    const exchange = response.Exchange || ""

    const cleanResponse = cleanJsonResponse(response)

    // * Store result in firestore
    const batch = firestore.batch()

    batch.update(tickerRef, { exchange: exchange })

    batch.set(dataRef, {
      ...cleanResponse,
      lastUpdate: serverTimestamp(),
    })

    batch.commit()
    return filterKeys(cleanResponse, data.queryFields)
  }
}

/**
 * Callable HTTP Cloud Function to take alpha vantange timeseries response
 * and store in firebase.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 *
 *                     Request body must include the following attributes:
 *                      executorRef: Firestore reference to the user or group which executed the trade,
 *                      assetRef:   Firestore reference (also gives assetType)
 *                      orderType:  This will be from a set of order types so should ensure it is within those too
 *                      price:      Purchase amount (assumed to be in GBP unless currency is passed explicitly)
 *                      shares:     Float defining proportion of asset aquired
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

export const storeTimeseries = async (data, context) => {
  const { isin, timeseries } = data.body as {
    isin: string
    timeseries: { [key: string]: string | number }[]
  }

  // - `timeseries` dates should be in ISO 8601 format (e.g. "2021-08-06T00:00:00.000Z")
  const lastUpdateQuery = firestore
    .collection(`tickers/${isin}/timeseries`)
    .orderBy("timestamp", "desc")
    .limit(1)

  const latestDoc = (await lastUpdateQuery.get()).docs.pop()

  // - filter on latest
  const latestTimestamp: Timestamp = latestDoc.data().timestamp
  const newTicks = timeseries.filter(
    (tick) => new Date(tick?.timestamp) > latestTimestamp.toDate()
  )

  // - update firestore with the timeseries data (should never be more than 500 points)
  const batch = firestore.batch()
  for (let ohlc of newTicks) {
    const { timestamp, ...data } = ohlc

    const ts = new Date(timestamp)
    const timestampNumber = ts.getTime()
    const timestampFirestoreDate = Timestamp.fromDate(ts)

    const outputRef = firestore
      .collection(`tickers/${isin}/timeseries`)
      .doc(`${timestampNumber}`)

    batch.set(outputRef, {
      ...data,
      timestamp: timestampFirestoreDate,
    })
  }
  await batch.commit()

  return
}
