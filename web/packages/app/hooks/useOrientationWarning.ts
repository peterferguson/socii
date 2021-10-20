import { useState, useEffect } from "react"
import { isBrowser } from "../utils/isBrowser"
import raiseNotOptimisedForLandscapeToast from "../utils/raiseNotOptimisedForLandscapeToast"

const useOrientationWarning = () => {
  const [screenAspectRatio, setScreenAspectRatio] = useState(
    isBrowser ? window.innerHeight / window.innerWidth : 1
  )

  const updateAspectRatio = () =>
    setScreenAspectRatio(window.innerHeight / window.innerWidth)

  // - listen for orientation changes & warn mobile users about landscape orientation
  useEffect(() => {
    if (isBrowser) {
      // * Attach event on window which will track window size changes
      // * and store the aspect ratio in state
      window.addEventListener("resize", updateAspectRatio)
      raiseNotOptimisedForLandscapeToast()
      // * remove event listener on unmount
      return () => window.removeEventListener("resize", updateAspectRatio)
    }
  }, [screenAspectRatio])
}

export default useOrientationWarning
