import { isBrowser } from "../utils/isBrowser"
import { useEffect } from "react"
import { deviceType } from "detect-it"
import { innerVh } from "inner-vh"

const useInnerViewport = () => {
  // - adjust viewport units for mobiles with notches & mobile browsers
  useEffect(() => {
    if (isBrowser) {
      innerVh({
        customPropertyName: "inner-vh",
        // Update --inner-vh on desktop alike always.
        ignoreCollapsibleUi: deviceType === "touchOnly",
        // Seems to be 114px on iOS safari.
        maximumCollapsibleUiHeight: 120,
      })
    }
  }, [])
}

export default useInnerViewport
