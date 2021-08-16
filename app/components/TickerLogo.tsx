import { tickerToISIN } from "@lib/firebase/client/db"
import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { useUnmountPromise } from "react-use"

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
  const mounted = useUnmountPromise()
  const [logoSrc, setLogoSrc] = useState(null)
  const [ISIN, setISIN] = useState(isin)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getISIN = async () => await mounted(tickerToISIN(tickerSymbol))
    !ISIN && getISIN().then((ISIN) => setISIN(ISIN))
  }, [ISIN, mounted, tickerSymbol])

  useEffect(() => {
    ISIN && setLogoSrc(logoUrl(ISIN))
  }, [ISIN, mounted])

  return (
    <Link href={`/stocks/${tickerSymbol}`}>
      <a className={`flex items-center justify-center rounded-full ${className}`}>
        {logoSrc && !isError ? (
          <Image
            src={logoSrc}
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
    </Link>
  )
}

export default React.memo(TickerLogo)
