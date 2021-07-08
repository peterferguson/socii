import { ClockApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const clockClient = new ClockApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  res.end(JSON.stringify((await clockClient.clockGet()).body))
}
