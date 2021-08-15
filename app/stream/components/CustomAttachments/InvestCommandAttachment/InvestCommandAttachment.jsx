import React, { Suspense } from "react"
import { LoadingIndicator } from "stream-chat-react"
import { InvestMMLConverter } from "../converters/InvestMMLConverter"


const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

// WARN: IEX called for each instance of a invest command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const InvestCommandAttachment = ({ attachment }) => {
  const tickerSymbol = attachment?.tickerSymbol?.toUpperCase()
  const tickerData = {} // TODO: FIX THIS WITH PERSISTENT DATA

  const converters = {
    invest: (tag) => (
      <InvestMMLConverter
        {...tag.node.attributes}
        canSell={true} // - futureproofing for breaking if the group holds the asset
        tickerSymbol={tickerSymbol}
        tickerState={tickerData}
      />
    ),
  }

  return (
    <div className="py-4 pl-4 bg-white rounded-lg shadow-lg">
      <Suspense fallback={<LoadingIndicator />}>
        <MML converters={converters} source={attachment.mml} />
      </Suspense>
    </div>
  )
}

export default InvestCommandAttachment
