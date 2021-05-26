import MMLButton from "./MMLButton"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"

import { useTickerPriceData, useLocalCurrency, useExchangeRate } from "@lib/hooks"
import React from "react"
import { MML } from "mml-react"

// WARN: IEX called for each instance of a invest command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const InvestCommandAttachment = ({ attachment }) => {
  const tickerState = useTickerPriceData({ tickerSymbol: attachment?.tickerSymbol })

  const converters = {
    invest: (tag) => (
      <InvestMMLConverter
        {...tag.node.attributes}
        canSell={true}
        tickerSymbol={attachment.tickerSymbol}
        tickerState={tickerState}
      />
    ),
  }

  return (
    <div className="py-4 pl-4 bg-white rounded-lg shadow-lg">
      <MML
        converters={converters}
        source={attachment.mml}
        onSubmit={(e) => console.log(e)}
      />
    </div>
  )
}

const InvestMMLConverter = ({ tickerSymbol, tickerState, canSell = true }) => (
  <>
    <LogoPriceCardHeader
      className="mb-2 ml-[-1.3rem]"
      tickerSymbol={tickerSymbol}
      tickerState={tickerState}
    />
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row">
        {canSell && (
          <MMLButton
            key={`sell-button`}
            name="sell"
            className="w-24 mx-2 outline-btn btn-transition"
            text="Sell"
          />
        )}
        <MMLButton
          key={`buy-button`}
          name="buy"
          className={`mx-2 outline-btn btn-transition ${canSell ? "w-24" : "w-52"}`}
          text={"Buy"}
        />
      </div>

      <MMLButton
        key={`cancel-button`}
        name="cancel"
        className="mx-2 w-52 outline-btn btn-transition hover:bg-red-400"
        text="Cancel"
      />
    </div>
  </>
)

export default InvestCommandAttachment