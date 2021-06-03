import { log } from "firebase-functions/lib/logger"
import { firestore } from "./index"
import { StreamChatClient } from "./utils/helper.js"

const generateToken = async (snap, context) => {
  // Get an object representing the user document
  const { username } = snap.data()
  const uid = context.params.userId
  log(`Creating a Stream User Token for ${username}`)

  const streamClient = StreamChatClient()

  const tokenDocRef = firestore.collection(`users/${uid}/stream`).doc(uid)
  tokenDocRef.set({ token: streamClient.createToken(username) })
}

const createGroup = async (data, context) => {
  const admin = { id: "admin" }
  const streamClient = StreamChatClient()
  const channel = streamClient.channel("messaging", data.groupName, {
    name: `${data.groupName} Group Chat`,
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
