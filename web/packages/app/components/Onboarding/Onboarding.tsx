import tw from "app/lib/tailwind"
import Constants from "expo-constants"
import { useRef, useState, useCallback, useEffect } from "react"
import {
  FlatList,
  Text,
  useWindowDimensions,
  View,
  Pressable,
  Platform,
} from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { SvgProps } from "react-native-svg"
import { CenteredRow, Socii } from ".."
import { CenteredColumn } from "../Centered"
import HeaderText from "../Text/HeaderText"
import * as Updates from "expo-updates"
import {
  AddFriends,
  ManageChats,
  PeopleSearch,
  PublicDiscussion,
  Revenue,
} from "./assets"
import NextButton from "./NextButton"
import Paginator from "./Paginator"

interface OnboardingItemData {
  id: string
  title: string
  description: string
  image?: any
  Component?: React.FC<SvgProps>
}

const onboardingData: OnboardingItemData[] = [
  {
    id: "onboarding-logo-screen",
    title: "Welcome to Roundtable!",
    description: "A totally new social investing experience!",
    Component: props => {
      function onReloadPress() {
        if (Platform.OS === "web") {
          location.reload()
        } else {
          Updates.reloadAsync()
        }
      }
      return (
        <Pressable onPress={onReloadPress}>
          <Socii {...props} height={155} width={155} />
        </Pressable>
      )
    },
  },
  {
    id: "onboarding-screen-1",
    title: "A new way to learn investing!",
    description: "A totally new social investing experience!",
    Component: props => <Revenue {...props} />,
  },
  {
    id: "onboarding-screen-2",
    title: "",
    description: "This is a description of the onboarding screen.",
    Component: props => <PublicDiscussion {...props} />,
  },
  {
    id: "onboarding-screen-3",
    title: "Welcome to the app!",
    description: "This is a description of the onboarding screen.",
    Component: props => <PeopleSearch {...props} />,
  },
  {
    id: "onboarding-screen-4",
    title: "Welcome to socii!",
    description: "A totally new social investing experience!",
    Component: props => <ManageChats {...props} />,
  },
  {
    id: "onboarding-screen-5",
    title: "Add Friends",
    description: "Create a group by simply adding friends to a chat!",
    Component: props => <AddFriends {...props} />,
  },
]

const OnboardingItem = ({ item }: { item: OnboardingItemData }) => {
  const { width } = useWindowDimensions()
  return (
    <CenteredColumn style={tw.style(``, { flex: 1, width })}>
      {item.Component && <item.Component height={width} width={width * 0.9} />}
      <CenteredColumn style={tw`mt-12`}>
        <HeaderText
          text={item.title}
          style={tw`font-poppins-700 text-3xl text-center text-brand-black dark:text-brand-white`}
        />
        <Text
          style={tw`font-poppins-300 mt-2 text-center text-brand-black dark:text-brand-white`}
        >
          {item.description}
        </Text>
      </CenteredColumn>
    </CenteredColumn>
  )
}

const Onboarding = () => {
  const { width } = useWindowDimensions()
  const slidesRef = useRef<FlatList>()

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = withSpring(e.contentOffset.x)
  })

  const currentIndex = useDerivedValue(() => scrollX.value / width, [scrollX])

  const progress = useDerivedValue(
    () => (currentIndex.value * 100) / (onboardingData.length - 1),
    [currentIndex]
  )

  const scrollToNext = useCallback(() => {
    currentIndex.value < onboardingData.length - 1
      ? slidesRef.current.scrollToIndex({ index: Math.floor(currentIndex.value) + 1 })
      : console.log("done")
  }, [currentIndex.value])

  return (
    <CenteredColumn
      style={tw.style(`bg-white dark:bg-brand-black`, {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      })}
    >
      <View style={{ flex: 3 }}>
        <Paginator data={onboardingData} scrollX={scrollX} />
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderScrollComponent={props => (
            <Animated.ScrollView {...props} onScroll={scrollHandler} />
          )}
          bounces={false}
          ref={slidesRef}
          scrollEventThrottle={32}
        />
        <CenteredRow style={tw.style(`mx-8 mb-8 justify-end`, { flex: 1 })}>
          <NextButton progress={progress} scrollToNext={scrollToNext} />
        </CenteredRow>
      </View>
    </CenteredColumn>
  )
}

export default Onboarding
