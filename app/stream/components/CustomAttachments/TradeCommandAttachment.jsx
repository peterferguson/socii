import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useTickerPrice } from "@hooks/useTickerPrice"
import { tickerToISIN } from "@lib/firebase/client/db/tickerToISIN"
import { tradeSubmission } from "@lib/firebase/client/firebase"
import { useAuth } from "hooks/useAuth"
import React, { Suspense, useEffect, useRef, useState } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"
import { TradeMMLConverter } from "./converters/TradeMMLConverter"

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

const TradeCommandAttachment = ({ attachment }) => {
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [currentPrice, setCurrentPrice] = useState(undefined)
  const [isin, setIsin] = useState("")

  const { username } = useAuth()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const {
    price: { price, iexRealtimePrice, changePercent },
  } = useTickerPrice(tickerSymbol.current)

  useEffect(() => tickerToISIN(tickerSymbol.current).then((data) => setIsin(data)), [])

  useEffect(
    () => setCurrentPrice(iexRealtimePrice ? iexRealtimePrice : price),
    [iexRealtimePrice, price]
  )

  // TODO: Update messages so that the price becomes stale intentionally (until ephemeral msgs work)
  // latestUpdate, // TODO: Display this in the attachment
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
              ISIN: isin,
              tickerSymbol: tickerSymbol.current,
            }}
          />
          <Suspense fallback={<LoadingIndicator />}>
            <MML
              converters={converters(currentPrice)}
              source={attachment.mml}
              onSubmit={(data) => {
                const tradeArgs = {
                  username,
                  groupName,
                  assetRef: `tickers/${isin}`,
                  messageId: message.id,
                  executionCurrency: "USD",
                  assetCurrency: "USD",
                  stockPrice: currentPrice,
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
          </Suspense>
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

export default TradeCommandAttachment
