import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import router from "next/router"
import React, { useEffect, useState } from "react"

export function TickerLogo({
  tickerSymbol,
  isin,
  className,
  width = "56px",
  height = "56px",
}) {
  const [logoURL, setLogoURL] = useState(null)

  useEffect(() => {
    const url = logoUrl(isin ? isin : tickerSymbol)
    if (typeof url === "string") setLogoURL(url)
    else url.then((url) => setLogoURL(url))
  }, [isin, tickerSymbol])

  return logoURL && (tickerSymbol || isin) ? (
    <div className="flex items-center justify-center mx-auto rounded-full">
      <Image
        src={logoURL}
        className={`mx-auto rounded-full ${className}`}
        height={height}
        width={width}
        alt={`${tickerSymbol} logo`}
        onClick={() => router.push(`/stocks/${tickerSymbol}`)}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center mx-auto font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg h-14 w-14 text-tiny">
      {tickerSymbol}
    </div>
  )
}
