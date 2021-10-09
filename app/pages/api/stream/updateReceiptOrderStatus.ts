import { withAuth } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { StreamChat } from "stream-chat"

const streamClient = require("stream-chat").StreamChat

// TODO: This needs secured ... maybe pass the message as a jwt?

const updateReceiptOrderStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req
  const { messageUpdate } = typeof body === "string" ? JSON.parse(body) : body

  console.log("messageUpdate", messageUpdate)

  const serverClient = streamClient.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  ) as StreamChat

  const update = await serverClient.updateMessage(messageUpdate, "socii")

  console.log("updated", update)

  res.status(200).json({ message: "update successful" })
}

export default withAuth(updateReceiptOrderStatus)
