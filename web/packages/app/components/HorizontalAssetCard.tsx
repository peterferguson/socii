import { Price } from "../models/Price"
import { pnlBackgroundColor } from "../utils/pnlBackgroundColor"
import tw from "app/lib/tailwind"
import React from "react"
import AssetLogo from "./AssetLogo"
import { View, Text, Pressable } from "react-native"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import SkeletonCircle from "./SkeletonCircle"
import { PriceWithChangeTagSkeleton } from "./PriceWithChangeTag"

interface IHorizontalAssetCard {
  cardRef?: React.MutableRefObject<any>
  isin: string
  logoColor: string
  symbol: string
  shortName: string
  price: Price
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
        <AssetCardPrice
          isLoading={isPriceLoading}
          price={price?.iexRealtimePrice || price?.latestPrice}
          percentChange={price?.changePercent}
        />
      </View>
    </Pressable>
  )
}

const AssetCardLogo = ({ isLoading, isin, symbol }) => (
  <View
    style={tw.style(`items-center justify-center rounded-full ml-1 mr-2`, {
      flex: 1,
    })}
  >
    {isLoading ? (
      <SkeletonCircle radius={24} />
    ) : (
      <AssetLogo isin={isin} asset={symbol} height="48" width="48" />
    )}
  </View>
)

const AssetCardName = ({
  isLoading,
  symbol,
  logoColor,
  shortName,
}: {
  isLoading: boolean
  symbol: string
  logoColor: string
  shortName: string
}) => (
  <View style={tw.style(`my-auto`, { flex: 4 })}>
    <View style={tw`flex-col my-auto`}>
      <Text
        style={tw.style(
          `text-sm tracking-wider text-gray-400 uppercase font-poppins-600`,
          {
            color: isLoading ? tw.color(`brand-black dark:brand-gray`) : logoColor,
          }
        )}
      >
        {isLoading ? "symbol" : symbol}
      </Text>
      <Text
        style={tw`flex text-xs tracking-wider text-gray-600 font-poppins-400`}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {isLoading ? "Company name" : shortName}
      </Text>
    </View>
  </View>
)

const AssetCardPrice = ({ isLoading, price, percentChange }) => {
  const pnlColor = pnlBackgroundColor(price?.changePercent)
  const pnlTextColor = pnlColor.replace("200", "600").replace("bg", "text")
  return (
    <View
      style={tw.style(`flex flex-col items-center justify-center ml-4`, { flex: 2 })}
    >
      {isLoading ? (
        <PriceWithChangeTagSkeleton />
      ) : (
        <>
          <Text
            style={tw`overflow-hidden text-sm tracking-wider font-open-sans-600 text-gray-600 uppercase `}
          >
            ${price?.toFixed(2)}
          </Text>
          <View style={tw`${pnlColor} px-2 py-0.5 rounded-full w-full`}>
            <Text
              style={tw`text-black text-tiny sm:text-xs font-open-sans-600 text-center ${pnlTextColor}`}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              M: {(percentChange * 100)?.toFixed(2)}%
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

export default React.memo(HorizontalAssetCard)
