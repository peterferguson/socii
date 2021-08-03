import { CurrencyCode } from "@lib/constants";
import { currencyConversion } from "@utils/currencyConversion";
import { fetcher } from "@utils/fetcher";
import useSWR from "swr";


export const useCurrencyConversion = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => {
  const { data, error } = useSWR(
    currencyConversion(fromCurrency, toCurrency),
    fetcher,
    { dedupingInterval: 10000 }
  );
  return {
    exchangeRate: data,
    isLoading: !error && !data,
    isError: error,
  };
};
