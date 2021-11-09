import { useEffect, useState } from "react"
import { AppContext } from "../contexts/AppContext"
import {
  getOnboardingCompleted,
  onboardingCompletedListener,
} from "../handlers/localstorage/onboarding"

export const useProvideAppContext = (): AppContext => {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(undefined)

  useEffect(() => {
    getOnboardingCompleted().then(result => setOnboardingCompleted(result.data))
  }, [])

  useEffect(() => {
    const onboardingListener = onboardingCompletedListener(setOnboardingCompleted)
    return () => onboardingListener.remove()
  }, [])

  return { onboardingCompleted }
}
