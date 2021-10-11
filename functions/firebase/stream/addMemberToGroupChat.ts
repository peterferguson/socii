import { logger } from "firebase-functions"
import { streamClient } from "../utils/streamClient.js"

/*
 * Add/remove new users to group chat when a new user is created/deleted in {groupName}/investors
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{username}').onWrite(addMemberToGroupChat)
 *
 * @param change
 * @param context
 * @returns
 */

export const addMemberToGroupChat = async (change, context) => {
  const { groupName, username } = context.params
  const channel = streamClient.channel("group", groupName, {})

  

  if (!change.before.exists) {
    // - New user Created
    logger.log(`Adding new user ${username} to ${groupName} chat!`)
    try {
      // ! Ensure user already exists in stream
      await streamClient.upsertUser({id: username})
      await channel.addMembers([username], {
        user_id: "socii",
        text: `Welcome the latest member, ${username} 🥳`,
      })
    } catch (err) {
      logger.error(err)
    }
  } else if (!change.after.exists) {
    // - Deleting document: remove the user from the chat
    logger.log(`Removing user ${username} from ${groupName} chat!`)
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
