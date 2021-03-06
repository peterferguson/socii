import { Dialog } from "@headlessui/react"
import { useStream } from "@hooks/useStream"
import { StreamClientContext } from "@hooks/useStreamClient"
import { alphaVantageQueryOptions } from "@lib/constants"
import { alphaVantageQuery } from "@lib/firebase/client/functions/index"
import { redirectWithToast } from "@utils/redirectWithToast"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import React, { useState } from "react"
import toast from "react-hot-toast"
import MultiSelect from "../MultiSelect"
import PriceInput from "../PriceInput"

const StockSharingModal = ({ ticker, state, send, pricePlaceholder = "0.00" }) => {
  const router = useRouter()
  const { client } = useStream() as StreamClientContext
  const [message, setMessage] = useState("")
  const [targetPrice, setTargetPrice] = useState(parseFloat(pricePlaceholder))
  const [selectedItems, setSelectedItems] = useState([])
  const [sendClicked, setSendClicked] = useState(false)
  const { group: selectedGroup } = state.context
  const { logoUrl: tickerLogoUrl, tickerSymbol } = ticker

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
        tickerSymbol,
        queryFields: [...new Set([...requiredQueryFields, ...selectedItems])],
      })

      const attachments = [
        {
          image: tickerLogoUrl,
          name: tickerSymbol,
          type: "stock",
          url: `/stocks/${tickerSymbol}`,
          targetPrice,
          asset: asset.data,
        },
      ]

      send("CLOSE")

      const mainMessage = await channel.sendMessage({
        text: message || `Hey I think we should check out ${tickerSymbol}!`,
        // attachments,
        skip_push: true,
      })
      const _threadMessage = await channel.sendMessage({
        text: "",
        attachments,
        parent_id: mainMessage.message.id,
        show_in_channel: false,
        skip_push: true,
      })
    }
  }

  const sendMessageClickHandler = (_) => {
    toast.promise(sendStockInfo(), {
      loading: "sending...",
      success: () => {
        // redirectWithToast(router, `/chat?cid=${selectedGroup}`)
        router.push(`/chat?cid=${selectedGroup}`)
        return <b>Stock Info Sent!</b>
      },
      error: <b>Could not send info.</b>,
    })
  }

  return (
    <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
      <Dialog.Title className="text-lg font-medium text-gray-900 font-primary leading-6">
        Tell <span className="font-semibold text-brand">{selectedGroup}</span> about
        <span className="font-semibold text-teal-300">{tickerSymbol}</span>!
      </Dialog.Title>
      <div className="mt-2">
        <div className="text-sm text-gray-500 font-primary">
          Select some data to tell your friends about!
        </div>
        <MultiSelect // TODO: Replace multiselect with https://codesandbox.io/s/react-hook-form-v7-customise-controller-return-value-wuhrd
          items={alphaVantageQueryOptions}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <div className="text-sm text-gray-500 font-primary">Got a price in mind?</div>
        <div className="pt-1 pb-2">
          <PriceInput
            setPrice={setTargetPrice}
            showPrice={false}
            pricePlaceholder={pricePlaceholder}
          />
        </div>
        <div className="text-sm text-gray-500 font-primary">
          Tell them your thoughts!
        </div>
        <div className="pt-2 mb-3">
          <textarea
            className={tw(
              "relative w-full px-3 py-4 text-sm text-gray-600 placeholder-gray-300",
              "bg-white border-gray-300 form-textarea rounded-md shadow-sm",
              "focus:outline-none focus:ring-teal-500 focus:border-teal-500",
              "umami--click--invest-button-share-modal-text-input"
            )}
            rows={4}
            placeholder="Bruh the wallstreetbets bros love it!"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex-grow" />
        <button
          type="button"
          className={tw(
            "justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900",
            "bg-teal-100 border border-transparent rounded-md hover:bg-teal-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "focus-visible:ring-teal-500",
            "umami--click--invest-button-share-modal-send-button",
            sendClicked && "animate-pulse"
          )}
          onClick={sendMessageClickHandler}
        >
          To the moon ????
        </button>
      </div>
    </div>
  )
}

export default React.memo(StockSharingModal)
