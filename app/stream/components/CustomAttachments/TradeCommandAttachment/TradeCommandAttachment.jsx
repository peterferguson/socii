import { useTickerPrice } from "@hooks/useTickerPrice"
import { tickerToISIN } from "@lib/firebase/client/db/tickerToISIN"
import { tradeSubmission } from "@lib/firebase/client/functions"
import { useAuth } from "hooks/useAuth"
import dynamic from "next/dynamic"
import React, { useEffect, useRef, useState } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useChatContext,
  useMessageContext,
} from "stream-chat-react"

const MML = dynamic(() => import("mml-react").then((mod) => mod.MML), {
  loading: LoadingIndicator,
})
const TradeMMLConverter = dynamic(() => import("../converters/TradeMMLConverter"))
const LogoPriceCardHeader = dynamic(() => import("@components/LogoPriceCardHeader"))

const TradeCommandAttachment = ({ attachment }) => {
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [isin, setIsin] = useState("")

  const { username } = useAuth()
  const { client } = useChatContext()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const { price } = useTickerPrice(tickerSymbol.current)

  useEffect(() => {
    let unmounted = false
    const getISIN = async () => setIsin(await tickerToISIN(tickerSymbol.current))

    !isin && !unmounted && getISIN()

    return () => (unmounted = true)
  }, [isin])

  const groupName = channel.cid.split(":").pop()

  return (
    <>
      {isin && (
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
            onSubmit={async (data) => {
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
              const updated = await client.partialUpdateMessage(message.id, {
                set: { status: "submitted" },
              })
              console.log(updated)
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
      )}
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
