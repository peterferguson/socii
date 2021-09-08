import { buy, sell } from "./trades"
import { StreamChat } from "stream-chat"
import { logger } from "firebase-functions"
import { functionConfig } from "../index"
import { handlePush } from "./pushNotifications"

// * Function to route the commands to the correct function based on the type query param
export const handleCommand = async (req, res) => {
  const { query, method, body } = req
  const type = query?.type

  logger.log(`Recieved ${method} request, with query params ${JSON.stringify(query)}`)
  logger.log(`Body: ${JSON.stringify(body)}`)

  // * show a nice error if you send a GET request
  method !== "POST" && res.status(405).end(`Method ${method} Not Allowed`)

  // TODO: Update firebase keys for new stream environments
  const streamClient = new StreamChat(
    functionConfig.stream.api_key,
    functionConfig.stream.secret
  )

  logger.log(`Validating request came from Stream`)
  logger.log("api-key", functionConfig.stream.api_key)
  const valid = functionConfig.stream.api_key === req.headers["x-api-key"]
  if (!valid) {
    logger.log("Request came from invalid source")
    logger.log("x-api-key", req.headers["x-api-key"])
    logger.log("x-signature", req.headers["x-signature"])

    // ! Unauthorized
    res.status(401).json({
      body: { error: "Invalid request, signature is invalid" },
    })
    return
  }

  const payload = typeof body === "string" ? JSON.parse(body) : body

  switch (type) {
    case "buy":
      const buyResponse = await buy(streamClient, payload)
      return res
        .status(200)
        .end(`${type} command executed: ${JSON.stringify(buyResponse)}`)

    case "sell":
      const sellResponse = await sell(streamClient, payload)
      return res
        .status(200)
        .end(`${type} command executed: ${JSON.stringify(sellResponse)}`)

    default:
      const messageType = body?.type
      if (!messageType) return res.status(400).end(`Please send a correct command type`)

      // * Handle push notifications from stream
      // TODO: Replace with stream notification handler when we move to react native!
      switch (messageType) {
        case "message.new":
          const newResponse = await handlePush(payload)
          return res
            .status(200)
            .end(`${messageType} pushed with response ${newResponse}`)
        default:
          return res
            .status(200)
            .end(`${messageType} does not receive a push notification`)
      }
  }
}
