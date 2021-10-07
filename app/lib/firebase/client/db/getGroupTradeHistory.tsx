import {
  collection,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore"
import { firestore } from "."

export interface GroupTradeItem {
  symbol: string
  side: string
  notional: string
  type: string
  username: string
  messageId: string
  executionStatus: string
  timestamp: Timestamp
}
/*
 * Gets the group trade history
 * @param  {groupName} 
 */

export const getGroupTradeHistory = async (
  groupName: string
) => {
  let tradesQuery
  tradesQuery = query(
    collection(firestore, `groups/${groupName}/trades`)
  )

  return (await getDocs(tradesQuery)).docs?.map((doc) => doc.data() as GroupTradeItem)
}
