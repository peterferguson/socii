import { DependencyList, EffectCallback, useRef, useEffect } from "react"

const useCustomCompareMemo = <T>(
  deps: DependencyList,
  comparison: (arg0: any, arg1: any) => boolean
): DependencyList => {
  const ref = useRef<DependencyList>(deps)

  if (!comparison(deps, ref.current)) {
    ref.current = deps
  }

  return ref.current
}

export const useCustomCompareEffect = <T>(
  callback: EffectCallback,
  deps: DependencyList,
  comparision: (arg0: T, arg1: T) => boolean
) => useEffect(callback, [useCustomCompareMemo(deps, comparision)])
