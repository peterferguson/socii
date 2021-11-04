import type { CategoryScreenProps } from "app/navigation/types"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, View, Text, Button, Pressable } from "react-native"
//import { iexQuote } from "../../utils/iexQuote"
// import { GetStaticPaths, GetStaticProps } from "next"
import HorizontalAssetCard from "../../components/HorizontalAssetCard"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"
import { getTickerDocs } from "../../lib/firebase/client/db/getTickerDocs"
import { Price } from "../../models/Price"
import { getCategoryData } from "../../utils/getCategoryData"
import { shadowStyle } from "../../utils/shadowStyle"
import { getTickerProps } from "../../utils/getTickerProps"
import { TickersProps } from "../../utils/getTickersStaticProps"
import tw from "../../lib/tailwind"

interface CategoryTickerProps extends TickersProps {
  category: string
  restOfTickers: string[]
}

// TODO: Add overall industry/category performance for comparison purposes
// TODO: Refactor the infinite scrolling stock card loading on all pages
export default function CategoryScreen({ navigation, route }: CategoryScreenProps) {
  const { category: categoryName } = route.params

  // - For infinite scroll
  // FIXME: Could be refactored as a hook

  const [tickersToLoad, setTickersToLoad] = useState(null)
  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)
  const [ initialCards, setInitialCards ] = useState<CategoryTickerProps>({} as CategoryTickerProps)
  const [ isVisible, setIsVisible ] = useState(false)
  // const [ categoryProps, setCategoryProps ] = useState(null)

  useEffect(() => {
    getCategoryData(categoryName).then(setInitialCards)
    setTickersToLoad(initialCards.restOfTickers)
  }, [])

  useEffect(() => {
    if (initialCards.restOfTickers) setTickersToLoad(initialCards.restOfTickers)
  }, [initialCards.restOfTickers])

  const defaultPrice = {
    latestPrice: 0,
    changePercent: -0.1,
    iexRealtimePrice: 0,
    latestUpdate: "9999-12-31",
    currency: "USD",
  }

  const entry = useIntersectionObserver(lastTickerRef, {})
  //const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (isVisible) {
    const getMoreTickers = async () => {
      // - Next 5 alpaca stocks
      const nextTickers = tickersToLoad.slice(0, 5)
      setTickersToLoad(tickersToLoad.slice(5))
      const tickerDocs = await getTickerDocs(nextTickers)

      lastTickerLoaded.current = tickerDocs?.slice().pop()

      const tickers = await Promise.all(
        tickerDocs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc, null, null)

          let price: Price
          try {
            price = defaultPrice
            // price = tickerSymbol ? await iexQuote(tickerSymbol, user?.token) : undefined
          } catch (err) {
            console.log(`Failed to find price for ${tickerSymbol}`)
            console.log(err)
            console.log(price)
          }

          return { ...props, price }
        })
      )

      moreTickers.current.push(...tickers.filter((ticker) => !!ticker))
      setLoadingMoreTickers(false)
    }
    if (isVisible) {
      setLoadingMoreTickers(true)
      getMoreTickers()
      lastTickerRef.current = null
      setIsVisible(false)
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])
  //}, [isVisible, user?.token])

  // TODO: Convert to a flatlist with a onEndReached prop
  return (
    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {initialCards?.tickers?.map(({ ticker, price }) => (
          <HorizontalAssetCard
            key={`${ticker?.tickerSymbol}`}
            cardRef={null}
            isin={ticker?.ISIN}
            symbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
            price={defaultPrice}
          />
        ))}
        {moreTickers.current.length > 0 &&
        moreTickers.current.map(({ ticker, price }) => (
          <HorizontalAssetCard
            key={`${ticker?.tickerSymbol}`}
            cardRef={null}
            isin={ticker?.ISIN}
            symbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
            price={defaultPrice}
          />
        ))}
          {/* <HorizontalAssetCardSkeleton
            cardRef={lastTickerRef}
            className={loadingMoreTickers ? "block" : "invisible"}
          /> */}
        <View style ={tw`items-center`}>
        <Pressable
          onPress={()=>{setIsVisible(true)}}
          style={{          
            ...tw`bg-blue-300 my-2 mx-4 w-1/2 flex flex-col justify-center items-center rounded-2xl sm:rounded-xl`,
            ...shadowStyle("md"),
          }}
          >   
          <Text style={{ ...tw`text-lg text-white` }}>Load More...  </Text>
          </Pressable>
          </View>
      </ScrollView>
    </View>
  )
}
