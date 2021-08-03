import FirebaseUser from "@models/FirebaseUser"
import { arrayUnion, serverTimestamp, firestore } from "./firebase"

/*
!
! This file is for functions which perform CRUD operations on Firebase
! These operations can be called from the client OR THE SERVER
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
  return tickerDoc.id
}

/*
 * Create a group document at groups/{groupId} with data.
 * If group document exists overwrites old
 *
 * @param  {string} user
 * @param  {string} username
 * @param  {string} groupName
 * @param  {string} privacyOption
 * @param  {object} depositOption
 * @param  {object} lumpSumOption
 * @param  {string} groupDescription
 */
export async function createGroup(
  user: FirebaseUser,
  username: string,
  groupName: string,
  privacyOption: { name: string; description: string },
  depositOption: { amount: number },
  lumpSumOption: { amount: number },
  groupDescription: string
) {
  const userGroupRef = firestore.doc(`users/${user.uid}`)
  const groupRef = firestore.doc(`groups/${groupName}`)
  const investorsRef = firestore.doc(`groups/${groupName}/investors/${username}`)

  const batch = firestore.batch()
  batch.update(userGroupRef, { groups: arrayUnion(groupName) })
  batch.set(groupRef, {
    groupDescription,
    groupName,
    privacyOption,
    groupType: "", // TODO: Implement group types (dividend/active/value/growth)
    cashBalance: depositOption.amount + lumpSumOption.amount, //TODO: Add this to the payment ledger
    initialDeposit: lumpSumOption.amount, // TODO: Rename the options to match these options better
    subscriptionAmount: depositOption.amount,
    startDate: serverTimestamp(),
    investorCount: 1, // TODO: Increment this on addition of new investors
  })
  batch.set(investorsRef, {
    isFounder: true,
    joinDate: serverTimestamp(),
    uid: user.uid,
  })

  await batch.commit()
}

/*
 * Gets the data from ticker/{isin} document by querying the `tickerSymbol`
 * @param  {string} tickerSymbol
 */
export const getTickerData = async (tickerSymbol) => {
  // - set the rate for the currency pair in local storage
  const tickerQuery = firestore
    .collectionGroup("data")
    .where("symbol", "==", tickerSymbol)
    .limit(1)
  // const [snapshot, loading, error] = useCollectionOnce(query, options);
  const tickerDoc = (await tickerQuery.get()).docs?.[0]
  const ISIN = tickerDoc.ref.path.split("/")[1]
  return { ...tickerDoc.data(), ISIN }
}

/*
 * Check if user with `uid` has agreed to trade with `messageId` in group with `groupName`
 * @param  {string} groupName
 * @param  {string} messgeId
 * @param  {string} uid
 */
export const agreesToTrade = async (groupName, messageId, uid) => {
  const tradesRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  await tradesRef.update({ agreesToTrade: arrayUnion(`users/${uid}`) })
}
