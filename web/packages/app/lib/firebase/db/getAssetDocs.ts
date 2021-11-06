import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import { db } from "../index"

export const getAssetDocs = async (
  assets: string[]
): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
  const docs = []
  // - firebase only allows ten elements in a array-in query
  for (let i = 0; i < assets.length; i += 10) {
    const symbols = assets.slice(i, i + 10)

    const assetDocs = (
      await getDocs(
        query(collection(db, "tickers"), where("alpaca.symbol", "in", symbols))
      )
    ).docs

    for (const assetDoc of assetDocs) {
      if (assetDoc.exists) docs.push(assetDoc)
    }
  }
  return docs
}
