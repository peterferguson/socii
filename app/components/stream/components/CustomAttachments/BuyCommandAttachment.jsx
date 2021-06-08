// import { currencyIcons } from "@lib/constants"
import MMLButton from "./MMLButton"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import {
  useTickerPriceData,
  useShareCost,
  useLocalCurrency,
  useExchangeRate,
} from "@lib/hooks"
import { UserContext } from "@lib/context"
import { tradeSubmission } from "@lib/firebase"

import {
  LoadingIndicator,
  useMessageContext,
  useChannelStateContext,
} from "stream-chat-react"
import React, { Suspense, useContext } from "react"

const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

import { FaDollarSign, FaPoundSign, FaYenSign, FaEuroSign } from "react-icons/fa"
export const currencyIcons = {
  AUD: { icon: FaDollarSign },
  CAD: { icon: FaDollarSign },
  // CHF: "CHF",
  EUR: { icon: FaEuroSign },
  GBP: { icon: FaPoundSign },
  JPY: { icon: FaYenSign },
  USD: { icon: FaDollarSign },
}

const BuyCommandAttachment = ({ attachment }) => {
  const { username } = useContext(UserContext)
  const tickerState = useTickerPriceData({
    tickerSymbol: attachment?.tickerSymbol?.toUpperCase() || "SPOT",
  })
  const [localCurrency] = useLocalCurrency()
  const exchangeRate = useExchangeRate(tickerState.assetCurrency, localCurrency)
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()
  const localCostPerShare = exchangeRate
    ? (tickerState.price * exchangeRate?.rate).toFixed(2)
    : tickerState.price

  const groupName = channel.cid.split(":").pop()

  // TODO: Add different views of the buy card for users who did not submit it
  const converters = {
    buy: (tag) => (
      <BuyMMLConverter
        {...tag.node.attributes}
        tagKey={tag.key}
        localCostPerShare={localCostPerShare}
        localCurrency={exchangeRate ? localCurrency : tickerState.assetCurrency}
      />
    ),
  }

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol?.toUpperCase()}
        tickerState={tickerState}
      />
      <Suspense fallback={<LoadingIndicator />}>
        <MML
          converters={converters}
          source={attachment.mml}
          onSubmit={(data) => {
            const { buy, cancel, ...actions } = data // - remove buy & cancel

            if ("buy" in data) {
              // - Write to firestore & send confirmation message in thread
              tradeSubmission({
                username,
                groupName,
                assetRef: `tickers/${tickerState.ticker.ISIN}`,
                orderType: "BUY",
                messageId: message.id,
                action: "buy", //TODO: Review redundancy with orderType (may not be with limit orders)
                executionCurrency: localCurrency,
                assetCurrency: tickerState.assetCurrency,
                price: tickerState.price,
                cost: parseFloat(actions.cost),
                shares: parseFloat(actions.shares),
                // TODO: NEED TO ENSURE THESE ARE NOT NULL
              })
            }
          }}
          Loading={LoadingIndicator}
        />
      </Suspense>
    </div>
  )
}

/* Converters */

const BuyMMLConverter = ({ tagKey, localCostPerShare, localCurrency }) => {
  const [shares, handleChange, toCost] = useShareCost(localCostPerShare)

  return (
    <div className="flex flex-col">
      <MMLNumberInput
        name={"Shares"}
        key={`${tagKey}-shares`}
        value={shares}
        onChange={handleChange}
      />
      <MMLNumberInput
        name={"Cost"}
        key={`${tagKey}-cost`}
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
          text="Buy"
        />
      </div>
    </div>
  )
}

const MMLNumberInput = ({ tagKey, value, onChange, name, currencyIcon = null }) => {
  return (
    <div className="flex flex-row m-2 border rounded shadow">
      <span
        key={tagKey}
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

export default BuyCommandAttachment
