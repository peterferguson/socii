import { AccountsApi, config, ObjectSerializer } from "@socii/shared/alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

interface ActivityReqParams {
  type:
    | "FILL"
    | "ACATC"
    | "ACATS"
    | "CSD"
    | "CSR"
    | "CSW"
    | "DIV"
    | "DIVCGL"
    | "DIVCGS"
    | "DIVNRA"
    | "DIVROC"
    | "DIVTXEX"
    | "INT"
    | "JNLC"
    | "JNLS"
    | "MA"
    | "NC"
    | "PTC"
    | "REORG"
    | "SSO"
    | "SSP"
  accountId: string
  date: string
  until: string
  after: string
  direction: "asc" | "desc"
  pageSize: number
  pageToken: string
}

export async function handleActivites(req: NextApiRequest, res: NextApiResponse) {
  let { body, method, query } = req
  let { type, accountId, date, until, after, direction, pageSize, pageToken } =
    {} as ActivityReqParams

  try {
    body = body && typeof body === "string" ? JSON.parse(body) : body
    type = body?.type || query?.type
    accountId = body?.accountId || query?.accountId
    date = body?.date || query?.date
    until = body?.until || query?.until
    after = body?.after || query?.after
    direction = body?.direction || query?.direction
    pageSize = body?.pageSize || query?.pageSize
    pageToken = body?.pageToken || query?.pageToken
  } catch (err) {
    console.log({ err })
  }

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
