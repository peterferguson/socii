import React from "react"
import { View, TextInput, Text } from "react-native"
import tw from "../lib/tailwind"

export const LargeNumberInput = ({ amount, orderType, setAmount, side, symbol }) => {
  const inputTextSize =
    String(amount).length < 4
      ? "text-8xl"
      : String(amount).length < 5
      ? "text-7xl"
      : String(amount).length < 6
      ? "text-6xl"
      : "text-4xl"

  const stockLabelSize =
    String(amount).length < 3
      ? "text-5xl"
      : String(amount).length < 5
      ? "text-4xl"
      : String(amount).length < 6
      ? "text-3xl"
      : "text-2xl"

  return (
    <View style={tw`umami--click--invest-button-order-modal-large-number-input`}>
      <View style={tw`relative flex items-center justify-center mt-1 rounded-md`}>
        {orderType !== "shares" && (
          <View style={tw`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}>
            <Text style={tw`text-3xl text-brand animate-none`}>$</Text>
          </View>
        )}
        <TextInput
          style={tw`w-full pointer-cursor text-center border-none focus:h-auto sm:focus:h-72 h-72  ${inputTextSize} placeholder-brand text-brand font-primary leading-6 ${
            !amount ? "focus:animate-pulse" : ""
          } focus:appearance-none focus:border-none focus:ring-0`}
          placeholder="0"
          // onChange={(e) => setAmount(parseFloat(e.target.value))}        
          
        />
        {orderType === "limit" && (
          <View style={tw`absolute text-sm text-gray-400 bottom-1 front-primary`}>
            <Text>{side} as little as $1</Text>
          </View>
        )}
        {orderType === "shares" && (
          <View style={tw`absolute flex items-center pointer-events-none bottom-12 thin:inset-y-0 thin:-right-4`}>
            {/* <Text style={tw`text-4xl text-brand`}>{symbol}</Text> */}
            <Text style={tw`${stockLabelSize} text-brand`}>{symbol}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
