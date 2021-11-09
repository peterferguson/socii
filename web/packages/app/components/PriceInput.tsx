import tw from "app/lib/tailwind"
import React from "react"
import { View, TextInput, Text } from "react-native"

const PriceInput = ({ setPrice, pricePlaceholder = "0.00", showPrice = true }) => (
  <View style={tw`text-gray-500`}>
    {showPrice && (
      // <label htmlFor="price" className={`block ${textStyling}`}>
      <Text>Price</Text>
      // </label>
    )}
    <View style={tw`flex flex-row mt-1 rounded-md shadow-sm`}>
      <View style={tw`flex pl-3 h-10`}>
        <Text style={tw`pt-2 text-gray-500 sm:text-sm`}>$</Text>
      </View>
      <TextInput
        style={tw`flex items-center pl-1  pointer-events-none`}
        placeholder={pricePlaceholder}
        keyboardType={"decimal-pad"}
        onChange={e => setPrice(e.target)}
      />
    </View>
  </View>
)

export default PriceInput
