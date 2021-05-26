"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = void 0;
const buy_1 = require("./mml/buy");
const StreamChat = require("stream-chat").StreamChat;
// * Function to route the commands to the correct function based on the type query param
const handleCommand = (req, res) => {
    const { query, method, body } = req;
    const type = query === null || query === void 0 ? void 0 : query.type;
    // * show a nice error if you send a GET request
    if (method !== "POST") {
        res.status(405).end(`Method ${method} Not Allowed`);
        res.setHeader("Allow", ["POST"]);
    }
    //   // Important: validate that the request came from Stream
    //   const valid = streamClient.verifyWebhook(req.body, req.headers["x-signature"])
    //   if (!valid) {
    //     // ! Unauthorized
    //     res.status(401).json({
    //       body: { error: "Invalid request, signature is invalid" },
    //     })
    //     return
    //   }
    switch (type) {
        case "buy":
            const streamClient = new StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
            const buy_response = buy_1.buy(streamClient, body);
            //   res.setHeader("Content-Type", "application/json")
            res.status(200).end(`${type} command executed: ${JSON.stringify(buy_response)}`);
            break;
        default:
            res.status(400).end(`Please send a correct command type`);
    }
};
exports.handleCommand = handleCommand;
const commands = {
    buy: "https://europe-west2-sociiinvest.cloudfunctions.net/buyCommand",
};
//# sourceMappingURL=index.js.map