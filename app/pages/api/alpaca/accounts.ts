// TODO Check alpaca docs when moving to production - account updates require a bcc email to alpaca
import { 
  AccountCreationObject,
  AccountUpdate, 
  AccountsApi, 
  config,
} from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(config)

export async function handleAccounts(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {

    case "POST":
      // Get account by accountId if it is sent
    if (body.accountId){
      try{
        res.status(200).end(JSON.stringify(await accountClient.getAccount(body.accountId)))
        break
      } catch (error) {
        res.status(400).end(`Failed to get account with error: ${error}`)
      }
      }
      // Else create account | TODO correct if further calls needed
    else{
      try {
        /* create a new user account */
        const account = AccountCreationObject.from(body)

        res.status(201).end(JSON.stringify(await accountClient.accountsPost(account)))
        break
      } catch (error) {
          res.status(400).end(`Failed to create account with error: ${error}`)
      }
    }
      break

    case "GET":
      try {
        /* query accounts, empty queries return all accounts paginated by the 1000 */
        
        const queryResponse = await accountClient.accountsGet()
        
        res.status(200).json(queryResponse)
      } catch (error) {
          res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break

    case "PATCH":
      try {
        /* updates fields in an account */
        const  Id   = body.accountId
        const updateBody  = AccountUpdate.from(body)

        res.status(200).json(await accountClient.patchAccount(Id ,updateBody))
      } catch (error) {
          res.status(400).end(`Failed to update account with error: ${error}`)
      }
      break

    case "DELETE":
      try {
        /* delete an account by accountId */
        const { accountId } = body
        const queryResponse = await accountClient.deleteAccount(accountId)

        res.status(204).json(queryResponse)
      } catch (error) {
          res.status(400).end(`Failed to delete account: ${error}`)
        // TODO deal with other error codes
      }
      break

    default:
      res.status(405).end()
      break
  }
}
export default withAuth(withCORS(handleAccounts))
