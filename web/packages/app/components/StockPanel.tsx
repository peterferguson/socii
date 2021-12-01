import CardSlider from "app/components/CardSlider"
import { CenteredRow } from "app/components/Centered"
import Search from "app/components/Search/Search"
import { SearchIcon } from "app/components/Search/SearchIcon"
import { AssetsObject } from "app/hooks/useAssetData"
import { useIexPrice } from "app/hooks/useIexPrice"
import tw from "app/lib/tailwind"
import { Asset } from "app/models/Asset"
import { AssetCategories } from "app/models/AssetCategories"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native"
import { CategoryCard, HorizontalAssetCard } from "."

type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

export const StockPanel: React.FC<{
  isLoading: boolean
  trending: AssetsObject
  categories: AssetCategories
}> = ({ isLoading, trending, categories }) => {
  const { prices } = useIexPrice(
    Object.values(trending).map(asset => asset.alpaca.symbol)
  )

  return (
    <>
      <CenteredRow style={tw`justify-between`}>
        <Title title={"Trending"} />
        <SearchIcon />
      </CenteredRow>
      <CardSlider
        isLoading={isLoading}
        assets={Object.values(trending).map(asset => ({
          asset: asset,
          price: prices[asset.alpaca.symbol],
        }))}
      />
      <Title title={"Categories"} />
      <Categories categories={categories} />
      <Title title={"All"} />
      <AssetCards assets={Object.values(trending)} />
      {Search && <Search />}
    </>
  )
}

export default StockPanel

const Title = ({ title }: { title: string }) => (
  <Text
    style={tw`pt-4 text-3xl text-brand-black dark:text-brand-gray pl-4 
                tracking-tight uppercase font-poppins-500 dark:text-brand-black`}
  >
    {title}
  </Text>
)

const fakeAssets = [
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
  { ISIN: "", alpaca: { symbol: "" }, shortName: "", logoColor: "" },
] as Asset[]

const AssetCards = ({ assets }: { assets: Asset[] }) => {
  const isLoading = assets?.length === 0

  const { prices, isLoading: isPriceLoading } = useIexPrice(
    assets.map(asset => asset.alpaca.symbol)
  )

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
          price={prices[asset?.alpaca.symbol]}
          isPriceLoading={isLoading}
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
