import { config, PortfolioApi, PortfolioHistory } from "@alpaca/index"
import { ObjectSerializer } from "@alpaca/models/ObjectSerializer"
import { DateStr } from "@models/DateStr"
import { Period } from "@models/Period"
import { Timeframe } from "@models/Timeframe"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const portfolioApi = new PortfolioApi(config)

export async function handlePortfolioHistory(
  req: NextApiRequest,
  res: NextApiResponse<PortfolioHistory>
) {
  let { body, method } = req
  body = typeof body === "string" ? JSON.parse(body) : body

  switch (method) {
    case "POST":
      try {
        const {
          accountId,
          period,
          timeframe,
          date_end,
          extended_hours,
        }: {
          accountId: string
          period: Period
          // - The duration of the data in number + unit, such as `1D`, where unit; can be `D` for day, `W` for week, `M` for month and `A` for year. Defaults to `1M` (optional)
          timeframe: Timeframe
          // - The resolution of time window. `1Min`, `5Min`, `15Min`, `1H`, or `1D`. If omitted, `1Min` for less than 7 days period, `15Min` for less than 30 days, or otherwise `1D`. (optional)
          date_end: DateStr
          // - The date the data is returned up to, in \"YYYY-MM-DD\" format. Defaults to the current market date (rolls over at the market open if `extended_hours` is false, otherwise at 7am ET) (optional)
          extended_hours: boolean
          // - If true, include extended hours in the result. This is effective only for timeframe less than `1D`. (optional)
        } = body

        const history = await portfolioApi.getPortfolioHistory(
          accountId,
          period,
          timeframe,
          date_end,
          extended_hours
        )

        res
          .status(200)
          .json(ObjectSerializer.deserialize(history, "PortfolioHistory", ""))
      } catch (error) {
        res.status(400).end(`Failed to get history with error: ${error}`)
      }
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} is not allowed`)
  }
}

export default withAuth(withCORS(handlePortfolioHistory))
