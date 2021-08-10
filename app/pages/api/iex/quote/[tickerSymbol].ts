import { cors, withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { iexClient } from "../index"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  const data = await iexClient.quote(tickerSymbol, { filter })
  
  res.status(200).json(data)
}

export default withAuth(withCORS(handler))
