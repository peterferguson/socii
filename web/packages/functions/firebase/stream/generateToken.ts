import { log } from "firebase-functions/lib/logger"
import { firestore } from "../index"
import { streamClient } from "../utils/streamClient"

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
  const tokenDocRef = firestore
    .collection(`users/${uid}/stream`)
    .doc(process.env.NODE_ENV === "production" ? "production" : "development")
  tokenDocRef.set({ token: streamClient.createToken(username) })
}


