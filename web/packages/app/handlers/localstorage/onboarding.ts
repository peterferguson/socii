import { getLocal, saveLocal, LocalStorageData } from "./common"
import { DeviceEventEmitter } from "react-native"

const onboardingVersion = "0.1.0"

const ONBOARDING_COMPLETED = "onboardingCompleted"

export const getOnboardingCompleted = (): Promise<LocalStorageData> =>
  getLocal(ONBOARDING_COMPLETED, onboardingVersion)

export const saveOnboardingCompleted = (onboardingCompleted: boolean) =>
  saveLocal(ONBOARDING_COMPLETED, onboardingCompleted ?? false, onboardingVersion)

export const clearOnboardingCompleted = () =>
  saveLocal(ONBOARDING_COMPLETED, false, onboardingVersion)

export const onboardingCompletedListener = (callback: (isCompleted: boolean) => void) =>
  DeviceEventEmitter.addListener(
    `localstorage.${ONBOARDING_COMPLETED}`,
    ([isCompleted]) => callback(isCompleted)
  )
