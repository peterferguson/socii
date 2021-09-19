import { InvestButtonModalContainer } from "@components/InvestButtonModal/InvestButtonModalContainer"
import { Dialog } from "@headlessui/react"
import { useTickerPrice } from "@hooks"
import { useAuth } from "@hooks/useAuth"
import { tradeSubmission } from "@lib/firebase/client/functions"
import { Price } from "@models/Price"
import { dateAsNumeric } from "@utils/dateAsNumeric"
import { tw } from "@utils/tw"
import router from "next/router"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { LargeNumberInput } from "../LargeNumberInput"
import PriceHeading from "../PriceHeading"
import TickerLogo from "../TickerLogo"

const orderScreenState = (state) =>
  state.matches("active.limitOrder") ||
  state.matches("active.cashOrder") ||
  state.matches("active.shareOrder")

const OrderModal = ({ ticker, state, send }) => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const { price } = useTickerPrice(ticker.tickerSymbol)
  const [amount, setAmount] = useState(0)

  const handleSubmission = async () => {
    const tradeArgs = {
      username,
      alpacaAccountId: user.alpacaAccountId,
      groupName: state.context.group,
      assetRef: `tickers/${ticker.ISIN}`,
      messageId: `${username}-${state.context.group}-${dateAsNumeric(new Date())}`,
      executionCurrency: "USD",
      assetCurrency: "USD",
      stockPrice: price.iexRealtimePrice || price.latestPrice,
      notional: amount,
      symbol: ticker.tickerSymbol,
      timeInForce: "day",
      submittedFromCallable: true,
    }
    await toast.promise(
      tradeSubmission({ ...tradeArgs, type: "market", side: state.context.side }),
      {
        loading: "submitting...",
        success: () => {
          router.push(`/groups/${state.context.group}`)
          return <b>Trade Submitted!</b>
        },
        error: <b>Could not submit trade.</b>,
      }
    )
  }
  return (
    <InvestButtonModalContainer open={orderScreenState(state)} send={send}>
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
        <Dialog.Title className="text-2xl font-medium text-gray-600 font-primary leading-6">
          <PriceHeader
            isin={ticker.ISIN}
            symbol={ticker.tickerSymbol}
            shortName={ticker.shortName}
            price={price}
          />
        </Dialog.Title>
        <LargeNumberInput
          amount={amount}
          orderType={state.context.orderType}
          setAmount={setAmount}
          side={state.context.side}
          symbol={ticker.tickerSymbol}
        />
        <div className="flex items-center justify-center mx-auto mt-4 text-lg font-medium sm:text-xl">
          <button
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
          </button>
        </div>
      </div>
    </InvestButtonModalContainer>
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
  <div className="flex flex-col items-center">
    <TickerLogo height="64" width="64" isin={isin} tickerSymbol={symbol} />
    <div className="flex flex-col text-center">
      <span className="mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
        {shortName}
      </span>
      <PriceHeading
        tickerSymbol={symbol}
        className="mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white"
        initialPrice={price}
      />
    </div>
  </div>
)

export default OrderModal
