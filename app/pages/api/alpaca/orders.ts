import { TradingApi, CreateOrder, config } from "@lib/alpaca"
import { NextApiRequest, NextApiResponse } from "next"
import { withAuth, withCORS } from "@utils/middleware"

const tradeClient = new TradingApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        const { account_id: accountId, order_id: orderId, status, symbols } = body
        if (orderId)
          res
            .status(200)
            .end(JSON.stringify(await tradeClient.getOrder(accountId, orderId)))
        
        res.status(200).end(JSON.stringify(await tradeClient.getOrders(accountId, status, )));
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break
    case "POST":
      try {
        /* create a new order */
        const { account_id: accountId, ...order } = body
        res.end(
          JSON.stringify(
            await tradeClient.postOrders(accountId, CreateOrder.from(order))
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
        res.end(JSON.stringify(await tradeClient.deleteOrder(accountId, orderId)))
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

export default withAuth(withCORS(handler))
