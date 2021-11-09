import { getAssetCategories } from "app/lib/firebase/db/getAssetCategories"
import { AssetCategories } from "../models/AssetCategories"

export interface AssetCategory {
  shortName: string
  emoji: string
  assets: string[]
}

export const getAssetCategoryShortNames = async (): Promise<AssetCategories> => {
  const categorySnapshot = await getAssetCategories()
  const categories = categorySnapshot.docs.map(doc => ({
    category_name: doc.id.replace(/-/g, " "),
    data: doc.data(),
  }))

  return categories.reduce(
    (acc, { category_name, data: { short_name: shortName, emoji, assets } }) => {
      if (Object.keys(acc).includes(shortName)) {
        acc[shortName]?.category_names?.push(category_name)
        acc[shortName]?.assets?.push(...assets)
      } else {
        acc[shortName] = { emoji, assets, category_names: [category_name] }
      }
      return acc
    },
    {}
  )
}
