import { getLocal, saveLocal } from "./common"
import { DeviceEventEmitter } from "react-native"

const onboardingVersion = "0.1.0"

const ONBOARDING_COMPLETED = "onboardingCompleted"

export const getOnboardingComplete = () =>
  getLocal(ONBOARDING_COMPLETED, onboardingVersion)

export const saveOnboardingComplete = (onboardingCompleted: boolean) =>
  saveLocal(ONBOARDING_COMPLETED, onboardingCompleted, onboardingVersion)

export const clearOnboardingComplete = () =>
  saveLocal(ONBOARDING_COMPLETED, false, onboardingVersion)

export const onboardingCompletedListener = (callback: (data: any) => void) =>
  DeviceEventEmitter.addListener(`localstorage.${ONBOARDING_COMPLETED}`, callback)
