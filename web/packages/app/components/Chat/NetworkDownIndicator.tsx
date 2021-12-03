import { useStreamChatTheme } from "app/hooks/useStreamChatTheme"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Spinner, useTheme } from "stream-chat-expo"

const styles = StyleSheet.create({
  networkDownContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  networkDownText: {
    marginLeft: 10,
  },
  networkDownTextLarge: {
    fontSize: 16,
    fontWeight: "700",
  },
})

export const NetworkDownIndicator: React.FC<{ titleSize: "small" | "large" }> = ({
  titleSize = "small",
}) => {
  const {
    colors: { black },
  } = useStreamChatTheme()

  return (
    <View style={styles.networkDownContainer}>
      <Spinner />
      <Text
        style={[
          styles.networkDownText,
          {
            color: black,
          },
          titleSize === "large" ? styles.networkDownTextLarge : {},
        ]}
      >
        Searching for Network
      </Text>
    </View>
  )
}
