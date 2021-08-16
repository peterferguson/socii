import { logger } from "firebase-functions"
import { StreamChat } from "stream-chat"

export const tradeMML = ({ username, tickerSymbol, tradeType }) => {
  const mmlstring = `<mml type="card"><${tradeType}></${tradeType}></mml>`
  const mmlmessage = {
    user_id: username,
    text: `How much you would like to ${tradeType}?`,
    command: tradeType,
    attachments: [
      {
        type: tradeType,
        mml: mmlstring,
        tickerSymbol: tickerSymbol,
        actions: [
          {
            name: "action",
            text: tradeType.charAt(0).toUpperCase() + tradeType.slice(1),
            type: "button",
            value: tradeType,
          },
          {
            name: "action",
            text: "Cancel",
            type: "button",
            value: "cancel",
          },
        ],
      },
    ],
  }
  return mmlmessage
}

/*
 * COMMANDS
 */

const trade = (tradeType) => async (client: StreamChat, body) => {
  logger.log(`Executing a ${tradeType} trade with body: ${JSON.stringify(body)}`)

  const channelID = body.cid?.split(":").pop() || body.message.cid?.split(":").pop()

  const channel = client.channel("messaging", channelID)
  const username = body.user.id

  // * the body of the message will be modified based on user interactions
  let message = body.message

  const args = message.args?.split(" ").filter((str) => !!str)

  // * form_data will only be present once the user starts interacting
  const formData = body.form_data || {}
  const action = formData["action"]

  // * Dissect the intent & reply if understood
  // TODO: Need to create commands with description of input order in Stream
  const tickerSymbol = args?.[0].toUpperCase()

  switch (action) {
    case "buy":
      break
    case "sell":
      break
    case "cancel":
      // 2 Simply cancel the buy action.
      message = null
      break
    // - Catch all commands sent by user not by action
    default:
      // - Error on missing command args
      if (message.args.trim() === "") {
        message.type = "error"
        message.text =
          "Please provide the ticker symbol & amount of shares you want to purchase"
        message.mml = null
        break
      }
      // ! This is apparently an old api & we no longer have access to ephemeral command types
      message = updateMessage(message, tradeMML({ username, tickerSymbol, tradeType }))
      return await channel.sendMessage(message)
  }
}

export const buy = trade("buy")
export const sell = trade("sell")

const updateMessage = (message, newAttrs) => {
  // - remove restricted attrs
  const { latest_reactions, own_reactions, reply_count, type, ...msg } = message
  return { ...msg, ...newAttrs }
}
