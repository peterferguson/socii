import { TradingApi, Position, config } from "@alpaca/index"
import { ObjectSerializer } from "@alpaca/models/ObjectSerializer"
import { NextApiRequest, NextApiResponse } from "next"
import { withAuth, withCORS } from "@utils/middleware"
const tradingApi = new TradingApi(config)

export async function handlePositions(
  req: NextApiRequest,
  res: NextApiResponse<Position[]>
) {
  const { body, method } = req

  switch (method) {
    case "POST":
      try {
        const { accountId } = body
        const positions = await tradingApi.getPositions(accountId)
        res
          .status(200)
          .json(ObjectSerializer.deserialize(positions, "Array<Position>", ""))
      } catch (error) {
        res.status(400).end(`Failed to get positions with error: ${error}`)
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} is not allowed`)
  }
}

export default withAuth(withCORS(handlePositions))
