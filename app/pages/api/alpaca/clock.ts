import { withAuth, withCORS } from "@utils/middleware"
import { config, ClockApi } from "@alpaca/index"
import { NextApiRequest, NextApiResponse } from "next"

async function handleClock(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()
  return res.end(JSON.stringify(await new ClockApi(config).clockGet()))
}

export default withAuth(withCORS(handleClock))
