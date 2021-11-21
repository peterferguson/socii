import router from "next/router"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { useAuth } from "app/hooks/useAuth"
import { useTickerPrice } from "app/hooks/useTickerPrice"
import { getTickerISIN } from "app/lib/firebase/db"
import { tradeSubmission } from "app/lib/firebase/function"
import tw from "app/lib/tailwind"
import { Price } from "app/models/Price"
import { LargeNumberInput } from "../LargeNumberInput"
import PriceHeading from "../PriceHeading"
import AssetLogo from "../AssetLogo"

const OrderModal = ({ symbol, state, send }) => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const { price } = useTickerPrice(symbol)
  const [amount, setAmount] = useState(0)

  const [isin, setIsin] = useState(null)

  useEffect(() => {
    getTickerISIN(symbol).then(r => setIsin(r))
  }, [])

  const handleSubmission = async () => {
    const tradeArgs = {
      username,
      alpacaAccountId: user.alpacaAccountId,
      groupName: state.context.group,
      assetRef: `tickers/${isin}`,
      messageId: `${username}-${state.context.side}-${symbol}-${Math.floor(
        new Date().getTime() / 1000
      )}`,
      executionCurrency: "USD",
      assetCurrency: "USD",
      stockPrice: price.iexRealtimePrice || price.latestPrice,
      notional: amount,
      symbol: symbol,
      timeInForce: "day",
      submittedFromCallable: true,
    }
    // await toast.promise(
    tradeSubmission({ ...tradeArgs, type: "market", side: state.context.side }),
      {
        loading: "submitting...",
        success: () => {
          router.push(`/chat?cid=${state.context.group}`)
          return <b>Trade Submitted!</b>
        },
        error: <b>Could not submit trade.</b>,
      }
    // )
  }
  return (
    <View
      style={tw`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left bg-white shadow-xl transition-all transform rounded-2xl`}
    >
      <PriceHeader isin={isin} symbol={symbol} shortName={"shortName"} price={price} />

      <LargeNumberInput
        amount={amount}
        orderType={state.context.orderType}
        setAmount={setAmount}
        side={state.context.side}
        symbol={symbol}
      />
      <View
        style={tw`flex items-center justify-center mx-auto mt-4 text-lg font-medium sm:text-xl`}
      >
        {/* <button
          type="button"
          className={tw(
            "inline-flex items-center justify-center w-full h-12 px-4 py-2 mx-2",
            "font-semibold tracking-wider uppercase border border-transparent",
            "text-palette-darkest bg-palette-lightest sm:mx-8 rounded-md",
            "hover:bg-green-200 hover:text-green-600 focus:outline-none",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500",
            `umami--click--invest-button-order-modal-${state.context.side}-button`
          )}
          onClick={handleSubmission}
        >
          {state.context.side} {ticker.tickerSymbol}
        </button> */}
      </View>
    </View>
  )
}

const PriceHeader = ({
  isin,
  symbol,
  shortName,
  price,
}: {
  isin: string
  symbol: string
  shortName: string
  price: Price
}) => (
  <View style={tw`items-center inline-block w-full`}>
    <View style={tw`flex items-center justify-center`}>
      <AssetLogo height="64" width="64" isin={isin} asset={symbol} />
      <View style={tw`flex flex-col text-center`}>
        <Text
          style={tw`mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white`}
        >
          {shortName}
        </Text>
        <PriceHeading
          tickerSymbol={symbol}
          className="mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white"
          initialPrice={price}
        />
      </View>
    </View>
  </View>
)

export default OrderModal
