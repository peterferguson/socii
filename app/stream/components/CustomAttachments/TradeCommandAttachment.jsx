import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useLocalCurrency } from "@hooks/useLocalCurrency"
import { useCurrencyConversion } from "@hooks/useCurrencyConversion"
import { useTickerPrice } from "@hooks/useTickerPrice"
import { tickerToISIN } from "@lib/firebase/client/db"
import { tradeSubmission } from "@lib/firebase/client/firebase"

import { useAuth } from "hooks/useAuth"
import React, { Suspense, useEffect, useState } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"
import useSWR from "swr"
import { TradeMMLConverter } from "./converters/TradeMMLConverter"

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
  const [tickerSymbol, _setTickerSymbol] = useState(
    attachment?.tickerSymbol?.toUpperCase()
  )
  const [currentPrice, setCurrentPrice] = useState(undefined)
  const [isin, setIsin] = useState("")

  useEffect(
    () => tickerToISIN(tickerSymbol).then((data) => setIsin(data)),
    [tickerSymbol]
  )

  const [localCurrency] = useLocalCurrency()

  // TODO: Update messages so that the price becomes stale intentionally (until ephemeral msgs work)
  // latestUpdate, // TODO: Display this in the attachment
  const {
    price: { price, iexRealtimePrice, changePercent, currency },
  } = useTickerPrice(tickerSymbol)

  console.log(price)
  console.log(iexRealtimePrice)

  useEffect(
    () => setCurrentPrice(iexRealtimePrice ? iexRealtimePrice : price),
    [iexRealtimePrice, price]
  )

  const [costPerShare, setCostPerShare] = useState({ currency, cost: currentPrice })
  const { data: exchangeRate, isLoading: isLoadingExchangeRate } =
    useCurrencyConversion(currency, localCurrency)

  useEffect(() => {
    setCostPerShare(() => ({
      cost: isLoadingExchangeRate ? currentPrice : currentPrice * exchangeRate?.rate,
      currency: isLoadingExchangeRate ? currency : localCurrency,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrice, exchangeRate])

  const groupName = channel.cid.split(":").pop()

  // TODO: add some logic to make the message ephemeral
  const ephemeralMessage = true

  return (
    <>
      {ephemeralMessage ? (
        <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
          <LogoPriceCardHeader
            {...{
              price: currentPrice,
              priceChange: changePercent,
              currency,
              ISIN: isin,
              tickerSymbol,
            }}
          />
          <Suspense fallback={<LoadingIndicator />}>
            <MML
              converters={converters(costPerShare)}
              source={attachment.mml}
              onSubmit={(data) => {
                const tradeArgs = {
                  username,
                  groupName,
                  assetRef: `tickers/${isin}`,
                  messageId: message.id,
                  executionCurrency: localCurrency,
                  assetCurrency: currency,
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
      ) : null}
    </>
  )
}

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

export default TradeCommandAttachment
