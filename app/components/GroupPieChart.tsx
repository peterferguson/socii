import { DonutChart } from "@components"
import { tw } from "@utils/tw"
import Link from "next/link"
import React from "react"

export interface IGroupPieChart {
  groupName: string
  holdingData: any
  currentPrices: any
  cashBalance: number
  className?: string
}
export default function GroupPieChart({
  groupName,
  holdingData,
  currentPrices,
  cashBalance,
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
          <div className="relative z-10 text-4xl text-center text-transparent cursor-pointer top-2 font-primary bg-clip-text bg-gradient-to-r from-brand-pink  to-brand">
            {groupName}
          </div>
        </a>
      </Link>
      {pieData?.length && portfolioValue && (
        <DonutChart
          className="z-0 -mt-6"
          data={pieData}
          scaling={0.35}
          radius={250}
          text={{
            portfolio: `$${portfolioValue?.toFixed(2)}`,
            gain: `${gain.toFixed(2)}%`,
            cash: `$${cashBalance?.toFixed(2)}`,
          }}
        />
      )}
    </div>
  )
}
