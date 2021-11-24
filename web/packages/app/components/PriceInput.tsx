import tw from "app/lib/tailwind"
import React from "react"
import { View, TextInput, Text } from "react-native"
import { CenteredRow } from "."

const PriceInput = ({ setPrice, pricePlaceholder = "0.00" }) => (
  <View style={tw`flex-row mt-1 border-brand-black/30 border rounded-md shadow-sm`}>
    <CenteredRow style={tw`pl-3 h-11`}>
      <Text style={tw`text-center text-gray-500`}>$</Text>
      <TextInput
        style={tw`w-full items-start pl-1`}
        placeholder={pricePlaceholder}
        keyboardType={"decimal-pad"}
        onChangeText={setPrice}
      />
    </CenteredRow>
  </View>
)

export default PriceInput
