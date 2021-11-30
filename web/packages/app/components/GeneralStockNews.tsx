import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useGeneralNews, useModal } from "app/hooks"
import tw from "app/lib/tailwind"
import { FreeNewsItem } from "app/models/rapidNews/FreeNews"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React from "react"
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { OnScroll } from "."
import { shadowStyle } from "../utils/shadowStyle"
import { CenteredColumn, CenteredRow } from "./Centered"
import { Modal, ModalBackdrop, ModalHeader } from "./Modal"
import { NewsItemSkeleton } from "./NewsItem"
import Animated from "react-native-reanimated"
dayjs.extend(calendar)

const GeneralStockNews: React.FC<{ scrollHandler: OnScroll }> = ({ scrollHandler }) => {
  const { news, loading, getMoreArticles, clearArticles } =
    useGeneralNews(`yahoo stocks`)

  return news ? (
    <FlatList
      contentContainerStyle={{
        ...tw`p-2 rounded-2xl`,
        ...shadowStyle("lg"),
      }}
      data={news}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <NewsItem item={item} />}
      // onEndReached={getMoreArticles}
      // onEndReachedThreshold={0.95}
      onRefresh={() => {
        clearArticles()
        getMoreArticles()
      }}
      renderScrollComponent={props => (
        <Animated.ScrollView {...props} onScroll={scrollHandler} />
      )}
      refreshing={loading && news.length > 0}
      ListFooterComponent={() =>
        loading ? (
          <NewsItemSkeleton />
        ) : (
          <TouchableOpacity
            style={tw.style(
              `w-full border border-gray-200 bg-white rounded-lg py-4 items-center my-2`
            )}
            onPress={() => getMoreArticles()}
          >
            <Text>Get more news!</Text>
          </TouchableOpacity>
        )
      }
    />
  ) : null
}

export default GeneralStockNews

const NewsItem = ({ item }: { item: FreeNewsItem }) => {
  const modalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent } = useModal(modalRef)

  return (
    <>
      <Pressable style={tw`w-full bg-white my-1 rounded-lg`} onPress={handlePresent}>
        <CenteredRow style={tw`p-4 w-full`}>
          <Image
            style={tw.style(`flex-1 rounded mr-2`, {
              width: 70,
              height: 70,
              resizeMode: "cover",
            })}
            source={{ uri: item.media }}
          />
          <CenteredColumn style={tw`flex-3 items-start`}>
            <Text style={tw`text-tiniest font-poppins-300 leading-3`}>
              {dayjs(item.published_date).calendar()}
            </Text>
            <Text style={tw`text-xs font-poppins-400 pb-0.5`} numberOfLines={3}>
              {item.title}
            </Text>
            <Text style={tw`text-gray-300 text-tiny font-poppins-400`}>
              Source: {item.author}
            </Text>
          </CenteredColumn>
        </CenteredRow>
      </Pressable>
      <NewsModal modalRef={modalRef} item={item} />
    </>
  )
}

const NewsModal: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
  item: FreeNewsItem
}> = ({ modalRef, item }) => {
  const scrollPositions = ["85%"]

  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      backdropComponent={ModalBackdrop}
      detach={true}
      defaultPositionIndex={0}
      bottomInset={100}
    >
      {item ? (
        <View style={tw`overflow-hidden flex-1 items-center py-2`}>
          <ModalHeader modalRef={modalRef} label={"News"} />
          <CenteredColumn style={tw`flex-1`}>
            <CenteredRow style={tw`p-4`}>
              <Image
                style={tw.style(`flex-1 rounded mr-4`, {
                  width: 70,
                  height: 70,
                  resizeMode: "cover",
                })}
                source={{ uri: item.media }}
              />
              {item.title ? (
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  style={tw`flex-4 text-lg font-open-sans-600 mb-4`}
                >
                  {item.title}
                </Text>
              ) : null}
            </CenteredRow>

            <View
              style={tw.style(`flex-1 mx-4 mb-2`, {
                borderTopWidth: 1,
                borderTopColor: "#ccc",
              })}
            >
              <ScrollView contentContainerStyle={tw`px-2 my-2`}>
                {[
                  item.summary.split("\n").map((line, index) => (
                    <Text
                      key={`line-${index}`}
                      style={tw`text-sm my-2 font-open-sans-400`}
                    >
                      {line}
                    </Text>
                  )),
                ]}

                {/* <Text style={tw`font-poppins-200`}>{item.body}</Text> */}
              </ScrollView>
            </View>
          </CenteredColumn>
        </View>
      ) : null}
    </Modal>
  )
}
