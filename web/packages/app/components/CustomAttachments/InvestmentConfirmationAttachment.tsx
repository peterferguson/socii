import { useState, useEffect } from "react"
import { useAuth } from "app/hooks/useAuth"
import { getTickerISIN, setAgreesToTrade } from "app/lib/firebase/db"
import MMLButton from "./MML/Button"
import {
  // useChannelStateContext,
  useChatContext,
  useMessageContext,
} from "stream-chat-expo"
import toast from "react-hot-toast"
import tw from "app/lib/tailwind"
import { useStream } from "app/hooks/useStream"
import { View } from "react-native"
import AttachmentCardWithLogo from "./AttachmentCardWithLogo"
import { useTickerPrice } from "app/hooks/useTickerPrice"

const InvestmentConfirmationAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { channel } = useStream()
  const { message } = useMessageContext()

  const groupName = channel.cid.split(":").pop()
  const alpacaAccountId = user.alpacaAccountId

  const { price } = useTickerPrice(attachment?.symbol)

  const onSubmit = async (agrees: boolean) => {
    // ! Trade is based on the groups selection process.
    // ! Defaults to uanimous decision.
    await setAgreesToTrade(groupName, message.id, user.uid, alpacaAccountId)
    //   await toast.promise(
    //     agreesToTrade(groupName, message.id, user.uid, alpacaAccountId),
    //     {
    //       loading: agrees ? "agreeing..." : "disagreeing...",
    //       success: agrees ? "Agreed to trade" : "Disagreed to trade",
    //       error: agrees ? "Error agreeing to trade" : "Error disagreeing to trade",
    //     }
    //   )
  }

  // TODO: Add different views of the buy card for users who did not submit it

  return (
    <AttachmentCardWithLogo
      assetSymbol={attachment?.symbol}
      isin={attachment?.isin}
      currentPriceData={price}
    >
      <View style={tw`flex-row items-center justify-center mt-4`}>
        <MMLButton
          key={`no-button`}
          style={tw`bg-red-200 border border-red-400`}
          textStyle={tw`text-red-500`}
          text="No"
          onSubmit={() => onSubmit(false)}
        />
        <MMLButton
          key={`yes-button`}
          style={tw`bg-green-200 border border-green-400`}
          textStyle={tw`text-green-500`}
          text={"Yes"}
          onSubmit={() => onSubmit(true)}
        />
      </View>
    </AttachmentCardWithLogo>
  )
}

export default InvestmentConfirmationAttachment
