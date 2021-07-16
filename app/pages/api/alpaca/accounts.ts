import { AccountCreationObject, AccountsApi, config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(config)

async function handleAccounts(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        const { query } = body
        const queryResponse = await accountClient.accountsGet(query)
        res.status(200).json(queryResponse)
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break
    case "PATCH":
      //TODO: Write update account code
      // accountClient.patchAccount
      break
    case "DELETE":
      //TODO: Write delete account code
      // accountClient.deleteAccount
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
export default withAuth(withCORS(handleAccounts))
