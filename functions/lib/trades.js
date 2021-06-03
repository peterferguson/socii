"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("firebase-functions").logger;
const index_js_1 = require("./index.js");
const helper_js_1 = require("./utils/helper.js");
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
    const negativeEquityMultiplier = requiredArgs.orderType.includes("BUY") ? 1 : -1;
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
            ? (currentAvgPrice * currentShares + requiredArgs.price * requiredArgs.shares) /
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
/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor

- tradeConfirmation
1. Add the uid/username of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update
2. holdings and send confirmation message with the price at which the asset was purchased
*/
const tradeSubmission = async (data, context) => {
    verifyUser(context);
    const args = await verifyContent(data, context);
    const { messageId } = data;
    logger.log(messageId);
    logger.log(args);
    // * Create trade document
    const tradeRef = await index_js_1.firestore.collection(`${args.groupRef}/trades`).doc(messageId);
    // * Store initial trade data
    tradeRef.set({
        ...args,
        agreesToTrade: [args.executorRef],
        timestamp: index_js_1.serverTimestamp(),
    });
};
const tradeConfirmation = async (data, context) => {
    verifyUser(context);
    const groupName = data.groupRef.split("/")[-1];
    const { messageId } = data;
    const groupRef = await index_js_1.firestore.collection(`${data.groupRef}`);
    const tradesRef = await index_js_1.firestore.collection(`${data.groupRef}/trades`).doc(messageId);
    const { cashBalance, investorCount } = await groupRef.get();
    const tradeData = await tradesRef.get();
    const ISIN = tradeData.assetRef.split("/")[-1];
    const latestPrice = await helper_js_1.iexStockPrice(tradeData.tickerSymbol);
    if (tradeData.shares * latestPrice > cashBalance) {
        // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
        // - A small variation should be somewhat enforced on the client-side.
        // - Assuming no massive jump in stock price.
        // TODO: Implement a client-side check on the cost vs cashBalance.
        // TODO: Need to distinguish shares bought by cost & those by share amount
        tradeData.shares = (cashBalance / latestPrice) * 0.975;
        // - drop share amount to within 2.5% of total cashBalance.
        // ! This is arbitrary & maybe be another threshold decided upon by the group.
        // TODO: Create a group settings page which lists the thresholds that can be tinkered
    }
    if ((latestPrice - tradeData.price) / tradeData.price > 0.025) {
        logger.log(`The price has risen more than 2.5% since the price was agreed`);
        /*
         ! Add user setting to allow for an acceptable price variation between latestPrice and
         ! agreed price (tradeData.price).
         *
         *
         * Possible failure mechanisms/things to think aboout if this fails
         1. If this fails we may need to send a new message warning the group of the new price.
         ?. This may be too slow for a highly beta stock. Imagine GME or any squeeze
         2. Allowing a user an option to set a new threshold on each purchase if it is high beta
         */
    }
    else {
        tradeData.price = latestPrice;
    }
    if (tradeData.agreesToTrade.length === investorCount - 1) {
        // ! Execute Trade
        // 1. Batch update holdings
        const holdingDocRef = index_js_1.firestore.collection(`${groupRef}/holdings`).doc(ISIN);
        const batch = index_js_1.firestore.batch();
        const { type, holdingData, updateTradeData } = await upsertHolding({
            holdingDocRef,
            tradeData,
        });
        switch (type) {
            case "update": {
                batch.update(holdingDocRef, holdingData);
            }
            case "set": {
                batch.set(holdingDocRef, holdingData);
            }
        }
        batch.update(tradesRef, {
            agreesToTrade: index_js_1.arrayUnion(context.auth.uid),
            ...updateTradeData,
        });
        await batch.commit();
        // 2. send a message with the finalised price
        const streamClient = helper_js_1.StreamChatClient();
        const channel = streamClient.channel("messaging", groupName);
        await channel.sendMessage(investmentReceiptMML(tradeData));
    }
    else {
        tradesRef.update({ agreesToTrade: index_js_1.arrayUnion(context.auth.uid) });
    }
};
/*
 * Helper Functions
 */
