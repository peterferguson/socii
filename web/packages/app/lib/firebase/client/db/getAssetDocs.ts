import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import { db } from "../../index"

export const getAssetDocs = async (
  assets: string[]
): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
  const docs = []

  for (let i = 0; i < assets.length; i += 10) {
    const assetDocs = (
      await getDocs(
        query(
          collection(db, "tickers"),
          where("alpaca.symbol", "in", assets.slice(i, i + 10))
        )
      )
    ).docs
    for (const assetDoc of assetDocs) {
      if (assetDoc.exists) {
        console.log(assetDoc.id)
        docs.push(assetDoc)
      }
    }
  }
  return docs
}
