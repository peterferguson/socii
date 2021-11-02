import tw from "@lib/tailwind"
import React from "react"
import { UIActivityIndicator } from "react-native-indicators"
import Centered from "./Centered"

export default ({ color, isInteraction = false, size = 25, ...props }) => {
  return (
    <Centered style={{ width: size, height: size }} {...props}>
      <UIActivityIndicator
        color={color || tw.color("brand")}
        interaction={isInteraction}
        size={size}
      />
    </Centered>
  )
}
