import { pnlTextColor } from "../utils/pnlTextColor"
import React from "react"
import { View, FlatList, Pressable, Text } from "react-native"
import tw from "../lib/tailwind"
import TickerLogo from "./TickerLogo"
import { useRouter } from "../navigation/use-router"
import { Ticker } from "../models/Ticker"
import { Price } from "../models/Price"

// TODO: Add a isActive state and only navigate on click of the active card

interface CardTicker {
  ticker: Ticker
  price: Price
}

export default function CardSlider({ tickers }: { tickers: CardTicker[] }) {
  const router = useRouter()
  return (
    <FlatList
      style={tw`flex-row p-4 umami--drag--popular-stocks-card-slider`}
      data={tickers}
      horizontal={true}
      keyExtractor={({ ticker }) => ticker.alpaca.symbol}
      renderItem={({ item: { ticker, price } }) => (
        <View
          style={{
            ...tw`mx-2 bg-white rounded-2xl border-l-4`,
            borderColor: ticker?.logoColor,
            flex: 1,
            flexGrow: 1,
          }}
        >
          <Pressable
            onPress={() => router.push(`/stocks/${ticker.alpaca.symbol}`)}
            style={tw`h-60 w-40 p-4`}
          >
            <TickerLogo
              symbol={ticker.alpaca.symbol}
              isin={ticker.ISIN}
              height="52"
              width="52"
            />
            <View
              style={{ ...tw`flex-col py-8 px-2`, alignContent: "stretch", flex: 1 }}
            >
              <Text
                style={{
                  ...tw`py-1 text-xl font-semibold tracking-wider`,
                  color: ticker.logoColor,
                }}
              >
                {ticker.alpaca.symbol}
              </Text>
              <Text style={tw`py-1 text-lg tracking-tight font-primary`}>
                {ticker.shortName}
              </Text>
            </View>
            <View style={tw`px-2`}>
              <Text
                style={tw`font-semibold text-3xl ${pnlTextColor(price?.changePercent)}`}
              >
                ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    />
  )
}
