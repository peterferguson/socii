import React, { FC, SyntheticEvent } from "react"

export type ButtonProps = {
  /** Additional button class name */
  className?: string
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
const MMLButton: FC<ButtonProps> = ({
  className,
  text,
  name,
  value,
  icon,
  onSubmit,
}) => (
  <button
    className={className || ""}
    type="submit"
    name={name}
    value={value}
    onClick={onSubmit}
  >
    {text ? text : null}
    {icon ? icon : null}
  </button>
)

export default React.memo(MMLButton)
