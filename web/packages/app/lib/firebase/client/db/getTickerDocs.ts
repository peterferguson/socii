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
  return (
    await getDocs(
      query(collection(db, "tickers"), where("alpaca.symbol", "in", tickers))
    )
  ).docs
}
