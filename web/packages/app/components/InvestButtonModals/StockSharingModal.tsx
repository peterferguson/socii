import MultiSelect from "app/components/MultiSelect"
import type { StreamClientContext } from "app/hooks/useCreateStreamClient"
import { useStream } from "app/hooks/useStream"
import { alphaVantageQueryOptions } from "app/lib/constants"
import { alphaVantageQuery } from "app/lib/firebase/function"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React, { useState } from "react"
import { Dimensions, Text, TextInput, View } from "react-native"
import { CenteredColumn, CenteredRow } from "../Centered"
import PriceInput from "../PriceInput"
import { RoundButton } from "../RoundButton"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const BUTTON_WIDTH = SCREEN_WIDTH - 32
const DROPDOWN_ITEMS_CONTAINER_HEIGHT = SCREEN_HEIGHT

const REQUIRED_QUERY_FIELDS = ["name", "industry", "exchange"]

const StockSharingModal = ({
  symbol,
  state,
  send,
  handleClose,
  pricePlaceholder = "0.00",
}) => {
  const router = useRouter()
  const { client } = useStream() as StreamClientContext
  const [message, setMessage] = useState("")
  const [targetPrice, setTargetPrice] = useState(parseFloat(pricePlaceholder))
  const [selectedItems, setSelectedItems] = useState(null)
  const [sendClicked, setSendClicked] = useState(false)
  // const { group: selectedGroup } = state.context
  const selectedGroup = "Founders"

  // const { logoUrl: tickerLogoUrl, tickerSymbol } = ticker

  const sendStockInfo = async () => {
    setSendClicked(true)

    if (client && client.user) {
      const channel = client?.getChannelById(
        "group",
        selectedGroup?.replace(/\s/g, "-"),
        {}
      )

      // - This being a client-side function call is slowing the UX down
      // TODO: Query Firebase here & if not found then run this function!
      const asset = await alphaVantageQuery({
        symbol,
        queryFields: [...new Set([...REQUIRED_QUERY_FIELDS, ...selectedItems])],
      })

      const attachments = [
        {
          // image: tickerLogoUrl,
          name: symbol,
          type: "stock",
          url: `/stocks/${symbol}`,
          targetPrice,
          asset: asset.data,
        },
      ]

      send("CLOSE")

      const mainMessage = await channel.sendMessage({
        text: message || `Hey I think we should check out ${symbol}!`,
        attachments,
        skip_push: true,
      })
      // const _threadMessage = await channel.sendMessage({
      //   text: "",
      //   attachments,
      //   parent_id: mainMessage.message.id,
      //   show_in_channel: false,
      //   skip_push: true,
      // })
    }
  }

  const sendMessageClickHandler = () => {
    // toast.promise(sendStockInfo(), {
    //   loading: "sending...",
    //   success: () => {
    //     // redirectWithToast(router, `/chat?cid=${selectedGroup}`)
    //     router.push(`/chat?cid=${selectedGroup}`)
    //     return <b>Stock Info Sent!</b>
    //   },
    //   error: <b>Could not send info.</b>,
    // })

    sendStockInfo()
    handleClose()
    router.push(`/channel/${selectedGroup}`)
  }

  return (
    <CenteredColumn style={tw`justify-evenly w-full p-4 absolute top-0`}>
      <View style={tw`mt-2 flex-1 z-1000`}>
        <Text style={tw`text-sm text-gray-500 font-poppins-400`}>
          Select some data to tell your friends about!
        </Text>
        <MultiSelect
          items={alphaVantageQueryOptions}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          style={tw`border-brand-black/30`}
          containerStyle={tw`my-2`}
          dropDownContainerStyle={tw.style(`border-brand-black/30`, {
            height: DROPDOWN_ITEMS_CONTAINER_HEIGHT,
          })}
          searchContainerStyle={tw`border-brand-black/30`}
          max={7} // - 10 with 3 required fields (TODO add these as initial values)
        />
      </View>

      <View style={tw`py-2 flex-1`}>
        <Text style={tw`text-sm text-gray-500 font-poppins-400`}>
          Got a price in mind?
        </Text>
        <PriceInput setPrice={setTargetPrice} pricePlaceholder={pricePlaceholder} />
      </View>

      <View style={tw`py-2 flex-4 w-full`}>
        <Text style={tw`text-sm py-1 text-gray-500 font-poppins-400`}>
          Tell them your thoughts!
        </Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline={true}
          placeholder="I like the look of..."
          style={tw`rounded-md border border-brand-black/30 p-4 w-full h-30`}
          textAlignVertical={"top"}
        />
      </View>

      <CenteredRow style={tw.style(`mt-4 flex-1`, { width: BUTTON_WIDTH })}>
        <RoundButton onPress={sendMessageClickHandler} label={"To the moon 🌕"} />
      </CenteredRow>
    </CenteredColumn>
  )
}

export default React.memo(StockSharingModal)
