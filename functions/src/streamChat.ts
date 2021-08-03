import { log, error } from "firebase-functions/lib/logger"
import { firestore } from "./index"
import { streamClient } from "./utils/helper.js"

/*
 * Create a stream token when a new user is created
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}').onWrite(createGroup)
 *
 * @param change
 * @param context
 * @returns
 */
export const generateToken = async (change, context) => {
  // - Get an object representing the user document
  const { username } = change.data()
  const uid = context.params.userId
  log(`Creating a Stream User Token for ${username}`)

  // TODO: redesign user collection to have profile & secret parts
  // TODO: Store this as a field on the users secrets subcollection
  const tokenDocRef = firestore.collection(`users/${uid}/stream`).doc(uid)
  tokenDocRef.set({ token: streamClient.createToken(username) })
}

/*
 * Create/delete a stream group chat when a new group is created/deleted
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}').onWrite(createGroup)
 *
 * @param change
 * @param context
 * @returns
 */
export const createGroup = async (change, context) => {
  const { groupName } = context.params

  if (!change.before.exists) {
    // New group Created
    const founderUsername = (
      await firestore.collection(`groups/${groupName}/investors`).get()
    ).docs[0].id

    const channel = streamClient.channel("messaging", groupName.split(" ").join("-"), {
      name: `${groupName} Group Chat`,
      created_by: { id: founderUsername },
    })

    try {
      await channel.create()
      await channel.addMembers([founderUsername])
    } catch (err) {
      error(err)
    }
  } else if (!change.after.exists) {
    // Deleting document: delete the group chat
    const channel = streamClient.channel("messaging", groupName.split(" ").join("-"))
    try {
      await channel.delete()
    } catch (err) {
      error(err)
    }
  }
  return
}
