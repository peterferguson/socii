"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaQuoteConditions = exports.AlpacaExchanges = exports.getRealtimeQuotes = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const baseUrl = process.env.NODE_ENV === "production"
    ? "https://server.socii.app/api/v1"
    : process.env.NODE_ENV === "development" && process.env.LOCAL_DEVELOPMENT !== "true"
        ? "https://socii-server-development.up.railway.app"
        : "http://localhost:5000/api/v1";
// - Ensuring that the env vars are defined
// - This only seems to be a problem in firebase functions so we'll just check for it here
if (Object.keys(process.env).filter((key) => key === "ALPACA_KEY" || key === "ALPACA_SECRET").length !== 2) {
    const functions = require("firebase-functions");
    const functionConfig = functions.config();
    process.env.ALPACA_KEY = functionConfig.alpaca.key;
    process.env.ALPACA_SECRET = functionConfig.alpaca.secret;
}
const getRealtimeQuotes = async (symbols, token = null) => {
    token = token ? token : jsonwebtoken_1.default.sign({}, process.env.ALPACA_SECRET);
    const data = { meta: {}, quotes: {} };
    for (let i = 0; i < symbols.length; i += 10) {
        console.log(`Fetching ${symbols.slice(i, i + 10)}`);
        const { meta, quotes } = await getQuotes(symbols.slice(i, i + 10).join(","), token);
        data.meta = meta;
        data.quotes = { ...data.quotes, ...quotes };
    }
    return data;
};
exports.getRealtimeQuotes = getRealtimeQuotes;
const getQuotes = async (tickers, token) => {
    const data = await node_fetch_1.default(`${baseUrl}/alpaca/data/quotes?symbols=${tickers}&token=${token}`);
    if (!data.ok) {
        const err = new Error(data.statusText);
        err["status"] = data.status;
        throw err;
    }
    const { _meta: meta, ...quotes } = await data.json();
    return { meta, quotes };
};
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
})(AlpacaExchanges = exports.AlpacaExchanges || (exports.AlpacaExchanges = {}));
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
})(AlpacaQuoteConditions = exports.AlpacaQuoteConditions || (exports.AlpacaQuoteConditions = {}));
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
//# sourceMappingURL=getRealtimeQuotes.js.map