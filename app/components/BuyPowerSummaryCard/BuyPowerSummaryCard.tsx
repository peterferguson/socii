import { useTradingAccount } from "@hooks/useTradingAccount"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaPercent } from "react-icons/fa"
import SummaryCard from "../SummaryCard"

const BuyPowerSummaryCard = () => {
  const { account, error } = useTradingAccount()

  const iconColor = "blue-500" // - tw jit border-blue-500 text-blue-500 bg-blue-500

  // - using cash as the buy power as we dont want any multipliers to be applied (see https://alpaca.markets/docs/broker/api-references/accounts/accounts/)
  const props = useMemo(
    () => ({
      Title: () => <span>Buying Power</span>,
      subTitle: `$${parseFloat(account?.cash).toFixed(2)}`,
      ImgComponent: () => (
        <div
          className={`w-12 h-12 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-lg`}
        >
          <FaPercent />
        </div>
      ),
      iconColor,
      Heading: () => null,
      // <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
      //   {difference ? <FaArrowUp /> : <FaArrowDown />}
      //   <span> {difference.toFixed(2)}%</span>
      // </h1>
      headingSubText: "",
      InformationIcon: () => (
        <div
          className={`w-10 h-10 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-sm`}
        >
          <FaPercent className="w-4 h-4" />
        </div>
      ),
      informationTitle: "Buying Power",
      InformationText: () => (
        <div className="">
          <p>
            This a comparison of all your assets (across all portfolios) against the
            S&P500 (represented by SPY ETF).
          </p>
          <br />
          <p>
            The S&P500 tracks the performance of the 500 largest companies in the US.
          </p>
        </div>
      ),
    }),
    [account?.cash]
  )

  return <SummaryCard {...props} />
}

export default BuyPowerSummaryCard
