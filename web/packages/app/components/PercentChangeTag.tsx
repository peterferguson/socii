import { pnlBackgroundColor } from "../utils/pnlBackgroundColor"
import { pnlTextColor } from "../utils/pnlTextColor"
import PnlArrow from "./PnlArrow"
import React from "react"
import { View, Text } from "react-native"
import tw from "../lib/tailwind"

const PctChangeTag = ({
  pctChange,
  bgColorIntensity = "200",
  textColorIntensity = "500",
}) => {
  const pnlBgColor = pnlBackgroundColor(pctChange).replace("200", bgColorIntensity)
  const pnlTxtColor = pnlTextColor(pctChange).replace("200", textColorIntensity)

  return (
    <>
      {pctChange !== null && (
        <View
          style={tw`ml-1 ${pnlBgColor} text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase mt-1`}
        >
          <View style={tw`flex flex-row items-center justify-between`}>
            <PnlArrow change={pctChange} />
            <Text style={tw`ml-0.5 ${pnlTxtColor}`}>
              {(100 * pctChange).toFixed(2)}%
            </Text>
          </View>
        </View>
      )}
    </>
  )
}

export default React.memo(PctChangeTag)
