"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sell = exports.buy = exports.tradeMML = void 0;
const tradeMML = ({ username, tickerSymbol, tradeType }) => {
    const mmlstring = `<mml type="card"><${tradeType}></${tradeType}></mml>`;
    const mmlmessage = {
        user_id: username,
        text: `How much you would like to ${tradeType}?`,
        command: tradeType,
        attachments: [
            {
                type: tradeType,
                mml: mmlstring,
                tickerSymbol: tickerSymbol,
                actions: [
                    {
                        name: "action",
                        text: tradeType.charAt(0).toUpperCase() + tradeType.slice(1),
                        type: "button",
                        value: tradeType,
                    },
                    {
                        name: "action",
                        text: "Cancel",
                        type: "button",
                        value: "cancel",
                    },
                ],
            },
        ],
    };
    return mmlmessage;
};
exports.tradeMML = tradeMML;
/*
 * COMMANDS
 */
const trade = (tradeType) => async (client, body) => {
    var _a, _b;
    const channelID = (_a = body.cid) === null || _a === void 0 ? void 0 : _a.split(":")[1];
    const channel = client.channel("messaging", channelID);
    const username = body.user.id;
    // * the body of the message will be modified based on user interactions
    let message = body.message;
    const args = (_b = message.args) === null || _b === void 0 ? void 0 : _b.split(" ").map((str) => str.trim());
    // * form_data will only be present once the user starts interacting
    const formData = body.form_data || {};
    const action = formData["action"];
    // * Dissect the intent & reply if understood
    // TODO: Need to create commands with description of input order in Stream
    const intent = args === null || args === void 0 ? void 0 : args[0]; // ? Should be buy since we send to the buy webhook ... maybe just do a check on this?
    const tickerSymbol = args === null || args === void 0 ? void 0 : args[1].toUpperCase();
    // ? Do we want to use a bot user, the user themselves or socii?
    // const botUser = { id: "investbot", name: "Invest Bot" };
    switch (action) {
        // TODO: tradeSubmission does not use ephemeral type ... we still need to figure this out
        case "buy":
            // ! Moved to tradeSubmission function
            // message.type = 'ephemeral'
            break;
        case "sell":
            // ! Moved to tradeSubmission function
            // message.type = 'ephemeral'
            break;
        case "cancel":
            // 2 Simply cancel the buy action.
            message = null;
            break;
        // - Catch all commands sent by user not by action
        default:
            // - Error on missing command args
            if (message.args.trim() === "") {
                message.type = "error";
                message.text =
                    "Please provide the ticker symbol & amount of shares you want to purchase";
                message.mml = null;
                break;
            }
            // - Present MML for user to make a choice on cost & share amount
            // message.type = 'ephemeral'
            // ! This is apparently an old api & we no longer have access to ephemeral command types
            message = updateMessage(message, exports.tradeMML({ username, tickerSymbol, tradeType }));
            return await channel.sendMessage(message);
    }
};
exports.buy = trade("buy");
exports.sell = trade("sell");
const updateMessage = (message, newAttrs) => {
    // - remove restricted attrs
    const { latest_reactions, own_reactions, reply_count, type, ...msg } = message;
    return { ...msg, ...newAttrs };
};
//# sourceMappingURL=trades.js.map