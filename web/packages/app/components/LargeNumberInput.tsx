import React from "react"
import { Dimensions, View, TextInput, Text } from "react-native"
import tw from "app/lib/tailwind"
import { CenteredRow } from "."

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const INPUT_HEIGHT = SCREEN_HEIGHT * 0.27

const inputTextSize = (amount: string) =>
  String(amount).length < 4
    ? "text-8xl"
    : String(amount).length < 5
    ? "text-7xl"
    : String(amount).length < 6
    ? "text-6xl"
    : "text-4xl"

const stockLabelSize = (amount: string) =>
  String(amount).length < 3
    ? "text-5xl"
    : String(amount).length < 5
    ? "text-4xl"
    : String(amount).length < 6
    ? "text-3xl"
    : "text-2xl"

export const LargeNumberInput = ({
  amount,
  orderType,
  setAmount,
  side,
  symbol,
  onFocus,
}) => {
  return (
    <CenteredRow style={{ height: INPUT_HEIGHT }}>
      {orderType !== "shares" && (
        <View style={tw`items-center pl-3`}>
          <Text style={tw`text-3xl text-brand`}>$</Text>
        </View>
      )}
      <TextInput
        //textAlignVertical: "center" attempted to add to below, but android text cut off
        // working soln to just increase width of box - check in ios
        style={tw`h-40
          w-full text-center text-brand font-poppins-400 ${inputTextSize(amount)}`}
        placeholder="0.00"
        placeholderTextColor={tw.color("brand")}
        value={amount}
        keyboardType={"decimal-pad"}
        // TODO: Animate text opacity to pulse when editing and remove cursor
        // caretHidden={true}
        onChangeText={setAmount}
        onFocus={onFocus}
        onSubmitEditing={() => {}}
        onEndEditing={() => {}}
        multiline={false}
        returnKeyType="done"
      />
      {orderType === "limit" && (
        <View style={tw`absolute bottom-1`}>
          <Text style={tw`text-xs text-gray-400 font-poppins-400`}>
            {side} as little as $1
          </Text>
        </View>
      )}
      {orderType === "shares" && (
        <View style={tw`absolute items-center bottom-12 thin:inset-y-0 thin:-right-4`}>
          <Text style={tw`${stockLabelSize(amount)} font-poppins-200 text-brand`}>
            {symbol}
          </Text>
        </View>
      )}
    </CenteredRow>
  )
}
