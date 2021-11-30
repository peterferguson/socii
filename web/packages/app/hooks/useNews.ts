import { storeNewsArticles } from "app/lib/firebase/db/storeNewsArticles"
import { useEffect, useState } from "react"
import { getNewsArticles } from "../utils/getNewsArticles"
import { WebSearchNewsItem } from "app/models/rapidNews/WebSearchNews"
import { usePrevious } from "./usePrevious"

export const useNews = (query: string, asset: string) => {
  const [news, setNews] = useState<WebSearchNewsItem[]>([])
  const [dbFetchError, setDbFetchError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notInDb, setNotInDb] = useState(false)

  const prevAsset = usePrevious(asset)

  useEffect(() => {
    // getNewsArticlesFromFirebase(asset)
    //   .then((articles) => {
    //     if (articles.length > 0) {
    //       setNews(articles)
    //       setLoading(false)
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("error fetching news from firebase", e)
    //     setDbFetchError(true)
    //   })
    if (news.length === 0 || dbFetchError) {
      getNewsArticles(query, 3, false).then(({ value }) => {
        setNews(value)
        setLoading(false)
        setNotInDb(true)
      })
    }
  }, [dbFetchError, news.length, query, asset])

  useEffect(() => {
    if (notInDb) {
      storeNewsArticles(asset, news)
    }
  }, [news, notInDb, asset])

  useEffect(() => {
    if (prevAsset !== asset) setNews([])
  }, [prevAsset, asset])

  return { news, loading }
}
