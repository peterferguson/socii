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
import { useRouter } from "app/navigation/use-router"
import { CARD_WIDTH } from "app/components/GroupSummaryCard"
import { shadowStyle } from "app/utils/shadowStyle"
import { CardFooterButton } from "app/components/CardFooterButton"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()
  const groups = user?.groups || []
  const data = [...groups, "_addNewGroupPlaceHolder"]
  const router = useRouter()

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
        renderItem={({ item: groupName }) =>
          groupName === "_addNewGroupPlaceHolder" ? (
            <CreateNewGroupCard />
          ) : (
            <GroupSummaryCard groupName={groupName} />
          )
        }
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
        <RoundButton
          onPress={() => router.push(`/groups/new`)}
          label={"Get started here!"}
        />
      </CenteredColumn>
    </CenteredColumn>
  )
}

export default GroupPortfolios

const CreateNewGroupCard: React.FC = () => {
  const router = useRouter()
  return (
    <CenteredColumn style={tw`mb-6`}>
      <CenteredColumn
        style={tw.style(`bg-white rounded`, {
          height: CARD_WIDTH - 10,
          width: CARD_WIDTH,
          ...shadowStyle("lg"),
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        })}
      >
        <Text style={tw`text-xl font-poppins-600`}>Want to create a</Text>
        <Text style={tw`text-xl font-poppins-600`}>new group?</Text>
        <Text style={tw`text-3xl`}>👇 </Text>
      </CenteredColumn>
      <CardFooterButton onPress={() => router.push("/groups/new")}>
        <Text
          style={tw.style(
            `text-center p-4 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`,
            { width: CARD_WIDTH }
          )}
        >
          Invite your friends ✌
        </Text>
      </CardFooterButton>
    </CenteredColumn>
  )
}
