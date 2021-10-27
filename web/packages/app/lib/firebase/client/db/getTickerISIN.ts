import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../../index"

/*
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */

export const getTickerISIN = async (ticker: string): Promise<string> =>
  (ticker &&
    (
      await getDocs(
        query(
          collection(db, "tickers"),
          where("alpaca.symbol", "==", ticker?.toUpperCase()),
          limit(1)
        )
      )
    )?.docs?.pop()?.id) ||
  ""
