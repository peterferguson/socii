import {
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore"
import { db } from ".."

/*
 * Gets data for holding of a stock
 * @param  {string} groupName
 * @param  {string} symbol
 */

export const getStockHoldingData = async (
  groupName: string,
  symbol: string,
  
) => {
  const holdingsRef = query(
    collection(db, `groups/${groupName}/holdings`),
    where("symbol", "==", symbol),
    limit(1)
  )
  const holdingDoc = (await getDocs(holdingsRef)).docs?.pop()
  const tradeData = holdingDoc ? holdingDoc.data() : null

  return tradeData
}
