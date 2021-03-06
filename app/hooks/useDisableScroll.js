import { isBrowser } from "@utils/isBrowser"
import { useEffect } from "react"
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
const preventDefault = (e) => e.preventDefault()
const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false
try {
  if (window)
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: () => (supportsPassive = true),
      })
    )
} catch (e) {
  console.log(e)
}

let wheelOpt = supportsPassive ? { passive: false } : false
let wheelEvent =
  isBrowser && "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"

// call this to Disable
const disableScroll = () => {
  window.addEventListener("DOMMouseScroll", preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt) // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false)
}

// call this to Enable
const enableScroll = () => {
  window.removeEventListener("DOMMouseScroll", preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  window.removeEventListener("touchmove", preventDefault, wheelOpt)
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false)
}

export const useDisableScroll = (enable = false) => {
  useEffect(() => {
    if (isBrowser) {
      if (enable) disableScroll()
      else enableScroll()
      return () => enableScroll()
    }
  }, [enable])
}
