  /* TODO - see creating a transfer entity in alpaca docs. Bank resourse should be created for prod */

import { 
  TransferData, 
  FundingApi, 
  config 
} from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const fundClient = new FundingApi(config)

export async function handleFunding(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "POST": {
        const accountId = body.accountId
        // If transfer data is included - post the transfer
        if (body.transferData){
        try{
          const bodyTransfer = body.transferData
          const transferData = new TransferData()
  
           for (var key in bodyTransfer){
            bodyTransfer[key]? transferData[key]=(bodyTransfer[key]): null
           }
          res.status(200).end(JSON.stringify(await fundClient.postTransfers(accountId , transferData)))
        } catch (error) {
          res.status(400).end(`Failed to post transfer with error: ${error}`)
        }
        break
        }
        //else get a list of transctions for that account
        else{
          try {
            // Gets all transfers for an account
            const accountId = body.accountId
            res.status(200).end(JSON.stringify(await fundClient.getTransfers(accountId)))
            break
          } catch (error) {
            res.status(400).end(`Failed to get transfers list with error: ${error}`)
          }
          break
        }


    }
    case "GET":
    {
      console.log(" ")
      break
    }
    default:
      res.status(405).end()
      break
  }
}
export default withAuth(withCORS(handleFunding))
