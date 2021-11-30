import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useGeneralNews, useNews, useModal } from "app/hooks"
import { FreeNewsItem } from "app/models/rapidNews/FreeNews"
import React from "react"
import { View, Text, Pressable, Image, ScrollView } from "react-native"
import tw from "app/lib/tailwind"
import { shadowStyle } from "../utils/shadowStyle"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import { CenteredRow, CenteredColumn } from "./Centered"
import { Skeleton } from "@motify/skeleton"
import SkeletonText from "./SkeletonText"
import HorizontalSpacer from "./HorizontalSpacer"
import VerticalSpacer from "./VerticalSpacer"
dayjs.extend(calendar)

const GeneralStockNews: React.FC<{}> = ({ }) => {
  const { news, loading } = useGeneralNews(
    `stock`
  )

  return (
    <>
      <CenteredColumn style={tw`items-start mx-4`}>
        <Text
          style={tw`text-xl my-2 font-poppins-400 text-brand-black dark:text-brand-gray pl-2`}
        >
          Related News
        </Text>
        <View
          style={{
            ...tw`p-2 bg-white rounded-2xl`,
            ...shadowStyle("lg")
          }}
        >
          {!loading
            ? news?.map(item => <NewsItem key={item._id} item={item} />)
            : [1, 2, 3].map(item => <NewsItemSkeleton key={item} />)}
        </View>
      </CenteredColumn>
    </>
  )
}

export default GeneralStockNews

const NewsItem = ({ item }: { item: FreeNewsItem }) => {
  const modalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent } = useModal(modalRef)

  return (
    <>
      <Pressable style={tw`w-full`} onPress={handlePresent}>
        <CenteredRow style={tw`p-4 w-full`}>
          <Image
            style={tw.style(`flex-1 rounded mr-2`, {
              width:  70,
              height:  70,
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

const NewsItemSkeleton = () => (
  <CenteredRow style={tw`p-4 w-full`}>
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

import { Modal, ModalBackdrop, ModalHeader } from "./Modal"

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
            <View style={tw`flex-1 m-4`}>
              {item.title ? (
                <Text style={tw`text-lg font-open-sans-600 mb-4`}>{item.title}</Text>
              ) : null}
              <ScrollView>
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
