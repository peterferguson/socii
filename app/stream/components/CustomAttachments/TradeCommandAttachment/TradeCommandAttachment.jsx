import { useTickerPrice } from "@hooks/useTickerPrice"
import { tickerToISIN } from "@lib/firebase/client/db/tickerToISIN"
import { tradeSubmission } from "@lib/firebase/client/functions"
import { useAuth } from "hooks/useAuth"
import dynamic from "next/dynamic"
import React, { useEffect, useRef, useState } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const MML = dynamic(() => import("mml-react").then((mod) => mod.MML), {
  loading: LoadingIndicator,
})
const TradeMMLConverter = dynamic(() => import("../converters/TradeMMLConverter"))
const LogoPriceCardHeader = dynamic(() => import("@components/LogoPriceCardHeader"))

const TradeCommandAttachment = ({ attachment }) => {
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [isin, setIsin] = useState("")

  const { username } = useAuth()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const { price } = useTickerPrice(tickerSymbol.current)

  useEffect(() => {
    let unmounted = false
    const getISIN = async () => setIsin(await tickerToISIN(tickerSymbol.current))

    !isin && !unmounted && getISIN()

    return () => (unmounted = true)
  }, [isin])

  // TODO: Update messages so that the price becomes stale intentionally (until ephemeral msgs work)
  // latestUpdate, // TODO: Display this in the attachment
  const groupName = channel.cid.split(":").pop()

  // TODO: add some logic to make the message ephemeral
  // ? If the user is not the one who sent the message, then we should not show the message
  // ? query the message command & the user who sent the message render if username === senders
  const ephemeralMessage = true

  return (
    <>
      {isin && ephemeralMessage ? (
        <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
          <LogoPriceCardHeader
            {...{
              price: (price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2),
              priceChange: price?.changePercent,
              ISIN: isin,
              tickerSymbol: tickerSymbol.current,
            }}
          />
          <MML
            converters={converters(price?.iexRealtimePrice || price?.latestPrice)}
            source={attachment.mml}
            onSubmit={(data) => {
              const tradeArgs = {
                username,
                groupName,
                assetRef: `tickers/${isin}`,
                messageId: message.id,
                executionCurrency: "USD",
                assetCurrency: "USD",
                stockPrice: price?.iexRealtimePrice || price?.latestPrice,
                // TODO: NEED TO ENSURE THESE ARE NOT NULL ↓
                notional: parseFloat(data.amount),
                //cost: parseFloat(data.cost || data.amount),
                //qty: parseFloat(data.shares),
                symbol: tickerSymbol.current,
                timeInForce: "day",
                // TODO: NEED TO ENSURE THESE ARE NOT NULL ↑
              }
              console.log(tradeArgs)
              //TODO: Review redundancy with orderType (may not be with limit orders)
              // - Write to firestore & send confirmation message in thread
              if ("buy" in data) {
                tradeSubmission({ ...tradeArgs, type: "market", side: "buy" })
              }
              if ("sell" in data) {
                tradeSubmission({ ...tradeArgs, type: "market", side: "sell" })
              }
            }}
            Loading={LoadingIndicator}
          />
        </div>
      ) : null}
    </>
  )
}

// TODO: Add different views of the buy card for users who did not submit it
// - Creates a object of all actions and their CustomMMLConverterFunctions
const converters = (cost) =>
  Object.assign(
    {},
    ...["buy", "sell"].map((type) => ({
      // eslint-disable-next-line react/display-name
      [type]: (tag) => (
        <TradeMMLConverter
          {...tag.node.attributes}
          tagKey={tag.key}
          costPerShare={cost}
          tradeType={type}
        />
      ),
    }))
  )

export default React.memo(TradeCommandAttachment)
