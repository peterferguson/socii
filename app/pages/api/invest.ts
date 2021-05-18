import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

// 1 :
    // ? This api (vercel fn) will be a message response to a command from stream chat
    // ? Then the response attachment can trigger a gcp fn to handle the trade in firestore
    // ? The attachment should display current price check the share amount & 
    // ? ensure the executor can execute the command


// 2 : 
    // ? Similar to above except use the first call (i.e. call without executorRef)
    // ? to handle sending of attachment. Then once the attachment is confirmed stream
    // ? will automatically resend with the updated information...
    // TODO: Figure out how to send on the executorRef etc to the api
    // TODO: It may be a case of letting the user also pick the group within the chat

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {

  res.status(200).json({ name: 'John Doe' })
}