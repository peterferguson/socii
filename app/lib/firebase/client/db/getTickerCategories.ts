import { collection, getDocs, query } from "firebase/firestore"
import { firestore } from "."

export const getTickerCategories = async () =>
  await getDocs(query(collection(firestore, "tickerCategories")))
