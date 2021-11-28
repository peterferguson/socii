import tw from "app/lib/tailwind"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { useRouter } from "../navigation/use-router"
import AssetLogo from "./AssetLogo"
import PriceWithChangeTag, { PriceWithChangeTagSkeleton } from "./PriceWithChangeTag"
import SkeletonCircle from "./SkeletonCircle"
import SkeletonText from "./SkeletonText"
import VerticalSpacer from "./VerticalSpacer"

interface IStockCard {
  symbol: string
  shortName: string
  avgPrice: number
  qty: number
  logoColor: string
  ISIN: string
  currentPrice: number
}

export default function StockCard({
  symbol,
  shortName,
  avgPrice,
  qty,
  logoColor,
  ISIN,
  currentPrice,
}: IStockCard) {
  const pnl = (100 * (currentPrice - avgPrice)) / currentPrice

  // TODO: Remove the hard coding of this card width
  return (
    <View style={tw`flex-row items-center justify-between py-1`}>
      {!!(ISIN && shortName) ? (
        <AssetLogoWithNameAndSymbol {...{ symbol, shortName, logoColor, isin: ISIN }} />
      ) : (
        <AssetLogoWithNameAndSymbolSkeleton />
      )}
      <View style={tw`flex-col items-center justify-center w-20 mr-4`}>
        {currentPrice && qty && pnl ? (
          <PriceWithChangeTag {...{ price: currentPrice, qty, pnl }} />
        ) : (
          <PriceWithChangeTagSkeleton />
        )}
      </View>
    </View>
  )
}

const AssetLogoWithNameAndSymbolSkeleton = () => (
  <View style={tw.style("flex-row items-center m-1 bg-white")}>
    <SkeletonCircle radius={20} />
    <View style={tw`items-start my-1 pl-2 pr-4 min-w-[70px]`}>
      <SkeletonText
        width={tw`w-20`.width as number}
        height={tw`h-3`.height as number}
      />
      <VerticalSpacer height={8} />
      <SkeletonText
        width={tw`w-20`.width as number}
        height={tw`h-3`.height as number}
      />
    </View>
  </View>
)

const AssetLogoWithNameAndSymbol = ({ symbol, isin, logoColor, shortName }) => {
  const router = useRouter()
  return (
    <View
      style={tw.style(
        "flex-row items-center m-1 bg-white",
        "umami--click--stock-card",
        `umami--click--${symbol}-stock-card`,
        { flex: 4 }
      )}
    >
      <Pressable onPress={() => router.push(`/stocks/${symbol}`)} style={tw`p-1`}>
        <AssetLogo asset={symbol} isin={isin} height="40" width="40" />
      </Pressable>
      <View style={tw`items-start my-1 pl-2`}>
        <Text
          style={tw.style(`text-base tracking-wider uppercase font-poppins-400`, {
            color: logoColor,
          })}
        >
          {symbol}
        </Text>
        <Text
          style={tw`font-poppins-200 tracking-wider uppercase text-brand-shade-darkest text-tiny`}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {shortName}
        </Text>
      </View>
    </View>
  )
}
