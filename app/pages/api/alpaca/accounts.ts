import { AccountCreationObject, AccountsApi, config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        const { query } = body
        res.status(200).end(JSON.stringify(await accountClient.accountsGet(query)))
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break
    case "POST":
      try {
        /* create a new user account */
        const account = AccountCreationObject.from(body)
        res.status(201).end(JSON.stringify(await accountClient.accountsPost(account)))
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
export default withAuth(withCORS(handler))
