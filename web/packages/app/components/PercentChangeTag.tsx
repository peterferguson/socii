import { pnlBackgroundColor } from "../utils/pnlBackgroundColor"
import { pnlTextColor } from "../utils/pnlTextColor"
import PnlArrow from "./PnlArrow"
import React from "react"
import { View, Text } from "react-native"
import tw from "app/lib/tailwind"

const PctChangeTag = ({
  pctChange,
  bgColorIntensity = "200",
  textColorIntensity = "500",
}) => {
  const pnlBgColor = pnlBackgroundColor(pctChange).replace("200", bgColorIntensity)
  const pnlTxtColor = pnlTextColor(pctChange).replace("200", textColorIntensity)

  return (
    pctChange !== null && (
      <View
        style={tw`flex-row justify-center ml-1 max-w-24 items-center ${pnlBgColor} py-1 px-2 rounded-full mt-1`}
      >
        <PnlArrow change={pctChange} />
        <Text style={tw`ml-0.5 text-xs font-semibold ${pnlTxtColor}`}>
          {(100 * pctChange).toFixed(2)}%
        </Text>
      </View>
    )
  )
}

export default React.memo(PctChangeTag)
