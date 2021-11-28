import { Price } from "../models/Price"
import tw from "app/lib/tailwind"
import React from "react"
import { View, Pressable } from "react-native"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import { AssetCardLogo } from "./AssetCardLogo"
import { AssetCardName } from "./AssetCardName"
import { AssetCardPrice } from "./AssetCardPrice"

interface IHorizontalAssetCard {
  cardRef?: React.MutableRefObject<any>
  isin: string
  logoColor: string
  symbol: string
  shortName: string
  price?: Price
}
const HorizontalAssetCard = ({
  cardRef,
  isin,
  symbol,
  logoColor,
  shortName,
  price,
}: IHorizontalAssetCard) => {
  const router = useRouter()
  const isLoading = !isin
  const isPriceLoading = !price?.latestPrice

  return (
    <Pressable
      onPress={() => router.push(`/stocks/${symbol}`)}
      ref={cardRef ? cardRef : null}
      style={{ ...tw`w-11/12 max-w-sm mx-auto my-2`, ...shadowStyle("md") }}
    >
      <View
        style={{
          ...tw`flex-row h-20 p-2 overflow-hidden bg-white rounded-lg`,
          ...shadowStyle("2xl"),
        }}
      >
        <View style={{ flexDirection: "row", flex: 6 }}>
          <AssetCardLogo {...{ isLoading, isin, symbol }} />
          <AssetCardName {...{ isLoading, symbol, logoColor, shortName }} />
        </View>
        {price && (
          <AssetCardPrice
            isLoading={isPriceLoading}
            price={price?.iexRealtimePrice || price?.latestPrice}
            percentChange={price?.changePercent}
          />
        )}
      </View>
    </Pressable>
  )
}

export default React.memo(HorizontalAssetCard)
