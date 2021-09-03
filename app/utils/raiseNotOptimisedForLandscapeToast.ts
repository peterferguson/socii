import { NotOptimisedForLandscape } from "@components/NotOptimisedForLandscape"
import { deviceType } from "detect-it"
import toast from "react-hot-toast"

const raiseNotOptimisedForLandscapeToast = () =>
  window.innerHeight < window.innerWidth &&
  deviceType === "touchOnly" &&
  toast.custom((t) => NotOptimisedForLandscape(t))

export default raiseNotOptimisedForLandscapeToast
