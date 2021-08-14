import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { firestore } from "."

/*
 * Get the alpha vantage data of a ticker allowing for a particular field to be queried
 * @param  {string} username
 */

export const getAlphaVantageData = async (tickerSymbol: string, queryField: string) => {
  const dataQuery = query(
    collectionGroup(firestore, "data"),
    where("symbol", "==", tickerSymbol),
    where(queryField, ">", "''"),
    orderBy(queryField, "asc"),
    limit(1)
  )
  // ! To get the Yahoo doc use "recommendations.symbol"
  const dataDoc = (await getDocs(dataQuery)).docs?.pop()

  const data = dataDoc.data()

  return { ...data, lastUpdate: data?.lastUpdate.toMillis() }
}
