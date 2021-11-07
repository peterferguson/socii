"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCallback = exports.handleEvents = void 0;
const functions = require("firebase-functions");
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../shared/alpaca/index.js");
const firestore_1 = require("../firestore");
const sseGetRequest_1 = require("../utils/sseGetRequest");
const alpacaEventEndpoints = {
    accounts: "accounts/status",
    journals: "journals/status",
    trades: "trades",
    transfers: "transfers/status",
    nonTradingActivity: "nta",
};
async function handleEvents(req, res) {
    const { headers: { authorization }, body, method, } = req;
    let { type, since, until, since_id, until_id } = body;
    firebase_functions_1.logger.debug(`Received ${method} request for ${type}`);
    firebase_functions_1.logger.log(`Authorization: ${authorization}`);
    firebase_functions_1.logger.log(`Body: ${JSON.stringify(body)}`);
    firebase_functions_1.logger.log(`Config: ${JSON.stringify(functions.config())}`);
    if (method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (authorization !== `Bearer ${functions.config().alpaca.key}`) {
        res.status(401).end("The request is not authorized");
        return;
    }
    if (!(since || until || since_id || until_id)) {
        since_id = await (0, firestore_1.getLatestEventId)(type);
    }
    const queryParams = { since, until, since_id, until_id };
    const query = Object.keys(queryParams)
        .filter(key => queryParams[key] !== undefined)
        .map(key => `${key}=${queryParams[key]}`)
        .toString();
    const baseServer = {
        url: "",
        variableConfiguration: undefined,
        ...(0, index_js_1.config)(functions.config().alpaca.key, functions.config().alpaca.secret)
            .baseServer,
    };
    if (type in alpacaEventEndpoints) {
        try {
            console.log(`${baseServer.url}/events/${alpacaEventEndpoints[type]}?${query}`);
            await (0, sseGetRequest_1.sseGetRequest)(`${baseServer.url}/events/${alpacaEventEndpoints[type]}?${query}`, (0, exports.responseCallback)(res, type, since_id));
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        res.status(422).end(`Please provide one of the following types:
    - "accounts"
    - "journals"
    - "trades"
    - "transfers"
    - "non-trading-activity"
    as \`type\` in the request body.`);
    }
}
exports.handleEvents = handleEvents;
const responseCallback = (res, type, since_id) => (response) => {
    let data = [];
    const headerDate = response.headers && response.headers.date
        ? response.headers.date
        : "no response date";
    console.log("Headers:", response.headers);
    console.log("Status Code:", response.statusCode);
    console.log("Date in Response header:", headerDate);
    response.on("data", chunk => {
        if (chunk.toString().indexOf("index,nofollow") == -1) {
            console.log(Buffer.from(chunk).toString());
            data.push(chunk);
        }
    });
    response.on("end", async () => {
        response.destroy();
        await (0, firestore_1.storeEvents)(type, Buffer.concat(data).toString(), since_id);
        res
            .status(200)
            .end(`Response from ${type} endpoint has ended: ${Buffer.concat(data).toString()}`);
    });
    setTimeout(() => {
        response.emit("end");
        console.log("timing out");
    }, 5000);
};
exports.responseCallback = responseCallback;
//# sourceMappingURL=alpaca.js.map