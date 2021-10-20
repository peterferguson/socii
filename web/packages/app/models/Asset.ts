import dayjs from "dayjs"

interface AlpacaAssetMeta {
  class?: "us_equity"
  easy_to_borrow?: boolean
  exchange: "NASDAQ"
  fractionable: boolean
  id?: string
  lastUpdated?: dayjs.Dayjs | string
  marginable?: boolean
  name: string
  shortable?: boolean
  status?: "active" | "inactive"
  symbol: string
  tradable: boolean
}

export interface Asset {
  ISIN: string
  alpaca: AlpacaAssetMeta
  assetType: string
  exchangeAbbreviation:
    | "NMS"
    | "NASDAQ"
    | "NYSE"
    | "OTCBB"
    | "OTC"
    | "OTCMKTS"
    | "OTCBB"
  isDisabled: false
  logoColor: string
  logoColorLastUpdated: dayjs.Dayjs | string
  longName: string
  marketCountry: string
  marketName: string
  shortName: string
  tickerSymbol: string
  yahooMarketSuffix: string
}
