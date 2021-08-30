import { RefObject } from "react"

export const scrollToRef = (ref: RefObject<HTMLInputElement>) =>
  window.scrollTo(0, ref.current.offsetTop)
