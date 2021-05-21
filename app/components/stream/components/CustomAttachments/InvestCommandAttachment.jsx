import router from "next/router"
import Button from "./MMLButton"
import { currencyIcons } from "@lib/constants"
import { pnlBackgroundColor, currencyFormatter } from "@utils/helper"

import { FaArrowUp, FaArrowDown } from "react-icons/FA"
import {
  useTickerPriceData,
  useShareCost,
  useLocalCurrency,
  useExchangeRate,
} from "@lib/hooks"
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

  console.log(localCostPerShare)

  const converters = {
    invest: (tag) => {
      return (
        <InvestMMLConverter
          {...tag.node.attributes}
          key={tag.key}
          localCostPerShare={localCostPerShare}
          localCurrency={exchangeRate ? localCurrency : tickerState.assetCurrency}
        />
      )
    },
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <LogoPriceHeader
        tickerSymbol={attachment.tickerSymbol}
        tickerState={tickerState}
      />
      <MML converters={converters} source={attachment.mml} />
    </div>
  )
}

const LogoPriceHeader = ({ tickerSymbol, tickerState }) => {
  const { priceChange, price, assetCurrency } = tickerState
  const pnlBgColor = pnlBackgroundColor((100 * priceChange).toFixed(2))
  const pnlColors = `${pnlBgColor} ${pnlBgColor
    .replace("bg", "text")
    .replace("200", "700")}`

  return (
    <div className="cursor-pointer">
      <img
        className="h-auto mx-auto rounded-full shadow-lg w-14"
        src={
          "https://storage.googleapis.com/sociiinvest.appspot.com/logos/US88160R1014.png"
        }
        alt={`${tickerSymbol} logo`}
        //   onClick={() => router.push(attachment.url)}
      />
      <div className="w-auto h-auto p-1 text-center">
        <div
          className={
            "text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
             inline-block font-poppins mt-1 text-blueGray-500"
          }
        >
          {tickerSymbol} &bull; {currencyFormatter(price, assetCurrency)}
        </div>
        <div
          className={`ml-1 ${pnlColors} text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase mt-1`}
        >
          <div className="flex flex-row items-center justify-between">
            {priceChange > 0 ? <FaArrowUp /> : price < 0 ? <FaArrowDown /> : null}
            <span className="ml-0.5">{(100 * priceChange).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const InvestMMLConverter = ({ key, localCostPerShare, localCurrency }) => {
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
        <Button
          key={`cancel-button`}
          name="cancel"
          className="flex-grow mx-2 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
        <Button
          key={`buy-button`}
          name="buy"
          className="flex-grow mx-2 outline-btn btn-transition"
          text="Buy"
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
        {currencyIcon && <currencyIcon.icon className="ml-2 mb-0.5"/>}
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
        formNoValidate
      />
    </div>
  )
}

export default InvestCommandAttachment
