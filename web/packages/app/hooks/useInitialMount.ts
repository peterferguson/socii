import { useRef } from "react"

const useInitialMount = () => {
  const isFirst = useRef(true)
  if (isFirst.current) {
    isFirst.current = false
    return true
  }
  return false
}

export default useInitialMount
