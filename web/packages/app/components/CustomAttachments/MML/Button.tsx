import React from "react"
import { TouchableOpacity, Text } from "react-native"
import tw from "../../../lib/tailwind"

export type ButtonProps = {
  /** Additional button class name */
  style?: any
  /** The text to display in the button */
  text: string
  textStyle?: any
  /** The name of the button */
  name?: string
  /** The value of the button */
  value?: string
  /** Optional button icon name to display besides the text (from [material icons](https://material.io/resources/icons/)) */
  icon?: string
  /** onSubmit fn to execute on click */
  onSubmit?: () => Promise<void>
}

/**
 * Button can be used to open a URL, submit the form or trigger a select when clicked
 */
const Button: React.FC<ButtonProps> = ({ style, text, textStyle, icon, onSubmit }) => (
  <TouchableOpacity
    style={{
      ...tw`bg-transparent mr-auto rounded p-2 mx-2 w-16 flex-row items-center justify-center`,
      ...style,
    }}
    onPress={onSubmit}
  >
    <Text style={{ ...tw`font-open-sans-600`, ...textStyle }}>
      {text ? text : null}
    </Text>
    {icon ? icon : null}
  </TouchableOpacity>
)

export default React.memo(Button)
