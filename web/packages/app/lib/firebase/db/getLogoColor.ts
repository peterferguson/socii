import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { getAssetData } from "."
import { db } from "../index"
/*
 * Gets the data from asset/{isin} document by querying the `tickerSymbol`
 * @param  {string} tickerSymbol
 */

export const getLogoColor = async (symbol: string): Promise<string> =>
  (await getAssetData(symbol)).logoColor
