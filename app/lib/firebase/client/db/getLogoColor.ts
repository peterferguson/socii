import { doc, getDoc } from "firebase/firestore"
import { firestore } from "."

/*
 * Gets a tickers logo color from tickers/{isin} document
 * @param  {string} isin
 */

export const getLogoColor = async (isin: string): Promise<string> => {
  const tokenRef = doc(firestore, `tickers/${isin}`)
  const snapshot = await getDoc(tokenRef)
  return snapshot.data()?.logoColor
}
