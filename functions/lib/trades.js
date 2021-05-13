"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
// Helper prototype methods for checking http request constraints
const allKeysContainedIn = (object, other) => {
    let keys = null;
    switch (typeof object) {
        case "object":
            if (Array.isArray(object)) {
                keys = object;
            }
            else {
                keys = Object.keys(object);
            }
            break;
    }
    // Ensure that the object has all of the keys in `other`
    return keys.every((key) => key in other);
};
/**
 * HTTP Cloud Function to store a purchases data in firebase.
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
const tradeToFirestore = async (req, res) => {
    const requiredArgs = {
        executorRef: null,
        assetRef: null,
        orderType: null,
        price: null,
        shares: null,
    };
    const optionalArgs = {
        executionCurrency: "GBP",
        assetType: "",
        shortName: "",
        tickerSymbol: "",
    };
    // * Check for default args and assign them if they exist else end function with 422
    if (!allKeysContainedIn(requiredArgs, req.body)) {
        res
            .status(422)
            .send(`Please ensure request has all of the following keys: ${JSON.stringify(Object.keys(requiredArgs))}`);
        return;
    }
    const assetRef = index_js_1.firestore.doc(req.body.assetRef);
    const assetData = await assetRef.get();
    requiredArgs.assetRef = assetRef;
    optionalArgs.assetType = assetData.get("assetType");
    optionalArgs.shortName = assetData.get("shortName");
    optionalArgs.tickerSymbol = assetData.get("tickerSymbol");
    Object.keys(requiredArgs).map((key) => (requiredArgs[key] = req.body[key]));
    // * Add a new trade document with a generated id & update holdings
    const batch = index_js_1.firestore.batch();
    const tradeRef = await index_js_1.firestore
        .collection(`${requiredArgs.executorRef}/trades`)
        .doc();
    let tradeData = {
        ...optionalArgs,
        ...requiredArgs,
        timestamp: index_js_1.serverTimestamp(),
    };
    // * Update the holdings avgPrice & shares
    const holdingRef = index_js_1.firestore
        .collection(`${requiredArgs.executorRef}/holdings`)
        .doc(assetData.get("ISIN"));
    const negativeEquityMultiplier = requiredArgs.orderType.includes("BUY")
        ? 1
        : -1;
    // ! We keep holdings which have zero shares in order to easily identify all previous
    // ! holdings of the client without needing to count over trades. This is imposed in the
    // ! firestore rules.
    // ! On selling shares the cost basis is not affected & so only the shares is changed
    const sharesIncrement = negativeEquityMultiplier * requiredArgs.shares;
    // * Check if the holding already exists
    const doc = await holdingRef.get();
    if (doc.exists) {
        const currentShares = doc.get("shares");
        const currentAvgPrice = doc.get("avgPrice");
        const newAvgPrice = negativeEquityMultiplier + 1
            ? (currentAvgPrice * currentShares +
                requiredArgs.price * requiredArgs.shares) /
                (currentShares + requiredArgs.shares)
            : currentAvgPrice;
        // * Add profit to a sell trade on a current holding
        if (!(negativeEquityMultiplier + 1)) {
            tradeData["pnlPercentage"] =
                (100 * (requiredArgs.price - currentAvgPrice)) / currentAvgPrice;
        }
        batch.update(holdingRef, {
            avgPrice: newAvgPrice,
            shares: index_js_1.increment(sharesIncrement),
            lastUpdated: index_js_1.serverTimestamp(),
        });
    }
    else {
        batch.set(holdingRef, {
            assetRef,
            avgPrice: requiredArgs.price / requiredArgs.shares,
            shares: index_js_1.increment(sharesIncrement),
            tickerSymbol: assetData.get("tickerSymbol"),
            shortName: assetData.get("shortName"),
            lastUpdated: index_js_1.serverTimestamp(),
        });
    }
    batch.set(tradeRef, tradeData);
    const batchResponse = await batch.commit();
    res.status(200).send(`Document written at: ${JSON.stringify(batchResponse)}`);
};
module.exports = tradeToFirestore;
//# sourceMappingURL=trades.js.map