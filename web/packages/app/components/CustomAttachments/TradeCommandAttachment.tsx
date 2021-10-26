// import { useTickerPrice } from "../../hooks/useTickerPrice"
// import { getTickerISIN } from "../../lib/firebase/client/db/getTickerISIN"
// import { tradeSubmission } from "../lib/firebase/client/functions"
import { useAuth } from "../../hooks/useAuth"
import React, { useEffect, useRef, useState } from "react"
// import { useUnmountPromise } from "react-use"
import { useChatContext, useMessageContext } from "stream-chat-expo"
import MMLButton from "./MML/Button"
import MMLNumberInput from "./MML/NumberInput"
import tw from "../../lib/tailwind"
import { View } from "react-native"
import { useStream } from "../../hooks"
import AttachmentCardWithLogo from "./AttachmentCardWithLogo"
import { ephemeralStatuses } from "../../lib/constants"

const TradeCommandAttachment = ({ attachment, tradeType }) => {
  // const mounted = useUnmountPromise()
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [isin, setIsin] = useState("")

  const { user } = useAuth()
  const username = user ? user.username : ""
  const { client } = useChatContext()
  const { channel } = useStream()
  const { message } = useMessageContext()

  // const { price } = useTickerPrice(tickerSymbol.current)
  const price = { iexRealtimePrice: 0.0, latestPrice: 0 }
  const [amount, setAmount] = useState(price?.iexRealtimePrice || price?.latestPrice)

  const alpacaAccountId = user.alpacaAccountId

  // useEffect(() => {
  //   const getISIN = async () => setIsin(await getTickerISIN(tickerSymbol.current))
  //   !isin && mounted(getISIN())
  // }, [isin, mounted])

  if (ephemeralStatuses.includes(message.status)) return null

  const groupName = channel.cid.split(":").pop()

  const onSubmit = async (data) => {}
  //   const tradeArgs = {
  //     username,
  //     alpacaAccountId,
  //     groupName,
  //     assetRef: `tickers/${isin}`,
  //     messageId: message.id,
  //     executionCurrency: "USD",
  //     assetCurrency: "USD",
  //     stockPrice: price?.iexRealtimePrice || price?.latestPrice,
  //     // TODO: NEED TO ENSURE THESE ARE NOT NULL ↓
  //     notional: parseFloat(data.amount),
  //     //cost: parseFloat(data.cost || data.amount),
  //     //qty: parseFloat(data.shares),
  //     symbol: tickerSymbol.current,
  //     timeInForce: "day",
  //     // TODO: NEED TO ENSURE THESE ARE NOT NULL ↑
  //   }
  //   //TODO: Review redundancy with orderType (may not be with limit orders)
  //   // - Write to firestore & send confirmation message in thread
  //   if (data.option == "buy" || data.option == "sell") {
  //     await toast.promise(
  //       tradeSubmission({ ...tradeArgs, type: "market", side: data.option }),
  //       {
  //         loading: "sending order...",
  //         success: `${tickerSymbol.current} order sent to group!`,
  //         error: "Could not send order to group.",
  //       }
  //     )
  //     // await client.partialUpdateMessage(message.id, { set: { status: "complete" } })
  //   }
  //   if (data.option == "cancel") {
  //     await toast.promise(
  //       client.partialUpdateMessage(message.id, { set: { status: "cancelled" } }),
  //       {
  //         loading: "cancelling order...",
  //         success: `${tickerSymbol.current} order cancelled!`,
  //         error: "Could not cancel order.",
  //       }
  //     )
  //   }
  // }

  return tickerSymbol.current ? (
    <AttachmentCardWithLogo assetSymbol={tickerSymbol.current} isin={isin}>
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
