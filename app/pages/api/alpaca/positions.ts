import { config, PortfolioApi, Position } from "@socii/shared/alpaca/index"
import { ObjectSerializer } from "@socii/shared/alpaca/models/ObjectSerializer"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const portfolioApi = new PortfolioApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

export async function handlePositions(
  req: NextApiRequest,
  res: NextApiResponse<Position[]>
) {
  let { body, method } = req
  body = typeof body === "string" ? JSON.parse(body) : body

  switch (method) {
    case "POST":
      try {
        const { accountId } = body

        const positions = await portfolioApi.getPositions(accountId)

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
