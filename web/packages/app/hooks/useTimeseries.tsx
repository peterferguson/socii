import useSWRNative from "@nandorojo/swr-react-native"
import {
  getYahooTimeseriesProps,
  YahooTimeseries,
  getYahooTimeseries,
} from "../utils/getYahooTimeseries"

export const useTimeseries = ({
  symbols,
  period,
  interval,
}: getYahooTimeseriesProps) => {
  const { data: timeseries, error } = useSWRNative<YahooTimeseries, Error>(
    [symbols.join("-"), period, interval],
    (symbols, period, interval) =>
      getYahooTimeseries({ symbols: symbols.split("-"), period, interval })
  )

  return {
    timeseries: (symbols.length === 1 ? timeseries?.[symbols[0]] : timeseries) || {},
    isLoading: !timeseries && !error,
    isError: error,
  }
}
