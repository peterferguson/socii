import tw from "../../../lib/tailwind"
import { Text, View, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import Feather from "@expo/vector-icons/build/Feather"
import { shadowStyle } from "../../../utils/shadowStyle"

interface INumberInputProps {
  value: number
  onChange: (value: number) => void
  name: string
  decimals?: number
}

const NumberInput = ({ value, onChange, name, decimals = 2 }: INumberInputProps) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => onChange(inputValue), [inputValue, onChange])

  return (
    <View
      style={{
        ...tw`flex-row m-2 border rounded`,
        ...shadowStyle(""),
      }}
    >
      <View style={tw`flex-row items-center px-3 rounded rounded-r-none`}>
        <Text style={tw`text-sm font-poppins-500 sm:text-base`}>{name}</Text>
        <Feather name="dollar-sign" style={tw`ml-2`} />
      </View>
      <View style={tw`py-2 w-24 mr-2`}>
        <TextInput
          style={tw`text-sm text-right rounded sm:text-base font-poppins-500`}
          keyboardType="numeric"
          defaultValue={value?.toFixed(decimals) || "0.00"}
          onChangeText={(text) =>
            setInputValue(
              parseFloat(
                text.replace(RegExp(`[0-9]+([.,][0-9]+)?{,${decimals}}`, "g"), "")
              )
            )
          }
          value={String(inputValue)}
          maxLength={10}
        />
      </View>
    </View>
  )
}

export default React.memo(NumberInput)
