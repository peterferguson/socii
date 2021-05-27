import { log } from "firebase-functions/lib/logger"
import { firestore } from "./index"


const StreamChat = require("stream-chat").StreamChat

const generateToken = async (snap, context) => {
  // Get an object representing the user document
  const { username } = snap.data()
  const uid = context.params.userId
  log(`Creating a Stream User Token for ${username}`)

  const streamClient = new StreamChat(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  )

  const tokenDocRef = firestore.collection(`users/${uid}/stream`).doc(uid)
  tokenDocRef.set({ token: streamClient.createToken(username) })
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
