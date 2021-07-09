import { TradingApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const tradeClient = new TradingApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { body, method } = req
  if (method !== "GET") return res.status(405).end()

  const { account_id: accountId, order_id: orderId } = body

  res.end(JSON.stringify((await tradeClient.deleteOrder(accountId, orderId)).body))
}
