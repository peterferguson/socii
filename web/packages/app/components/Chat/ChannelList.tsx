import React from "react"
import { View, StyleSheet, SectionList, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { useNavigation, useTheme } from "@react-navigation/native"

import { notImplemented } from "app/utils"

import { ChannelListItem } from "./ChannelListItem"
// import { useWatchedChannels } from "./useWatchedChannels"
import { useStream } from "app/hooks/useStream"

export const ChannelList = () => {
  const { client } = useStream()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const changeChannel = channelId => {
    // navigation.navigate("ChannelScreen", {
    //   channelId,
    // })
  }
  const {
    activeChannelId,
    setActiveChannelId,
    unreadChannels,
    readChannels,
    directMessagingConversations,
  } = useWatchedChannels(client)

  const renderChannelRow = (channel, isUnread) => {
    return (
      <ChannelListItem
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
        changeChannel={changeChannel}
        showAvatar={false}
        presenceIndicator
        isUnread={isUnread}
        channel={channel}
        client={client}
        key={channel.id}
        currentUserId={client.user.id}
      />
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.sectionList}
        sections={[
          {
            title: "",
            id: "menu",
            data: [
              {
                id: "threads",
                title: "Threads",
                // icon: <SVGIcon height="14" width="14" type="threads" />,
                handler: notImplemented,
              },
              {
                id: "drafts",
                title: "Drafts",
                // icon: <SVGIcon height="14" width="14" type="drafts" />,
                // handler: () => navigation.navigate("DraftsScreen"),
              },
            ],
          },
          {
            title: "Unread",
            id: "unread",
            data: unreadChannels || [],
          },
          {
            title: "Channels",
            data: readChannels || [],
            clickHandler: () => {
              //   navigation.navigate("ChannelSearchScreen", {
              //     channelsOnly: true,
              //   })
            },
          },
          {
            title: "Direct Messages",
            data: directMessagingConversations || [],
            clickHandler: () => {
              //   navigation.navigate("NewMessageScreen")
            },
          },
        ]}
        keyExtractor={(item, index) => item.id + index}
        SectionSeparatorComponent={props => {
          return <View style={{ height: 5 }} />
        }}
        renderItem={({ item, section }) => {
          if (section.id === "menu") {
            return (
              <TouchableOpacity
                onPress={() => {
                  item.handler && item.handler()
                }}
                style={styles.channelRow}
              >
                <View style={styles.channelTitleContainer}>
                  {item.icon}
                  <Text style={styles.channelTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          }
          return renderChannelRow(item, section.id === "unread")
        }}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section: { title, data, id, clickHandler } }) => {
          if (data.length === 0 || id === "menu") {
            return null
          }

          return (
            <View
              style={[
                styles.groupTitleContainer,
                {
                  backgroundColor: colors.background,
                  borderTopColor: colors.border,
                  borderTopWidth: 1,
                },
              ]}
            >
              <Text style={styles.groupTitle}>{title}</Text>
              {clickHandler && (
                <TouchableOpacity
                  onPress={() => {
                    clickHandler && clickHandler()
                  }}
                  //   style={styles.groupTitleRightButton}
                >
                  <Text style={styles.groupTitleRightButtonText}>+</Text>
                </TouchableOpacity>
              )}
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  headerContainer: {
    margin: 10,
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputSearchBox: {
    padding: 10,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
  groupTitleContainer: {
    paddingTop: 14,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupTitle: {
    fontSize: 14,
  },
  groupTitleRightButton: {
    textAlignVertical: "center",
  },
  groupTitleRightButtonText: {
    fontSize: 25,
  },
  channelRow: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    marginRight: 5,
  },
  channelTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelTitle: {
    padding: 5,
    paddingLeft: 10,
  },
  channelTitlePrefix: {
    fontWeight: "300",
    padding: 1,
  },
})
