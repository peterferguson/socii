import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
const iex = require("iexjs")

export const iexClient = new iex.Client({
  api_token: process.env.NEXT_PUBLIC_IEXCLOUD_PUBLIC_KEY,
  version: "stable",
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, filter } = req.query as { tickerSymbol: string; filter: string }

  try {
    const data = await iexClient.quote(tickerSymbol, { filter })
    return res.status(200).json(data)
  } catch (err) {
    const [statusCode = 500, message] = err.message
      .split("Response ")
      .pop()
      .split(" - ")

    return res.status(statusCode).json({ error: message, code: statusCode })
  }
}

export default withAuth(withCORS(handler))
