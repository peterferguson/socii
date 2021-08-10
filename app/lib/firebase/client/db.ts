import FirebaseUser from "@models/FirebaseUser"
import {
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore"
import React from "react"
import { firestore } from "./firebase"

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
export async function createUser(uid: string, data: object) {
  return await setDoc(doc(firestore, "users", uid), { uid, ...data }, { merge: true })
}

/*
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users")
  const userQuery = query(usersRef, where("username", "==", username), limit(1))
  const querySnapshot = await getDocs(userQuery)
  const userDoc = querySnapshot.docs?.pop()
  return userDoc
}

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */
export const setUserState = (
  uid: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setUserGroups: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const userRef = doc(firestore, `users/${uid}`)
  const unsubscribe = onSnapshot(userRef, (doc) => {
    const { username, groups } = doc.data()
    setUsername(username)
    setUserGroups(groups)
  })

  return unsubscribe
}

/*
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */
export async function tickerToISIN(ticker: string): Promise<string> {
  const tickerRef = collection(firestore, "tickers")
  const tickerQuery = query(
    tickerRef,
    where("tickerSymbol", "==", ticker.toUpperCase()),
    limit(1)
  )
  const tickerDoc = (await getDocs(tickerQuery)).docs?.pop()
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
  const userGroupRef = doc(firestore, `users/${user.uid}`)
  const groupRef = doc(firestore, `groups/${groupName}`)
  const investorsRef = doc(firestore, `groups/${groupName}/investors/${username}`)

  const batch = writeBatch(firestore)
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
  const tickerQuery = query(
    collectionGroup(firestore, "data"),
    where("symbol", "==", tickerSymbol),
    limit(1)
  )
  const tickerDoc = (await getDocs(tickerQuery)).docs?.pop()
  const ISIN = tickerDoc.ref.path.split("/")[1]
  // TODO: Create a model of the ticker data
  return { ...tickerDoc.data(), ISIN }
}

/*
 * Check if user with `uid` has agreed to trade with `messageId` in group with `groupName`
 * @param  {string} groupName
 * @param  {string} messgeId
 * @param  {string} uid
 */
export const agreesToTrade = async (
  groupName: string,
  messageId: string,
  uid: string
) => {
  const tradesRef = doc(firestore, `groups/${groupName}/trades/${messageId}`)
  await updateDoc(tradesRef, { agreesToTrade: arrayUnion(`users/${uid}`) })
}

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */
export const setHoldingData = (
  groupName: string,
  setHoldings: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot[]>>
) => {
  const holdingsRef = query(
    collection(firestore, `groups/${groupName}/holdings`),
    where("shares", "!=", 0)
  )
  const unsubscribe = onSnapshot(holdingsRef, (snap) => setHoldings(snap.docs))

  return unsubscribe
}

/*
 * Gets a users stream token from users/{uid}/stream subcollection
 * @param  {string} username
 */
export const getUserStreamToken = async (uid: string) => {
  const tokenRef = doc(firestore, `users/${uid}/stream/${uid}`)
  const snapshot = await getDoc(tokenRef)
  return snapshot.data()?.token
}

export const getTickerDocs = async (tickerSymbols: string[]) =>
  await getDocs(
    query(collection(firestore, "tickers"), where("tickerSymbol", "in", tickerSymbols))
  )

/*
 * Gets all popular tickers from tickers collection
 * @param  {string} username
 */
export const getPopularTickersDocs = async () =>
  await getDocs(query(collection(firestore, "tickers"), where("isPopular", "==", true)))

/*
 * Get the alpha vantage data of a ticker allowing for a particular field to be queried
 * @param  {string} username
 */
export const getAlphaVantageData = async (tickerSymbol: string, queryField: string) => {
  const dataQuery = query(
    collectionGroup(firestore, "data"),
    where("symbol", "==", tickerSymbol), // ! This identifies the AV doc over Yahoo
    where(queryField, ">", "''"),
    orderBy(queryField, "asc"),
    limit(1)
  )
  // ! To get the Yahoo doc use "recommendations.symbol"

  const dataDoc = (await getDocs(dataQuery)).docs?.pop()

  const data = dataDoc.data()

  return { ...data, lastUpdate: data?.lastUpdate.toMillis() }
}

export const getTickerTimeseriesDocs = async (isin: string, pageLimit: number = 30) =>
  await getDocs(
    query(
      collection(firestore, `tickers/${isin}/timeseries`),
      orderBy("timestamp", "desc"),
      limit(pageLimit)
    )
  )

export const getAlpacaStocks = async (): Promise<QuerySnapshot> =>
  await getDocs(
    query(
      collection(firestore, "tickers"),
      where("alpaca", "!=", ""),
      orderBy("alpaca", "desc")
    )
  )

export const getMainPageStocks = async (
  lastLoaded: DocumentReference,
  stockLimit: number
) =>
  await getDocs(
    query(
      collection(firestore, "tickers"),
      where("alpaca.lastUpdated", ">", new Date(0)),
      orderBy("alpaca.lastUpdated", "asc"),
      startAfter(lastLoaded ?? 0),
      limit(stockLimit)
    )
  )

export const getGroupDocsByName = async (groupNames: string[]) =>
  await getDocs(
    query(collection(firestore, "groups"), where("groupName", "in", groupNames))
  )
