import TickerLogo from "@components/TickerLogo"
import { useRecommendations } from "@hooks/useRecommendations"
import { tw } from "@utils/tw"
import Link from "next/link"
import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

const StockRecommendations: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { recommendations } = useRecommendations(symbol)
  return (
    <div className="w-full mt-2 text-xl space-y-4 font-primary lg:w-2/5">
      <span>People also viewed</span>
      <div className="w-full p-4 bg-white shadow-lg grid grid-cols-5 rounded-2xl place-items-center">
        {recommendations &&
          Object.entries(recommendations).map(([recommendation, data]) => (
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
                        style={{ color: data?.logoColor }}
                      >
                        {recommendation}
                      </a>
                    </Link>
                  </div>
                  <div className={tw("text-xs inline-flex space-x-2", data?.pnlColor)}>
                    <span className="text-xs font-medium">
                      {data?.pnlColor.includes("red") ? <FaArrowDown /> : <FaArrowUp />}
                    </span>
                    <span className="text-xs font-medium">
                      {(data?.regularMarketChangePercent * 100).toFixed(2)}%
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
