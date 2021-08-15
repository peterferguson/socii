import { Dialog, Transition } from "@headlessui/react"
import { useTickerPrice } from "@hooks"
import { useAuth } from "@hooks/useAuth"
import { tradeSubmission } from "@lib/firebase/client/functions"
import { dateAsNumeric } from "@utils/dateAsNumeric"
import { singleLineTemplateString } from "@utils/singleLineTemplateString"
import router from "next/router"
import React, { Fragment, useState } from "react"
import PriceHeading from "./PriceHeading"
import TickerLogo from "./TickerLogo"

const orderScreenState = (state) =>
  state.matches("active.limitOrder") ||
  state.matches("active.cashOrder") ||
  state.matches("active.shareOrder")

const OrderModal = ({ ticker, state, send }) => {
  const { username } = useAuth()
  const { price } = useTickerPrice(ticker.tickerSymbol)
  const [amount, setAmount] = useState(0)

  const inputTextSize =
    String(amount).length < 4
      ? "text-8xl"
      : String(amount).length < 5
      ? "text-7xl"
      : String(amount).length < 6
      ? "text-6xl"
      : "text-4xl"

  const stockLabelSize =
    String(amount).length < 3
      ? "text-5xl"
      : String(amount).length < 5
      ? "text-4xl"
      : String(amount).length < 6
      ? "text-3xl"
      : "text-2xl"

  return (
    <Transition appear show={orderScreenState(state)} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={orderScreenState(state)}
        onClose={() => send("CLOSE")}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
              <Dialog.Title className="text-2xl font-medium text-gray-600 font-primary leading-6">
                <div className="flex flex-col items-center">
                  <TickerLogo
                    height="64"
                    width="64"
                    isin={ticker.ISIN}
                    tickerSymbol={ticker.tickerSymbol}
                  />
                  <div className="flex flex-col text-center">
                    <span className="mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
                      {ticker.shortName}
                    </span>
                    <PriceHeading
                      tickerSymbol={ticker.tickerSymbol}
                      className="mt-2 ml-2 text-lg font-semibold tracking-wider text-gray-500 uppercase dark:text-white"
                      initialPrice={price}
                    />
                  </div>
                </div>
              </Dialog.Title>
              <div>
                <div className="relative flex items-center justify-center mt-1 rounded-md">
                  {state.context.orderType !== "shares" && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-3xl text-brand animate-none">$</span>
                    </div>
                  )}
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className={`w-full pointer-cursor text-center border-none h-72 ${inputTextSize} placeholder-brand text-brand font-primary leading-6 ${
                      !amount ? "focus:animate-pulse" : ""
                    } focus:appearance-none focus:border-none focus:ring-0`}
                    placeholder="0"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    autoComplete="off"
                    autoFocus
                    required
                    style={{ caretColor: "transparent" }}
                  />
                  {state.context.orderType === "limit" && (
                    <div className="absolute text-sm text-gray-400 bottom-1 front-primary">
                      {state.context.side} as little as $1
                    </div>
                  )}
                  {state.context.orderType === "shares" && (
                    <div className="absolute flex items-center pointer-events-none bottom-12 thin:inset-y-0 thin:-right-4">
                      <span className={`${stockLabelSize} text-brand`}>
                        {ticker.tickerSymbol}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center mx-auto mt-4 text-lg font-medium sm:text-xl">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full h-12 px-4 py-2 mx-2 font-bold tracking-wider uppercase border border-transparent text-palette-darkest bg-palette-lightest sm:mx-8 rounded-md hover:bg-green-200 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={async () => {
                    const tradeArgs = {
                      username,
                      groupName: state.context.group,
                      assetRef: `tickers/${ticker.ISIN}`,
                      messageId: `${username}-${state.context.group}-${dateAsNumeric(
                        new Date()
                      )}`,
                      executionCurrency: "USD",
                      assetCurrency: "USD",
                      stockPrice: price.iexRealtimePrice || price.latestPrice,
                      notional: amount,
                      symbol: ticker.tickerSymbol,
                      timeInForce: "day",
                    }
                    tradeSubmission({ ...tradeArgs, type: "market", side: "buy" }).then(
                      () => router.push(`/groups/${state.context.group}`)
                    )
                  }}
                >
                  {state.context.side} {ticker.tickerSymbol}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
export default OrderModal

const confirmCashInvestmentMML = ({
  username,
  side,
  symbol,
  amount,
  parentId,
  showInChannel,
}) => {
  const mmlstring = `<mml><investmentConfirmation></investmentConfirmation></mml>`
  const mmlmessage = {
    user_id: username,
    text: singleLineTemplateString`
      Hey, ${username} wants the group to ${side} $${amount} of ${symbol.toUpperCase()}.
      Do you agree that the group should execute this trade?
      `,
    command: side,
    parent_id: parentId || null,
    show_in_channel: showInChannel || null,
    attachments: [
      {
        tickerSymbol: symbol,
        type: "investmentConfirmation",
        mml: mmlstring,
        actions: [
          {
            name: "action",
            text: "Yes",
            type: "button",
            value: "yes",
          },
          {
            name: "action",
            text: "No",
            type: "button",
            value: "no",
          },
        ],
      },
    ],
  }
  return mmlmessage
}
