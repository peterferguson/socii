import LogoPriceCardHeader from "../LogoPriceCardHeader"
import { useAuth } from "../../hooks/useAuth"
// import { agreesToTrade } from "../../lib/firebase/client/db/agreesToTrade"
import MMLButton from "./MML/Button"
import {
  // useChannelStateContext,
  useChatContext,
  useMessageContext,
} from "stream-chat-expo"
import toast from "react-hot-toast"
import tw from "../../lib/tailwind"
import { useStream } from "../../hooks/useStream"
import { View } from "react-native"
import AttachmentCardWithLogo from "./AttachmentCardWithLogo"

const InvestmentConfirmationAttachment = ({ attachment }) => {
  const { user } = useAuth()
  const { channel } = useStream()
  const { client } = useChatContext()
  const { message } = useMessageContext()

  // const groupName = channel.cid.split(":").pop()
  // const alpacaAccountId = user.alpacaAccountId

  const [action, shares] = message.text.split("to ").pop().split("shares")[0].split(" ")
  const cost = message.text.split("for ").pop().split(". Do")[0]

  const onSubmit = async (agrees: boolean) => {}
  //   // ! Trade is based on the groups selection process.
  //   // ! Defaults to uanimous decision.
  //   await toast.promise(
  //     agreesToTrade(groupName, message.id, user.uid, alpacaAccountId),
  //     {
  //       loading: agrees ? "agreeing..." : "disagreeing...",
  //       success: agrees ? "Agreed to trade" : "Disagreed to trade",
  //       error: agrees ? "Error agreeing to trade" : "Error disagreeing to trade",
  //     }
  //   )
  //   // await client.partialUpdateMessage(message.id, {
  //   //   set: { status: "cancelled" },
  //   // })
  // }

  // TODO: Add different views of the buy card for users who did not submit it

  return (
    <AttachmentCardWithLogo assetSymbol={attachment?.tickerSymbol} isin={""}>
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
