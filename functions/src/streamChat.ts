const StreamChat = require("stream-chat").StreamChat;

const generateToken = async (req, res) => {
  const apiSecret = process.env.STREAM_API_SECRET;
  const apiKey = process.env.STREAM_API_KEY;

  const client = new StreamChat(apiKey, apiSecret);
  const token = client.createToken(req.body["username"]);

  res.status(200).send(token);
};

module.exports = generateToken;
