import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useAuth } from "@hooks/useAuth"
import { agreesToTrade } from "@lib/firebase/client/db/agreesToTrade"
import React, { Suspense } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"
import InvestConfirmationMMLConverter from "../converters/InvestConfirmationMMLConverter"

const MML = React.lazy(async () => {
  const mml = await import("mml-react")
  return { default: mml.MML }
})

const InvestmentConfirmationAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const groupName = channel.cid.split(":").pop()

  const [action, shares] = message.text.split("to ").pop().split("shares")[0].split(" ")
  const cost = message.text.split("for ").pop().split(". Do")[0]

  // TODO: Add different views of the buy card for users who did not submit it
  const converters = {
    investmentConfirmation: (tag) => (
      <InvestConfirmationMMLConverter {...tag.node.attributes} key={tag.key} />
    ),
  }

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol}
        tickerState={{
          action,
          price: parseFloat(cost),
          shares: parseFloat(shares),
        }}
      />
      <Suspense fallback={<LoadingIndicator />}>
        <MML
          converters={converters}
          source={attachment.mml}
          onSubmit={(data) => {
            // ! Trade is based on the groups selection process.
            // ! Defaults to uanimous decision.
            if ("yes" in data) agreesToTrade(groupName, message.parent_id, user.uid)
          }}
          Loading={LoadingIndicator}
        />
      </Suspense>
    </div>
  )
}

export default InvestmentConfirmationAttachment
