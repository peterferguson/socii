import { getNewsArticles, RapidApiNewsItem } from "@utils/getNewsArticles"
import { getNewsArticles as getNewsArticlesFromFirebase } from "@lib/firebase/client/db/getNewsArticles"

import { useEffect, useState } from "react"
import { storeNewsArticles } from "@lib/firebase/client/db/storeNewsArticles"
import { usePrevious } from "./usePrevious"

export const useStockNews = (query: string, symbol: string) => {
  const [news, setNews] = useState<RapidApiNewsItem[]>([])
  const [dbFetchError, setDbFetchError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notInDb, setNotInDb] = useState(false)

  const prevSymbol = usePrevious(symbol)

  useEffect(() => {
    getNewsArticlesFromFirebase(symbol)
      .then((articles) => {
        if (articles.length > 0) {
          setNews(articles)
          setLoading(false)
        }
      })
      .catch((e) => {
        console.log("error fetching news from firebase", e)
        setDbFetchError(true)
      })
    if (news.length === 0 || dbFetchError) {
      getNewsArticles(query, 3, false).then(({ value }) => {
        setNews(value)
        setLoading(false)
        setNotInDb(true)
      })
    }
  }, [dbFetchError, news.length, query, symbol])

  useEffect(() => {
    if (notInDb) {
      storeNewsArticles(symbol, news)
    }
  }, [news, notInDb, symbol])

  useEffect(() => {
    if (prevSymbol !== symbol) setNews([])
  }, [prevSymbol, symbol])

  return { news, loading }
}
