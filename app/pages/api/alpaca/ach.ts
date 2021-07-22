// TODO Check alpaca docs when moving to production - account updates require a bcc email to alpaca
import {
  ACHRelationshipData,
  ObjectSerializer,
  AccountsApi,
  config,
} from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const accountClient = new AccountsApi(config)

export async function handleAch(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const { accountId, achData, statuses } = body

  switch (method) {
    case "PUT":
      // - Add ach relationship to an account
      try {
        const achRelationship = await accountClient.postAchRelationships(
          accountId,
          ACHRelationshipData.from(achData)
        )

        res
          .status(200)
          .json(
            ObjectSerializer.deserialize(achRelationship, typeof achRelationship, "")
          )
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to add bank account with error: ${error}`)
      }
      break

    case "POST":
      try {
        // - Get bank accounts from account based on status
        const achRelationships = await accountClient.getAchRelationships(
          accountId,
          statuses ?? ""
        )

        res
          .status(200)
          .json(
            ObjectSerializer.deserialize(
              achRelationships,
              "Array<ACHRelationshipResource>",
              ""
            )
          )
      } catch (error) {
        console.log(error)
        res.status(400).end(`Failed to get bank accounts with error: ${error}`)
      }
      break

    case "DELETE":
      try {
        // - delete a bank account from account
        await accountClient.deleteAchRelationship(accountId, achData.id)
        res
          .status(204)
          .end(
            `Deleted bank account with id ${achData.id} from account with id ${accountId}`
          )
      } catch (error) {
        console.log(error)
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
export default withAuth(withCORS(handleAch))
