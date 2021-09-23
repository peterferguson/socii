import { getNewsArticles, RapidApiNewsItem } from "@utils/getNewsArticles"
import { getNewsArticles as getNewsArticlesFromFirebase } from "@lib/firebase/client/db/getNewsArticles"

import { useEffect, useState } from "react"
import { storeNewsArticles } from "@lib/firebase/client/db/storeNewsArticles"

export const useStockNews = (exchange: string, symbol: string) => {
  const [news, setNews] = useState<RapidApiNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notInDb, setNotInDb] = useState(false)

  useEffect(() => {
    getNewsArticlesFromFirebase(symbol).then((articles) => {
      if (articles.length > 0) {
        setNews(articles)
        setLoading(false)
      } else {
        getNewsArticles(`${exchange}:${symbol}`).then(({ value }) => {
          setNews(value)
          setLoading(false)
          setNotInDb(true)
        })
      }
    })
  }, [exchange, news.length, symbol])

  useEffect(() => {
    if (notInDb) {
      storeNewsArticles(symbol, news)
    }
  }, [news, notInDb, symbol])

  return { news, loading }
}
