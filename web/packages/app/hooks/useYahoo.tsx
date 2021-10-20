import useSWRNative from "@nandorojo/swr-react-native"
import { fetchYahoo } from "../utils/fetchYahoo"

export const useYahoo = (
  assets: string[],
  endpoint: string,
  method: string = "POST",
  body: any = null
) => {
  const { data, error } = useSWRNative<any, Error>(
    [assets.join("-"), endpoint, method, body],
    (assets, endpoint, method, body) =>
      fetchYahoo(assets.split("-"), endpoint, method, body)
  )

  return {
    data: data || {},
    isLoading: !data && !error,
    isError: error,
  }
}
