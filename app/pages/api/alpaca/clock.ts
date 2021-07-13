import { withAuth, withCORS } from "@utils/middleware"
import { config, ClockApi } from "../../../alpaca"
import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()
  res.end(JSON.stringify(await new ClockApi(config).clockGet()))
}

export default withAuth(withCORS(handler))
