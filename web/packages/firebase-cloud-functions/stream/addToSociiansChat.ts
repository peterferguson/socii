import { logger } from "firebase-functions"
import { streamClient } from "../utils/streamClient.js"

/*
 * Add/remove new users to the sociians team chat when a new username is created/deleted
 * Usage as follows:
 *
 * functions.firestore.document('usernames/{username}').onWrite(addToSociiansChat)
 *
 * @param change
 * @param context
 * @returns
 */

const channel = streamClient.channel("team", "sociians", {})

export const addToSociiansChat = async (change, context) => {
  const { username } = context.params
  logger.log(`Adding new user ${username} to sociians chat!`)

  if (!change.before.exists) {
    // - New user Created
    try {
      // ! Ensure user already exists in stream
      await streamClient.upsertUser({id: username})
      await channel.addMembers([username], {
        user_id: "socii",
        text: `Welcome the latest sociian, ${username} 🥳`,
      })
    } catch (err) {
      logger.error(err)
    }
  } else if (!change.after.exists) {
    // - Deleting document: remove the user from the chat
    try {
      await channel.removeMembers([username], {
        user_id: "socii",
        text: `👋 ${username} has left the chat`,
      })
    } catch (err) {
      logger.error(err)
    }
  }
  return
}
