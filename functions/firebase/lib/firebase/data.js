"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTimeseries = exports.alphaVantageQuery = void 0;
const bent_1 = __importDefault(require("bent"));
const index_js_1 = require("./index.js");
const index_js_2 = require("./firestore/index.js");
const cleanJsonResponse_1 = require("./utils/cleanJsonResponse");
const filterKeys_1 = require("./utils/filterKeys");
// - whitelist cannot be accessed by the firestore client outside the yahoo folder
// - but can be read by vercel here so adding the whitelist to the yahoo folder
const whitelist_js_1 = require("../shared/whitelist.js");
const cors = require("cors")({ origin: whitelist_js_1.whitelist });
// TODO: convert to using `alphavantage` library
const alphaVantageCall = async (tickerSymbol, params) => {
    const base_url = "https://www.alphavantage.co/query?";
    const api_key = "&apikey=E9W8LZBTXVYZ31IO";
    const symbol = `&symbol=${tickerSymbol}`;
    const keys = Object.keys(params);
    const queryParams = keys.map((key) => `${key}=${params[key]}`).join("&");
    const getJSON = bent_1.default("json");
    return await getJSON(base_url + queryParams + symbol + api_key);
};
const alphaVantageSummary = (tickerSymbol) => {
    return alphaVantageCall(tickerSymbol, { function: "OVERVIEW" });
};
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
const alphaVantageQuery = async (data, context) => {
    const query = index_js_1.firestore
        .collection("tickers")
        .where("tickerSymbol", "==", data.tickerSymbol)
        .limit(1);
    const tickerSnapshot = await query.get();
    const tickerRef = tickerSnapshot.docs[0].ref;
    const ticker = tickerSnapshot.docs[0].data();
    const dataRef = index_js_1.firestore.doc(`tickers/${ticker.ISIN}/data/alphaVantage`);
    const dataSnapshot = await dataRef.get();
    if (dataSnapshot.exists) {
        return filterKeys_1.filterKeys(dataSnapshot.data(), data.queryFields);
    }
    else {
        const response = await alphaVantageSummary(data.tickerSymbol);
        const exchange = response.Exchange || "";
        const cleanResponse = cleanJsonResponse_1.cleanJsonResponse(response);
        // * Store result in firestore
        const batch = index_js_1.firestore.batch();
        batch.update(tickerRef, { exchange: exchange });
        batch.set(dataRef, {
            ...cleanResponse,
            lastUpdate: index_js_2.serverTimestamp(),
        });
        batch.commit();
        return filterKeys_1.filterKeys(cleanResponse, data.queryFields);
    }
};
exports.alphaVantageQuery = alphaVantageQuery;
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
const storeTimeseries = (req, res) => {
    cors(req, res, async () => {
        const { isin, timeseries } = req.body;
        if (!timeseries.length || !isin)
            return res.status(400).send("No isin or timeseries data");
        // - `timeseries` dates should be in ISO 8601 format (e.g. "2021-08-06T00:00:00.000Z")
        const lastUpdateQuery = index_js_1.firestore
            .collection(`tickers/${isin}/timeseries`)
            .orderBy("timestamp", "desc")
            .limit(1);
        try {
            const latestDoc = (await lastUpdateQuery.get()).docs.pop();
            // - filter on latest
            const latestTimestamp = latestDoc.data().timestamp;
            const newTicks = timeseries.filter((tick) => new Date(tick?.timestamp) > latestTimestamp.toDate());
            // - update firestore with the timeseries data (should never be more than 500 points)
            const batch = index_js_1.firestore.batch();
            for (let ohlc of newTicks) {
                const { timestamp, ...data } = ohlc;
                const ts = new Date(timestamp);
                const timestampNumber = ts.getTime();
                const timestampFirestoreDate = index_js_2.Timestamp.fromDate(ts);
                const outputRef = index_js_1.firestore
                    .collection(`tickers/${isin}/timeseries`)
                    .doc(`${timestampNumber}`);
                batch.set(outputRef, {
                    ...data,
                    timestamp: timestampFirestoreDate,
                });
            }
            await batch.commit();
            return res.status(200).send("OK");
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
};
exports.storeTimeseries = storeTimeseries;
//# sourceMappingURL=data.js.map