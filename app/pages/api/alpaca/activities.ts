import { AccountsApi, config, ObjectSerializer } from "@socii/shared/alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

export async function handleActivites(req: NextApiRequest, res: NextApiResponse) {
  let { body, method } = req
  body = typeof body === "string" ? JSON.parse(body) : body
  const { type, accountId, date, until, after, direction, pageSize, pageToken } = body

  switch (method) {
    case "POST":
      // - Get account by accountId if it is sent
      if (!type) {
        try {
          const activities = await accountClient.accountsActivitiesGet(
            date,
            until,
            after,
            direction,
            accountId,
            pageSize,
            pageToken
          )
          res
            .status(200)
            .json(ObjectSerializer.deserialize(activities, typeof activities, ""))
        } catch (error) {
          res.status(400).end(`Failed to get account with error: ${error}`)
        }
      } else {
        try {
          const activities = await accountClient.accountsActivitiesActivityTypeGet(
            type,
            date,
            until,
            after,
            direction,
            accountId,
            pageSize,
            pageToken
          )
          res
            .status(200)
            .json(ObjectSerializer.deserialize(activities, typeof activities, ""))
        } catch (error) {
          res.status(400).end(`Failed to get account with error: ${error}`)
        }
      }
      break

    default: {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
export default withAuth(withCORS(handleActivites))
