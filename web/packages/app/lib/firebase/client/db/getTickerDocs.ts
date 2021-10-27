import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import { db } from "../../."

export const getTickerDocs = async (
  tickers: string[]
): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
  const docs = []
  // - firestore `in` query is limited to arrays of length 10
  for (let i = 0; i < tickers.length; i += 10) {
    docs.push(
      ...(
        await getDocs(
          query(
            collection(db, "tickers"),
            where("alpaca.symbol", "in", tickers.slice(i, i + 10))
          )
        )
      ).docs
    )
  }
  return docs
}
