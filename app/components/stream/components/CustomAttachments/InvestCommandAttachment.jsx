import MMLButton from "./MMLButton"
import { currencySymbols } from "@lib/constants"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"

import { useTickerPriceData, useLocalCurrency, useExchangeRate } from "@lib/hooks"
import React from "react"
import { MML } from "mml-react"

// WARN: IEX called for each instance of a invest command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const InvestCommandAttachment = ({ attachment }) => {
  const tickerState = useTickerPriceData({ tickerSymbol: attachment?.tickerSymbol })
  const [localCurrency] = useLocalCurrency()
  const exchangeRate = useExchangeRate(tickerState.assetCurrency, localCurrency)
  const localCostPerShare = exchangeRate
    ? tickerState.price * exchangeRate?.rate
    : tickerState.price

  const converters = {
    invest: (tag) => (
      <InvestMMLConverter
        {...tag.node.attributes}
        key={tag.key}
        localCostPerShare={localCostPerShare}
        localCurrency={exchangeRate ? localCurrency : tickerState.assetCurrency}
      />
    ),
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment.tickerSymbol}
        tickerState={tickerState}
      />
      <MML
        converters={converters}
        source={attachment.mml}
        onSubmit={(e) => console.log(e)}
      />
    </div>
  )
}

const InvestMMLConverter = ({ key, localCostPerShare, localCurrency }) => (
  <div className="flex flex-col mt-1 space-y-6">
    <MMLButton
      key={`buy-button`}
      name="buy"
      className="flex mx-2 w-52 outline-btn btn-transition"
      text={
        <div className="flex flex-row font-poppins space-x-12 group">
          <div className="ml-1 text-left">Buy</div>
          <div className="text-right text-teal-500 flex-0 text-tiny group-hover:text-white">
            (local price)
            <span className="text-sm">
              {` ${currencySymbols[localCurrency]}${localCostPerShare.toFixed(2)}`}
            </span>
          </div>
        </div>
      }
    />

    <MMLButton
      key={`sell-button`}
      name="sell"
      className="mx-2 w-52 outline-btn btn-transition"
      text="Sell"
    />

    <MMLButton
      key={`cancel-button`}
      name="cancel"
      className="mx-2 w-52 outline-btn btn-transition hover:bg-red-400"
      text="Cancel"
    />
  </div>
)

export default InvestCommandAttachment
