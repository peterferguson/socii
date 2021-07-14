import { Channel, UnknownType, LiteralStringForUnion } from "stream-chat"

export const getTimeStamp = (
  channel: Channel<
    UnknownType,
    UnknownType,
    LiteralStringForUnion,
    UnknownType,
    UnknownType,
    UnknownType,
    UnknownType
  >
): string => {
  let lastHours = channel.state.last_message_at?.getHours()
  let lastMinutes: number | string = channel.state.last_message_at?.getMinutes()
  let half = "AM"

  if (lastHours === undefined || lastMinutes === undefined) {
    return ""
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12
    half = "PM"
  }

  if (lastHours === 0) lastHours = 12
  if (lastHours === 12) half = "PM"

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`
  }

  return `${lastHours}:${lastMinutes} ${half}`
}
