import { StreamChat } from "stream-chat"
import { StreamCommandRequestBody } from "../types"
import { removeRestrictedAttrs } from "./removeRestrictedAttrs"
import { tradeMML } from "./tradeMML"

const streamClient = new StreamChat(
  "kwnqrt7s36z2",
  "rwu9hv78y8bj2p6wh8twh45q9v9jmgbm7y4j2x75jumk8s27xreagxuxbfdn7b6d",
)

const trade =
  (tradeType: string) =>
  async (request: Request): Promise<Response> => {
    const body: StreamCommandRequestBody = await request.json()

    // * the body of the message will be modified based on user interactions
    let { message } = body
    const { cid, user, form_data: formData } = body

    console.log(`Executing a ${tradeType} trade with body: ${JSON.stringify(body)}`)

    const channelID =
      cid?.split(":").pop() || (message && message.cid?.split(":").pop())

    const channel = streamClient.channel("group", channelID)
    const username = user?.id

    if (!message) return new Response("No message in body", { status: 400 })

    const args = message && message.args?.split(" ").filter((str: string) => !!str)

    // * form_data will only be present once the user starts interacting
    const action: string = formData?.["action"]

    // * Dissect the intent & reply if understood
    // TODO: Need to create commands with description of input order in Stream
    const tickerSymbol: string = args ? args?.[0].toUpperCase() : ""

    switch (action) {
      case "buy":
        break
      case "sell":
        break
      case "cancel":
        // 2 Simply cancel the buy action.
        message = undefined
        break
      // - Catch all commands sent by user not by action
      default:
        // - Error on missing command args
        // TODO: Add a check to make sure the user has entered a valid ticker symbol
        if (message && message.args?.trim() === "") {
          message.type = "error"
          message.text = `Please provide an appropriate ticker symbol after '/${action}'`
          message.mml = undefined
          break
        }
        message = removeRestrictedAttrs(
          message,
          tradeMML({ username, tickerSymbol, tradeType }),
        )
        // eslint-disable-next-line no-case-declarations
        const streamResponse = await channel.sendMessage(message as never)
        return new Response(JSON.stringify(streamResponse, null, 2), { status: 200 })
    }
    return new Response("Completed", { status: 200 })
  }

export const buy = trade("buy")
export const sell = trade("sell")
