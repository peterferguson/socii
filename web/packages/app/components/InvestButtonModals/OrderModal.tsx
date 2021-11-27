import router from "next/router"
import React, { useState } from "react"
import { Text, View, Pressable } from "react-native"
import { useAuth } from "app/hooks/useAuth"
import { useTickerPrice } from "app/hooks/useTickerPrice"
import { tradeSubmission } from "app/lib/firebase/function"
import tw from "app/lib/tailwind"
import { Price } from "app/models/Price"
import { LargeNumberInput } from "../LargeNumberInput"
import PriceHeading from "../PriceHeading"
import AssetLogo from "../AssetLogo"
import { CenteredColumn, CenteredRow } from ".."
import { RoundButton } from "app/components/RoundButton"
import { useModal } from "app/hooks/useModal"
import { useRouter } from "app/navigation/use-router"

const OrderModal = ({ asset, state, send, modalRef }) => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const symbol = asset.alpaca.symbol
  const { price } = useTickerPrice(symbol)
  const [amount, setAmount] = useState(null)
  const group =  state.context.group
  const router = useRouter()
  const [error, setError] = useState(null)

  const { handleExpand, handleClose } = useModal(modalRef)

  const handleSubmission = async () => {
    const tradeArgs = {
      username,
      alpacaAccountId: user.alpacaAccountId,
      groupName: group,
      assetRef: `tickers/${asset.ISIN}`,
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

    tradeSubmission({ ...tradeArgs, type: "market", side: state.context.side })
      .then((r)=> {
        router.push(`/channel/${group}`)         
        send("CLOSE")
      }, (e) => {
        //console.log("FAILED with error:", e);
        setError(true)   
      })
  }
  return (
    <CenteredColumn style={tw`w-full p-4 absolute top-0`}>
      <View style={tw`w-full flex-1`}>
        <PriceHeader
          isin={asset?.ISIN}
          symbol={symbol}
          shortName={asset.shortName}
          price={price}
        />
      </View>
      <View style={tw`w-full flex-3`}>
        <LargeNumberInput
          amount={amount}
          orderType={state.context.orderType}
          setAmount={setAmount}
          side={state.context.side}
          symbol={symbol}
          onFocus={handleExpand}
        />
      </View>
      <View style={tw`w-full flex-1`}>
      {error ? (
        <RoundButton
          onPress={handleClose}
          label={`Sorry! Something went wrong`}
          labelStyle={tw`text-center text-teal-700 uppercase dark:text-white`}
          gradientColors={[tw.color("red-200"), tw.color("red-500")]}
          textColor={tw.color("red-500")}
        />
        ):(
        <RoundButton
          onPress={handleSubmission}
          label={`${state.context.side} ${symbol}`}
          labelStyle={tw`text-center text-teal-700 uppercase dark:text-white`}
          gradientColors={[tw.color("teal-100"), tw.color("teal-200/80")]}
          textColor={tw.color("teal-500")}
        />
        )}
      </View>
      {/* <View
        style={tw`flex items-center justify-center mx-auto mt-4 text-lg font-medium sm:text-xl`}
      >
        <Pressable
          style={tw.style(
            "items-center justify-center w-full h-12 px-4 py-2 mx-2",
            " border border-transparent",
            "  bg-palette-lightest sm:mx-8 rounded-md"
          )}
          onPress={handleSubmission}
        >
          <Text style={tw`text-palette-darkest font-poppins-500 uppercase`}>
            
          </Text>
        </Pressable>
      </View> */}
      {/* <Numpad onPress={undefined} width={undefined} /> */}
    </CenteredColumn>
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
  <CenteredRow style={tw`justify-between`}>
    <CenteredColumn>
      <AssetLogo height="52" width="52" isin={isin} asset={symbol} />
      <Text
        style={tw`text-center mt-2 font-poppins-600 text-gray-500 uppercase dark:text-white`}
      >
        {shortName}
      </Text>
    </CenteredColumn>
    <CenteredColumn>
      <PriceHeading
        vertical
        tickerSymbol={symbol}
        className="ml-2 font-poppins-600 text-gray-500 uppercase dark:text-white"
        initialPrice={price}
      />
    </CenteredColumn>
  </CenteredRow>
)

export default OrderModal
