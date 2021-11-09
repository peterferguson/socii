import { getTickerCategories } from "../lib/firebase/db/getTickerCategories"

export interface TickerCategory {
  shortName: string
  emoji: string
  tickers: string[]
}

export interface TickerCategoryShortNames {
  [key: string]: {
    emoji: string
    tickers: string[]
  }
}

export const getTickerCategoryShortNames =
  async (): Promise<TickerCategoryShortNames> => {
    const categorySnapshot = await getTickerCategories()
    const categories = categorySnapshot.docs.map(doc => ({
      category_name: doc.id.replace(/-/g, " "),
      data: doc.data(),
    }))

    return categories.reduce(
      (acc, { category_name, data: { short_name: shortName, emoji, tickers } }) => {
        if (Object.keys(acc).includes(shortName)) {
          acc[shortName]?.category_names?.push(category_name)
          acc[shortName]?.tickers?.push(...tickers)
        } else {
          acc[shortName] = { emoji, tickers, category_names: [category_name] }
        }
        return acc
      },
      {}
    )
  }
