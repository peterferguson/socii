// import { currencyIcons } from "@lib/constants"
import MMLButton from "./MMLButton"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import {
  useTickerPriceData,
  useShareCost,
  useLocalCurrency,
  useExchangeRate,
} from "@lib/hooks"
import { UserContext } from "@lib/context"
import { tradeSubmission, tickerToISIN } from "@lib/firebase"

import {
  LoadingIndicator,
  useMessageContext,
  useChannelStateContext,
} from "stream-chat-react"
import React, { Suspense, useContext } from "react"

const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

import { FaDollarSign, FaPoundSign, FaYenSign, FaEuroSign } from "react-icons/fa"
export const currencyIcons = {
  AUD: { icon: FaDollarSign },
  CAD: { icon: FaDollarSign },
  // CHF: "CHF",
  EUR: { icon: FaEuroSign },
  GBP: { icon: FaPoundSign },
  JPY: { icon: FaYenSign },
  USD: { icon: FaDollarSign },
}

const BuyCommandAttachment = ({ attachment }) => {
  const { username } = useContext(UserContext)
  const tickerState = useTickerPriceData({
    tickerSymbol: attachment?.tickerSymbol.toUpperCase(),
  })
  const [localCurrency] = useLocalCurrency()
  const exchangeRate = useExchangeRate(tickerState.assetCurrency, localCurrency)
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()
  const localCostPerShare = exchangeRate
    ? (tickerState.price * exchangeRate?.rate).toFixed(2)
    : tickerState.price

  const tickerISIN = tickerState?.ticker?.ISIN

  const converters = {
    buy: (tag) => (
      <BuyMMLConverter
        {...tag.node.attributes}
        tagKey={tag.key}
        localCostPerShare={localCostPerShare}
        localCurrency={exchangeRate ? localCurrency : tickerState.assetCurrency}
      />
    ),
    tradeConfirmation: (tag) => (
      <InvestConfirmationMMLConverter
        {...tag.node.attributes}
        tagKey={tag.key}
        localCostPerShare={localCostPerShare}
        localCurrency={exchangeRate ? localCurrency : tickerState.assetCurrency}
      />
    ),
  }

  const buySubmission = async (actions, tickerSymbol) => {
    // TODO: This leaves us open to attacks ...
    // ! need to handle this
    // TODO:
    // ? Could just move away from calling the command function & reach directly for the
    // ? tradeSubmission function. Then also handle the mml message sending there.
    await fetch("http://localhost:5001/sociiinvest/europe-west2/commands?type=buy", {
      method: "POST",
      body: JSON.stringify({
        message: {
          id: "",
          text: `/buy ${tickerSymbol}`,
          command: "buy",
          args: `buy ${tickerSymbol}`,
          html: "",
          attachments: [],
          mentioned_users: [],
        },
        user: {
          id: username,
          role: "user",
          banned: false,
          online: true,
        },
        form_data: { ...actions, action: "buy" },
      }),
    })
  }

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol.toUpperCase()}
        tickerState={tickerState}
      />
      <Suspense fallback={<LoadingIndicator />}>
        <MML
          converters={converters}
          source={attachment.mml}
          onSubmit={(data) => {
            const { buy, cancel, ...actions } = data // - remove buy & cancel

            if ("buy" in data) {
              buySubmission(actions, attachment?.tickerSymbol.toUpperCase())
            }
            if ("yes" in data) {
              // ! Trade is based on the groups selection process.
              // ! Defaults to uanimous decision.
              const groupName = channel.cid.split(":").pop()
              tradeSubmission({
                groupRef: `groups/${groupName}`,
                assetRef: `tickers/${tickerState.ticker.ISIN}`,
                orderType: "BUY",
                price: parseFloat(message.text.split("for ").pop().split(". Do")[0]),
                shares: parseFloat(
                  message.text.split("buy ").pop().split(" shares")[0]
                ),
                messageId: message.id,
              })
            }
          }}
          Loading={LoadingIndicator}
        />
      </Suspense>
    </div>
  )
}

/* Converters */

const BuyMMLConverter = ({ tagKey, localCostPerShare, localCurrency }) => {
  const [shares, handleChange, toCost] = useShareCost(localCostPerShare)

  return (
    <div className="flex flex-col">
      <MMLNumberInput
        name={"Shares"}
        key={`${tagKey}-shares`}
        value={shares}
        onChange={handleChange}
      />
      <MMLNumberInput
        name={"Cost"}
        key={`${tagKey}-cost`}
        value={toCost(shares)}
        onChange={handleChange}
        currencyIcon={currencyIcons[localCurrency]}
      />
      <div className="flex flex-row mt-1">
        <MMLButton
          key={`cancel-button`}
          name="cancel"
          className="flex-grow mx-2 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
        <MMLButton
          key={`buy-button`}
          name="buy"
          className="flex-grow mx-2 outline-btn btn-transition"
          text="Buy"
        />
      </div>
    </div>
  )
}

const MMLNumberInput = ({ tagKey, value, onChange, name, currencyIcon = null }) => {
  return (
    <div className="flex flex-row m-2 border rounded shadow">
      <span
        key={tagKey}
        className="flex items-center px-3 font-bold rounded rounded-r-none font-poppins bg-grey-200 text-grey-400"
      >
        {name}
        {currencyIcon && <currencyIcon.icon className="ml-2 mb-0.5" />}
      </span>
      <input
        type="number"
        pattern="[0-9]+([\.,][0-9]+)?"
        min="0.01"
        step="0.01"
        label={name.toLowerCase()}
        name={name.toLowerCase()}
        className="w-full py-2 font-bold text-right border-none rounded focus-within:outline-none focus-within:border-none focus-within:ring-0"
        value={value}
        onChange={onChange}
        formNoValidate={true}
      />
    </div>
  )
}

const InvestConfirmationMMLConverter = () => (
  <>
    <div className="flex items-center justify-center w-full mx-auto space-x-2">
      <MMLButton
        key={`no-button`}
        name="no"
        className="w-1/2 mx-2 outline-btn btn-transition hover:bg-red-400"
        text="No"
      />
      <MMLButton
        key={`yes-button`}
        name="yes"
        className="w-1/2 mx-2 outline-btn btn-transition"
        text={"Yes"}
      />
    </div>
  </>
)

export default BuyCommandAttachment
