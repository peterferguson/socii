import * as stream from "stream-chat"
import * as functions from "firebase-functions"

export const functionConfig = functions.config()
export const StreamChat = stream.StreamChat

export const streamClient = new StreamChat(
  functionConfig.stream.api_key,
  functionConfig.stream.secret
)
