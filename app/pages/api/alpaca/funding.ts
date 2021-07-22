/*
 TODO - see creating a transfer entity in alpaca docs. Bank resource should be created for prod 
*/

import { ObjectSerializer, TransferData, FundingApi, config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const fundClient = new FundingApi(config)

export async function handleFunding(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req
  const { accountId, transferData } = body

  switch (method) {
    case "POST": {
      // - If transfer data is included - post the transfer
      if (transferData) {
        try {
          const postTransfer = await fundClient.postTransfers(
            accountId,
            TransferData.from(transferData)
          )
          res
            .status(200)
            .json(ObjectSerializer.deserialize(postTransfer, typeof postTransfer, ""))
        } catch (error) {
          res.status(400).end(`Failed to post transfer with error: ${error}`)
        }
      }
      // - else get a list of transctions for that account
      else {
        try {
          // - Gets all transfers for an account
          const getTransfers = await fundClient.getTransfers(accountId)
          res
            .status(200)
            .json(
              ObjectSerializer.deserialize(getTransfers, "Array<TransferResource>", "")
            )
        } catch (error) {
          res.status(400).end(`Failed to get transfers list with error: ${error}`)
        }
      }
      break
    }
    case "DELETE":
      // - Delete a transfer
      try {
        await fundClient.deleteTransfer(accountId, transferData.id)
        res.status(204).end(`Deleted transfer with id ${transferData.id}`)
      } catch (error) {
        res.status(400).end(`Failed to delete transfer with error: ${error}`)
      }
      break
    default: {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
export default withAuth(withCORS(handleFunding))
