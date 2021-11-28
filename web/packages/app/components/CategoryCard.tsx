import React from "react"
import { Pressable, Text, View } from "react-native"
import tw from "app/lib/tailwind"
import { useRouter } from "../navigation/use-router"
import SkeletonCircle from "./SkeletonCircle"
import SkeletonText from "./SkeletonText"
import VerticalSpacer from "./VerticalSpacer"

const CategoryCard = ({ shortName, emoji, isLoading }) => {
  const router = useRouter()
  const isLongShortName = shortName.includes(" ") && !shortName.includes("&")
  return (
    <Pressable
      key={`category-${shortName}`}
      onPress={() => router.push(`/stocks/categories/${shortName}`)}
      style={{
        ...tw`flex items-center mx-1 rounded-2xl border border-gray-300 text-gray-600 h-28 p-6 bg-white dark:bg-brand-black`,
        minHeight: 112,
      }}
    >
      <View style={tw`flex-1 flex-col items-center justify-center w-10`}>
        <CategoryEmoji {...{ isLoading, isLongShortName, emoji }} />
        <CategoryText {...{ isLoading, isLongShortName, shortName }} />
      </View>
    </Pressable>
  )
}

const CategoryText = ({ isLoading, isLongShortName, shortName }) =>
  isLoading ? (
    <>
      <VerticalSpacer height={20} />
      <SkeletonText height={12} width={30} />
    </>
  ) : (
    <>
      {isLongShortName ? (
        shortName.split(" ").map((word, i) => (
          <Text
            key={`category-card-word-${shortName}-${i}`}
            numberOfLines={1}
            adjustsFontSizeToFit
            style={tw`text-tiny text-center font-poppins-400 w-14`}
          >
            {word}
          </Text>
        ))
      ) : (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={tw`text-tiny text-center font-poppins-400 w-14`}
        >
          {shortName}
        </Text>
      )}
    </>
  )
const CategoryEmoji = ({ isLoading, isLongShortName, emoji }) => (
  <View style={tw`rounded-full`}>
    {isLoading ? (
      <>
        <SkeletonCircle radius={12} />
        <VerticalSpacer height={20} />
      </>
    ) : (
      <Text style={tw`text-center text-lg ${isLongShortName ? "mb-4" : "mb-8"}`}>
        {emoji}
      </Text>
    )}
  </View>
)

export const CategoryCardSkeleton = () => (
  <View
    style={{
      ...tw`flex items-center mx-1 rounded-2xl border border-gray-300 text-gray-600 h-28 p-6 bg-white dark:bg-brand-black`,
      minHeight: 112,
    }}
  >
    <View style={tw`flex-1 flex-col items-center justify-center w-10`}>
      <View style={tw`rounded-full`}>
        <SkeletonCircle radius={12} />
      </View>
      <SkeletonText height={12} width={30} />
    </View>
  </View>
)

export default CategoryCard
