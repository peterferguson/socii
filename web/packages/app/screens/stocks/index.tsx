// import { useAuth } from "@hooks/useAuth"
import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text, View } from "react-native"
import CardSlider from "app/components/CardSlider"
import CategoryCard from "app/components/CategoryCard"
import HorizontalAssetCard from "app/components/HorizontalAssetCard"
import { useYahooTrending } from "app/hooks/useYahooTrending"
import tw from "app/lib/tailwind"
import { Asset } from "app/models/Asset"
import { AssetCategories } from "app/models/AssetCategories"
import { Price } from "app/models/Price"
import { getAssetCategoryShortNames } from "app/utils/getAssetCategoryShortNames"

const defaultPrice: Price = {
  latestPrice: 0,
  changePercent: -0.1,
  iexRealtimePrice: 0,
  latestUpdate: "9999-12-31",
  currency: "USD",
}

export default function StocksScreen() {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  const { trending, isLoading } = useYahooTrending()
  // TODO: This recalls the api every time the screen is loaded leading to bad UX
  // ? Maybe use a cache to store the data and only call the api when the user refreshes the screen

  const [categories, setCategories] = useState<AssetCategories>({} as AssetCategories)

  // @ts-ignore
  useEffect(() => getAssetCategoryShortNames().then(setCategories), [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`-mt-4`}>
      <View>
        <Title title={"Trending"} />
        <CardSlider
          isLoading={isLoading}
          assets={Object.values(trending).map(asset => ({
            asset: asset,
            price: defaultPrice,
          }))}
        />
        <Title title={"Categories"} />
        <Categories categories={categories} />
        <Title title={"All"} />
        <AssetCards assets={Object.values(trending)} />
      </View>
    </ScrollView>
  )
}

const fakeAssets = [
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
] as Asset[]

const AssetCards = ({ assets }: { assets: Asset[] }) => {
  const isLoading = assets?.length === 0

  const [initialAssets, setInitialAssets] = useState(fakeAssets)

  useEffect(() => {
    // - update previous display categories to avoid unmounting
    if (!isLoading) setInitialAssets(assets.slice(0, 3))
  }, [assets.length])
  return (
    <FlatList
      data={initialAssets.concat(assets.slice(3))}
      renderItem={({ item: asset }) => (
        <HorizontalAssetCard
          key={`${asset?.alpaca.symbol}`}
          isin={asset?.ISIN}
          symbol={asset?.alpaca.symbol}
          shortName={asset?.shortName}
          logoColor={asset?.logoColor}
          price={defaultPrice}
        />
      )}
      keyExtractor={(item, i) => `asset-card-${i}-${item.alpaca.symbol}`}
      onEndReached={() => {}} // TODO: Add infinite scroll data fetching here!
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  )
}

const fakeCategories = {
  1: {
    emoji: " ",
    category_names: [],
    assets: [],
  },
  2: {
    emoji: " ",
    category_names: [],
    assets: [],
  },
  3: {
    emoji: " ",
    category_names: [],
    assets: [],
  },
  4: {
    emoji: " ",
    category_names: [],
    assets: [],
  },
  5: {
    emoji: " ",
    category_names: [],
    assets: [],
  },
}

const Categories = ({ categories }: { categories: AssetCategories }) => {
  const isLoading = Object.keys(categories)?.length === 0

  const [initialCategories, setInitialCategories] = useState(
    Object.entries(fakeCategories)
  )

  useEffect(() => {
    // - update previous display categories to avoid unmounting
    if (!isLoading) setInitialCategories(Object.entries(categories).slice(0, 5))
  }, [Object.entries(categories).length])

  return (
    <ScrollView
      style={tw.style("flex p-4", "umami--drag--popular-stocks-category-card-slider")}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={!isLoading}
    >
      <View style={tw`flex-row`}>
        {initialCategories
          .concat(Object.entries(categories).slice(5))
          .map(([shortName, { emoji }], i) =>
            emoji ? (
              <CategoryCard
                key={`category-${i}-${shortName}`}
                shortName={shortName}
                emoji={emoji}
                isLoading={isLoading}
              />
            ) : null
          )}
      </View>
    </ScrollView>
  )
}

const Title = ({ title }: { title: string }) => (
  <Text
    style={tw`pt-6 text-3xl text-brand-black dark:text-brand-gray pl-4 
              tracking-tight uppercase font-poppins-500 dark:text-brand-black`}
  >
    {title}
  </Text>
)
