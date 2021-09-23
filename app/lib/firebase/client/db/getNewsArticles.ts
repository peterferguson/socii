import { RapidApiNewsItem } from "@utils/getNewsArticles"
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore"
import { firestore } from "."

/*
 * Gets the news articles from ticker/{isin}/news collection with paginatation
 * @param  {string} tickerSymbol
 */

export const getNewsArticles = async (
  symbol: string,
  lastDatePublished: string = "",
  pageCount: number = 3
) => {
  let newsQuery

  if (lastDatePublished === "")
    newsQuery = query(
      collectionGroup(firestore, `stocks/${symbol}/news`),
      orderBy("datePublished", "desc"),
      limit(pageCount)
    )
  else
    newsQuery = query(
      collectionGroup(firestore, `stocks/${symbol}/news`),
      startAfter(lastDatePublished),
      limit(pageCount)
    )
  return (await getDocs(newsQuery)).docs?.map((doc) => doc.data() as RapidApiNewsItem)
}
