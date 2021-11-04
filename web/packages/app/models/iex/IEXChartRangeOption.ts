/*
 * Unfortunately, pattern based type definitions aren't supported in TypeScript.
 * There's no way to express 'date/<YYYYMMDD>' as a type outside of a generic
 * catch-all string.
 */

export type IEXChartRangeOption =
  | "5y"
  | "2y"
  | "1y"
  | "ytd"
  | "6m"
  | "3m"
  | "1m"
  | "1d"
  | "dynamic"
  | string
