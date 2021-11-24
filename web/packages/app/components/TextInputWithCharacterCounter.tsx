import { CenteredRow } from "app/components/Centered"
import tw from "app/lib/tailwind"
import React from "react"
import { Text, TextInput, TextInputProps } from "react-native"

export const TextInputWithCharacterCounter: React.FC<TextInputProps> = ({
  ...props
}) => {
  return (
    <CenteredRow style={tw`w-full bg-gray-200 justify-between px-2 rounded-lg my-2`}>
      <TextInput {...props} />
      <Text style={tw`absolute right-4 text-xs text-gray-600 remove-font-padding`}>
        {props.maxLength - props.value.length}
      </Text>
    </CenteredRow>
  )
}
