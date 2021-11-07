import { useState } from "react"

export const useForceUpdate = () => {
  const [, setState] = useState(0)
  return () => setState(state => state + 1)
}
