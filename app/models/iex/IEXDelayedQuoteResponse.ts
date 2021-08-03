export interface IEXDelayedQuoteResponse {
  symbol: string;
  delayedPrice: number;
  high: number;
  low: number;
  delayedSize: number;
  delayedPriceTime: number;
  processedTime: number;
}
