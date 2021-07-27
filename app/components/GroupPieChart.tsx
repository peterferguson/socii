import { DonutChart, PieCard } from "@components"
import Link from "next/link"
import React from "react"

export interface IGroupPieChart {
  groupName: string
  holdingData: any
  currentPrices: any
  className?: string
}
export default function GroupPieChart({
  groupName,
  holdingData,
  currentPrices,
  className = "",
}: IGroupPieChart) {
  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, shares }) => avgPrice * shares)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }))

  return (
    <div
      className={`
      w-88 sm:w-full items-center justify-center flex flex-col m-0 sm:m-4 
      mb-2 sm:mb-4 ${className}
    `}
    >
      <Link href={`/groups/${groupName}`}>
        <a>
          <div className="relative z-10 text-4xl text-center text-transparent cursor-pointer top-2 font-primary bg-clip-text bg-gradient-to-r from-brand-pink  to-brand">
            {groupName}
          </div>
        </a>
      </Link>
      <DonutChart
        className="z-0 -mt-6"
        data={pieData}
        scaling={0.35}
        radius={250}
        text={{
          main: `$${portfolioValue?.toFixed(2)}`,
          sub: `${gain.toFixed(2)}%`,
        }}
      />
    </div>
  )
}

export function GroupPieCard({
  groupName,
  holdingData,
  currentPrices,
  className = "",
}: IGroupPieChart) {
  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, shares }) => avgPrice * shares)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }))

  return (
    <PieCard
      className={className}
      groupName={groupName}
      data={pieData}
      scaling={0.35}
      radius={250}
      text={{
        main: `$${portfolioValue?.toFixed(2)}`,
        sub: `${gain.toFixed(2)}%`,
      }}
    />
  )
}