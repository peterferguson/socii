import { CurrencyCode } from "@lib/constants";
import { currencyConversion } from "@utils/currencyConversion";
import { useState } from "react";
import { usePersistentState } from "./usePersistentState";
import { useInterval } from "./useInterval";


export const useExchangeRate = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  refreshCountThreshold = 10,
  refreshTime = 60 * 1000 // - 1 min in ms,
) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const [value, setValue] = usePersistentState(
    { func: currencyConversion, args: [fromCurrency, toCurrency] },
    `${fromCurrency}${toCurrency}`
  );

  // - polling for updates to exchange rate
  useInterval(
    () => {
      setValue(currencyConversion(fromCurrency, toCurrency));
      setRefreshCount(refreshCount + 1);
    },
    // - `refreshTime` in milliseconds stopped after `refreshCountThreshold` refreshes
    refreshCount < refreshCountThreshold ? refreshTime : null
  );

  if (fromCurrency === toCurrency || !fromCurrency || !toCurrency) {
    window.localStorage.removeItem(`${fromCurrency}${toCurrency}`);
    return [{ rate: 1 }];
  }
  return [value, setValue];
};
