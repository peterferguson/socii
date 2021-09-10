import { iexQuote } from "@utils/iexQuote"
import { Price } from "@models/Price"
import { firestore } from "@lib/firebase/client/db/index"
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"
const { Client } = require("iexjs")
const iexClient = new Client({ api_token: process.env.IEX_TOKEN, version: "stable" })

interface Position {
  symbol: string
  qty: string
  marketValue: string
  unrealizedPl: string
  gainPct: string
}

export const getGroupPositions = async (groupName: string) => {
  
  let tmpPos = <Position>{}
  let tmpPosArr = []
  let price:Price
 
  const holdingsRef = query(
    collection(firestore, `groups/${groupName}/holdings`),
    where("qty", "!=", 0)
  )
  const positions = await getDocs(holdingsRef)

  const marketCalculations = ( symbol , qty , avgPrice, marketPrice ) =>{
    const marketValue = qty*marketPrice
    const boughtFor = qty * avgPrice
    const unrealizedPl =  marketValue - boughtFor
    const gainPct =  (unrealizedPl * 100)/boughtFor // TODO correct this
    return {marketValue , unrealizedPl , gainPct}
  }

  // TODO check ordering and end await
  await Promise.all(positions.docs.map(async (pos)=>{
    let marketPrice:number
    let { symbol , qty , avgPrice } = pos.data()

    await iexClient.quote(symbol, {
      filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate",
      }).then((res)=> marketPrice=res.latestPrice)

      //marketPrice = price.latestPrice // TODO or current price
      let { marketValue , unrealizedPl , gainPct} = marketCalculations(symbol , qty , avgPrice, marketPrice)
      //console.log("after calccc",  marketValue , unrealizedPl , gainPct)
      tmpPos = {
        symbol,
        qty,
        marketValue: String(marketValue),
        unrealizedPl: String(unrealizedPl),
        gainPct: String(gainPct)
      }
      tmpPosArr.push(tmpPos)
  }))
  //console.log("yyyyyyyy", tmpPosArr)
  return {positions: tmpPosArr}
}
