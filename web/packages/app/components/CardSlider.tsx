import React, { useEffect, useState, useRef } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import tw from "../lib/tailwind"
import { Asset } from "../models/Asset"
import { Price } from "../models/Price"
import { useRouter } from "../navigation/use-router"
import { pnlTextColor } from "../utils/pnlTextColor"
import { shadowStyle } from "../utils/shadowStyle"
import AssetLogo from "./AssetLogo"
import SkeletonCircle from "./SkeletonCircle"
import SkeletonText from "./SkeletonText"
import VerticalSpacer from "./VerticalSpacer"

// TODO: Add a isActive state and only navigate on click of the active card

const fakeAssets = [
  { asset: { alpaca: { symbol: "" } } as Asset, price: {} as Price },
  { asset: { alpaca: { symbol: "" } } as Asset, price: {} as Price },
  { asset: { alpaca: { symbol: "" } } as Asset, price: {} as Price },
]

interface CardAsset {
  asset: Asset
  price: Price
}

const CardSlider = ({
  assets,
  isLoading,
}: {
  assets: CardAsset[]
  isLoading: boolean
}) => {
  const [initialAssets, setInitialAssets] = useState(fakeAssets)

  useEffect(() => {
    if (!isLoading && assets.length > 0) {
      // - update previous display assets to avoid unmounting
      setInitialAssets(assets.slice(0, 3))
    }
  }, [isLoading, assets])

  return (
    <ScrollView
      style={tw.style(
        `flex-row p-4 umami--drag--popular-stocks-card-slider`,
        shadowStyle("lg") as any
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={!isLoading}
    >
      <View style={tw`flex-row`}>
        {initialAssets.concat(assets.slice(3)).map(({ asset, price }, i) => (
          <MemoizedSliderCard
            key={`card-${i}-${asset.alpaca.symbol}`}
            symbol={asset.alpaca.symbol}
            isin={asset.ISIN}
            shortName={asset?.shortName}
            logoColor={asset?.logoColor}
            latestPrice={price?.latestPrice}
            changePercent={price?.changePercent}
            isLoading={isLoading}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export const SliderCard = ({
  symbol,
  isin,
  shortName,
  logoColor,
  latestPrice,
  changePercent,
  isLoading,
}: {
  symbol: string
  isin: string
  shortName: string
  logoColor: string
  latestPrice: number
  changePercent: number
  isLoading: boolean
}) => {
  const router = useRouter()
  return (
    <View
      style={tw.style(`mx-2 bg-white rounded-2xl border-l-4 flex-1 flex-grow`, {
        borderColor: logoColor,
      })}
    >
      <Pressable
        onPress={() => {
          if (symbol)
            return router.push({
              pathname: `/stocks/${symbol}`,
              query: {
                asset: symbol,
                logoColor: logoColor,
              },
            })
        }}
        style={tw`h-60 w-40 p-4`}
      >
        <SliderCardImage
          symbol={symbol}
          isin={isin}
          isImageLoading={!isin || !symbol}
        />
        <SliderCardText
          symbol={symbol}
          shortName={shortName}
          logoColor={logoColor}
          textIsLoading={!shortName || !symbol || !logoColor}
        />
        <SliderCardPrice
          price={latestPrice}
          percentChange={changePercent}
          priceIsLoading={isLoading || !latestPrice}
        />
      </Pressable>
    </View>
  )
}

const SliderCardImage = ({ symbol, isin, isImageLoading }) =>
  isImageLoading ? (
    <SkeletonCircle radius={26} />
  ) : (
    <AssetLogo asset={symbol} isin={isin} height="52" width="52" />
  )

const SliderCardText = ({
  textIsLoading,
  symbol,
  shortName,
  logoColor,
}: {
  textIsLoading: boolean
  symbol: string
  shortName: string
  logoColor: string
}) => (
  <View style={{ ...tw`flex-col py-8 px-2 flex-1`, alignContent: "stretch" }}>
    {!textIsLoading ? (
      <>
        <Text
          style={tw.style(`py-1 text-xl font-poppins-500 tracking-wider`, {
            color: logoColor,
          })}
        >
          {symbol}
        </Text>
        <Text style={tw`py-1 text-lg tracking-tight font-poppins-400`}>
          {shortName}
        </Text>
      </>
    ) : (
      <>
        <VerticalSpacer height={8} />
        <SkeletonText width={60} height={24} />
        <VerticalSpacer height={12} />
        <SkeletonText width={100} height={24} />
      </>
    )}
  </View>
)

const SliderCardPrice = ({
  price,
  percentChange,
  priceIsLoading,
}: {
  price: number
  percentChange: number
  priceIsLoading: boolean
}) => (
  <View style={tw`px-2`}>
    {priceIsLoading ? (
      <>
        <SkeletonText width={80} height={24} />
        <VerticalSpacer height={4} />
      </>
    ) : (
      <Text style={tw`font-semibold text-3xl ${pnlTextColor(percentChange)}`}>
        ${price?.toFixed(2)}
      </Text>
    )}
  </View>
)

export const SliderCardSkeleton = () => (
  <View style={tw`mx-2 bg-white flex-grow flex-1 rounded-2xl border-l-4`}>
    <View style={tw`h-60 w-40 p-4`}>
      <SkeletonCircle radius={26} />
      <View style={{ ...tw`flex-col py-8 px-2 flex-1` }}>
        <VerticalSpacer height={8} />
        <SkeletonText width={60} height={24} />
        <VerticalSpacer height={12} />
        <SkeletonText width={100} height={24} />
      </View>
      <View style={tw`px-2`}>
        <SkeletonText width={80} height={24} />
        <VerticalSpacer height={4} />
      </View>
    </View>
  </View>
)

const MemoizedSliderCard = React.memo(SliderCard)
const MemoizedSliderCardSkeleton = React.memo(SliderCardSkeleton)

export default CardSlider
