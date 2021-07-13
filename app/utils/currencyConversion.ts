import { CurrencyCode } from "@lib/constants";


export const currencyConversion = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => `/api/av/currencyConversion?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`;
