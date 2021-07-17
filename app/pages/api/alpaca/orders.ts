import {
  config,
  CreateOrder,
  OrderObject,
  TradingApi,
  InlineResponse207,
} from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const tradeClient = new TradingApi(config)

export async function handleOrders(
  req: NextApiRequest,
  res: NextApiResponse<OrderObject | OrderObject[] | InlineResponse207[] | void>
) {
  const { body, method } = req

  switch (method) {
    case "POST":
      try {
        /* query orders, 'empty' queries return all orders */
        const {
          accountId,
          orderId,
          status,
          limit,
          after,
          until,
          direction,
          nested,
          symbols,
        } = JSON.parse(body)

        const queryResponse = await (orderId
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
        res.status(200).json(queryResponse)
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break
    case "PATCH":
      // TODO: Update orders
      // tradeClient.patchOrder(accountId, orderId)
      break
    case "PUT":
      try {
        /* create a new order */
        const { accountId, ...order } = JSON.parse(body)
        const postResponse = await tradeClient.postOrders(
          accountId,
          CreateOrder.from(order)
        )
        res.status(200).json(postResponse)
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    case "DELETE":
      try {
        /* cancel an order */
        const { accountId, orderId } = JSON.parse(body)

        const deleteResponse = await (orderId
          ? tradeClient.deleteOrder(accountId, orderId)
          : tradeClient.deleteOrders(accountId))

        res.status(207).json(deleteResponse)
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    default:
      res.setHeader("Allow", ["PUT", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuth(withCORS(handleOrders))
