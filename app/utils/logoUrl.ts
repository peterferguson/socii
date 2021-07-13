import { tickerToISIN } from "@lib/firebase";


export const logoUrl = (isin: string | any[]) => {
  const baseUrl = (endpoint: string) => `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${endpoint}.png`;
  if (isin.length <= 4) {
    const url = tickerToISIN(isin).then((r) => baseUrl(r));
    return url;
  }
  return baseUrl(isin);
};
