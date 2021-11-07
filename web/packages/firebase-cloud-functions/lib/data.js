"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeTimeseries = void 0;
const index_js_1 = require("./firestore/index.js");
const index_js_2 = require("./index.js");
// - whitelist cannot be accessed by the firestore client outside the yahoo folder
// - but can be read by vercel here so adding the whitelist to the yahoo folder
const whitelist_js_1 = require("./shared/whitelist.js");
const cors = require("cors")({ origin: whitelist_js_1.whitelist });
/**
 * Callable HTTP Cloud Function to tdsake alpha antange timeseries response
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
        const lastUpdateQuery = index_js_2.firestore
            .collection(`tickers/${isin}/timeseries`)
            .orderBy("timestamp", "desc")
            .limit(1);
        try {
            const latestDoc = (await lastUpdateQuery.get()).docs.pop();
            // - filter on latest
            const latestTimestamp = latestDoc.data().timestamp;
            const newTicks = timeseries.filter(tick => new Date(tick?.timestamp) > latestTimestamp.toDate());
            // - update firestore with the timeseries data (should never be more than 500 points)
            const batch = index_js_2.firestore.batch();
            for (let ohlc of newTicks) {
                const { timestamp, ...data } = ohlc;
                const ts = new Date(timestamp);
                const timestampNumber = ts.getTime();
                const timestampFirestoreDate = index_js_1.Timestamp.fromDate(ts);
                const outputRef = index_js_2.firestore
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