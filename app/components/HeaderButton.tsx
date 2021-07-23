import React from "react"

export interface ButtonProps {
  name: string
  icon: () => JSX.Element
  onClick?: () => void
  className?: string
}

interface IHeaderButton extends ButtonProps {
  hasNotifications: boolean
}

// - This allows us to choose the continer of the button
export const HeaderButtonChildren = (props: IHeaderButton) => (
  <>
    {!!props.icon && (
      <>
        <props.icon />
        {props.hasNotifications && (
          <span
            aria-hidden="true"
            className={`
            absolute w-3 h-3 animate-pulse bg-red-600 border-2 border-white 
            rounded-full -top-0.5 -right-0.5 dark:border-gray-800
            `}
          />
        )}
      </>
    )}
  </>
)

export default function HeaderButton(props: IHeaderButton) {
  return (
    <div onClick={props.onClick}>
      <button
        className={`header-btn relative ${props.className || ""}`}
        aria-label={props.name}
        aria-haspopup="true"
      >
        <HeaderButtonChildren {...props} />
      </button>
    </div>
  )
}
