import React from "react"
import Feather from "@expo/vector-icons/build/Feather"
import { pnlTextColor } from "../utils"
import tw from "../lib/tailwind"

const PnlArrow = ({ change, size }: { change: number; size?: number }) => {
  return (
    <>
      {change === 0 ? null : (
        <Feather
          size={size || 16}
          name={change > 0 ? "arrow-up" : "arrow-down"}
          color={tw.color(pnlTextColor(change).replace("text-", ""))}
        />
      )}
    </>
  )
}

export default React.memo(PnlArrow)
