import { AccountCreationObject, AccountsApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const accountClient = new AccountsApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { body, method } = req

  switch (method) {
    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        const { query } = body
        res
          .status(200)
          .end(JSON.stringify((await accountClient.accountsGet(query)).body))
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break
    case "POST":
      try {
        /* create a new user account */
        const account = AccountCreationObject.from(body)
        res
          .status(201)
          .end(JSON.stringify((await accountClient.accountsPost(account)).body))
        break
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    default:
      res.status(405).end()
      break
  }
}
