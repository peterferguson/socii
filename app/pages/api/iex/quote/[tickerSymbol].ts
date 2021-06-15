import { iexClient } from "../index"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  res.end(JSON.stringify(await iexClient.quote(tickerSymbol, { filter })))
}
