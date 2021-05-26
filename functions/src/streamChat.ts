import { firestore } from "./index"

const StreamChat = require("stream-chat").StreamChat

const generateToken = async (data, context) => {
  const uid = context.auth.uid
  const streamClient = new StreamChat(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  )
  const token = streamClient.createToken(data.username)

  const tokenDocRef = firestore.collection(`users/${uid}/stream`).doc(uid)

  tokenDocRef.set({ token })

  return token
}

const createGroup = async (data, context) => {
  const admin = { id: "admin" }
  const streamClient = new StreamChat(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  )
  const channel = streamClient.channel("team", "group-chat", {
    name: data.groupName,
    created_by: admin,
  })

  try {
    await channel.create()
    await channel.addMembers([...data.memberUsernames, "admin"])
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  generateToken,
  createGroup,
}
