// TODO Check alpaca docs when moving to production - account updates require a bcc email to alpaca
import { BankData, ObjectSerializer, AccountsApi, config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(config)

export async function handleBanking(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const { accountId, bankData, status, name } = body

  switch (method) {
    case "PUT":
      // - Add bank account to account
      try {
        const bankAccount = await accountClient.postRecipientBanks(
          accountId,
          BankData.from(bankData)
        )

        res
          .status(200)
          .json(ObjectSerializer.deserialize(bankAccount, typeof bankAccount, ""))
      } catch (error) {
        res.status(400).end(`Failed to add bank account with error: ${error}`)
      }
      break

    case "POST":
      try {
        // - Get bank accounts from account based on status
        const bankAccounts = await accountClient.getRecipientBanks(
          accountId,
          status ?? "",
          name ?? ""
        )

        res
          .status(200)
          .json(ObjectSerializer.deserialize(bankAccounts, "Array<BankResource>", ""))
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to get bank accounts with error: ${error}`)
      }
      break

    case "DELETE":
      try {
        // - delete a bank account from account
        await accountClient.deleteRecipientBank(accountId, bankData.id)
        res
          .status(204)
          .end(
            `Deleted bank account with id ${bankData.id} from account with id ${accountId}`
          )
      } catch (error) {
        res.status(400).end(`Failed to delete bank account: ${error}`)
        // TODO deal with other error codes
      }
      break
    default: {
      res.setHeader("Allow", ["PUT", "POST", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
export default withAuth(withCORS(handleBanking))
