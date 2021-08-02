import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useAuth } from "@hooks/useAuth"
import { arrayUnion, firestore } from "@lib/firebase/client/firebase"
import React, { Suspense } from "react"
import {
  LoadingIndicator,
  useChannelStateContext,
  useMessageContext,
} from "stream-chat-react"
import MMLButton from "./MMLButton"

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
      <InvestConfirmationMMLConverter {...tag.node.attributes} tagKey={tag.key} />
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

const agreesToTrade = async (groupName, messageId, uid) => {
  const tradesRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  await tradesRef.update({ agreesToTrade: arrayUnion(`users/${uid}`) })
}

/* Converters */

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

export default InvestmentConfirmationAttachment
