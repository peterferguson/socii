import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { firestore } from "."

interface TickerData {
  ISIN: string
  alpaca: {
    class: string
    easy_to_borrow: boolean
    exchange: string
    fractionable: boolean
    id: string
    lastUpdated: string | Date
    marginable: boolean
    name: string
    shortable: boolean
    status: string
    symbol: string
    tradable: boolean
    assetType: string
  }
  categories: string[]
  exchange: string
  exchangeAbbreviation: string
  isDisabled: boolean
  isPopular: boolean
  logoColor: string
  logoColorLastUpdated: string | Date
  logoUrl: string
  longName: string
  marketCountry: string
  marketName: string
  shortName: string
  tickerSymbol: string
  timeseriesLastUpdated: string | Date
  yahooMarketSuffix: string
}

/*
 * Gets the data from ticker/{isin} document by querying the `tickerSymbol`
 * @param  {string} tickerSymbol
 */

export const getTickerData = async (tickerSymbol: string): Promise<TickerData> => {
  const tickerQuery = query(
    collection(firestore, "tickers"),
    where("alpaca.symbol", "==", tickerSymbol),
    limit(1)
  )
  const tickerDoc = (await getDocs(tickerQuery)).docs?.pop()
  // TODO: Create a model of the ticker data
  return { ...tickerDoc?.data(), ISIN: tickerDoc?.id } as TickerData
}
