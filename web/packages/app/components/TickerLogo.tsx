import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { usePrevious } from "../hooks/usePrevious"
import { getTickerData } from "../lib/firebase/client/db/getTickerData"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import { logoUrl } from "../utils/logoUrl"

interface ITickerLogoProps {
  tickerSymbol: string
  isin?: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

const TickerLogo: React.FC<ITickerLogoProps> = ({
  height,
  width,
  isin,
  tickerSymbol,
}) => {
  const [logoSrc, setLogoSrc] = useState("")
  const router = useRouter()
  const [unmounted, setUnmounted] = useState(false)
  const [fractionble, setFractionable] = useState(false)
  const [ISIN, setISIN] = useState(isin)
  const prevSymbol = usePrevious(tickerSymbol)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if ((!ISIN || tickerSymbol !== prevSymbol) && !unmounted) {
      getTickerData(tickerSymbol).then(({ ISIN }) => {
        setISIN(ISIN)
        // setFractionable(alpaca?.fractionable)
      })
    }
  }, [ISIN, prevSymbol, tickerSymbol, unmounted])

  useEffect(() => ISIN && setLogoSrc(logoUrl(ISIN)), [ISIN])

  useEffect(() => () => setUnmounted(true), [])
  // TODO: Add a backup logo search
  // TODO: Add loading state

  return (
    <>
      {logoSrc && !isError ? (
        <Image
          source={{
            uri: logoSrc,
          }}
          style={{
            width: width || DEFAULT_HEIGHT_AND_WIDTH,
            height: height || DEFAULT_HEIGHT_AND_WIDTH,
          }}
          onError={() => setIsError(true)}
          resizeMethod="resize"
        />
      ) : (
        <View
          style={{
            ...tw`flex items-center justify-center bg-gray-50 rounded-full shadow-lg`,
            width: width || DEFAULT_HEIGHT_AND_WIDTH,
            height: height || DEFAULT_HEIGHT_AND_WIDTH,
          }}
        >
          <Text style={tw`font-semibold text-gray-500 text-tiny`}>{tickerSymbol}</Text>
        </View>
      )}
    </>
  )
}

export default TickerLogo
