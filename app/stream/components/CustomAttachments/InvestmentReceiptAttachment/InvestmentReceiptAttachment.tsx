import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useAuth } from "@hooks/useAuth"
import { useMarketClock } from "@hooks/useMarketClock"
import { usePollTradeUpdates } from "@hooks/usePollTradeUpdates"
import { subscribeToTrade } from "@lib/firebase/client/db/subscribeToTrade"
import { fetchWithToken } from "@utils/fetchWithToken"
import { tw } from "@utils/tw"
import React, { useEffect, useState } from "react"
import { LoadingIndicator, useMessageContext } from "stream-chat-react"
import { alpacaPendingStatuses } from "@lib/constants"

// TODO: Convert state to a state machine
const InvestmentReceiptAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { message } = useMessageContext()
  const { isMarketOpen, isLoading } = useMarketClock()

  const { cid } = message
  const groupName = cid.split(":").pop()
  const { tradeId, orderStatus, tickerSymbol, price, cost } = attachment
  const [orderExecutionStatus, setOrderExecutionStatus] = useState("")
  const [isPending, setIsPending] = useState(
    alpacaPendingStatuses.includes(orderStatus)
  )

  // - Poll for trade updates every 10 seconds until the market closes or the trade is settled
  usePollTradeUpdates(isMarketOpen && isPending ? 10 * 1000 : null)

  useEffect(() => {
    !isPending &&
      orderStatus &&
      fetchWithToken("/api/stream/updateReceiptOrderStatus", user?.token, {
        method: "POST",
        body: JSON.stringify({
          messageUpdate: {
            ...message,
            text: message.text.replace("IS PENDING", ""),
            attachments: message.attachments.map((attached) => {
              return attached.type === "receipt"
                ? { ...attached, orderStatus: orderExecutionStatus }
                : attached
            }),
          },
        }),
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, orderExecutionStatus])

  useEffect(() => {
    let unsubscribe
    if (tradeId && isPending) {
      unsubscribe = subscribeToTrade(groupName, tradeId, (snapshot) => {
        const tradeData = snapshot.data()
        if (tradeData) {
          const { executionStatus } = tradeData
          if (executionStatus) {
            setOrderExecutionStatus(executionStatus)
            setIsPending(alpacaPendingStatuses.includes(executionStatus))
          }
          switch (executionStatus) {
            case "filled":
              unsubscribe()
              break
            default:
              break
          }
        }
      })
    }

    return () => unsubscribe?.()
  })

  useEffect(
    () => setIsPending(alpacaPendingStatuses.includes(orderStatus)),
    [orderStatus]
  )

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      {isLoading ? (
        <div className="grid place-items-center">
          <LoadingIndicator color="#3fba" size={95} />
        </div>
      ) : (
        <>
          {attachment?.tickerSymbol && (
            <LogoPriceCardHeader
              tickerSymbol={tickerSymbol.toUpperCase()}
              cost={cost}
              purchasePrice={price}
              showChange={!isPending}
            />
          )}
          {isPending && (
            <div
              className={tw(
                "ml-1 text-xs grid place-items-center bg-gray-200 font-semibold py-1",
                "px-2 rounded-full uppercase mt-1",
                isPending && "animate-pulse"
              )}
            >
              <div className="flex flex-row items-center justify-between">
                <span className="text-gray-600 ml-0.5">order pending</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InvestmentReceiptAttachment
