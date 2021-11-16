import { useStream } from "app/hooks/useStream"
import { StreamClientContext } from "app/hooks/useStreamClient"
import { alphaVantageQuery } from "app/lib/firebase/function"
import { alphaVantageQueryOptions } from "../../lib/constants"
import tw from "app/lib/tailwind"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import MultiSelect from "../MultiSelect"
import PriceInput from "../PriceInput"

const StockSharingModal = ({ symbol, state, send, pricePlaceholder = "0.00" }) => {
  const router = useRouter()
  const { client } = useStream() as StreamClientContext
  const [message, setMessage] = useState("")
  const [targetPrice, setTargetPrice] = useState(parseFloat(pricePlaceholder))
  const [selectedItems, setSelectedItems] = useState([])
  const [sendClicked, setSendClicked] = useState(false)
  const { group: selectedGroup } = state.context
  // const { logoUrl: tickerLogoUrl, tickerSymbol } = ticker

  const requiredQueryFields = ["name", "industry", "exchange"]

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
        queryFields: [...new Set([...requiredQueryFields, ...selectedItems])],
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
        // attachments,
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

  const sendMessageClickHandler = _ => {
    // toast.promise(sendStockInfo(), {
    //   loading: "sending...",
    //   success: () => {
    //     // redirectWithToast(router, `/chat?cid=${selectedGroup}`)
    //     router.push(`/chat?cid=${selectedGroup}`)
    //     return <b>Stock Info Sent!</b>
    //   },
    //   error: <b>Could not send info.</b>,
    // })
    console.log("message click handler")
  }
  console.log("tpppppp", targetPrice)

  return (
    // TODO create style sheet for nicer code
    <View
      style={tw`w-full p-4 overflow-scroll bg-white transition-all transform rounded-2xl`}
    >
      <View style={tw`text-lg py-1 font-medium text-gray-900 font-primary leading-6`}>
        {/* TODO fix this.. surely better way to style text */}
        <Text style={tw`text-lg font-medium text-gray-900 font-primary leading-6`}>
          Tell
          <Text style={tw`font-bold text-brand`}> {selectedGroup || "Test"} </Text>
          <Text> about </Text>
          <Text style={tw`font-bold text-teal-300`}> {symbol}</Text>
        </Text>
      </View>

      <View style={tw`mt-2`}>
        <View style={tw`text-sm text-gray-500 font-primary`}>
          <Text style={tw`text-sm text-gray-500 font-primary`}>
            Select some data to tell your friends about!
          </Text>
        </View>
        {/* // TODO: Replace multiselect with https://codesandbox.io/s/react-hook-form-v7-customise-controller-return-value-wuhrd */}
        <MultiSelect 
          items={alphaVantageQueryOptions}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />


        <View>
          <Text style={tw`text-sm text-gray-500 font-primary`}>
            Got a price in mind?
          </Text>
        </View>
        <View style={tw`pb-2`}>
          <PriceInput
            setPrice={setTargetPrice}
            showPrice={false}
            pricePlaceholder={pricePlaceholder}
          />
        </View>

        <View>
          <Text style={tw`text-sm py-1 text-gray-500 font-primary`}>
            Tell them your thoughts!
          </Text>
        </View>
        <View style={tw`pt-2 mb-3`}>
          <TextInput
            multiline={true}
            placeholder="I'm liking the look of..."
            style={tw`rounded-md border border-brand-black/30 p-4 w-full h-30`}
            textAlignVertical={"top"}
          ></TextInput>
          {/* <textarea
            style={tw(
              "relative w-full px-3 py-4 text-sm text-gray-600 placeholder-gray-300",
              "bg-white border-gray-300 form-textarea rounded-md shadow-sm",
              "focus:outline-none focus:ring-teal-500 focus:border-teal-500",
              "umami--click--invest-button-share-modal-text-input"
            )}
            rows={4}
            placeholder="Bruh the wallstreetbets bros love it!"
            onChange={(e) => setMessage(e.target.value)}
          /> */}
        </View>
      </View>
      <View style={tw`flex mt-4`}>
        <View style={tw`flex-grow`} />
        {/* <button
          type="button"
          style={tw(
            "justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900",
            "bg-teal-100 border border-transparent rounded-md hover:bg-teal-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "focus-visible:ring-teal-500",
            "umami--click--invest-button-share-modal-send-button",
            sendClicked && "animate-pulse"
          )}
          onClick={sendMessageClickHandler}
        >
          To the moon 🌕
        </button> */}
      </View>
    </View>
  )
}

export default React.memo(StockSharingModal)
