import { collection, getDocs, query } from "firebase/firestore"
import { db } from ".."

export const getTickerCategories = async () =>
  await getDocs(query(collection(db, "tickerCategories")))
