"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
const bent = require("bent");
// - Helper functions
const filterKeys = (obj, keyList) => Object.fromEntries(Object.entries(obj).filter(([k]) => keyList.includes(k)));
const alphaVantageCall = async (tickerSymbol, params) => {
    const base_url = "https://www.alphavantage.co/query?";
    const api_key = "&apikey=E9W8LZBTXVYZ31IO";
    const symbol = `&symbol=${tickerSymbol}`;
    const keys = Object.keys(params);
    const queryParams = keys.map((key) => `${key}=${params[key]}`).join("&");
    const getJSON = bent("json");
    return await getJSON(base_url + queryParams + symbol + api_key);
};
const alphaVantageSummary = (tickerSymbol) => {
    return alphaVantageCall(tickerSymbol, { function: "OVERVIEW" });
};
const willItFloat = (str) => {
    const lettersRegex = /[a-zA-Z]/;
    if (lettersRegex.test(str))
        return str;
    const parsed = parseFloat(str);
    return isNaN(parsed) ? str : parsed;
};
const isUpperCase = (str) => {
    return str === str.toUpperCase() && str !== str.toLowerCase();
};
const camelCase = (str) => {
    if (isUpperCase(str))
        return str;
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (/\s+/.test(match))
            return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};
const cleanJsonResponse = (response) => {
    const keys = Object.keys(response);
    let cleaned = {};
    for (const key of keys) {
        cleaned[camelCase(key)] =
            response[key] === "None" ? null : willItFloat(response[key]);
    }
    return cleaned;
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
    const ticker = await tickerSnapshot.docs[0].data();
    const dataRef = index_js_1.firestore.doc(`tickers/${ticker.ISIN}/data/alphaVantage`);
    const dataSnapshot = await dataRef.get();
    if (dataSnapshot.exists) {
        return filterKeys(await dataSnapshot.data(), data.queryFields);
    }
    else {
        const response = await alphaVantageSummary(data.tickerSymbol);
        const cleanResponse = cleanJsonResponse(response);
        // * Store result in firestore
        dataRef.set({
            ...cleanResponse,
            lastUpdate: index_js_1.serverTimestamp(),
        });
        return filterKeys(cleanResponse, data.queryFields);
    }
};
module.exports = {
    alphaVantageQuery,
};
//# sourceMappingURL=data.js.map