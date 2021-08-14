import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "."

export const getTickerDocs = async (tickerSymbols: string[]) =>
  await getDocs(
    query(collection(firestore, "tickers"), where("tickerSymbol", "in", tickerSymbols))
  )
