// import { useTickerPrice } from "../hooks/useTickerPrice"
import PercentChangeTag from "./PercentChangeTag"
import AssetLogo from "./AssetLogo"
import tw from "../lib/tailwind"
import { View, Text } from "react-native"

interface ILogoHeader {
  asset: string
  isin: string
  cost?: number
  purchasePrice?: number
  style?: any
  showChange?: boolean
}

// - show the logo and the price of the ticker.
// - if the ticker has a purchase price, show the % change since purchase.
// - if the ticker has a cost, show the cost as the main `price`.
export default function LogoPriceCardHeader({
  asset,
  isin,
  cost,
  purchasePrice,
  style = {},
  showChange = true,
}: ILogoHeader) {
  //   const { price: priceData } = useTickerPrice(asset)

  const priceData = {
    latestPrice: 1.0,
    iexRealtimePrice: 1.0,
    changePercent: 1.0,
  }

  const currentPrice = priceData?.iexRealtimePrice || priceData?.latestPrice
  const price = cost ? cost : currentPrice

  const priceChange = purchasePrice
    ? (currentPrice - purchasePrice) / purchasePrice
    : priceData?.changePercent

  return (
    <>
      <AssetLogo asset={asset} isin={isin} height="48" width="48" />
      <View style={style}>
        <View style={tw`w-full h-auto p-1 rounded-full px-2 mx-1 mt-1`}>
          <Text
            style={tw`text-base lg:text-xl font-poppins-600 text-center text-gray-500`}
          >
            {asset} &bull; ${price}
          </Text>
          {showChange && priceChange !== null && (
            <PercentChangeTag pctChange={priceChange} />
          )}
        </View>
      </View>
    </>
  )
}
