//import { storeNewsArticles } from "app/lib/firebase/db/storeNewsArticles"
import { useEffect, useState } from "react"
import { getGeneralNewsArticles } from "../utils/getGeneralNewsArticles"
import { FreeNewsItem } from "app/models/rapidNews/FreeNews"
import { usePrevious } from "./usePrevious"
import  { getFirebaseNewsArticles }  from "app/lib/firebase/db/getFirebaseNewsArticles"

export const useGeneralNews = (query: string) => {
  const [news, setNews] = useState<FreeNewsItem[]>([])
  const [dbFetchError, setDbFetchError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notInDb, setNotInDb] = useState(false)



  useEffect(() => {
    // TODO write results to fb and update every 10 min
    // getFirebaseNewsArticles()
    //   .then((articles) => {
    //     console.log(articles);
        
    //   })
    //   .catch((e) => {
    //     console.log("error fetching news from firebase", e)
    //     setDbFetchError(true)
    //   })

    if (news?.length === 0 || dbFetchError) {
      getGeneralNewsArticles(query, 10).then(({ articles }) => {
        
        setNews(articles)
        setLoading(false)
        setNotInDb(true)
      })
    }
  }, [dbFetchError, news?.length, query])

  useEffect(() => {
    if (notInDb) {
      //storeNewsArticles(asset, news)
    }
  }, [news, notInDb])

  // useEffect(() => {
  //   if (prevAsset !== asset) setNews([])
  // }, [prevAsset, asset])

  return { news, loading }
}
