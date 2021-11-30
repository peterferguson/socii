import { Platform } from "react-native"
import Constants from "expo-constants"
import * as DeviceInfo from "expo-device"

const development = Constants.manifest.extra.STAGE === "development"

// - use for adding localhost to the url
const local = Constants.manifest.extra.LOCAL_DEVELOPMENT === "true"

export async function fetcher<JSON = any>(
  url: string,
  options?: object
): Promise<JSON> {
  let endpointPrefix

  endpointPrefix = Platform.select({
    web: "/",
    default:
      local && !DeviceInfo.isDevice
        ? "http://localhost:3000/" // ! For now running localhost from app folder instead of the next folder
        : development
        ? "https://development.socii.app/"
        : "https://socii.app/",
  })

  const endpoint = url.startsWith("/") ? url.replace("/", endpointPrefix) : url

  console.log(`Fetching ${endpoint}`)

  let res
  try {
    res = await fetch(endpoint, options)
  } catch (e) {
    console.log(e)
  }

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error()
    // Attach extra info to the error object.
    error.message = await res.json()
    error["statusCode"] = res.status
    throw error
  }

  return await res.json()
}
