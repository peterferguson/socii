import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { isMarketOpen } from "@utils/isMarketOpen"
import { updateTradeEvents } from "@utils/updateTradeEvents"
import React, { useEffect, useState } from "react"
import { useChatContext, useMessageContext } from "stream-chat-react"
import { subscribeToTrade } from "@lib/firebase/client/db/subscribeToTrade"

// TODO: Convert state to a state machine
const InvestmentReceiptAttachment = ({ attachment }) => {
  const { client } = useChatContext()
  const { message } = useMessageContext()
  const { tradeId } = attachment
  const [isSettled, setIsSettled] = useState(false)
  const [tickerSymbol, setTickerSymbol] = useState("")
  const [orderExecutionStatus, setOrderExecutionStatus] = useState("")
  const cost = parseFloat(message.text.split("cost of ").pop().trim().slice(1))
  const isPending = message.text.includes("IS PENDING")
  const purchasePrice = parseFloat(
    message.text.split("for ").pop().split(" ").shift().slice(1)
  )

  useEffect(() => {
    !isSettled &&
      isMarketOpen().then((isOpen) => isPending && isOpen && updateTradeEvents())
    if (isSettled && isPending) {
      client.updateMessage({
        ...message,
        text: message.text.replace("IS PENDING", ""),
        attachments: message.attachments.map((attached) => {
          return attached.type === "receipt"
            ? { ...attached, orderExecutionStatus }
            : attached
        }),
      } as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isSettled])

  useEffect(() => {
    let unsubscribe
    if (tradeId && !isSettled) {
      unsubscribe = subscribeToTrade("founders", tradeId, (snapshot) => {
        const tradeData = snapshot.data()
        if (tradeData) {
          const { executionStatus } = tradeData
          setOrderExecutionStatus(executionStatus)
          if (executionStatus === "filled") {
            setIsSettled(true)
            unsubscribe()
          }
        }
      })
    }

    return () => unsubscribe?.()
  })

  useEffect(() => {
    typeof attachment.tickerSymbol === "string" &&
      setTickerSymbol(attachment.tickerSymbol)
  }, [attachment?.tickerSymbol])

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      {attachment?.tickerSymbol && (
        <LogoPriceCardHeader
          tickerSymbol={tickerSymbol.toUpperCase()}
          cost={cost}
          purchasePrice={purchasePrice}
        />
      )}
    </div>
  )
}

export default InvestmentReceiptAttachment
