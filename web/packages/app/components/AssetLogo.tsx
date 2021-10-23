import React, { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import tw from "../lib/tailwind"
import { logoUrl } from "../utils/logoUrl"
import { shadowStyle } from "../utils/shadowStyle"

interface IAssetLogoProps {
  asset: string
  isin: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

const AssetLogo: React.FC<IAssetLogoProps> = ({ height, width, asset, isin }) => {
  const [logo, setLogo] = useState<string>("")
  const [isError, setIsError] = useState(false)

  useEffect(() => isin !== undefined && setLogo(logoUrl(isin)), [isin])

  // TODO: Add a backup logo search
  // TODO? maybe add fractional icon
  // TODO: Add loading state

  const logoStyle = {
    ...tw`flex items-center justify-center bg-gray-50 border border-gray-200 rounded-full`,
    width: parseInt(width) || DEFAULT_HEIGHT_AND_WIDTH,
    height: parseInt(height) || DEFAULT_HEIGHT_AND_WIDTH,
    ...shadowStyle("lg"),
  }
  return logo && !isError ? (
    <Image
      source={{ uri: logo }}
      style={logoStyle}
      onError={() => setIsError(true)}
      resizeMethod="resize"
    />
  ) : (
    <View style={logoStyle}>
      <Text style={tw`font-semibold text-gray-500 text-tiny`}>{asset}</Text>
    </View>
  )
}

export default AssetLogo
