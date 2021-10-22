import { pnlTextColor } from "../utils/pnlTextColor"
import React from "react"
import { View, FlatList, Pressable, Text } from "react-native"
import tw from "../lib/tailwind"
import AssetLogo from "./AssetLogo"
import { useRouter } from "../navigation/use-router"
import { Asset } from "../models/Asset"
import { Price } from "../models/Price"

// TODO: Add a isActive state and only navigate on click of the active card

interface CardAsset {
  asset: Asset
  price: Price
}

export default function CardSlider({ assets }: { assets: CardAsset[] }) {
  const router = useRouter()
  return (
    <FlatList
      style={tw`flex-row p-4 shadow-md umami--drag--popular-stocks-card-slider`}
      data={assets}
      horizontal={true}
      keyExtractor={({ asset }) => asset.alpaca.symbol}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: { asset, price } }) => (
        <View
          style={{
            ...tw`mx-2 bg-white rounded-2xl border-l-4`,
            borderColor: asset?.logoColor,
            flex: 1,
            flexGrow: 1,
          }}
        >
          <Pressable
            onPress={() => {
              return router.push({
                pathname: `/stocks/${asset.alpaca.symbol}`,
                query: {
                  asset: asset.alpaca.symbol,
                  logoColor: asset.logoColor,
                },
              })
            }}
            style={tw`h-60 w-40 p-4`}
          >
            <AssetLogo
              asset={asset.alpaca.symbol}
              isin={asset.ISIN}
              height="52"
              width="52"
            />
            <View
              style={{ ...tw`flex-col py-8 px-2`, alignContent: "stretch", flex: 1 }}
            >
              <Text
                style={{
                  ...tw`py-1 text-xl font-semibold tracking-wider`,
                  color: asset.logoColor,
                }}
              >
                {asset.alpaca.symbol}
              </Text>
              <Text style={tw`py-1 text-lg tracking-tight font-poppins-400`}>
                {asset.shortName}
              </Text>
            </View>
            <View style={tw`px-2`}>
              <Text
                style={tw`font-semibold text-3xl ${pnlTextColor(price?.changePercent)}`}
              >
                ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    />
  )
}
