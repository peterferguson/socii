import LogoPriceCardHeader from "../LogoPriceCardHeader"
import { usePositions } from "../../hooks/usePositions"
import { Position } from "../../models/alpaca/Position"
import React, { useEffect, useRef, useState } from "react"
import MMLButton from "./MML/Button"
import { View } from "react-native"
import tw from "../../lib/tailwind"

const InvestCommandAttachment = ({ attachment }) => {
  const symbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [holding, setHolding] = useState<Position>(null)
  const [isin, setISIN] = useState<string>("")

  const { positions, error } = usePositions()

  // useEffect(() => {
  //   const position = positions
  //     ?.filter((position) => position.symbol === tickerSymbol.current)
  //     .pop()
  //   if (position) setHolding(position)
  // }, [positions])

  return (
    <View style={tw`py-4 pl-4 bg-white rounded-lg shadow-lg`}>
      <LogoPriceCardHeader asset={symbol.current} isin={""} />
      <View style={tw`flex flex-col space-y-4`}>
        <View style={tw`flex flex-row`}>
          {holding && (
            <MMLButton
              key={`sell-button`}
              style={tw`w-24 mx-2 outline-btn btn-transition`}
              text="Sell"
            />
          )}
          <MMLButton
            key={`buy-button`}
            style={tw`mx-2 outline-btn btn-transition ${holding ? "w-24" : "w-52"}`}
            text={"Buy"}
          />
        </View>
        <MMLButton
          key={`cancel-button`}
          style={tw`mx-2 w-52 outline-btn btn-transition hover:bg-red-400`}
          text="Cancel"
        />
      </View>
    </View>
  )
}

export default InvestCommandAttachment
