import React from "react"

interface Position {
  top?: boolean
  left?: boolean
  bottom?: boolean
  right?: boolean
}

const Tooltip = ({
  children,
  text,
  position,
  className = "",
}: {
  children: React.ReactNode
  text: string
  position?: Position
  className?: string
}) => (
  <div className={`has-toolip ${className}`}>
    <div className="relative">
      <div
        className={`
          ${!position && "left-1/2 transform -translate-x-1/2"}
          w-full px-4 py-1 text-xs text-white bg-logo-darkBg rounded bottom-full tooltip
      `}
      >
        {text}
        <svg
          className={`absolute text-logo-darkBg h-2
            ${!position && "left-1/2 transform -translate-x-1/2 top-full"}
            ${position?.left ? "top-full left-0 ml-3" : ""}
            ${position?.top ? "w-full left-0" : ""}
            ${position?.right ? "right-0 mr-3" : ""}
        }`}
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
    {children}
  </div>
)

export default Tooltip
