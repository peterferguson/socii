import {
  config,
  CreateOrder,
  PatchOrder,
  OrderObject,
  TradingApi,
  InlineResponse207,
} from "@alpaca/index"
import { ObjectSerializer } from "@alpaca/models/ObjectSerializer"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const tradeClient = new TradingApi(config)

interface OrderQueryParams {
  status?: "open" | "closed" | "all"
  limit?: number
  after?: Date
  until?: Date
  direction?: "asc" | "desc"
  nested?: boolean
  symbols?: string
}

const orderQueryParams: OrderQueryParams = {
  status: undefined,
  limit: undefined,
  after: undefined,
  until: undefined,
  direction: undefined,
  nested: undefined,
  symbols: undefined,
}

export async function handleOrders(
  req: NextApiRequest,
  res: NextApiResponse<OrderObject | OrderObject[] | InlineResponse207[] | void>
) {
  const { body, method } = req

  const reqBody = (typeof body !== "object" ? JSON.parse(body) : body) || {}

  switch (method) {
    case "POST":
      try {
        // - query orders, 'empty' queries return all orders
        const { accountId, orderId, ...queryArgs } = reqBody

        const query: OrderQueryParams = { ...orderQueryParams, ...queryArgs }

        if (orderId) {
          const queryResponse = await tradeClient.getOrder(accountId, orderId)
          res
            .status(200)
            .json(ObjectSerializer.deserialize(queryResponse, "OrderObject", ""))
        } else {
          const queryResponse = await tradeClient.getOrders(
            accountId,
            query.status,
            query.limit,
            query.after,
            query.until,
            query.direction,
            query.nested,
            query.symbols
          )

          res
            .status(200)
            .json(ObjectSerializer.deserialize(queryResponse, "Array<OrderObject>", ""))
        }
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to retrieve order(s) with error: ${error}`)
      }
      break
    case "PATCH":
      try {
        // - update an order
        const { accountId, orderId, ...patch } = reqBody

        const patchResponse = await tradeClient.patchOrder(
          accountId,
          orderId,
          PatchOrder.from(patch)
        )
        res
          .status(200)
          .json(ObjectSerializer.deserialize(patchResponse, "OrderObject", ""))
      } catch (error) {
        console.log(error)
        if (error.message.includes("order isn't sent to exchange yet")) {
          res.status(422).end(error.message)
        } else {
          res.status(400).end(`Failed to patch order with error: ${error}`)
        }
      }
      break
    case "PUT":
      try {
        // - create a new order
        const { accountId, ...order } = reqBody

        const postResponse = await tradeClient.postOrders(
          accountId,
          CreateOrder.from(order)
        )
        res
          .status(200)
          .json(ObjectSerializer.deserialize(postResponse, "OrderObject", ""))
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to create order with error: ${error}`)
      }
      break
    case "DELETE":
      try {
        // - cancel an order
        const { accountId, orderId } = reqBody

        if (orderId) {
          const deleteResponse = await tradeClient.deleteOrder(accountId, orderId)
          res.status(204).end()
        } else {
          const deleteResponse = await tradeClient.deleteOrders(accountId)
          res
            .status(207)
            .json(
              ObjectSerializer.deserialize(
                deleteResponse,
                "Array<InlineResponse207>",
                ""
              )
            )
        }
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to delete order with error: ${error}`)
      }
      break
    default: {
      res.setHeader("Allow", ["PUT", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}

export default withAuth(withCORS(handleOrders))
