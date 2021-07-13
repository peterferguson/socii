import { iexQuote } from "@utils/iexQuote";
import { useEffect } from "react";
import { usePersistentState } from "./usePersistentState";

interface PriceData {
  price: number;
  percentChange: number;
  lastUpdated: string;
}

export const useTickerPrice = (
  tickerSymbol: string,
  expired = false,
  setExpired = null
): PriceData => {
  const [price, setPrice] = usePersistentState(
    { price: 0, percentChange: 0, lastUpdated: new Date(0).toISOString() },
    `${tickerSymbol}-price`
  );

  // TODO: Implement cache clearing logic
  // TODO: Implement different price/chart collection policies for more popular stocks
  // ? We could do different pricing strategies based on data availibilty to the user
  // ? For example if a user agrees to decreased data availability we could offered reduced
  // ? price services. Alternatively we could offer to match so part of the cost of a share
  // ? or maybe even offer free shares for opting in.
  useEffect(() => {
    if (!price || expired) {
      iexQuote(tickerSymbol, "latestPrice,changePercent").then(
        ({ latestPrice, changePercent }) => {
          setPrice({
            price: latestPrice || 0.0,
            percentChange: changePercent || 0.0,
            lastUpdated: new Date().toISOString(),
          });
        }
      );
      setExpired?.(false);
    }
  }, [expired, price, setExpired, setPrice, tickerSymbol]);

  return price;
};
