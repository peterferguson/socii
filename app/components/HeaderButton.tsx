import React from "react"

export interface ButtonProps {
  name: string
  icon: () => JSX.Element
  onClick: () => void
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
            absolute inline-block w-3 h-3 bg-red-600 border-2 border-white 
            rounded-full top-0 right-0 dark:border-gray-800
            `}
          />
        )}
      </>
    )}
  </>
)

export default function HeaderButton(props: IHeaderButton) {
  return (
    <div className="relative" onClick={props.onClick}>
      <button
        className={`header-btn ${props.className || ""}`}
        aria-label={props.name}
        aria-haspopup="true"
      >
        <HeaderButtonChildren {...props} />
      </button>
    </div>
  )
}
