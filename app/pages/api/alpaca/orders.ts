import { config, CreateOrder, TradingApi } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const tradeClient = new TradingApi(config)

async function handleOrders(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        const {
          account_id: accountId,
          order_id: orderId,
          status,
          limit,
          after,
          until,
          direction,
          nested,
          symbols,
        } = JSON.parse(body)

        return res
          .status(200)
          .end(
            JSON.stringify(
              await (orderId
                ? tradeClient.getOrder(accountId, orderId)
                : tradeClient.getOrders(
                    accountId,
                    status,
                    limit,
                    after,
                    until,
                    direction,
                    nested,
                    symbols
                  ))
            )
          )
      } catch (error) {
        return res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
    case "POST":
      try {
        /* create a new order */
        const { account_id: accountId, ...order } = JSON.parse(body)
        return res.end(
          JSON.stringify(
            await tradeClient.postOrders(accountId, CreateOrder.from(order))
          )
        )
      } catch (error) {
        return res.status(400).end(`Failed to create account with error: ${error}`)
      }
    case "DELETE":
      try {
        /* cancel an order */
        const { account_id: accountId, order_id: orderId } = JSON.parse(body)
        return res.end(
          JSON.stringify(
            await (orderId
              ? tradeClient.deleteOrder(accountId, orderId)
              : tradeClient.deleteOrders(accountId))
          )
        )
      } catch (error) {
        return res.status(400).end(`Failed to create account with error: ${error}`)
      }
    default:
      return res.status(405).end()
  }
}

export default withAuth(withCORS(handleOrders))
