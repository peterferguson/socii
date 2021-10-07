"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sseGetRequest = void 0;
const https_1 = __importDefault(require("https"));
const sseGetRequest = async (url, responseCallback) => https_1.default
    .get(url, {
    headers: {
        Authorization: `Basic ${Buffer.from(process.env.ALPACA_KEY + ":" + process.env.ALPACA_SECRET).toString("base64")}`,
        "content-type": "text/event-stream",
    },
}, responseCallback)
    .on("error", (err) => {
    console.log("HTTP Request Error: ", err.message);
});
exports.sseGetRequest = sseGetRequest;
//# sourceMappingURL=sseGetRequest.js.map