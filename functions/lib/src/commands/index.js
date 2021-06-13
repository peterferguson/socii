"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = void 0;
const trades_1 = require("./mml/trades");
const stream_chat_1 = require("stream-chat");
// * Function to route the commands to the correct function based on the type query param
const handleCommand = async (req, res) => {
    const { query, method, body } = req;
    const type = query === null || query === void 0 ? void 0 : query.type;
    // * show a nice error if you send a GET request
    if (method !== "POST") {
        res.status(405).end(`Method ${method} Not Allowed`);
    }
    // ! Removing for testing & possible deletion if we move to a in-house command setup
    //   // Important: validate that the request came from Stream
    //   const valid = streamClient.verifyWebhook(req.body, req.headers["x-signature"])
    //   if (!valid) {
    //     // ! Unauthorized
    //     res.status(401).json({
    //       body: { error: "Invalid request, signature is invalid" },
    //     })
    //     return
    //   }
    const streamClient = new stream_chat_1.StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
    const payload = typeof body === "string" ? JSON.parse(body) : body;
    switch (type) {
        case "buy":
            const buy_response = await trades_1.buy(streamClient, payload);
            res.status(200).end(`${type} command executed: ${JSON.stringify(buy_response)}`);
            break;
        case "sell":
            const sell_response = await trades_1.sell(streamClient, payload);
            res.status(200).end(`${type} command executed: ${JSON.stringify(sell_response)}`);
            break;
        default:
            res.status(400).end(`Please send a correct command type`);
    }
};
exports.handleCommand = handleCommand;
//# sourceMappingURL=index.js.map