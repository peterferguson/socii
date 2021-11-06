import React from "react"
import { Text } from "react-native"
import tw from "../lib/tailwind"
import { CenteredRow } from "./Centered"

const NothingToShow: React.FC = () => (
  <CenteredRow style={tw`flex-1 p-3 rounded-xl`}>
    <Text style={tw`text-center `}>Nothing to show here yet</Text>
  </CenteredRow>
)

export default NothingToShow
