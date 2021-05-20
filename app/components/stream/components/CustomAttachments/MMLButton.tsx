import React, { FC, SyntheticEvent } from "react";

import { Icon } from "mml-react";

export type ButtonProps = {
  /** Additional button class name */
  className?: string;
  /** The text to display in the button */
  text: string;
  /** The name of the button */
  name?: string;
  /** The value of the button */
  value?: string;
  /** Button style variant */
  variant?: "floating";
  /** Optional button icon name to display besides the text (from [material icons](https://material.io/resources/icons/)) */
  icon?: string;
};

/**
 * Button can be used to open a URL, submit the form or trigger a select when clicked
 */
const Button: FC<ButtonProps> = ({
  className = "",
  text,
  name,
  value,
  variant,
  icon,
}) => {
  if (icon) {
    className += text ? " mml-btn--with-icon" : " mml-btn--icon";
  } else {
    className += " mml-btn--text";
  }
  className +=
    variant === "floating" ? " mml-btn--floating" : " mml-btn--grounded";

  return (
    <button
      className={`${className}`}
      type="submit"
      name={name}
      value={value}
      onClick={(event: SyntheticEvent) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name || "";
        input.value = value || "";
        event.currentTarget?.closest("form")?.appendChild(input);
      }}
    >
      {icon && <Icon name={icon} />}
      {text}
    </button>
  );
};

export default Button;
