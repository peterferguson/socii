import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { firestore } from "../firebase"

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
