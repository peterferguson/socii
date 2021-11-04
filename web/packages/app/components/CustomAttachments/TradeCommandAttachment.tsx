import { useTickerPrice } from "../../hooks/useTickerPrice"
import { tradeSubmission } from "../../lib/firebase/client/functions"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { useChatContext, useMessageContext } from "stream-chat-expo"
import { useStream } from "../../hooks"
import { useAuth } from "../../hooks/useAuth"
import { ephemeralStatuses } from "../../lib/constants"
import { getTickerISIN } from "../../lib/firebase/client/db/getTickerISIN"
import tw from "../../lib/tailwind"
// import toast from "react-hot-toast"
import AttachmentCardWithLogo from "./AttachmentCardWithLogo"
import MMLButton from "./MML/Button"
import MMLNumberInput from "./MML/NumberInput"

const TradeCommandAttachment = ({ attachment, tradeType }) => {
  const [mounted, setMounted] = useState(false)
  const symbol =
    attachment?.tickerSymbol?.toUpperCase() || attachment?.symbol?.toUpperCase()
  const [isin, setIsin] = useState(attachment?.isin)

  const { user } = useAuth()
  const username = user ? user.username : ""
  const { client } = useChatContext()
  const { channel } = useStream()
  const { message } = useMessageContext()

  // - another option for pulling the symbol from message
  // const [, , symbol] = message.id.split("-")

  const { price } = useTickerPrice(symbol)
  const [amount, setAmount] = useState(price?.iexRealtimePrice || price?.latestPrice)

  const alpacaAccountId = user.alpacaAccountId

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    !isin && mounted && getTickerISIN(symbol).then(setIsin)
  }, [isin, mounted])

  useEffect(() => {
    // - On first load of the isin store it in the message attachment data
    if (isin && !attachment?.isin) {
      client
        .partialUpdateMessage(message.id, {
          set: { attachments: [{ ...attachment, isin, symbol }] },
        })
        .then(() => console.log("Saved isin to message meta"))
    }
  }, [isin])

  if (ephemeralStatuses.includes(message.status)) return null

  const groupName = channel.cid.split(":").pop()

  const onSubmit = async data => {
    const tradeArgs = {
      username,
      alpacaAccountId,
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
      symbol: symbol,
      timeInForce: "day",
      // TODO: NEED TO ENSURE THESE ARE NOT NULL ↑
    }
    //TODO: Review redundancy with orderType (may not be with limit orders)
    // - Write to firestore & send confirmation message in thread
    if (data.option == "buy" || data.option == "sell") {
      await tradeSubmission({ ...tradeArgs, type: "market", side: data.option })
      // await toast.promise(
      //   tradeSubmission({ ...tradeArgs, type: "market", side: data.option }),
      //   {
      //     loading: "sending order...",
      //     success: `${symbol} order sent to group!`,
      //     error: "Could not send order to group.",
      //   }
      // )
      // await client.partialUpdateMessage(message.id, { set: { status: "complete" } })
    }
    if (data.option == "cancel") {
      await client.partialUpdateMessage(message.id, { set: { status: "cancelled" } })
      // await toast.promise(
      //   client.partialUpdateMessage(message.id, { set: { status: "cancelled" } }),
      //   {
      //     loading: "cancelling order...",
      //     success: `${symbol} order cancelled!`,
      //     error: "Could not cancel order.",
      //   }
      // )
    }
  }

  return symbol ? (
    <AttachmentCardWithLogo assetSymbol={symbol} isin={isin} currentPriceData={price}>
      <View style={tw`flex-col`}>
        <MMLNumberInput name={"Amount"} onChange={setAmount} value={amount} />
        <View style={tw`flex-row items-center justify-center mt-1`}>
          <MMLButton
            style={tw`bg-red-200 border border-red-400 w-24`}
            textStyle={tw`text-red-500`}
            text="Cancel"
            onSubmit={() => onSubmit({ amount, option: "cancel" })}
          />
          <MMLButton
            style={tw`bg-green-200 border border-green-400 w-24`}
            textStyle={tw`text-green-500`}
            text={tradeType.charAt(0)?.toUpperCase() + tradeType.slice(1)}
            onSubmit={() => onSubmit({ amount, option: tradeType })}
          />
        </View>
      </View>
    </AttachmentCardWithLogo>
  ) : null
}

export default React.memo(TradeCommandAttachment)
