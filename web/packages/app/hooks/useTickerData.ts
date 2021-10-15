import { getTickerDocs } from "../lib/firebase/client/db/getTickerDocs"
import { useEffect, useState } from "react"
import { Ticker } from "../models/Ticker"

export const useTickerData = (tickers: string[]): { [symbol: string]: Ticker }[] => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getTickerData = async () => {
      const data = (await getTickerDocs(tickers))?.map((doc) => doc.data())
      setData(data.map((doc) => ({ [doc.alpaca.symbol]: doc })))
    }
    getTickerData()
  }, [tickers])

  return data
}
