"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notEnoughBuyingPowerMessage = void 0;
const singleLineTemplateString_1 = require("./singleLineTemplateString");
const notEnoughBuyingPowerMessage = (username) => ({
    user_id: "socii",
    text: singleLineTemplateString_1.singleLineTemplateString `
      Some members of the group do not have enough buying power to execute the trade!
      `,
    onlyForMe: username,
});
exports.notEnoughBuyingPowerMessage = notEnoughBuyingPowerMessage;
//# sourceMappingURL=notEnoughBuyingPowerMessage.js.map