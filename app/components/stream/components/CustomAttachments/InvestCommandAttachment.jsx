import router from 'next/router'
import Button from './MMLButton'
import { pnlBackgroundColor, currencyFormatter } from '@utils/helper'
import {
  useTickerPriceData,
  useShareCost,
  useLocalCurrency,
  useExchangeRate,
} from '@lib/hooks'
import React from 'react'

import { MML } from 'mml-react'

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
          costPerShare={localCostPerShare}
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
    .replace('bg', 'text')
    .replace('200', '700')}`

  return (
    <div className="cursor-pointer">
      <img
        className="h-auto mx-auto rounded-full shadow-lg w-14"
        src={
          'https://storage.googleapis.com/sociiinvest.appspot.com/logos/US88160R1014.png'
        }
        alt={`${tickerSymbol} logo`}
        //   onClick={() => router.push(attachment.url)}
      />
      <div className="w-auto h-auto p-1 text-center">
        <div
          className={
            'text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
            inline-block font-poppins mt-1 text-blueGray-400'
          }
        >
          ${tickerSymbol} &bull; {currencyFormatter(price, assetCurrency)}
        </div>
        <div
          className={`ml-1 ${pnlColors} text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase mt-1`}
        >
          <i className="fas fa-arrow-up" />
          {(100 * priceChange).toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

const InvestMMLConverter = ({ key, costPerShare }) => {
  const [cost, onShareChange, onCostChange, toShares] = useShareCost(costPerShare)

  const displayCost = parseFloat(cost)
  const displayShares = parseFloat(toShares(displayCost))

  console.log(`cost: ${cost}`)
  console.log(`display: ${displayCost}`)
  console.log(`shares: ${displayShares}`)
  return (
    <div className="flex flex-col">
      <MMLNumberInput
        text={'Shares'}
        key={`${key}-shares`}
        value={displayShares.toFixed(5)}
        onChange={onShareChange}
      />
      <MMLNumberInput
        text={'Cost'}
        key={`${key}-cost`}
        value={displayCost.toFixed(2)}
        onChange={onCostChange}
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

const MMLNumberInput = ({ text, key, value, onChange }) => (
  <div className="flex flex-row m-2 border rounded shadow">
    <span
      key={key}
      className="flex items-center px-3 font-bold rounded rounded-r-none font-poppins bg-grey-200 text-grey-400"
    >
      {text}
    </span>
    <input
      type="number"
      min="0"
      autoComplete="transaction-amount"
      name={text.toLowerCase()}
      className="w-full py-2 font-bold text-right border-none rounded focus-within:border-none focus-within:ring-0"
      value={value}
      onChange={onChange}
    />
  </div>
)

export default InvestCommandAttachment
