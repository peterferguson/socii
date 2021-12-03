import { useStream } from "app/hooks/useStream"
import { useStreamChatTheme } from "app/hooks/useStreamChatTheme"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { isOwnUser } from "stream-chat"

const styles = StyleSheet.create({
  unreadContainer: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
})

export const UnreadCountBadge: React.FC = () => {
  const {
    colors: { accent_red },
  } = useStreamChatTheme()

  const { client } = useStream()
  const [count, setCount] = useState<number>()

  useEffect(() => {
    const user = client?.user
    const unreadCount = isOwnUser(user) ? user.total_unread_count : undefined
    setCount(unreadCount)
    const listener = client?.on(
      e => e.total_unread_count && setCount(e.total_unread_count)
    )

    return () => listener && listener.unsubscribe()
  }, [client])

  return (
    <View style={[styles.unreadContainer, { backgroundColor: accent_red }]}>
      {!!count && <Text style={styles.unreadText}>{count > 99 ? "99+" : count}</Text>}
    </View>
  )
}
