import { useStockNews } from "app/hooks/useNews"
import { RapidApiNewsItem } from "app/utils/getNewsArticles"
import Image from "next/image"
import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"

const StockNews: React.FC<{
  exchange: string
  symbol: string
  shortName: string
  logoColor: string
}> = ({ exchange, symbol, shortName, logoColor }) => {
  const { news, loading } = useStockNews(
    `(${exchange}:${symbol}) ${shortName} stock`,
    symbol
  )
  return (
    <View style={tw`w-full mt-8 ml-0 text-xl lg:mt-2 space-y-4 font-primary lg:w-2/5`}>
      <Text>Related News</Text>
      <View
        style={{
          ...tw`p-2 bg-white shadow-lg space-y-1 grid grid-rows-3 Viewide-y rounded-2xl place-items-center`,
         borderColor: logoColor 
        }}
      >
        {!loading
          ? news?.map((item) => <NewsItem key={item.id} item={item} />)
          : [1, 2, 3].map((item) => <NewsItemSkeleton key={item} />)}
      </View>
    </View>
  )
}

export default StockNews

const NewsItem = ({ item }: { item: RapidApiNewsItem }) => {
  const [isError, setIsError] = useState(false)
  return (
    <View style={tw`flex items-center w-full p-4 lg:p-1 space-y-0.5`}>
      <Pressable 
      //href={item.url}
      >
        {!isError && item.image.thumbnail && (
          <Image
            src={item.image.thumbnail}
            width={item.image.thumbnailWidth}
            height={item.image.thumbnailHeight}
            onError={() => setIsError(true)}
          />
        )}
        <Text style={tw`text-xs font-semibold font-primary sm:text-base pb-0.5`}>
          {item.title}
        </Text>
        <Text style={tw`text-tiniest sm:text-tiny font-secondary leading-3 overflow-ellipsis`}>
          {item.description}
        </Text>
      </Pressable>
    </View>
  )
}

const NewsItemSkeleton = () => (
  <View style={tw`flex flex-col justify-start w-full p-4 lg:p-1 space-y-0.5`}>
    <Text style={tw`w-3/4 h-3 mb-2 bg-gray-400 sm:h-5 animate-pulse rounded-xl`}/>
    <Text style={tw`w-4/5 h-2 mb-1 bg-gray-400 sm:h-3 animate-pulse rounded-xl`} />
    <Text style={tw`w-3/5 h-2 bg-gray-400 sm:h-3 animate-pulse rounded-xl`} />
  </View>
)
