import { cors } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { iexClient } from "../index"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  res.end(JSON.stringify(await iexClient.quote(tickerSymbol, { filter })))
}
