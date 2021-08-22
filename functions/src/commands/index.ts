import { buy, sell } from "./mml/trades"
import { StreamChat } from "stream-chat"
import { logger } from "firebase-functions"
import { functionConfig } from "../index"

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
  const valid = streamClient.verifyWebhook(
    JSON.stringify(body),
    req.headers["x-signature"]
  )
  if (!valid) {
    logger.log("Request came from invalid source")
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
