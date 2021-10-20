import { DocumentData } from "@firebase/firestore"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { Price } from "@models/Price"
import { getAssetProps } from "./getAssetProps"
import { IntervalEnum, PeriodEnum } from "./getYahooTimeseries"
const { Client } = require("iexjs")

interface IAssetsStaticProps {
  assetDocs: DocumentData[]
  period?: PeriodEnum
  interval?: IntervalEnum
  subQueryField?: string
}

interface AssetPropsData {
  asset: any
  timeseries: OHLCTimeseries
  dataQuery?: any
  price?: Price
}

export interface AssetsProps {
  assets: AssetPropsData[]
}

interface IAssetsStaticPropsResult {
  props: AssetsProps
}

// TODO: Remove the timeseries query so we can pull it separately and load other data first
// TODO: Allow a query list to filter the return in the asset data

export const getAssetStaticProps = async ({
  assetDocs,
  period = PeriodEnum["1D"],
  interval = IntervalEnum["1m"],
  subQueryField = "",
}: IAssetsStaticProps): Promise<IAssetsStaticPropsResult> => {
  const iexClient = new Client({ api_token: process.env.IEX_TOKEN, version: "stable" })
  console.log(`Loading ${assetDocs.length} assets`)

  return {
    props: {
      assets: await Promise.all(
        assetDocs?.map(async (assetDoc) => {
          let asset, timeseries: OHLCTimeseries, dataQuery, price: Price
          try {
            const assetProps = await getAssetProps(
              assetDoc,
              period,
              interval,
              subQueryField
            )
            asset = assetProps.asset
            timeseries = assetProps.timeseries
            dataQuery = assetProps.dataQuery
          } catch (e) {
            console.error(e)
          }

          // TODO: Create a wrapper arround the price data to store it in firestore
          // !
          // !
          // !
          // TODO: Get the price through an API call no need for library here
          // !
          // !
          // !
          try {
            price = await iexClient.quote(asset.assetAsset, {
              filter: "latestPrice,changePercent,iexRealtimePrice,latestUpdate",
            })
          } catch (error) {
            console.log(error)
          }

          return {
            asset: JSON.parse(JSON.stringify(asset)) || {}, // - serialize nested dates
            timeseries: (timeseries || []) as OHLCTimeseries,
            dataQuery: dataQuery || {},
            price: (price || {}) as Price,
          }
        })
      ),
    },
  }
}
