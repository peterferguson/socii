import {
  AlpacaQuote,
  getRealtimeQuotes,
} from "@socii/shared/alpaca/utils/getRealtimeQuotes"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

interface AuthRequest extends NextApiRequest {
  token: string
  decodedToken: {
    uid: string
  }
}

export async function handleRealtimeQuotes(
  req: AuthRequest,
  res: NextApiResponse<AlpacaQuote>
) {
  const { method } = req

  switch (method) {
    case "POST": {
      const { symbols } = req.body
      try {
        const quotes = await getRealtimeQuotes(symbols, req.token)
        res.status(200).json(quotes)
      } catch (e) {
        res.status(e.status || 500).end()
      }
      break
    }
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuth(withCORS(handleRealtimeQuotes))
