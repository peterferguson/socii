const StreamChat = require("stream-chat").StreamChat
import { firestore } from "./index"

const apiSecret = process.env.STREAM_API_SECRET
const apiKey = process.env.STREAM_API_KEY

const generateToken = async (data, context) => {
  const uid = context.auth.uid
  const client = new StreamChat(apiKey, apiSecret)
  const token = client.createToken(data.username)

  const tokenDocRef = firestore.collection(`users/${uid}/stream`).doc(uid)

  tokenDocRef.set({ token })

  return token
}

const createGroup = async (data, context) => {
  const client = new StreamChat(apiKey, apiSecret)

  const admin = { id: "admin" }
  const channel = client.channel("team", "group-chat", {
    name: data.groupName,
    created_by: admin,
  })

  try {
    await channel.create()
    await channel.addMembers([...data.memberUsernames, "admin"])
  } catch (err) {
    console.log(err)
  }
}

/*
 * COMMANDS
 */

// ? Similar to above except use the first call (i.e. call without executorRef)
// ? to handle sending of attachment. Then once the attachment is confirmed stream
// ? will automatically resend with the updated information...
// TODO: Figure out how to send on the executorRef etc to the api
// TODO: It may be a case of letting the user also pick the group within the chat

const buy = async (req, res) => {
  // * show a nice error if you send a GET request
  if (req.method === "GET") {
    res.status(400).json({
      body: { error: "Invalid request, only POST requests are allowed" },
    })
    return
  }
  // // important: validate that the request came from Stream
  const client = new StreamChat(apiKey, apiSecret)
  // const valid = client.verifyWebhook(req.body, req.headers["x-signature"]);
  // if (!valid) {
  //   // ! Unauthorized
  //   res.status(401).json({
  //     body: { error: "Invalid request, signature is invalid" },
  //   });
  //   return;
  // }

  // - This is the executorGroupRef 
  // ? Maybe will also want to store the individual executor also which will be the username from streamchat
  const channelID = req.body.cid.split(":")[1]; 

  // * the body of the message will be modified based on user interactions
  let message = req.body.message
  const args = message.args.split(" ")
  const username = req.body.user.id

  // * form_data will only be present once the user starts interacting
  const formData = req.body.form_data || {}
  const action = formData["action"]

  // * Dissect the intent 
  // TODO: Need to create commands with description of input order in Stream
  const intent = args[0]
  const tickerSymbol = args[1]

  
  // * if we understand this intent then send a reply
  const channel = client.channel("messaging", channelID)
  // const botUser = { id: "investbot", name: "Invest Bot" };

  switch (action) {
    case 'confirm': // 1 Initial confirmation of a buy action should prompt the rest of the group to agree
      const executedBy = formData['executed_by'] // ? could use username as this needs to be sent to the rest of the group
      // TODO: Query group members and send a message to each or send a polling message recording the users that interacted with it
      // TODO: Could also mention members in their own messages in a thread under the buy command message
      /* 
      ?   The fields available from the messsage will allow us to simply send a message with a 
      ?   timed response (counting down in the ui). Then as users react to the message we could 
      ?   detect when the reaction_count (or latest_reaction count to exclude the executor)
      ?   === member count and execute based on the reactions. 
      ?
      ?       "attachments":[], 
      ?       "latest_reactions":[], 
      ?       "own_reactions":[], 
      ?       "reaction_counts":null, 
      ?       "reaction_scores":null, 
      ?       "reply_count":0, 
      ?       "mentioned_users":[],
      ?
      */
      // message.type = 'regular'
      // message.mml = confirmInvestmentMML(message.args, executedBy)
      // message.attachments = null
      break
    case 'cancel': // 2 Simply cancel the buy action. 
      message = null
      break
    // - Catch all commands sent by user not by action
    default:
      // - Error on missing command args
      if (message.args.trim() === '') {
        message.type = 'error'
        message.text = 'Please provide the ticker symbol & amount of shares you want to purchase'
        message.mml = null
        break
      }
      // - Present MML for user to make a choice on cost & share amount
      message.type = 'ephemeral'
      message.mml = investFormMML(message.args, user.name)
      await channel.sendMessage(mmlmessage)
  }

  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ message }))
}

module.exports = {
  generateToken,
  createGroup,
  buy,
}
