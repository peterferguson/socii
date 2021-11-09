// ! Taken directly from https://github.com/rainbow-me/rainbow/blob/733373ff33975fc0d2e2ad00db6d3b868da4ff4b/src/handlers/localstorage/common.js
import AsyncStorage from "@react-native-async-storage/async-storage"
import Storage from "react-native-storage"
import logger from "../../utils/logger"
import { DeviceEventEmitter } from "react-native"

const storage = new Storage({
  defaultExpires: null,
  // enableCache: ReactNative.Platform.OS === "ios",
  size: 10000,
  storageBackend: AsyncStorage,
})

const defaultVersion = "0.1.0"

/**
 * @desc save to storage
 * @param  {String}  [key='']
 * @param  {Object}  [data={}]
 * @param  {String} [version=defaultVersion]
 */
export const saveLocal = async (key = "", data = {}, version = defaultVersion) => {
  try {
    data["storageVersion"] = version
    await storage.save({ data, expires: null, key })
    // - Emit event
    DeviceEventEmitter.emit(`localstorage.${key}`, [data])
  } catch (error) {
    logger.log("Storage: error saving", data, "to local for key", key)
  }
}

/**
 * @desc get from storage
 * @param  {String}  [key='']
 * @return {Object}
 */
export const getLocal = async (key = "", version = defaultVersion) => {
  try {
    const result = await storage.load({ autoSync: false, key, syncInBackground: false })
    if (result && result.storageVersion === version) return result

    if (result) {
      removeLocal(key)
      return null
    }
    return null
  } catch (error) {
    logger.log("Storage: error getting from local for key", key)
    return null
  }
}

/**
 * @desc get from storage
 * @param  {String}  [key='']
 * @return {Object}
 */
export const removeLocal = (key = "") => {
  try {
    storage.remove({ key })
  } catch (error) {
    logger.log("Storage: error removing local with key", key)
  }
}

export const getGlobal = async (key, emptyState = [], version = defaultVersion) => {
  const result = await getLocal(key, version)
  return result ? result.data : emptyState
}

export const saveGlobal = (key, data, version = defaultVersion) =>
  saveLocal(key, { data }, version)
