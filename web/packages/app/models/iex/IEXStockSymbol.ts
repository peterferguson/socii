/*
 * Interface definitions of the response types
 */

export interface IEXStockSymbol {
  date: string
  iexId: string
  isEnabled: boolean
  name: string
  asset: string
  type: "cs" | "et" | "ps" | "bo" | "su" | "N/A" | string
}
