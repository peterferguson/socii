import React from "react"
import { TouchableOpacity } from "react-native"

export type ButtonProps = {
  /** Additional button class name */
  style?: any
  /** The text to display in the button */
  text: string
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
const Button: React.FC<ButtonProps> = ({
  style,
  text,
  name,
  value,
  icon,
  onSubmit,
}) => (
  <TouchableOpacity style={style || {}} onPress={onSubmit}>
    {text ? text : null}
    {icon ? icon : null}
  </TouchableOpacity>
)

export default React.memo(Button)
