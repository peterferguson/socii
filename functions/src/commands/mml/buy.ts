const logger = require("firebase-functions").logger
import { singleLineTemplateString } from "../../utils/helper.js"

export const buyMML = ({ username, tickerSymbol }) => {
  const mmlstring = `<mml type="card"><buy></buy></mml>`
  const mmlmessage = {
    user_id: username,
    text: "How much you would like to buy?",
    command: "buy",
    attachments: [
      {
        type: "buy",
        mml: mmlstring,
        tickerSymbol: tickerSymbol,
        actions: [
          {
            name: "action",
            text: "Buy",
            type: "button",
            value: "buy",
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

// ? Similar to above except use the first call (i.e. call without executorRef)
// ? to handle sending of attachment. Then once the attachment is confirmed stream
// ? will automatically resend with the updated information...
// TODO: Figure out how to send on the executorRef etc to the api
// TODO: It may be a case of letting the user also pick the group within the chat

export const buy = async (client, body) => {
  // - This is the executorGroupRef
  // ? Maybe will also want to store the individual executor also which will be the username from streamchat
  const channelID = body.cid?.split(":")[1] || "JPT"
  const username = body.user.id
  // * the body of the message will be modified based on user interactions
  let message = body.message

  const { parent_id, show_in_channel } = message

  const args = message.args?.split(" ")

  // TODO: trim the args or the actions / tickers

  // * form_data will only be present once the user starts interacting
  const formData = body.form_data || {}
  const action = formData["action"]

  logger.log(`action: ${action}`)
  logger.log(`parent_id: ${parent_id}`)

  // * Dissect the intent
  // TODO: Need to create commands with description of input order in Stream
  const intent = args?.[0] // ? Should be buy since we send to the buy webhook ... maybe just do a check on this?
  const tickerSymbol = args?.[1].toUpperCase()

  // * if we understand this intent then send a reply
  const channel = client.channel("messaging", channelID)
  // const botUser = { id: "investbot", name: "Invest Bot" };

  logger.log(
    `POST /${message.command} "${message.args}" => ${JSON.stringify(formData)}`
  )

  switch (action) {
    case "buy":
      // 1 Initial confirmation of a buy action should prompt the rest of the group to agree
      // TODO: Query group members and send a message to each or send a polling message recording the users that interacted with it
      // TODO: Could also mention members in their own messages in a thread under the buy command message
      // ! Moved to tradeSubmission function
      // message.type = 'ephemeral'
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
      // - Present MML for user to make a choice on cost & share amount
      // message.type = 'ephemeral'
      // ! This is apparently an old api & we no longer have access to ephemeral command types
      message = updateMessage(message, buyMML({ username, tickerSymbol }))
      logger.log(JSON.stringify({ message }))
      return await channel.sendMessage(message)
  }
}

// const sendTradeMessages = async ({ channel, message, username }) => {
//   const members = await channel.queryMembers({})

//   return Promise.all(
//     members.members
//       .filter((member) => member.name !== username)
//       .map(
//         async (member) =>
//           await channel.sendMessage(
//             updateMessage(message, { id: "", user_id: member.user_id })
//           )
//       )
//   )
// }

const updateMessage = (message, newAttrs) => {
  // - remove restricted attrs
  const { latest_reactions, own_reactions, reply_count, type, ...msg } = message
  return { ...msg, ...newAttrs }
}
