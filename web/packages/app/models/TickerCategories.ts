export interface TickerCategories {
  [categoryName: string]: {
    category_names: string[]
    emoji: string
    tickers: string[]
  }
}
