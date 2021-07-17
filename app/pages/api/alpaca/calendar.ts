import { withAuth, withCORS } from "@utils/middleware"
import { config, CalendarApi, MarketDay } from "@alpaca/index"
import { NextApiRequest, NextApiResponse } from "next"

const calendarClient = new CalendarApi(config)

export async function handleCalendar(
  req: NextApiRequest,
  res: NextApiResponse<MarketDay | MarketDay[]>
) {
  const { body, method } = req

  const { start, end } = body

  // TODO: Error handling bad request body!
  // - format start and end dates as YYYY-MM-DD

  switch (method) {
    case "POST": {
      const dates = await calendarClient.calendarGet(start, end)
      res.status(200).json(dates)
      break
    }
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuth(withCORS(handleCalendar))
