import DonutChart from "@components/DonutChart"
import { tw } from "@utils/tw"
import Link from "next/link"
import React from "react"
import { LoadingIndicator } from "stream-chat-react"

export interface IGroupPieChart {
  groupName: string
  holdingData: any
  currentPrices: any
  cashBalance: number
  radius?: number
  className?: string
}

export default function GroupPieChart({
  groupName,
  holdingData,
  currentPrices,
  cashBalance,
  radius = 250,
  className = "",
}: IGroupPieChart) {
  const portfolioValue = holdingData
    ?.map(({ symbol, qty }) => currentPrices?.[symbol] * qty)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, qty }) => avgPrice * qty)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ symbol, shortName, qty }) => ({
    theta: (currentPrices?.[symbol] * qty) / portfolioValue,
    label: shortName,
    subLabel: symbol,
  }))

  return (
    <div
      className={tw(
        "w-88 sm:w-full items-center justify-center flex flex-col m-0 sm:m-4 mb-2 sm:mb-4",
        className
      )}
    >
      <Link href={`/groups/${groupName}`}>
        <a>
          <div
            className={tw(
              "relative text-4xl text-center text-transparent cursor-pointer z-10 top-2",
              "font-primary bg-clip-text bg-gradient-to-r from-brand-pink to-brand",
              "umami--click--group-pie-chart-title"
            )}
          >
            {groupName}
          </div>
        </a>
      </Link>
      {pieData?.length && portfolioValue ? (
        <DonutChart
          className="relative z-0 -mt-6 min-h-[280px]"
          data={pieData}
          scaling={0.35}
          scaleToWindow={true}
          radius={radius}
          text={{
            portfolio: `$${portfolioValue?.toFixed(2)}`,
            gain: `${gain.toFixed(2)}%`,
            cash: `$${cashBalance?.toFixed(2)}`,
          }}
        />
      ) : (
        <div className="grid place-items-center h-72">
          <LoadingIndicator color="#3fba" size={200} />
        </div>
      )}
    </div>
  )
}
