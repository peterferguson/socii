import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { Pressable, View } from "react-native"
import { AssetCardLogo } from "../AssetCardLogo"
import { AssetCardName } from "../AssetCardName"

interface IAssetHit {
  logoColor?: string
  isin: string
  symbol: string
  shortName: string
  router: any
}
// TODO: Remove router from being passed in.
// ! This is a hack to get around the component apparently not being in a navigator.

const AssetHit = ({ isin, symbol, logoColor, shortName, router }: IAssetHit) => {
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
