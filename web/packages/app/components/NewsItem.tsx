import { Skeleton } from "@motify/skeleton"
import { RapidApiNewsItem } from "@utils/getNewsArticles"
import tw from "app/lib/tailwind"
import Image from "next/image"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { CenteredColumn, CenteredRow } from "./Centered"
import HorizontalSpacer from "./HorizontalSpacer"
import SkeletonText from "./SkeletonText"
import VerticalSpacer from "./VerticalSpacer"

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
        <Text
          style={tw`text-tiniest sm:text-tiny font-secondary leading-3 overflow-ellipsis`}
        >
          {item.description}
        </Text>
      </Pressable>
    </View>
  )
}

export const NewsItemSkeleton = () => (
  <CenteredRow style={tw`p-4 w-full bg-white my-1 rounded-lg`}>
    <Skeleton
      colorMode={tw.prefixMatch("dark") ? "dark" : "light"}
      height={70}
      width={70}
    />
    <HorizontalSpacer width={12} />
    <CenteredColumn style={tw`flex-3 items-start`}>
      <VerticalSpacer height={2} />
      <SkeletonText width={80} height={6} />
      <VerticalSpacer height={4} />
      <SkeletonText width={200} height={32} />
      <VerticalSpacer height={4} />
      <SkeletonText width={160} height={12} />
    </CenteredColumn>
  </CenteredRow>
)
