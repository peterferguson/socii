import { useEffect, useRef } from "react"

export const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    if (value !== undefined) ref.current = value
  }, [value])

  return ref.current
}
