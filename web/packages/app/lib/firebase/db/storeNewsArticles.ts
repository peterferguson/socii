import { RapidApiNewsItem } from "@utils/getNewsArticles"
import { writeBatch, doc } from "firebase/firestore"
import { getTickerISIN } from "."
import { db } from "../index"

/*
 * Stores rapid api news articles for symbol in `stocks/{symbol}/news`
 * @param  {string} symbol
 * @param  {RapidApiNewsResult} news
 */

export const storeNewsArticles = async (symbol: string, news: RapidApiNewsItem[]) => {
  const batch = writeBatch(db)

  const isin = await getTickerISIN(symbol)

  for (const article of news) {
    const articleRef = doc(db, `tickers/${isin}/news`, article.id)
    batch.set(articleRef, article)
  }

  await batch.commit()
}
