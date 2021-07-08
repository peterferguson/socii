import { CreateOrder, TradingApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const tradeClient = new TradingApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { body, method } = req

  if (method !== "POST") return res.status(405).end()

  const { account_id: accountId, ...order } = body

  res.end(
    JSON.stringify(
      (await tradeClient.postOrders(accountId, CreateOrder.from(order))).body
    )
  )
}
