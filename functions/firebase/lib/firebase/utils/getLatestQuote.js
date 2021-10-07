"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestQuote = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
var AlpacaExchanges;
(function (AlpacaExchanges) {
    AlpacaExchanges["A"] = "NYSE American (AMEX)";
    AlpacaExchanges["B"] = "NASDAQ OMX BX";
    AlpacaExchanges["C"] = "National Stock Exchange";
    AlpacaExchanges["D"] = "FINRA ADF";
    AlpacaExchanges["E"] = "Market Independent";
    AlpacaExchanges["H"] = "MIAX";
    AlpacaExchanges["I"] = "International Securities Exchange";
    AlpacaExchanges["J"] = "Cboe EDGA";
    AlpacaExchanges["K"] = "Cboe EDGX";
    AlpacaExchanges["L"] = "Long Term Stock Exchange";
    AlpacaExchanges["M"] = "Chicago Stock Exchange";
    AlpacaExchanges["N"] = "New York Stock Exchange";
    AlpacaExchanges["P"] = "NYSE Arca";
    AlpacaExchanges["Q"] = "NASDAQ OMX";
    AlpacaExchanges["S"] = "NASDAQ Small Cap";
    AlpacaExchanges["T"] = "NASDAQ Int";
    AlpacaExchanges["U"] = "Members Exchange";
    AlpacaExchanges["V"] = "IEX";
    AlpacaExchanges["W"] = "CBOE";
    AlpacaExchanges["X"] = "NASDAQ OMX PSX";
    AlpacaExchanges["Y"] = "Cboe BYX";
    AlpacaExchanges["Z"] = "Cboe BZX";
})(AlpacaExchanges || (AlpacaExchanges = {}));
var AlpacaQuoteConditions;
(function (AlpacaQuoteConditions) {
    AlpacaQuoteConditions["A"] = "Slow Quote Offer Side";
    AlpacaQuoteConditions["B"] = "Slow Quote Bid Side";
    AlpacaQuoteConditions["E"] = "Slow Quote LRP Bid Side";
    AlpacaQuoteConditions["F"] = "Slow Quote LRP Offer Side";
    AlpacaQuoteConditions["H"] = "Slow Quote Bid And Offer Side";
    AlpacaQuoteConditions["O"] = "Opening Quote";
    AlpacaQuoteConditions["R"] = "Regular Market Maker Open";
    AlpacaQuoteConditions["W"] = "Slow Quote Set Slow List";
    AlpacaQuoteConditions["C"] = "Closing Quote";
    AlpacaQuoteConditions["L"] = "Market Maker Quotes Closed";
    AlpacaQuoteConditions["U"] = "Slow Quote LRP Bid And Offer";
    AlpacaQuoteConditions["N"] = "Non Firm Quote";
    AlpacaQuoteConditions["FOUR"] = "On Demand Intra Day Auction";
})(AlpacaQuoteConditions || (AlpacaQuoteConditions = {}));
const alpacaQuoteConditionsMapping = {
    A: "A",
    B: "B",
    E: "E",
    F: "F",
    H: "H",
    O: "O",
    R: "R",
    W: "W",
    C: "C",
    L: "L",
    U: "U",
    N: "N",
    4: "FOUR",
};
const comb = `${process.env.ALPACA_KEY}:${process.env.ALPACA_SECRET}`;
const baseUrl = "https://data.sandbox.alpaca.markets/v2";
const getLatestQuote = async (symbol) => {
    try {
        const data = await node_fetch_1.default(`${baseUrl}/stocks/${symbol}/quotes/latest`, {
            method: "GET",
            headers: {
                Authorization: "Basic " + Buffer.from(comb).toString("base64"),
            },
        });
        if (!data.ok) {
            const err = new Error(data.statusText);
            err["status"] = data.status;
            throw err;
        }
        const json = await data.json();
        json.quote.c = json.quote.c.map((c) => alpacaQuoteConditionsMapping[c]);
        return json;
    }
    catch (err) {
        console.log(err);
    }
};
exports.getLatestQuote = getLatestQuote;
//# sourceMappingURL=getLatestQuote.js.map