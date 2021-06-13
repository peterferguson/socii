import { buy, sell } from "./mml/trades"
import { StreamChat } from "stream-chat"

// * Function to route the commands to the correct function based on the type query param
export const handleCommand = async (req, res) => {
  const { query, method, body } = req
  const type = query?.type

  // * show a nice error if you send a GET request
  if (method !== "POST") {
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  // ! Removing for testing & possible deletion if we move to a in-house command setup
  //   // Important: validate that the request came from Stream
  //   const valid = streamClient.verifyWebhook(req.body, req.headers["x-signature"])
  //   if (!valid) {
  //     // ! Unauthorized
  //     res.status(401).json({
  //       body: { error: "Invalid request, signature is invalid" },
  //     })
  //     return
  //   }

  const streamClient = new StreamChat(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  )
  const payload = typeof body === "string" ? JSON.parse(body) : body

  switch (type) {
    case "buy":
      const buy_response = await buy(streamClient, payload)
      res.status(200).end(`${type} command executed: ${JSON.stringify(buy_response)}`)
      break
    case "sell":
      const sell_response = await sell(streamClient, payload)
      res.status(200).end(`${type} command executed: ${JSON.stringify(sell_response)}`)
      break
    default:
      res.status(400).end(`Please send a correct command type`)
  }
}
