import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { firestore } from "."

/*
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */

export const getTickerISIN = async (ticker: string): Promise<string> =>
  (ticker &&
    (
      await getDocs(
        query(
          collection(firestore, "tickers"),
          where("tickerSymbol", "==", ticker?.toUpperCase()),
          limit(1)
        )
      )
    )?.docs?.pop()?.id) ||
  ""
