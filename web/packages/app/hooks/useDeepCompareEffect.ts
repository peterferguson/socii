import { DependencyList, EffectCallback } from "react"
import { useCustomCompareEffect } from "./useCustomCompareEffect"

export const useDeepCompareEffect = (callback: EffectCallback, deps: DependencyList) =>
  useCustomCompareEffect(
    callback,
    deps,
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  )
