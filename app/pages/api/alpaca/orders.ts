import { CreateOrder, TradingApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const tradeClient = new TradingApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { body, method } = req

  switch (method) {
    case "GET":
      // try {
      //   /* query accounts, empty queries return all accounts paginated by the 1000 */
      //   const { query } = body
      //   res
      //     .status(200)
      //     .end(JSON.stringify((await accountClient.accountsGet(query)).body))
      // } catch (error) {
      //   res.status(400).end(`Failed to retrieve account with error: ${error}`)
      // }
      break
    case "POST":
      try {
        /* create a new order */
        const { account_id: accountId, ...order } = body
        res.end(
          JSON.stringify(
            (await tradeClient.postOrders(accountId, CreateOrder.from(order))).body
          )
        )
        break
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    case "DELETE":
      try {
        /* cancel an order */
        const { account_id: accountId, order_id: orderId } = body
        res.end(
          JSON.stringify((await tradeClient.deleteOrder(accountId, orderId)).body)
        )
        break
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
