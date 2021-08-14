import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { firestore } from "."

export const getTickerTimeseriesDocs = async (isin: string, pageLimit: number = 30) =>
  await getDocs(
    query(
      collection(firestore, `tickers/${isin}/timeseries`),
      orderBy("timestamp", "desc"),
      limit(pageLimit)
    )
  )
