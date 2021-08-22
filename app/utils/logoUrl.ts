import { tickerToISIN } from "@lib/firebase/client/db/tickerToISIN"

export const logoUrl = (isin: string) => {
  const baseUrl = (endpoint: string) =>
    `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/logos/${endpoint}.png`
  if (isin && isin.length <= 4) {
    const url = tickerToISIN(isin).then((r) => baseUrl(r))
    return url
  }
  return baseUrl(isin)
}
