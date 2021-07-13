import { fetcher } from "./fetcher";


export const iexQuote = async (tickerSymbol: string, filter: string) => {
  return await fetcher(`/api/iex/quote/${tickerSymbol}?filter=${filter}`);
};
