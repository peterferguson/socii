import tw from "../../../lib/tailwind"
import { Text, View, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import Feather from "@expo/vector-icons/build/Feather"

const NumberInput = ({ value, onChange, name, decimals = 2 }) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => onChange(inputValue), [inputValue, onChange])

  return (
    <View
      style={tw`flex flex-row m-2 border rounded shadow group group-focus:outline-none group-focus:border-none group-focus:ring-1`}
    >
      <View style={tw`flex items-center px-3 rounded rounded-r-none bg-grey-200`}>
        <Text style={tw`text-sm font-poppins-500 sm:text-base text-grey-400`}>
          {name}
        </Text>
        <Feather name="dollar-sign" style={tw`ml-2 mb-0.5`} />
      </View>
      <TextInput
        style={tw`w-full py-2 text-sm font-semibold text-right border-none rounded sm:text-base`}
        keyboardType="numeric"
        onChangeText={(text) =>
          setInputValue(
            text.replace(RegExp(`[0-9]+([.,][0-9]+)?{,${decimals}}`, "g"), "")
          )
        }
        value={inputValue}
        maxLength={10}
      />
    </View>
  )
}

export default React.memo(NumberInput)