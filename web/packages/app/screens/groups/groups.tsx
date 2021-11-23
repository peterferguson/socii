import React from "react"
import { FlatList, View, Text } from "react-native"
import {
  GroupSummaryCard,
  Paginator,
  CenteredColumn,
  RoundButton,
} from "app/components"
import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedScrollHandler,
} from "react-native-reanimated"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()
  const groups = user?.groups || []
  const data = [...groups, ...groups]

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = withSpring(e.contentOffset.x)
  })

  return groups.length > 0 ? (
    <CenteredColumn style={tw`mx-4 mt-4`}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(groupName, index) => `group-${index}-${groupName}`}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 1}
        renderItem={({ item: groupName }) => <GroupSummaryCard groupName={groupName} />}
        renderScrollComponent={props => (
          <Animated.ScrollView {...props} onScroll={scrollHandler} />
        )}
      />
      <Paginator numPages={data.length} scrollX={scrollX} />
    </CenteredColumn>
  ) : (
    <CenteredColumn style={tw`h-full justify-start`}>
      <CenteredColumn style={tw`h-1/5 w-2/3 my-2`}>
        <Text style={tw`font-poppins-600 text-2xl mb-2`}>No groups yet?</Text>
        <RoundButton onPress={undefined} label={"Get started here!"} />
      </CenteredColumn>
    </CenteredColumn>
  )
}

export default GroupPortfolios
