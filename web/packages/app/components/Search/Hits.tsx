import React, { useCallback, useState } from "react"
import { connectInfiniteHits } from "react-instantsearch-native"
import { Dimensions, FlatList, Text } from "react-native"
import tw from "app/lib/tailwind"
import { CenteredColumn, Modal, VerticalSpacer } from ".."
import Highlight from "./Highlight"
// import Highlight from "./Highlight"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useModal } from "app/hooks/useModal"

const { width: WINDOW_WIDTH } = Dimensions.get("window")
const HIT_WIDTH = WINDOW_WIDTH - 64

const InfiniteHits = ({ hits, hasMore, refineNext }) => (
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
        <Highlight attribute="name" hit={item} />
      </CenteredColumn>
    )}
  />
)

export default connectInfiniteHits(InfiniteHits)
