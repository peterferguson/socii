export interface IEXDelayedQuoteResponse {
  asset: string
  delayedPrice: number
  high: number
  low: number
  delayedSize: number
  delayedPriceTime: number
  processedTime: number
}
