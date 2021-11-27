import { RapidApiNewsItem } from "@utils/getNewsArticles"
import Image from "next/image"
import React, { useState } from "react"
import { Text, Pressable, View } from "react-native"
import tw from "app/lib/tailwind"

export const NewsItem = ({ item }: { item: RapidApiNewsItem }) => {
  const [isError, setIsError] = useState(false)
  return (
    <View style={tw`flex items-center w-full p-4 lg:p-1 space-y-0.5`}>
      <Pressable 
        //onPress={item.url}
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

export const NewsItemSkeleton = () => (
  <View style={tw`flex flex-col justify-start w-full p-4 lg:p-1 space-y-0.5`}>
    <Text style={tw`w-3/4 h-3 mb-2 bg-gray-400 sm:h-5 animate-pulse rounded-xl`} />
    <Text style={tw`w-4/5 h-2 mb-1 bg-gray-400 sm:h-3 animate-pulse rounded-xl`} />
    <Text style={tw`w-3/5 h-2 bg-gray-400 sm:h-3 animate-pulse rounded-xl`} />
  </View>
)
