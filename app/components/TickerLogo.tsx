import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import router from "next/router"
import React, { useEffect, useState } from "react"

interface ITickerLogoProps {
  tickerSymbol: string
  isin: string
  className?: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "56px"

export const TickerLogo: React.FC<ITickerLogoProps> = ({
  height,
  width,
  className,
  isin,
  tickerSymbol,
}) => {
  const [logoURL, setLogoURL] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const url = logoUrl(isin ? isin : tickerSymbol)
    if (typeof url === "string") setLogoURL(url)
    else url.then((url) => setLogoURL(url))
  }, [isin, tickerSymbol])

  return (
    <a
      className={`flex items-center justify-center rounded-full ${className}`}
      href={`/stocks/${tickerSymbol}`}
    >
      {logoURL && !isError ? (
        <Image
          src={logoURL}
          className="rounded-full"
          height={height || DEFAULT_HEIGHT_AND_WIDTH}
          width={width || DEFAULT_HEIGHT_AND_WIDTH}
          alt={`${tickerSymbol} logo`}
          onClick={() => router.push(`/stocks/${tickerSymbol}`)}
          onError={() => setIsError(true)}
        />
      ) : (
        <div
          className={`flex items-center justify-center font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg h-14 w-14 text-tiny ${className}`}
        >
          {tickerSymbol}
        </div>
      )}
    </a>
  )
}
