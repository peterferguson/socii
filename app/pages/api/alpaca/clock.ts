import { withAuth, withCORS } from "@utils/middleware"
import { config, ClockApi, ClockResponse } from "@socii/shared/alpaca/index"
import { NextApiRequest, NextApiResponse } from "next"

const clockClient = new ClockApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

export async function handleClock(
  req: NextApiRequest,
  res: NextApiResponse<ClockResponse>
) {
  const { method } = req

  switch (method) {
    case "GET": {
      const clock = await clockClient.clockGet()
      res.status(200).json(clock)
      break
    }
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuth(withCORS(handleClock))
