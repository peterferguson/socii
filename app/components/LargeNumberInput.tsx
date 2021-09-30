import React from "react"

export const LargeNumberInput = ({ amount, orderType, setAmount, side, symbol }) => {
  const inputTextSize =
    String(amount).length < 4
      ? "text-8xl"
      : String(amount).length < 5
      ? "text-7xl"
      : String(amount).length < 6
      ? "text-6xl"
      : "text-4xl"

  const stockLabelSize =
    String(amount).length < 3
      ? "text-5xl"
      : String(amount).length < 5
      ? "text-4xl"
      : String(amount).length < 6
      ? "text-3xl"
      : "text-2xl"

  return (
    <div className="umami--click--invest-button-order-modal-large-number-input">
      <div className="relative flex items-center justify-center mt-1 rounded-md">
        {orderType !== "shares" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-3xl text-brand animate-none">$</span>
          </div>
        )}
        <input
          type="number"
          id="price"
          name="price"
          className={`w-full pointer-cursor text-center border-none focus:h-auto sm:focus:h-72 h-72  ${inputTextSize} placeholder-brand text-brand font-primary leading-6 ${
            !amount ? "focus:animate-pulse" : ""
          } focus:appearance-none focus:border-none focus:ring-0`}
          placeholder="0"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          autoComplete="off"
          autoFocus
          required
          style={{ caretColor: "transparent" }}
        />
        {orderType === "limit" && (
          <div className="absolute text-sm text-gray-400 bottom-1 front-primary">
            {side} as little as $1
          </div>
        )}
        {orderType === "shares" && (
          <div className="absolute flex items-center pointer-events-none bottom-12 thin:inset-y-0 thin:-right-4">
            <span className={`${stockLabelSize} text-brand`}>{symbol}</span>
          </div>
        )}
      </div>
    </div>
  )
}
