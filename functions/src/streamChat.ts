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

const invest = async (req, res) => {
  // show a nice error if you send a GET request
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

  // const messageText = req.body.message.text;
  // const cID = req.body.cid;
  // const channelType = cID.split(":")[0];
  // const channelID = cID.split(":")[1];

  // the body of the message we will modify based on user interactions
  let message = req.body.message
  const args = message.args.split(" ")

  // form_data will only be present once the user starts interacting
  const formData = req.body.form_data || {}
  const action = formData["action"]
  const user = req.body.user

  // * Dissect the intent
  const intent = args[0]
  const tickerSymbol = args[1]

  // // if we understand this intend, send a reply
  // const channel = client.channel(channelType, channelID);
  // const botUser = { id: "mrbot", name: "MR Bot" };

  const channel = client.channel("messaging", "JPT")
  //   const mmlstring = `
  //     <mml type="card">
  //       <input name="answer" label="Enter your phone number" placeholder="e.g. 999-999-9999"></input>
  //       <button name="action" value="submit">Submit</button>
  //     </mml>
  // `;
  const mmlstring = `
    <mml type="card">
     <invest></invest>
    </mml>
`
  const mmlmessage = {
    user_id: "peterferguson",
    attachments: [{ type: "invest", mml: mmlstring, intent: intent, tickerSymbol: tickerSymbol}],
  }
  const response = await channel.sendMessage(mmlmessage)

  console.log(
    `POST /${message.command} "${message.args}" => ${JSON.stringify(formData)}`
  )

  // switch (action) {
  //   case 'confirm':
  //     const reportedBy = formData['reported_by']
  //     message.type = 'regular'
  //     message.mml = confirmInvestmentMML(message.args, reportedBy)
  //     message.attachments = null
  //     break
  //   case 'cancel':
  //     message = null
  //     break
  //   // - Catch all commands sent by user not by action
  //   default:
  //     // - Error on missing command args
  //     if (message.args.trim() === '') {
  //       message.type = 'error'
  //       message.text = 'missing ticket description'
  //       message.mml = null
  //       break
  //     }
  //     // - Present MML for user to make a choice
      // message.type = 'ephemeral'
      // message.mml = investFormMML(message.args, user.name)
  // }

  if (message.mml !== null) {
    message.text =
      'this message contains Message Markup Language, you might need to upgrade your stream-chat-react library.'
  }

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message }))
}

module.exports = {
  generateToken,
  createGroup,
  invest,
}
