import { round } from "../utils/round"
import { useState } from "react"

export const useShareCost = (costPerShare: number) => {
  const [shares, setShares] = useState(1)

  const toShares = (cost: number) => cost / costPerShare
  const toCost = (shares: number) => costPerShare * shares

  const handleChange = e => {
    const { name, value } = e.target

    const input = parseFloat(value)
    if (isNaN(input)) {
      setShares(1)
      return
    }

    if (name.toLowerCase() === "shares") {
      setShares(input)
      return
    } else {
      setShares(toShares(round(input, 2)))
    }
  }
  return [shares, handleChange, toCost]
}
