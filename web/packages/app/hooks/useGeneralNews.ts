//import { storeNewsArticles } from "app/lib/firebase/db/storeNewsArticles"
import { useEffect, useState, useCallback } from "react"
import { getGeneralNewsArticles } from "../utils/getGeneralNewsArticles"
import { FreeNewsItem } from "app/models/rapidNews/FreeNews"

export const useGeneralNews = (query: string) => {
  const [news, setNews] = useState<FreeNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (news?.length === 0)
      getGeneralNewsArticles(query, 10, page).then(({ articles }) => {
        setNews(articles)
      })

    setLoading(false)
  }, [query])

  const getMoreArticles = useCallback(() => {
    setLoading(true)
    getGeneralNewsArticles(query, 10, page + 1).then(({ articles }) => {
      articles.length > 0 &&
        setNews(n => [
          ...n,
          ...articles.filter(a => !n.find(article => article._id === a._id)),
        ])
      setPage(p => p + 1)
      setLoading(false)
    })
  }, [])

  const clearArticles = useCallback(() => {
    setLoading(true)
    setPage(1)
    setNews([])
    setLoading(false)
  }, [])

  return { news, loading, getMoreArticles, clearArticles }
}
