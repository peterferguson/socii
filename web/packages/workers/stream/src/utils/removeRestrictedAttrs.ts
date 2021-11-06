import { Message, ITradeMMLMessage } from "../types"

// - Remove attributes which are restricted from use by stream from message
export const removeRestrictedAttrs = (message: Message, newAttrs: ITradeMMLMessage) => {
  const { latest_reactions, own_reactions, reply_count, type, ...msg } = message
  return { ...msg, ...newAttrs }
}
