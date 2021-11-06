import React, { useRef, useState, useEffect } from "react"
import { View } from "react-native"
import { usePositions } from "../../hooks/usePositions"
import { getTickerISIN } from "../../lib/firebase/client/db/getTickerISIN"
import tw from "../../lib/tailwind"
import { Position } from "../../models/alpaca/Position"
import AttachmentCardWithLogo from "./AttachmentCardWithLogo"
import MMLButton from "./MML/Button"

const InvestCommandAttachment = ({ attachment }) => {
  const symbol = attachment?.tickerSymbol?.toUpperCase()
  const [holding, setHolding] = useState<Position>(null)
  const [isin, setISIN] = useState<string>("")

  const { positions, error } = usePositions()

  useEffect(() => {
    if (symbol) getTickerISIN(symbol).then(setISIN).catch(console.error)
  }, [symbol])

  useEffect(() => {
    const position = positions?.filter(position => position.symbol === symbol).pop()
    if (position) setHolding(position)
  }, [positions])

  return (
    <AttachmentCardWithLogo assetSymbol={symbol} isin={isin}>
      <View style={tw`flex-col`}>
        <View style={tw`flex-row`}>
          {holding && (
            <MMLButton key={`sell-button`} style={tw`w-24 mx-2`} text="Sell" />
          )}
          <MMLButton
            key={`buy-button`}
            style={tw`mx-2 ${holding ? "w-24" : "w-52"}`}
            text={"Buy"}
          />
        </View>
        <MMLButton
          key={`cancel-button`}
          style={tw`mx-2 w-52 hover:bg-red-400`}
          text="Cancel"
        />
      </View>
    </AttachmentCardWithLogo>
  )
}

export default InvestCommandAttachment
