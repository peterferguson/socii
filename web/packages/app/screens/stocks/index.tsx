// import { useAuth } from "@hooks/useAuth"
import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text, View } from "react-native"
import { CategoryCard } from "../../components/CategoryCard"
import HorizontalAssetCard from "../../components/HorizontalAssetCard"
import CardSlider from "../../components/OverlappingCardSlider"
import { useAuth } from "../../hooks/useAuth"
import { useYahooTrending } from "../../hooks/useYahooTrending"
import tw from "../../lib/tailwind"
import { Asset } from "../../models/Asset"
import { AssetCategories } from "../../models/AssetCategories"
import { useRouter } from "../../navigation/use-router"
import { getAssetCategoryShortNames } from "../../utils/getAssetCategoryShortNames"

const defaultPrice = {
  latestPrice: 0,
  changePercent: -0.1,
  iexRealtimePrice: 0,
  latestUpdate: "9999-12-31",
  currency: "USD",
}

export default function StockScreen({ asset }) {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  const { user } = useAuth()

  const { trending, isLoading } = useYahooTrending()

  const [categories, setCategories] = useState<AssetCategories>({} as AssetCategories)

  // @ts-ignore
  // useEffect(() => getAssetCategoryShortNames().then(setCategories), [])

  return (
    <ScrollView>
      <View>
        <Title title={"Trending"} />
        <CardSlider
          assets={trending.map((asset) => ({
            asset: Object.values(asset).pop(),
            price: defaultPrice,
          }))}
        />
        <Title title={"Categories"} />
        <Categories categories={categories} />
        <Title title={"All"} />
        <AssetCards asset={asset} />
      </View>
    </ScrollView>
  )
}

const AssetCards = ({ asset }: { asset: Asset[] }) => (
  <FlatList
    data={asset}
    renderItem={({ item: asset }) => (
      <HorizontalAssetCard
        key={`${asset?.tickerSymbol}`}
        isin={asset?.ISIN}
        tickerSymbol={asset?.tickerSymbol}
        shortName={asset?.shortName}
        logoColor={asset?.logoColor}
        price={defaultPrice}
      />
    )}
    keyExtractor={(item) => item.tickerSymbol}
    onEndReached={() => {}} // TODO: Add infinite scroll data fetching here!
    onEndReachedThreshold={0.5}
  />
)

const Categories = ({ categories }: { categories: AssetCategories }) => {
  const router = useRouter()
  return (
    <View
      style={tw.style("flex p-4", "umami--drag--popular-stocks-category-card-slider")}
    >
      <FlatList
        data={Object.entries(categories).sort(() => 0.5 - Math.random())}
        horizontal={true}
        renderItem={({ item: [shortName, { emoji }] }) =>
          emoji ? (
            <CategoryCard shortName={shortName} emoji={emoji} router={router} />
          ) : null
        }
        keyExtractor={(item) => item[0]}
      />
    </View>
  )
}

const Title = ({ title }: { title: string }) => (
  <Text
    style={tw`pt-6 text-3xl text-white pl-4 tracking-tight uppercase font-poppins-500 dark:text-brand-dark`}
  >
    {title}
  </Text>
)
