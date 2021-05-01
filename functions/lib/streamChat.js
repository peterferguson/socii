var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const StreamChat = require("stream-chat").StreamChat;
const generateToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const apiSecret = process.env.STREAM_API_SECRET;
    const apiKey = process.env.STREAM_API_KEY;
    const client = new StreamChat(apiKey, apiSecret);
    const token = client.createToken(req.body["username"]);
    res.status(200).send(token);
});
module.exports = generateToken;
//# sourceMappingURL=streamChat.js.map