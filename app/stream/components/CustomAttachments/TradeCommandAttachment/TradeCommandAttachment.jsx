import { useTickerPrice } from "@hooks/useTickerPrice"
import { getTickerISIN } from "@lib/firebase/client/db/getTickerISIN"
import { tradeSubmission } from "@lib/firebase/client/functions"
import { useAuth } from "hooks/useAuth"
import dynamic from "next/dynamic"
import React, { useEffect, useRef, useState } from "react"
import { useUnmountPromise } from "react-use"
import {
  useChannelStateContext,
  useChatContext,
  useMessageContext,
} from "stream-chat-react"
import toast from "react-hot-toast"
import MMLButton from "../../../MML/Button"
import MMLNumberInput from "../../../MML/NumberInput"

const LogoPriceCardHeader = dynamic(() => import("@components/LogoPriceCardHeader"))

const TradeCommandAttachment = ({ attachment, tradeType }) => {
  const mounted = useUnmountPromise()
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [isin, setIsin] = useState("")

  const { user } = useAuth()
  const username = user ? user.username : ""
  const { client } = useChatContext()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const { price } = useTickerPrice(tickerSymbol.current)
  const [amount, setAmount] = useState(price?.iexRealtimePrice || price?.latestPrice)
  const handleAmountChange = (e) => setAmount(e.target.value)

  const alpacaAccountId = user.alpacaAccountId

  useEffect(() => {
    const getISIN = async () => setIsin(await getTickerISIN(tickerSymbol.current))
    !isin && mounted(getISIN())
  }, [isin, mounted])

  // if (ephemeralStatuses.includes(message.status)) return null

  const groupName = channel.cid.split(":").pop()

  const onSubmit = async (data) => {
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
      symbol: tickerSymbol.current,
      timeInForce: "day",
      // TODO: NEED TO ENSURE THESE ARE NOT NULL ↑
    }
    //TODO: Review redundancy with orderType (may not be with limit orders)
    // - Write to firestore & send confirmation message in thread
    if (data.option == "buy" || data.option == "sell") {
      await toast.promise(
        tradeSubmission({ ...tradeArgs, type: "market", side: data.option }),
        {
          loading: "sending order...",
          success: <b>${tickerSymbol.current} order sent to group!</b>,
          error: <b>Could not send order to group.</b>,
        }
      )
      // await client.partialUpdateMessage(message.id, { set: { status: "complete" } })
    }
    if (data.option == "cancel") {
      await toast.promise(
        client.partialUpdateMessage(message.id, { set: { status: "cancelled" } }),
        {
          loading: "cancelling order...",
          success: <b>${tickerSymbol.current} order cancelled!</b>,
          error: <b>Could not cancel order.</b>,
        }
      )
    }
  }

  return (
    <>
      {isin && (
        <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
          <LogoPriceCardHeader tickerSymbol={tickerSymbol.current} />
          <div className="flex flex-col">
            <MMLNumberInput
              name={"Amount"}
              onChange={handleAmountChange}
              value={amount}
            />
            <div className="flex flex-row mt-1">
              <MMLButton
                name="cancel"
                className="flex-grow mx-2 btn-transition hover:bg-red-400"
                text="Cancel"
                onSubmit={() => onSubmit({ amount, option: "cancel" })}
              />
              <MMLButton
                name={tradeType}
                className="flex-grow mx-2 btn-transition"
                text={tradeType.charAt(0)?.toUpperCase() + tradeType.slice(1)}
                onSubmit={() => onSubmit({ amount, option: tradeType })}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(TradeCommandAttachment)
