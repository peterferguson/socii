import { firestore } from "@lib/firebase/client/db/index"
import { collection, query, where, getDocs } from "firebase/firestore"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "./getYahooTimeseries"

interface Position {
  symbol: string
  qty: string
  marketValue: string
  unrealizedPl: string
  //gainPct: string
}

export const getGroupPositions = async (groupName: string) => {
  const holdingsRef = query(
    collection(firestore, `groups/${groupName}/holdings`),
    where("qty", "!=", 0)
  )
  const holdings = await getDocs(holdingsRef)

  const marketCalculations = (qty, avgPrice, marketPrice) => {
    const marketValue = qty * marketPrice
    const boughtFor = qty * avgPrice
    const unrealizedPl = marketValue - boughtFor
    //const gainPct =  unrealizedPl/boughtFor // TODO correct this
    return { marketValue, unrealizedPl }
  }

  const positions = holdings.docs.map((doc) => {
    const { symbol, qty, avgPrice } = doc.data()
    return { symbol, qty, avgPrice }
  })

  const priceData = await getYahooTimeseries({
    tickers: positions.map((pos) => pos.symbol),
    period: PeriodEnum["1D"],
    interval: IntervalEnum["1D"],
  })

  return {
    positions: positions.map((pos) => {
      const marketPrice = priceData[pos.symbol]?.pop().close

      const { marketValue, unrealizedPl } = marketCalculations(
        pos.qty,
        pos.avgPrice,
        marketPrice
      )
      return { ...pos, marketValue, unrealizedPl }
    }),
  }
}
