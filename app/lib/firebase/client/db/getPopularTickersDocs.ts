import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "."

/*
 * Gets all popular tickers from tickers collection
 * @param  {string} username
 */

export const getPopularTickersDocs = async () =>
  await getDocs(query(collection(firestore, "tickers"), where("isPopular", "==", true)))
