import { useRouter } from "app/navigation/use-router"
import React from "react"
import { connectInfiniteHits } from "react-instantsearch-native"
import { Dimensions, FlatList, Text } from "react-native"
import { CenteredColumn } from ".."
import Highlight from "./Highlight"

const { width: WINDOW_WIDTH } = Dimensions.get("window")
const HIT_WIDTH = WINDOW_WIDTH - 64

const InfiniteHits = ({ hits, hasMore, refineNext, router }) => (
  <FlatList
    data={hits}
    keyExtractor={item => item.objectID}
    showsVerticalScrollIndicator={false}
    // ItemSeparatorComponent={() => <VerticalSpacer height={2} />}
    //   onEndReached={() => hasMore && refineNext()}
    renderItem={({ item }) => (
      <CenteredColumn
      //   style={tw.style(`border rounded-full`, { width: HIT_WIDTH })}
      >
        <Highlight attribute="name" hit={item} router={router} />
      </CenteredColumn>
    )}
  />
)

export default connectInfiniteHits(InfiniteHits)
