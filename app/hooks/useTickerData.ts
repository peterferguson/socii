import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { useEffect, useState } from "react"

export const useTickerData = (tickers: string[]) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getTickerData = async () => {
      const data = (await getTickerDocs(tickers))?.map((doc) => doc.data())
      setData(data.map((doc) => ({ [doc.tickerSymbol]: doc })))
    }
    getTickerData()
  }, [tickers])

  return data
}
