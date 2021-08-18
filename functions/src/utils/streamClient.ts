import * as stream from "stream-chat"

export const StreamChat = stream.StreamChat

export const streamClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)
