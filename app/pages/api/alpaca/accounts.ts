// TODO Check alpaca docs when moving to production - account updates require a bcc email to alpaca
import {
  AccountCreationObject,
  AccountUpdate,
  ObjectSerializer,
  AccountsApi,
  config,
} from "@socii/shared/alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)

interface AccountReqParams {
  type: string
  accountId: string
}

export async function handleAccounts(req: NextApiRequest, res: NextApiResponse) {
  let { body, method, query } = req
  let { type, accountId } = {} as AccountReqParams

  try {
    body = body && typeof body === "string" ? JSON.parse(body) : body
    type = body?.type || query?.type
    accountId = body?.accountId || query?.accountId
  } catch (err) {
    console.log({ err })
  }

  if (!accountId) return res.status(400).end(`Failed to find accountId`)

  switch (method) {
    case "POST":
      // - Get account by accountId if it is sent
      if (accountId) {
        try {
          const getAccount = await (type !== "trading"
            ? accountClient.getAccount(accountId)
            : accountClient.getTradingAccount(accountId))
          res
            .status(200)
            .json(ObjectSerializer.deserialize(getAccount, typeof getAccount, ""))
        } catch (error) {
          res.status(400).end(`Failed to get account with error: ${error}`)
        }
      }
      // - Else create account | TODO correct if further calls needed
      else {
        try {
          /* create a new user account */
          const postAccount = await accountClient.accountsPost(
            AccountCreationObject.from(body)
          )
          res
            .status(201)
            .json(ObjectSerializer.deserialize(postAccount, typeof postAccount, ""))
        } catch (error) {
          res.status(400).end(`Failed to create account with error: ${error}`)
        }
      }
      break

    case "GET":
      try {
        // - query accounts, empty queries return all accounts paginated by the 1000
        const queryAccounts = await accountClient.accountsGet()
        res
          .status(200)
          .json(ObjectSerializer.deserialize(queryAccounts, "Array<Account>", ""))
      } catch (error) {
        res.status(400).end(`Failed to retrieve account with error: ${error}`)
      }
      break

    case "PATCH":
      try {
        // - updates fields in an account
        const updatedAccount = await accountClient.patchAccount(
          accountId,
          AccountUpdate.from(body)
        )
        res
          .status(200)
          .json(ObjectSerializer.deserialize(updatedAccount, typeof updatedAccount, ""))
      } catch (error) {
        res.status(400).end(`Failed to update account with error: ${error}`)
      }
      break

    case "DELETE":
      try {
        // - delete an account by accountId
        await accountClient.deleteAccount(accountId)
        res.status(204).end(`Deleted account with id ${accountId}`)
      } catch (error) {
        res.status(400).end(`Failed to delete account: ${error}`)
        // TODO deal with other error codes
      }
      break
    default: {
      res.setHeader("Allow", ["PATCH", "GET", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
export default withAuth(withCORS(handleAccounts))
