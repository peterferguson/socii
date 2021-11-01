import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { useMessageContext } from "stream-chat-expo"
import { useAuth } from "../../hooks/useAuth"
import { useMarketClock } from "../../hooks/useMarketClock"
import { usePollTradeUpdates } from "../../hooks/usePollTradeUpdates"
import { useTickerPrice } from "../../hooks/useTickerPrice"
// import { subscribeToTrade } from "../../lib/firebase/client/db/subscribeToTrade"
import { alpacaPendingStatuses } from "../../lib/constants"
import { subscribeToTrade } from "../../lib/firebase/client/db"
import tw from "../../lib/tailwind"
import { fetchWithToken } from "../../utils/fetchWithToken"
import { shadowStyle } from "../../utils/shadowStyle"
import LogoPriceCardHeader from "../LogoPriceCardHeader"

// TODO: Convert state to a state machine
const InvestmentReceiptAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { message } = useMessageContext()
  const { isMarketOpen, isLoading } = useMarketClock()

  const { cid } = message
  const groupName = cid.split(":").pop()
  const { tradeId, orderStatus, symbol, isin, price, cost } = attachment
  const [orderExecutionStatus, setOrderExecutionStatus] = useState("")
  const [isPending, setIsPending] = useState(
    alpacaPendingStatuses.includes(orderStatus)
  )

  const { price: priceData } = useTickerPrice(symbol)

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
            attachments: message.attachments.map((attached) =>
              attached.type === "receipt"
                ? { ...attached, orderStatus: orderExecutionStatus }
                : attached
            ),
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
              unsubscribe?.()
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
    <View
      style={{
        ...tw`flex-col items-center justify-center p-4 mb-2 bg-white rounded-lg`,
        ...shadowStyle("lg"),
      }}
    >
      {isLoading ? (
        <View style={tw`flex items-center justify-center`}>
          {/* <LoadingIndicator color="#3fba" size={95} /> */}
        </View>
      ) : (
        <>
          {attachment?.symbol && (
            <LogoPriceCardHeader
              asset={symbol}
              isin={isin}
              currentPriceData={priceData}
              cost={cost}
              purchasePrice={price}
              showChange={!isPending}
            />
          )}
          {isPending && (
            <View
              style={tw.style(
                "ml-1 text-xs flex items-center justify-center bg-gray-200 font-semibold py-1",
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
