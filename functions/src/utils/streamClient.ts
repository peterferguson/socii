import * as stream from "stream-chat"
import * as functions from "firebase-functions"

export const functionConfig = functions.config()
export const StreamChat = stream.StreamChat

export const streamClient = new StreamChat(
  process.env.NODE_ENV === "development"
    ? functionConfig.stream.api_key
    : functionConfig.stream.prod.api_key,
  process.env.NODE_ENV === "development"
    ? functionConfig.stream.secret
    : functionConfig.stream.prod.secret
)
