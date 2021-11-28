import { FreeNewsItem } from "app/models/rapidNews/FreeNews"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore"
import { db } from "../index"

/*
 * Gets the news articles from ticker/{isin}/news collection with paginatation
 * @param  {string} tickerSymbol
 */

//TODO  write articles to fb every 20 min or so to save calling news api every time
//      maybe better if too many people use app at one time
export const getFirebaseNewsArticles = async () => {
  let newsQuery

    newsQuery = query(
      collection(db, `generalNews/`),
      orderBy("lastUpdated", "desc"),

    )

  return (await getDocs(newsQuery)).docs?.map((doc) => doc.data() )
}
