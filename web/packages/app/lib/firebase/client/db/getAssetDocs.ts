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
  return (
    await getDocs(query(collection(db, "assets"), where("alpaca.asset", "in", assets)))
  ).docs
}
