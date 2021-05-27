"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = exports.confirmInvestmentMML = exports.buyMML = void 0;
const logger = require("firebase-functions").logger;
const buyMML = ({ username, tickerSymbol }) => {
    const mmlstring = `<mml type="card"><buy></buy></mml>`;
    const mmlmessage = {
        user_id: username,
        text: "How much you would like to buy?",
        attachments: [
            {
                type: "buy",
                mml: mmlstring,
                tickerSymbol: tickerSymbol,
                actions: [
                    {
                        name: "action",
                        text: "Buy",
                        type: "button",
                        value: "buy",
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
exports.buyMML = buyMML;
const confirmInvestmentMML = ({ username, action, tickerSymbol, cost, shares, }) => {
    const mmlstring = `<mml><tradeConfirmation></tradeConfirmation></mml>`;
    const mmlmessage = {
        user_id: username,
        text: singleLineTemplateString `
    Hey ${username} wants the group to ${action} ${shares} shares of ${tickerSymbol} 
    for ${cost}. Do you agree that the group should execute this trade?
    `,
        attachments: [
            {
                type: "buy",
                mml: mmlstring,
                tickerSymbol: tickerSymbol,
                actions: [
                    {
                        name: "action",
                        text: "Yes",
                        type: "button",
                        value: "yes",
                    },
                    {
                        name: "action",
                        text: "No",
                        type: "button",
                        value: "no",
                    },
                ],
            },
        ],
    };
    return mmlmessage;
};
exports.confirmInvestmentMML = confirmInvestmentMML;
/*
 * COMMANDS
 */
// ? Similar to above except use the first call (i.e. call without executorRef)
// ? to handle sending of attachment. Then once the attachment is confirmed stream
// ? will automatically resend with the updated information...
// TODO: Figure out how to send on the executorRef etc to the api
// TODO: It may be a case of letting the user also pick the group within the chat
const buy = async (client, body) => {
    var _a, _b;
    // - This is the executorGroupRef
    // ? Maybe will also want to store the individual executor also which will be the username from streamchat
    const channelID = ((_a = body.cid) === null || _a === void 0 ? void 0 : _a.split(":")[1]) || "JPT";
    const username = body.user.id;
    // * the body of the message will be modified based on user interactions
    let message = body.message;
    const args = (_b = message.args) === null || _b === void 0 ? void 0 : _b.split(" ");
    // * form_data will only be present once the user starts interacting
    const formData = body.form_data || {};
    const action = formData["action"];
    // * Dissect the intent
    // TODO: Need to create commands with description of input order in Stream
    const intent = args === null || args === void 0 ? void 0 : args[0]; // ? Should be buy since we send to the buy webhook ... maybe just do a check on this?
    const tickerSymbol = args === null || args === void 0 ? void 0 : args[1];
    // * if we understand this intent then send a reply
    const channel = client.channel("messaging", channelID);
    // const botUser = { id: "investbot", name: "Invest Bot" };
    switch (action) {
        case "buy":
            // 1 Initial confirmation of a buy action should prompt the rest of the group to agree
            // TODO: Query group members and send a message to each or send a polling message recording the users that interacted with it
            // TODO: Could also mention members in their own messages in a thread under the buy command message
            /*
            ?   The fields available from the messsage will allow us to simply send a message with a
            ?   timed response (counting down in the ui). Then as users react to the message we could
            ?   detect when the reaction_count - own_reactions.length === members.length - 1
            ?   (excluding the executor) and execute based on the reactions.
            ?
            ?       "attachments":[],
            ?       "latest_reactions":[],
            ?       "own_reactions":[],
            ?       "reaction_counts":null,
            ?       "reaction_scores":null,
            ?       "reply_count":0,
            ?       "mentioned_users":[],
            ?
            */
            // message.type = 'ephemeral'
            message = {
                ...message,
                ...exports.confirmInvestmentMML({ ...formData, username, tickerSymbol }),
            };
            await sendTradeMessages({ channel, message, username });
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
            message = { ...message, ...exports.buyMML({ username, tickerSymbol }) };
            await channel.sendMessage(message);
    }
    logger.log(JSON.stringify({ message }));
    return JSON.stringify({ message });
};
exports.buy = buy;
const sendTradeMessages = async ({ channel, message, username }) => {
    const members = await channel.queryMembers({});
    members.members
        .filter((member) => member.name !== username)
        .map(async (member) => {
        console.log({ ...message, user_id: member.name });
        await channel.sendMessage({ ...message, user_id: member.user_id });
    });
};
function singleLineTemplateString(strings, ...values) {
    // Interweave the strings with the
    // substitution vars first.
    let output = '';
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    // Split on newlines.
    let lines = output.split(/(?:\r\n|\n|\r)/);
    // Rip out the leading whitespace.
    return lines.map((line) => {
        return line.replace(/^\s+/gm, '');
    }).join(' ').trim();
}
//# sourceMappingURL=buy.js.map