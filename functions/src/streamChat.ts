const StreamChat = require("stream-chat").StreamChat;

const apiSecret = process.env.STREAM_API_SECRET;
const apiKey = process.env.STREAM_API_KEY;

const generateToken = async (req, res) => {
  const client = new StreamChat(apiKey, apiSecret);
  const token = client.createToken(req.body["username"]);
  res.status(200).send(token);
};

const createGroup = async (req, res) => {
  const client = new StreamChat(apiKey, apiSecret);

  const admin = { id: 'admin' };
  const channel = client.channel('team', 'group-chat', {
    name: 'Talk to me',
    created_by: admin,
  });

  try {
    await channel.create();
    await channel.addMembers([username, 'admin']);
  } catch (err) {
    console.log(err);
  }

  res.status(200).send(token);
};


module.exports = generateToken;
