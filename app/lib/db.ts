import { firestore } from "./firebase"

/*
!
! This file is for functions which perform CRUD operations on Firebase
!
*/

/*
 * Create user document at users/{uid} with data. If user document exists overwrites old
 * values and adds new ones.
 * @param  {string} uid
 * @param  {any} data
 */
export async function createUser(uid: string, data: any) {
  return await firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

/*
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users")
  const query = usersRef.where("username", "==", username).limit(1)
  const userDoc = (await query.get()).docs?.[0]
  return userDoc
}

/*
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */
export async function tickerToISIN(ticker: string): Promise<string> {
  const tickerSymbol = ticker.toUpperCase()
  const tickerRef = firestore.collection("tickers")
  const query = tickerRef.where("tickerSymbol", "==", tickerSymbol).limit(1)
  const tickerDoc = (await query.get()).docs?.pop()
  return await tickerDoc.id
}
