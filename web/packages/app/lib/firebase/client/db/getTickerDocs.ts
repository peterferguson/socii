import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import { db } from "../../index"

export const getTickerDocs = async (
  tickers: string[]
): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
  console.log("getTickerDocs", tickers)
  console.log(
    (
      await getDocs(
        query(collection(db, "tickers"), where("alpaca.symbol", "in", tickers))
      )
    ).docs
  )
  return (
    await getDocs(
      query(collection(db, "tickers"), where("alpaca.symbol", "in", tickers))
    )
  ).docs
}
