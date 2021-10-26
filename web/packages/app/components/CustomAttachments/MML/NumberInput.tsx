import tw from "../../../lib/tailwind"
import { Text, View, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import Feather from "@expo/vector-icons/build/Feather"
import { shadowStyle } from "../../../utils/shadowStyle"

const NumberInput = ({ value, onChange, name, decimals = 2 }) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => onChange(inputValue), [inputValue, onChange])

  return (
    <View
      style={{
        ...tw`flex-row m-2 border rounded group group-focus:outline-none group-focus:border-none group-focus:ring-1`,
        ...shadowStyle(),
      }}
    >
      <View style={tw`flex-row items-center px-3 rounded rounded-r-none bg-grey-200`}>
        <Text style={tw`text-sm font-poppins-500 sm:text-base text-grey-400`}>
          {name}
        </Text>
        <Feather name="dollar-sign" style={tw`ml-2`} />
      </View>
      <View style={tw`py-2 w-24 mr-2`}>
        <TextInput
          style={tw`text-sm text-right border-none rounded sm:text-base font-poppins-500`}
          keyboardType="numeric"
          defaultValue={value?.toFixed(decimals) || "0.00"}
          onChangeText={(text) =>
            setInputValue(
              text.replace(RegExp(`[0-9]+([.,][0-9]+)?{,${decimals}}`, "g"), "")
            )
          }
          value={inputValue}
          maxLength={10}
        />
      </View>
    </View>
  )
}

export default React.memo(NumberInput)
