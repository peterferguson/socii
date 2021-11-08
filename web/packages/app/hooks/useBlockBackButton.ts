import { useEffect } from "react"
import { BackHandler } from "react-native"

export function useBlockBackButton() {
  useEffect(() => {
    // Do nothing when back button is pressed
    const handleBackPress = () => true

    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
  }, [])
}
