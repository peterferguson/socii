import { usePrevious } from "../hooks/usePrevious"
import { getTickerData } from "../lib/firebase/client/db/getTickerData"
import { logoUrl } from "../utils/logoUrl"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import tw from "../lib/tailwind"

interface ITickerLogoProps {
  tickerSymbol: string
  isin?: string
  className?: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

const TickerLogo: React.FC<ITickerLogoProps> = ({
  height,
  width,
  className,
  isin,
  tickerSymbol,
}) => {
  const [logoSrc, setLogoSrc] = useState("")
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
    // <Link href={`/stocks/${encodeURIComponent(tickerSymbol)}`}>
    //   <a
    //     className={`relative flex items-center justify-center rounded-full ${className}`}
    //   >
    <View>
        {logoSrc && !isError ? (
          // <Image
          //   source={logoSrc}
          //   // style={tw`rounded-full`}
          //   height={height || DEFAULT_HEIGHT_AND_WIDTH}
          //   width={width || DEFAULT_HEIGHT_AND_WIDTH}
          //   alt={`${tickerSymbol} logo`}
          //   onClick={() => router.push(`/stocks/${tickerSymbol}`)}
          //   onError={() => setIsError(true)}
          // />
          <View
          style={tw`flex items-center justify-center font-semibold text-gray-500 bg-gray-50 rounded-full shadow-lg h-14 w-14 text-tiny ${className}`}
        >
          <Text>{tickerSymbol} </Text>
        </View>
        ) : (
          <View
            style={tw`flex items-center justify-center font-semibold text-gray-500 bg-gray-50 rounded-full shadow-lg h-14 w-14 text-tiny ${className}`}
          >
            <Text>{tickerSymbol} </Text>
          </View>
        )}
      </View>

  )
}

export default TickerLogo
