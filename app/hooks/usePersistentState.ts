import { isEmpty } from "@utils/isEmpty"
import { isPromise } from "@utils/isPromise"
import { useEffect, useState } from "react"
import { storageGetter } from "@utils/storageGetter"
import { storageSetter } from "@utils/storageSetter"

interface PersistenceDefaultValueFunction {
  func: () => any
  args: any[]
}

export const usePersistentState = (
  defaultValue: any | PersistenceDefaultValueFunction | Promise<any>,
  key: string,
  asCookie: boolean = false
) => {
  const [value, setValue] = useState(() => {
    const persistentValue = storageGetter(key, asCookie) || null
    if (persistentValue !== null && !isEmpty(persistentValue)) return persistentValue
    // - Allows us to send an object with the keys func & args as defaultValue
    // TODO: This works in node but is not setting correct value in localStorage
    if (typeof defaultValue === "object" && "func" in defaultValue)
      return defaultValue.func(...defaultValue.args)
    return typeof defaultValue === "function" ? defaultValue() : defaultValue
  })
  useEffect(() => {
    isPromise(value)
      ? // - if the value is a promise resolve it before storing in cache
        value.then((r: string | object) => storageSetter(key, r, asCookie))
      : storageSetter(key, value, asCookie)
  }, [key, value, asCookie])
  return [value, setValue]
}