const upsertHolding = async ({ holdingDocRef, tradeData }) => {
    const { orderType, shares, price, assetRef, tickerSymbol, shortName } = tradeData;
    const negativeEquityMultiplier = orderType.toLowerCase().includes("buy") ? 1 : -1;
    // - Assumptions:
    // 1. We keep zero share holdings to easily identify all previous holdings.
    // ? Could this be imposed in the firestore rules.
    // 2: On selling shares the cost basis is not affected & so only the shares is changed
    const sharesIncrement = negativeEquityMultiplier * shares;
    // * Check if the holding already exists
    const holding = await holdingDocRef.get();
    const outputData = { type: "", holdingData: {}, updateTradeData: {} };
    if (holding.exists) {
        const currentShares = holding.get("shares");
        const currentAvgPrice = holding.get("avgPrice");
        const newAvgPrice = negativeEquityMultiplier + 1
            ? (currentAvgPrice * currentShares + price * shares) / (currentShares + shares)
            : currentAvgPrice;
        // * Add profit to a sell trade on a current holding
        if (!(negativeEquityMultiplier + 1)) {
            outputData.updateTradeData = {
                pnlPercentage: (100 * (price - currentAvgPrice)) / currentAvgPrice,
            };
        }
        outputData.type = "update";
        outputData.holdingData = {
            avgPrice: newAvgPrice,
            shares: index_js_1.increment(sharesIncrement),
            lastUpdated: index_js_1.serverTimestamp(),
        };
    }
    else {
        outputData.type = "set";
        outputData.holdingData = {
            assetRef,
            tickerSymbol,
            shortName,
            avgPrice: price / shares,
            shares: index_js_1.increment(sharesIncrement),
            lastUpdated: index_js_1.serverTimestamp(),
        };
    }
    return outputData;
};
const verifyUser = (context) => {
    // * Checking that the user is authenticated.
    if (!context.auth) {
        throw new index_js_1.HttpsError("failed-precondition", "This function must be called while authenticated.");
    }
};
const verifyContent = async (data, context) => {
    const requiredArgs = {
        groupRef: "",
        assetRef: "",
        orderType: "",
        price: 0,
        shares: 0,
        // This will allow us to track whether the trade has already been submitted
        // (until epheremal messages work). Also we can use a collectionGroup query
        // to find the particular trade in question for each message.
        messageId: "",
    };
    const optionalArgs = {
        assetType: "",
        shortName: "",
        tickerSymbol: "",
        executionCurrency: "GBP",
        executorRef: context.auth.uid,
    };
    // * Check for default args and assign them if they exist
    if (!allKeysContainedIn(requiredArgs, data)) {
        throw new index_js_1.HttpsError("invalid-argument", `Please ensure request has all of the following keys: ${JSON.stringify(Object.keys(requiredArgs))}`);
    }
    const assetRef = index_js_1.firestore.doc(data.assetRef);
    const assetData = await assetRef.get();
    requiredArgs.assetRef = assetRef;
    optionalArgs.assetType = assetData.get("assetType");
    optionalArgs.shortName = assetData.get("shortName");
    optionalArgs.tickerSymbol = assetData.get("tickerSymbol");
    // * Inject data into requiredArgs
    Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]));
    return { ...requiredArgs, ...optionalArgs };
};
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
const investmentReceiptMML = (tradeData) => {
    const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
    const mmlmessage = {
        user_id: "socii",
        text: helper_js_1.singleLineTemplateString `
    ${tradeData.shares} shares of $${tradeData.tickerSymbol} purchased for ${tradeData.price} per share.
    `,
        attachments: [
            {
                type: "receipt",
                mml: mmlstring,
                tickerSymbol: tradeData.tickerSymbol,
            },
        ],
    };
    return mmlmessage;
};
module.exports = {
    tradeToFirestore,
    tradeSubmission,
    tradeConfirmation,
};
//# sourceMappingURL=trades.js.map