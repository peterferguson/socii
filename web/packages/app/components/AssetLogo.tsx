import React, { useMemo, useState, useEffect } from "react"
import { Image, Platform, Text, View } from "react-native"
import tw from "../lib/tailwind"
import { logoUrl } from "../utils/logoUrl"

interface IAssetLogoProps {
  asset: string
  isin: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

const AssetLogo: React.FC<IAssetLogoProps> = ({ height, width, asset, isin }) => {
  const logoSrc = useMemo(() => logoUrl(isin), [isin])
  const [isError, setIsError] = useState(false)

  useEffect(() => console.log("AssetLogo:", asset, isin), [asset, isin])

  // TODO: Add a backup logo search
  // TODO? maybe add fractional icon
  // TODO: Add loading state

  const logoStyle = {
    ...tw`flex items-center justify-center bg-gray-50 rounded-full shadow-lg`,
    width: parseInt(width) || DEFAULT_HEIGHT_AND_WIDTH,
    height: parseInt(height) || DEFAULT_HEIGHT_AND_WIDTH,
  }

  // @ts-ignore
  const { elevation, ...iosStyle } = logoStyle

  return logoSrc && !isError ? (
    <Image
      source={{ uri: logoSrc }}
      style={Platform.OS === "ios" ? iosStyle : logoStyle}
      onError={() => setIsError(true)}
      resizeMethod="resize"
    />
  ) : (
    <View style={Platform.OS === "ios" ? iosStyle : logoStyle}>
      <Text style={tw`font-semibold text-gray-500 text-tiny`}>{asset}</Text>
    </View>
  )
}

export default AssetLogo
