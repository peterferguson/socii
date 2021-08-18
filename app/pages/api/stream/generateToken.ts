import { withAuth } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const StreamChat = require("stream-chat").StreamChat
const dayjs = require("dayjs")

const key = process.env.NEXT_PUBLIC_STREAM_API_KEY
const secret = process.env.STREAM_API_SECRET

const generateToken = (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req
  const { userId } = body

  const serverClient = StreamChat.getInstance(key, secret)

  // -creates a token that expires in 1 hour
  const timestamp = Number(dayjs().add("1h").format("X"))
  const issuedAt = Math.floor(Date.now() / 1000) // - should be unix timestamp

  res.status(200).json({ token: serverClient.createToken(userId, timestamp, issuedAt) })
}

export default withAuth(generateToken)
