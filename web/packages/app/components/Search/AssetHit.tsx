import { Price } from "app/models/Price"
import tw from "app/lib/tailwind"
import React from "react"
import { View, Pressable } from "react-native"
import { useRouter } from "app/navigation/use-router"
import { shadowStyle } from "app/utils/shadowStyle"
import { AssetCardLogo } from "../AssetCardLogo"
import { AssetCardName } from "../AssetCardName"

interface IAssetHit {
  logoColor?: string
  isin: string
  symbol: string
  shortName: string
}
const AssetHit = ({ isin, symbol, logoColor, shortName }: IAssetHit) => {
  const router = useRouter()
  const isLoading = !isin

  return (
    <Pressable
      onPress={() => router.push(`/stocks/${symbol}`)}
      style={{ ...tw`w-11/12 max-w-sm mx-auto` }}
    >
      <View
        style={{
          ...tw`flex-row h-20 p-2 overflow-hidden bg-white rounded-lg`,
        }}
      >
        <View style={{ flexDirection: "row", flex: 6 }}>
          <AssetCardLogo {...{ isLoading, isin, symbol }} />
          <AssetCardName {...{ isLoading, symbol, logoColor, shortName }} />
        </View>
      </View>
    </Pressable>
  )
}

export default React.memo(AssetHit)
