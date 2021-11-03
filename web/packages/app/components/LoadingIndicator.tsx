import React from "react"
import { WaveIndicator } from "react-native-indicators"
import tw from "../lib/tailwind"
import { CenteredRow } from "./Centered"

export default ({ color = "", isInteraction = false, size = 25, ...props }) => {
  return (
    <CenteredRow style={{ width: size, height: size }} {...props}>
      <WaveIndicator
        color={color || tw.color("brand")}
        interaction={isInteraction}
        size={size}
      />
    </CenteredRow>
  )
}
