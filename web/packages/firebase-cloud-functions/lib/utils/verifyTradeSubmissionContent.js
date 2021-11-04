"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTradeSubmissionContent = void 0;
const index_js_1 = require("../index.js");
const allKeysContainedIn_1 = require("./allKeysContainedIn");
const verifyTradeSubmissionContent = async (data, context) => {
    const requiredArgs = {
        username: "",
        alpacaAccountId: "",
        groupName: "",
        assetRef: null,
        type: "",
        stockPrice: 0,
        //qty: 0,
        notional: 0,
        side: "",
        messageId: "",
        timeInForce: "",
        symbol: "",
        // - messageId will allow us to track whether the trade has already been submitted
        // - (until epheremal messages work). Also we can use a collectionGroup query
        // - to find the particular trade in question for each message.
    };
    const optionalArgs = {
        assetType: "",
        shortName: "",
        //tickerSymbol: "",
        executionCurrency: "GBP",
        assetCurrency: "USD",
        executorRef: "",
        limitPrice: "",
    };
    // * Check for default args and assign them if they exist
    if (!(0, allKeysContainedIn_1.allKeysContainedIn)(requiredArgs, data)) {
        throw new index_js_1.HttpsError("invalid-argument", `Please ensure request has all of the following keys: ${JSON.stringify(Object.keys(requiredArgs))}`);
    }
    const assetRef = index_js_1.firestore.doc(data.assetRef);
    const assetData = await assetRef.get();
    //requiredArgs.assetRef = assetRef
    requiredArgs.symbol = assetData.get("tickerSymbol");
    optionalArgs.assetType = assetData.get("assetType");
    optionalArgs.shortName = assetData.get("shortName");
    optionalArgs.executorRef = `users/${context.auth.uid}/${data.alpacaAccountId}`;
    // * Inject data into requiredArgs
    Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]));
    return { ...requiredArgs, ...optionalArgs };
};
exports.verifyTradeSubmissionContent = verifyTradeSubmissionContent;
//# sourceMappingURL=verifyTradeSubmissionContent.js.map