import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../../index"

interface AssetData {
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
    asset: string
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
 * Gets the data from asset/{isin} document by querying the `tickerSymbol`
 * @param  {string} tickerSymbol
 */

export const getAssetData = async (tickerSymbol: string): Promise<AssetData> => {
  const assetQuery = query(
    collection(db, "tickers"),
    where("alpaca.symbol", "==", tickerSymbol),
    limit(1)
  )
  const assetDoc = (await getDocs(assetQuery)).docs?.pop()
  // TODO: Create a model of the asset data
  return { ...assetDoc?.data(), ISIN: assetDoc?.id } as AssetData
}
