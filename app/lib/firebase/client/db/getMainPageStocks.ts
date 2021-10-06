import {
  collection,
  DocumentReference,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore"
import { firestore } from "."

export const getMainPageStocks = async (
  lastLoaded: DocumentReference,
  stockLimit: number
) =>
  (
    await getDocs(
      query(
        collection(firestore, "tickers"),
        where("alpaca.lastUpdated", ">", new Date(0)),
        orderBy("alpaca.lastUpdated", "asc"),
        startAfter(lastLoaded ?? 0),
        limit(stockLimit)
      )
    )
  ).docs
