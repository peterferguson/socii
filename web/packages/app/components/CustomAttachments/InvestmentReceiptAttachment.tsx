import LogoPriceCardHeader from "../LogoPriceCardHeader"
// import { subscribeToTrade } from "../../lib/firebase/client/db/subscribeToTrade"
import { alpacaPendingStatuses } from "../../lib/constants"
import { useAuth } from "../../hooks/useAuth"
import { useMarketClock } from "../../hooks/useMarketClock"
import { usePollTradeUpdates } from "../../hooks/usePollTradeUpdates"
import { fetchWithToken } from "../../utils/fetchWithToken"
import tw from "../../lib/tailwind"
import { useEffect, useState } from "react"
import { LoadingIndicator, useMessageContext } from "stream-chat-expo"
import { View, Text } from "react-native"

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
  // usePollTradeUpdates(isMarketOpen && isPending ? 10 * 1000 : null)

  // useEffect(() => {
  //   !isPending &&
  //     orderStatus &&
  //     fetchWithToken("/api/stream/updateReceiptOrderStatus", user?.token, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         messageUpdate: {
  //           ...message,
  //           text: message.text.replace("IS PENDING", ""),
  //           attachments: message.attachments.map((attached) =>
  //             attached.type === "receipt"
  //               ? { ...attached, orderStatus: orderExecutionStatus }
  //               : attached
  //           ),
  //         },
  //       }),
  //     })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isPending, orderExecutionStatus])

  // useEffect(() => {
  //   let unsubscribe
  //   if (tradeId && isPending) {
  //     unsubscribe = subscribeToTrade(groupName, tradeId, (snapshot) => {
  //       const tradeData = snapshot.data()
  //       if (tradeData) {
  //         const { executionStatus } = tradeData
  //         if (executionStatus) {
  //           setOrderExecutionStatus(executionStatus)
  //           setIsPending(alpacaPendingStatuses.includes(executionStatus))
  //         }
  //         switch (executionStatus) {
  //           case "filled":
  //             unsubscribe()
  //             break
  //           default:
  //             break
  //         }
  //       }
  //     })
  //   }

  //   return () => unsubscribe?.()
  // })

  useEffect(
    () => setIsPending(alpacaPendingStatuses.includes(orderStatus)),
    [orderStatus]
  )

  return (
    <View
      style={tw`flex-col items-center justify-center p-4 mb-2 bg-white rounded-lg shadow-lg`}
    >
      {isLoading ? (
        <View style={tw`grid place-items-center`}>
          <LoadingIndicator color="#3fba" size={95} />
        </View>
      ) : (
        <>
          {attachment?.tickerSymbol && (
            <LogoPriceCardHeader
              asset={tickerSymbol}
              isin=""
              cost={cost}
              purchasePrice={price}
              showChange={!isPending}
            />
          )}
          {isPending && (
            <View
              style={tw.style(
                "ml-1 text-xs grid place-items-center bg-gray-200 font-semibold py-1",
                "px-2 rounded-full uppercase mt-1",
                isPending && "animate-pulse"
              )}
            >
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-gray-600 ml-0.5`}>order pending</Text>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default InvestmentReceiptAttachment
