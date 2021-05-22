import MMLButton from "./MMLButton"
import { currencyIcons } from "@lib/constants"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"


import {
  useTickerPriceData,
  useShareCost,
  useLocalCurrency,
  useExchangeRate,
} from "@lib/hooks"
import React from "react"
import { MML } from "mml-react"

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const SellCommandAttachment = ({ attachment }) => {
  const tickerState = useTickerPriceData({ tickerSymbol: attachment?.tickerSymbol })
  const [localCurrency] = useLocalCurrency()
  const exchangeRate = useExchangeRate(tickerState.assetCurrency, localCurrency)
  const localCostPerShare = exchangeRate
    ? tickerState.price * exchangeRate?.rate
    : tickerState.price

  const converters = {
    buy: (tag) => (
      <SellMMLConverter
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
      <MML converters={converters} source={attachment.mml} onSubmit={e => console.log(e)}/>
    </div>
  )
}


const SellMMLConverter = ({ key, localCostPerShare, localCurrency }) => {
  const [shares, handleChange, toCost] = useShareCost(localCostPerShare)

  return (
    <div className="flex flex-col">
      <MMLNumberInput
        name={"Shares"}
        key={`${key}-shares`}
        value={shares}
        onChange={handleChange}
      />
      <MMLNumberInput
        name={"Cost"}
        key={`${key}-cost`}
        value={toCost(shares)}
        onChange={handleChange}
        currencyIcon={currencyIcons[localCurrency]}
      />
      <div className="flex flex-row mt-1">
        <MMLButton
          key={`cancel-button`}
          name="cancel"
          className="flex-grow mx-2 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
        <MMLButton
          key={`buy-button`}
          name="buy"
          className="flex-grow mx-2 outline-btn btn-transition"
          text="Sell"
        />
      </div>
    </div>
  )
}

const MMLNumberInput = ({ key, value, onChange, name, currencyIcon = null }) => {
  return (
    <div className="flex flex-row m-2 border rounded shadow">
      <span
        key={key}
        className="flex items-center px-3 font-bold rounded rounded-r-none font-poppins bg-grey-200 text-grey-400"
      >
        {name}
        {currencyIcon && <currencyIcon.icon className="ml-2 mb-0.5" />}
      </span>
      <input
        type="number"
        pattern="[0-9]+([\.,][0-9]+)?"
        min="0.01"
        step="0.01"
        label={name.toLowerCase()}
        name={name.toLowerCase()}
        className="w-full py-2 font-bold text-right border-none rounded focus-within:outline-none focus-within:border-none focus-within:ring-0"
        value={value}
        onChange={onChange}
        formNoValidate={true}
      />
    </div>
  )
}

export default SellCommandAttachment
