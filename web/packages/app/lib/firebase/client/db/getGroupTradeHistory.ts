import { collection, getDocs, query, Timestamp } from "firebase/firestore"
import { db } from "../.."

export interface GroupTradeItem {
  agreesToTrade: string[]
  alpacaAccountId: string
  assetCurrency: string
  assetRef: string
  assetType: string
  executionCurrency: string
  executorRef: string
  groupName: string
  limitPrice: string
  messageId: string
  notional: number
  shortName: string
  side: string
  stockPrice: number
  symbol: string
  timeInForce: string
  timestamp: Timestamp
  type: string
  username: string
  executionPrice?: number
  executionQty?: number
  executionStatus?: string
  executionTimestamp?: Timestamp
  executionUpdateTimestamp?: Timestamp
}
/*
 * Gets the group trade history
 * @param  {groupName}
 */

export const getGroupTradeHistory = async (groupName: string) => {
  let tradesQuery
  tradesQuery = query(collection(db, `groups/${groupName}/trades`))

  return (await getDocs(tradesQuery)).docs?.map((doc) => doc.data() as GroupTradeItem)
}
