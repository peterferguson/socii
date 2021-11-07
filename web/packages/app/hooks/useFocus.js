import { useRef } from "react"

export const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus() && htmlElRef.current.scrollIntoView()
  }

  return [htmlElRef, setFocus]
}
