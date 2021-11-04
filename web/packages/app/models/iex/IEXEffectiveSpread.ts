export interface IEXEffectiveSpread {
  volume: number // TODO: API docs say this is a string, but it looks like it's a number
  venue: string
  venueName: string
  effectiveSpread: number
  effectiveQuoted: number
  priceImprovement: number
}
