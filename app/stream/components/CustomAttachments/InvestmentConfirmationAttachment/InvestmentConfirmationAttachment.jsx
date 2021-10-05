import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { useAuth } from "@hooks/useAuth"
import { agreesToTrade } from "@lib/firebase/client/db/agreesToTrade"
import React from "react"
import { useChannelStateContext, useMessageContext } from "stream-chat-react"
import MMLButton from "../../../MML/Button"

const InvestmentConfirmationAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { channel } = useChannelStateContext()
  const { message } = useMessageContext()

  const groupName = channel.cid.split(":").pop()
  const alpacaAccountId = user.alpacaAccountId

  const [action, shares] = message.text.split("to ").pop().split("shares")[0].split(" ")
  const cost = message.text.split("for ").pop().split(". Do")[0]

  const onSubmit= async () => {
    // ! Trade is based on the groups selection process.
    // ! Defaults to uanimous decision.
      agreesToTrade(groupName, message.id, user.uid, alpacaAccountId)
      // const updated = await client.partialUpdateMessage(message.id, {
      //   set: {  },
      // })
  }

  // TODO: Add different views of the buy card for users who did not submit it

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
          onSubmit={()=> onSubmit()}
        />
      </div>
    </div>
  )
}

export default InvestmentConfirmationAttachment
