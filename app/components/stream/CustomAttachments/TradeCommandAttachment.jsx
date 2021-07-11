import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { currencyIcons } from "@lib/constants"
import { tradeSubmission } from "@lib/firebase"
import {
  useAuth,
  useInterval,
  useLocalCurrency,
  useShareCost,
  useTickerPrice,
} from "@lib/hooks"
import { currencyConversion, fetcher, getTickerData } from "@utils/helper"
import React, { Suspense, useEffect, useState } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"
import useSWR from "swr"
import MMLButton from "./MMLButton"

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

const TradeCommandAttachment = ({ attachment }) => {
  const { username } = useAuth()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const tickerSymbol = attachment?.tickerSymbol?.toUpperCase()

  const [tickerData, setTickerData] = useState(null)
  const [priceExpired, setPriceExpired] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)
  const [localCurrency] = useLocalCurrency()

  const {
    price,
    percentChange,
    lastUpdated: priceLastUpdated,
  } = useTickerPrice(tickerSymbol, priceExpired, setPriceExpired)
  // TODO: Update messages so that the price becomes stale intentionally (until ephemeral msgs work)

  useEffect(() => {
    getTickerData(tickerSymbol).then((d) =>
      setTickerData({
        ...d,
        price,
        percentChange,
        priceLastUpdated,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerSymbol, price])

  const [costPerShare, setCostPerShare] = useState({
    cost: price,
    currency: tickerData?.currency,
  })

  const { data: exchangeRate, error } = useSWR(
    () => currencyConversion(tickerData.currency, localCurrency),
    fetcher,
    { dedupingInterval: 10000 }
  )

  const isLoadingExchangeRate = !error && !exchangeRate

  useEffect(() => {
    setCostPerShare(() => ({
      cost: (isLoadingExchangeRate ? price : price * exchangeRate?.rate).toFixed(2),
      currency: isLoadingExchangeRate ? tickerData?.currency : localCurrency,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, exchangeRate, tickerData])

  const groupName = channel.cid.split(":").pop()

  // - polling for updates to price
  // TODO: Only do this if market is open!
  const refreshCountThreshold = 10
  const refreshTime = 20 * 1000 // - 20ms
  useInterval(
    () => {
      const expired = (updateTime) => new Date() - Date.parse(updateTime) >= refreshTime
      setPriceExpired(expired(priceLastUpdated))
      setRefreshCount(refreshCount + 1)
    },
    // `refreshTime` in milliseconds stopped after `refreshCountThreshold` refreshes
    refreshCount < refreshCountThreshold ? refreshTime : null
  )

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader tickerSymbol={tickerSymbol} tickerState={tickerData} />
      <Suspense fallback={<LoadingIndicator />}>
        <MML
          converters={converters(costPerShare)}
          source={attachment.mml}
          onSubmit={(data) => {
            const tradeArgs = {
              username,
              groupName,
              assetRef: `tickers/${tickerData.ISIN}`,
              messageId: message.id,
              executionCurrency: localCurrency,
              assetCurrency: tickerData.assetCurrency,
              // TODO: NEED TO ENSURE THESE ARE NOT NULL ↓
              price: price,
              cost: parseFloat(data.cost || data.amount),
              shares: parseFloat(data.shares),
              // TODO: NEED TO ENSURE THESE ARE NOT NULL ↑
            }
            //TODO: Review redundancy with orderType (may not be with limit orders)
            // - Write to firestore & send confirmation message in thread
            if ("buy" in data) {
              tradeSubmission({ ...tradeArgs, orderType: "BUY", action: "buy" })
            }
            if ("sell" in data) {
              tradeSubmission({ ...tradeArgs, orderType: "SELL", action: "sell" })
            }
          }}
          Loading={LoadingIndicator}
        />
      </Suspense>
    </div>
  )
}

/*
 * CustomMMLConverterFunctions
 */

// TODO: Add different views of the buy card for users who did not submit it
// - Creates a object of all actions and their CustomMMLConverterFunctions
const converters = ({ cost, currency }) =>
  Object.assign(
    {},
    ...["buy", "sell"].map((type) => ({
      // eslint-disable-next-line react/display-name
      [type]: (tag) => (
        <TradeMMLConverter
          {...tag.node.attributes}
          tagKey={tag.key}
          costPerShare={cost}
          currency={currency}
          tradeType={type}
        />
      ),
    }))
  )

const TradeMMLConverter = ({ tagKey, costPerShare, currency, tradeType }) => {
  const [shares, handleChange, toCost] = useShareCost(costPerShare)

  return (
    <div className="flex flex-col">
      <MMLNumberInput
        name={"Shares"}
        key={`${tagKey}-shares`}
        value={shares}
        onChange={handleChange}
        decimals={8}
      />
      <MMLNumberInput
        name={tradeType.toLowerCase() === "buy" ? "Cost" : "Amount"}
        key={`${tagKey}-cost`}
        value={toCost(shares)}
        onChange={handleChange}
        currency={currency}
      />
      <div className="flex flex-row mt-1">
        <MMLButton
          key={`cancel-button`}
          name="cancel"
          className="flex-grow mx-2 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
        <MMLButton
          key={`${tradeType}-button`}
          name={tradeType}
          className="flex-grow mx-2 outline-btn btn-transition"
          text={tradeType.charAt(0).toUpperCase() + tradeType.slice(1)}
        />
      </div>
    </div>
  )
}

const MMLNumberInput = ({ tagKey, value, onChange, name, currency, decimals = 2 }) => {
  const CurrencyIcon = currency ? currencyIcons[currency].icon : null
  return (
    <div className="flex flex-row m-2 border rounded shadow">
      <span
        key={tagKey}
        className="flex items-center px-3 text-sm font-bold rounded rounded-r-none sm:text-base font-primary bg-grey-200 text-grey-400"
      >
        {name}
        {CurrencyIcon && <CurrencyIcon className="ml-2 mb-0.5" />}
      </span>
      <input
        type="number"
        pattern={`[0-9]+([.,][0-9]+)?{,${decimals}}`}
        label={name.toLowerCase()}
        name={name.toLowerCase()}
        className="w-full py-2 text-sm font-bold text-right border-none rounded sm:text-base focus-within:outline-none focus-within:border-none focus-within:ring-0"
        value={value}
        onChange={onChange}
        formNoValidate={true}
      />
    </div>
  )
}

export default TradeCommandAttachment
