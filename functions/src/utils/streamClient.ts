export const StreamChat = require("stream-chat").StreamChat

export const streamClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
