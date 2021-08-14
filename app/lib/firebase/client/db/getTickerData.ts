import { collectionGroup, getDocs, limit, query, where } from "firebase/firestore"
import { firestore } from "."

/*
 * Gets the data from ticker/{isin} document by querying the `tickerSymbol`
 * @param  {string} tickerSymbol
 */

export const getTickerData = async (tickerSymbol: string) => {
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
