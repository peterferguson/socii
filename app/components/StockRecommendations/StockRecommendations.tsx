import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { getYahooRecommendations } from "@utils/getYahooRecommendations"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import TickerLogo from "@components/TickerLogo"
import { getYahooPrice } from "@utils/getYahooPrice"
import { tw } from "@utils/tw"
import { pnlTextColor } from "@utils/pnlTextColor"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { usePrevious } from "@hooks/usePrevious"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [data, setData] = useState<any>()

  const previousSymbol = usePrevious(symbol)

  useEffect(() => {
    if (symbol) {
      if (previousSymbol !== symbol) setRecommendations([])
      getYahooRecommendations({ tickers: [symbol] }).then((data) => {
        setRecommendations(Array.from(new Set(data)))
      })
    }
  }, [previousSymbol, symbol])

  useEffect(() => {
    if (recommendations.length > 0) {
      const getTickerData = async () => {
        const data = (await getTickerDocs(recommendations))?.map((doc) => doc.data())
        const price = await getYahooPrice(recommendations, [
          "regularMarketChangePercent",
        ])
        setData(
          data.reduce((acc, datum) => {
            const pnlColor = pnlTextColor(
              price?.[datum.tickerSymbol]?.regularMarketChangePercent
            )

            if (acc)
              return {
                ...acc,
                [datum.tickerSymbol]: {
                  ...datum,
                  ...price[datum.tickerSymbol],
                  pnlColor,
                },
              }
            else return { [datum.tickerSymbol]: datum }
          }, {})
        )
      }
      getTickerData()
    }
  }, [recommendations])

  return (
    <div className="w-full mt-2 text-xl space-y-4 font-primary sm:w-1/2">
      <span>People also viewed</span>
      <div className="w-full p-4 bg-white shadow-lg grid grid-cols-5 rounded-2xl place-items-center">
        {recommendations.map((recommendation) => (
          <div key={recommendation} className="my-2">
            <div className="flex flex-col items-center justify-center">
              <div className="flex-shrink-0">
                <div className="flex flex-col items-center ml-2">
                  <TickerLogo
                    tickerSymbol={recommendation}
                    width="48"
                    height="48"
                    className="rounded-full"
                  />
                  <Link href={`stocks/${recommendation}`}>
                    <a
                      className=" text-base font-medium"
                      style={{ color: data?.[recommendation]?.logoColor }}
                    >
                      {recommendation}
                    </a>
                  </Link>
                </div>
                <div
                  className={tw(
                    "text-xs inline-flex space-x-2",
                    data?.[recommendation]?.pnlColor
                  )}
                >
                  <span className="text-xs font-medium">
                    {data?.[recommendation]?.pnlColor.includes("red") ? (
                      <FaArrowDown />
                    ) : (
                      <FaArrowUp />
                    )}
                  </span>
                  <span className="text-xs font-medium">
                    {(data?.[recommendation]?.regularMarketChangePercent * 100).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockRecommendations
