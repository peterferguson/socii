import { tickerToISIN } from "@lib/firebase/client/db"
import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import React, { useEffect, useState } from "react"
import { usePrevious, useUnmountPromise } from "react-use"

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
  const [logoSrc, setLogoSrc] = useState("")
  const [ISIN, setISIN] = useState(isin)
  const [isError, setIsError] = useState(false)
  const prevISIN = usePrevious(ISIN)

  useEffect(() => {
    const getISIN = async () => setISIN(await mounted(tickerToISIN(tickerSymbol)))
    !ISIN && getISIN()
  }, [ISIN, mounted, tickerSymbol])

  useEffect(() => ISIN && setLogoSrc(logoUrl(ISIN)), [ISIN, mounted])

  useEffect(() => prevISIN !== ISIN && setISIN(ISIN), [ISIN, prevISIN])

  // TODO: Add a backup logo search

  return (
    <Link href={`/stocks/${encodeURIComponent(tickerSymbol)}`}>
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
            className={`flex items-center justify-center font-semibold text-gray-500 bg-gray-50 rounded-full shadow-lg h-14 w-14 text-tiny ${className}`}
          >
            {tickerSymbol}
          </div>
        )}
      </a>
    </Link>
  )
}

export default TickerLogo
