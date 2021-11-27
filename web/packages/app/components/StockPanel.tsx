
import { AssetsObject } from "app/hooks/useAssetData"
import { Price } from "app/models/Price"
import CardSlider from "app/components/CardSlider"
import { CenteredRow } from "app/components/Centered"
import Search from "app/components/Search/Search"
import { SearchIcon } from "app/components/Search/SearchIcon"
import tw from "app/lib/tailwind"
import { AssetCategories } from "app/models/AssetCategories"
import React, { useEffect, useState, useMemo } from "react"
import {
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
  FlatList,
  ScrollView,
} from "react-native"
import Animated from "react-native-reanimated"
import { CategoryCard, HorizontalAssetCard } from "."
import { Asset } from "@models/Asset"

type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

export const StockPanel: React.FC<{
    scrollHandler: OnScroll
    isLoading: boolean
    trending: AssetsObject
    categories: AssetCategories
  }> = ({ scrollHandler, isLoading, trending, categories }) => ( 
    <Animated.ScrollView
    showsVerticalScrollIndicator={false}
    onScroll={scrollHandler}
    scrollEventThrottle={32}
  >
    <View>
      <CenteredRow style={tw`justify-between`}>
        <Title title={"Trending"} />
        <SearchIcon />
      </CenteredRow>
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
      {Search && <Search />}
    </View>
  </Animated.ScrollView>
  )

  export default StockPanel


const Title = ({ title }: { title: string }) => (
    <Text
      style={tw`pt-4 text-3xl text-brand-black dark:text-brand-gray pl-4 
                tracking-tight uppercase font-poppins-500 dark:text-brand-black`}
    >
      {title}
    </Text>
  )

const defaultPrice: Price = {
    latestPrice: 0,
    changePercent: -0.1,
    iexRealtimePrice: 0,
    latestUpdate: "9999-12-31",
    currency: "USD",
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
  