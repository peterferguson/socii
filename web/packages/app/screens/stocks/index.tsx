// import { useAuth } from "@hooks/useAuth"
// import CardSlider from "@components/CardSlider"
import React, { useEffect, useState } from "react"
import { FlatList, Text, View, Pressable } from "react-native"
import HorizontalAssetCard from "../../components/HorizontalAssetCard"
import tw from "../../lib/tailwind"
import { TickerCategories } from "../../models/TickerCategories"
import { useRouter } from "../../navigation/use-router"
import { getTickerCategoryShortNames } from "../../utils/getTickerCategoryShortNames"

export default function StockScreen({ tickers }) {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  // const { user } = useAuth()
  tickers = [
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
        symbol: "GOOG",
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
      tickerSymbol: "GOOG",
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
        symbol: "AMZN",
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
      tickerSymbol: "AMZN",
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
        symbol: "AAPL",
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
      tickerSymbol: "AAPL",
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
        symbol: "FB",
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
      tickerSymbol: "FB",
      timeseriesLastUpdated: {
        nanoseconds: 304000000,
        seconds: 1624060404,
      },
      yahooMarketSuffix: "",
    },
  ]
  const [categories, setCategories] = useState<TickerCategories>({} as TickerCategories)

  useEffect(() => {
    getTickerCategoryShortNames().then(setCategories)
  }, [])

  return (
    // TODO: Create our own version of this Ticker Tape banner
    <>
      <View style={tw`flex flex-wrap flex-grow w-full`}>
        <Text
          style={tw`pt-6 text-3xl text-white pl-4 tracking-tight uppercase font-poppins-500 dark:text-brand-dark`}
        >
          Popular
        </Text>
        {/* <CardSlider tickers={tickers} /> */}
        <Categories categories={categories} />

        <FlatList
          data={tickers}
          renderItem={({ item: ticker }) => {
            return (
              <HorizontalAssetCard
                key={`${ticker?.tickerSymbol}`}
                isin={ticker?.ISIN}
                tickerSymbol={ticker?.tickerSymbol}
                shortName={ticker?.shortName}
                logoColor={ticker?.logoColor}
                price={{
                  latestPrice: 0,
                  changePercent: -0.1,
                  iexRealtimePrice: 0,
                  latestUpdate: "9999-12-31",
                  currency: "USD",
                }}
              />
            )
          }}
          keyExtractor={(item) => item.tickerSymbol}
        />
      </View>
    </>
  )
}

const Categories = ({ categories }: { categories: TickerCategories }) => {
  const router = useRouter()
  return (
    <>
      <Text
        style={tw.style(
          "w-full pt-6 text-3xl tracking-tight uppercase cursor-pointer font-primary text-brand-dark"
        )}
      >
        Categories
      </Text>
      <View
        style={tw.style(
          "flex p-4 overflow-x-scroll sm:no-scrollbar",
          "umami--drag--popular-stocks-category-card-slider"
        )}
      >
        <FlatList
          data={Object.entries(categories)}
          horizontal={true}
          renderItem={({ item: [shortName, { emoji }] }) =>
            emoji ? (
              <CategoryCard shortName={shortName} emoji={emoji} router={router} />
            ) : null
          }
          keyExtractor={(item) => item[0]}
        />
      </View>
    </>
  )
}

const CategoryCard = ({ shortName, emoji, router }) => {
  console.log(tw`text-xs font-poppins-400 font-md justify-between`)

  return (
    <Pressable
      key={`category-${shortName}`}
      onPress={() => router.push(`/stocks/categories/${shortName}`)}
    >
      <View
        style={tw`mx-1 rounded-2xl border border-gray-300 text-gray-600 h-28 p-6 bg-white dark:bg-brand-black`}
      >
        <View style={tw`flex flex-col items-center justify-center w-10`}>
          <View style={tw`bg-gray-300/60 rounded-full`}>
            <Text style={tw`w-12 h-12 text-center text-lg `}>{emoji}</Text>
          </View>
        </View>
        <Text style={tw`text-tiny font-poppins-400 w-14`}>{shortName}</Text>
      </View>
    </Pressable>
  )
}
