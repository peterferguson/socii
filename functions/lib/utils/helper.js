"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iexClient = exports.streamClient = exports.singleLineTemplateString = void 0;
const StreamChat = require("stream-chat").StreamChat;
const { Client } = require("iexjs");
function singleLineTemplateString(strings, ...values) {
    let output = "";
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];
    // Split on newlines.
    let lines = output.split(/(?:\r\n|\n|\r)/);
    // Rip out the leading whitespace.
    return lines
        .map((line) => {
        return line.replace(/^\s+/gm, "");
    })
        .join(" ")
        .trim();
}
exports.singleLineTemplateString = singleLineTemplateString;
exports.streamClient = new StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
exports.iexClient = new Client({ version: process.env.IEX_API_VERSION });
//# sourceMappingURL=helper.js.map