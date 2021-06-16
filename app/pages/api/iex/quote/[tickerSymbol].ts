import { iexClient } from "../index"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  res.end(JSON.stringify(await iexClient.quote(tickerSymbol, { filter })))
}
