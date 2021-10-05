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

export const getCategoryTickers = async (
  categoryShortName: string,
  lastLoaded: DocumentReference,
  stockLimit: number
) =>
  await getDocs(
    query(
      collection(firestore, "tickerCategories"),
      where("shortName", "==", categoryShortName),
      orderBy("shortName", "asc"),
      startAfter(lastLoaded ?? 0),
      limit(stockLimit)
    )
  )
