import { transferData , FundingApi, config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const fundClient = new FundingApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "POST": {
      try{
          /* TODO - see creating a transfer entity in alpaca docs. Bank resourse should be created for prod */
        const accountId = body.accountId
        const transfer = body.transferData
        
        res.status(200).end(JSON.stringify(await fundClient.postTransfers(accountId , transfer)))
      } catch (error) {
        res.status(400).end(`Failed to post transfer with error: ${error}`)
      }
      break
    }
    case "GET":
    //   try {
    //     /* create a new user account */
    //     const account = AccountCreationObject.from(body)
    //     res.status(201).end(JSON.stringify(await accountClient.accountsPost(account)))
    //     break
    //   } catch (error) {
    //     res.status(400).end(`Failed to create account with error: ${error}`)
    //   }
    //   break
    // default:
    //   res.status(405).end()
    //   break
  }
}
export default withAuth(withCORS(handler))
