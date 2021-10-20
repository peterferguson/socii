import useSWRNative from "@nandorojo/swr-react-native"
import {
  getYahooTimeseriesProps,
  YahooTimeseries,
  getYahooTimeseries,
} from "../utils/getYahooTimeseries"

export const useTimeseries = ({
  assets,
  period,
  interval,
}: getYahooTimeseriesProps) => {
  const { data: timeseries, error } = useSWRNative<YahooTimeseries, Error>(
    [assets.join("-"), period, interval],
    (assets, period, interval) =>
      getYahooTimeseries({ assets: assets.split("-"), period, interval })
  )

  return {
    timeseries: (assets.length === 1 ? timeseries?.[assets[0]] : timeseries) || {},
    isLoading: !timeseries && !error,
    isError: error,
  }
}
