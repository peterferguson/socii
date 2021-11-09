import { db } from "app/lib/firebase/index"
import { collection, query, where, getDocs } from "firebase/firestore"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "./getYahooTimeseries"

interface Position {
  asset: string
  qty: string
  marketValue: string
  unrealizedPl: string
  //gainPct: string
}

export const getGroupPositions = async (groupName: string) => {
  const holdingsRef = query(
    collection(db, `groups/${groupName}/holdings`),
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

  const positions = holdings.docs.map(doc => {
    const { asset, qty, avgPrice } = doc.data()
    return { asset, qty, avgPrice }
  })

  const priceData = await getYahooTimeseries({
    assets: positions.map(pos => pos.asset),
    period: PeriodEnum["1D"],
    interval: IntervalEnum["1D"],
  })

  return {
    positions: positions.map(pos => {
      const marketPrice = priceData[pos.asset]?.pop().close

      const { marketValue, unrealizedPl } = marketCalculations(
        pos.qty,
        pos.avgPrice,
        marketPrice
      )
      return { ...pos, marketValue, unrealizedPl }
    }),
  }
}
