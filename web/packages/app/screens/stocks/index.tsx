// import { useAuth } from "@hooks/useAuth"
import CardSlider from "../../components/OverlappingCardSlider"
import React, { useEffect, useState } from "react"
import { FlatList, Text, View, SectionList, ScrollView } from "react-native"
import HorizontalAssetCard from "../../components/HorizontalAssetCard"
import tw from "../../lib/tailwind"
import { AssetCategories } from "../../models/AssetCategories"
import { useRouter } from "../../navigation/use-router"
import { getAssetCategoryShortNames } from "../../utils/getAssetCategoryShortNames"
import { CategoryCard } from "../../components/CategoryCard"
import { Asset } from "../../models/Asset"
import { useYahoo } from "../../hooks/useYahoo"

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

  // const { user } = useAuth()

  const { data: trending, isLoading } = useYahoo([], "get_trending")

  asset = [
    {
      ISIN: "US02079K1079",
      alpaca: {
        class: "us_equity",
        easy_to_borrow: true,
        exchange: "NASDAQ",
        fractionable: true,
        id: "f30d734c-2806-4d0d-b145-f9fade61432b",
        lastUpdated: {
          nanoseconds: 844000000,
          seconds: 1633049552,
        },
        marginable: true,
        name: "Alphabet Inc. Class C Capital Stock",
        shortable: true,
        status: "active",
        asset: "GOOG",
        tradable: true,
      },
      assetType: "EQUITY",
      exchangeAbbreviation: "NMS",
      isDisabled: false,
      logoColor: "#548cfc",
      logoColorLastUpdated: {
        nanoseconds: 29000000,
        seconds: 1625606383,
      },
      longName: "Alphabet Inc.",
      marketCountry: "United States of America",
      marketName: "",
      pnlColor: "text-emerald-500",
      regularMarketChangePercent: 0.022302397,
      shortName: "Alphabet Inc.",
      assetAsset: "GOOG",
      yahooMarketSuffix: "",
    },
    {
      ISIN: "US0231351067",
      alpaca: {
        class: "us_equity",
        easy_to_borrow: true,
        exchange: "NASDAQ",
        fractionable: true,
        id: "f801f835-bfe6-4a9d-a6b1-ccbb84bfd75f",
        lastUpdated: {
          nanoseconds: 637000000,
          seconds: 1633049370,
        },
        marginable: true,
        name: "Amazon.com, Inc. Common Stock",
        shortable: true,
        status: "active",
        asset: "AMZN",
        tradable: true,
      },
      assetType: "EQUITY",
      categories: ["Retailing"],
      exchange: "NASDAQ",
      exchangeAbbreviation: "NMS",
      isDisabled: false,
      isPopular: true,
      logoColor: "#141414",
      logoColorLastUpdated: {
        nanoseconds: 29000000,
        seconds: 1625606383,
      },
      logoUrl:
        "https://storage.googleapis.com/sociiinvest.appspot.com/logos/US0231351067.png",
      longName: "Amazon.com, Inc.",
      marketCountry: "United States of America",
      marketName: "",
      pnlColor: "text-emerald-500",
      regularMarketChangePercent: 0.0065889303,
      shortName: "Amazon.com, Inc.",
      assetAsset: "AMZN",
      timeseriesLastUpdated: {
        nanoseconds: 143000000,
        seconds: 1624054058,
      },
      yahooMarketSuffix: "",
    },
    {
      ISIN: "US0378331005",
      alpaca: {
        class: "us_equity",
        easy_to_borrow: true,
        exchange: "NASDAQ",
        fractionable: true,
        id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
        lastUpdated: {
          nanoseconds: 676000000,
          seconds: 1633049920,
        },
        marginable: true,
        name: "Apple Inc. Common Stock",
        shortable: true,
        status: "active",
        asset: "AAPL",
        tradable: true,
      },
      assetType: "EQUITY",
      categories: ["Technology Hardware"],
      exchange: "NASDAQ",
      exchangeAbbreviation: "NMS",
      isDisabled: false,
      isPopular: true,
      logoColor: "#141414",
      logoColorLastUpdated: {
        nanoseconds: 29000000,
        seconds: 1625606383,
      },
      logoUrl:
        "https://storage.googleapis.com/sociiinvest.appspot.com/logos/US0378331005.png",
      longName: "Apple Inc.",
      marketCountry: "United States of America",
      marketName: "",
      pnlColor: "text-emerald-500",
      regularMarketChangePercent: 0.014548315,
      shortName: "Apple Inc.",
      assetAsset: "AAPL",
      timeseriesLastUpdated: {
        nanoseconds: 257000000,
        seconds: 1624054974,
      },
      yahooMarketSuffix: "",
    },
    {
      ISIN: "US30303M1027",
      alpaca: {
        class: "us_equity",
        easy_to_borrow: true,
        exchange: "NASDAQ",
        fractionable: true,
        id: "fc6a5dcd-4a70-4b8d-b64f-d83a6dae9ba4",
        lastUpdated: {
          nanoseconds: 269000000,
          seconds: 1633049509,
        },
        marginable: true,
        name: "Facebook, Inc. Class A Common Stock",
        shortable: true,
        status: "active",
        asset: "FB",
        tradable: true,
      },
      assetType: "EQUITY",
      categories: ["Software & Services"],
      exchangeAbbreviation: "NMS",
      isDisabled: false,
      logoColor: "#1474f4",
      logoColorLastUpdated: {
        nanoseconds: 29000000,
        seconds: 1625606383,
      },
      longName: "Facebook, Inc.",
      marketCountry: "United States of America",
      marketName: "",
      pnlColor: "text-emerald-500",
      regularMarketChangePercent: 0.013742783,
      shortName: "Facebook, Inc.",
      assetAsset: "FB",
      timeseriesLastUpdated: {
        nanoseconds: 304000000,
        seconds: 1624060404,
      },
      yahooMarketSuffix: "",
    },
  ]
  const [categories, setCategories] = useState<AssetCategories>({} as AssetCategories)

  useEffect(() => {
    getAssetCategoryShortNames().then(setCategories)
  }, [])

  return (
    <ScrollView>
      <View>
        <Title title={"Trending"} />
        <CardSlider assets={asset.map((asset) => ({ asset, price: defaultPrice }))} />
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
        key={`${asset?.assetAsset}`}
        isin={asset?.ISIN}
        assetAsset={asset?.assetAsset}
        shortName={asset?.shortName}
        logoColor={asset?.logoColor}
        price={defaultPrice}
      />
    )}
    keyExtractor={(item) => item.assetAsset}
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
