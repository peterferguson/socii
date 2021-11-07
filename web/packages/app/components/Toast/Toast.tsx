import Constants from "expo-constants"
import React, { useRef } from "react"
import { Animated, Text, View } from "react-native"

export const Toast = ({ t, updateHeight, offset }) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current // Initial value for opacity: 0
  const posAnim = useRef(new Animated.Value(-80)).current // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: t.visible ? 1 : 0,
      duration: 300,
    }).start()
  }, [fadeAnim, t.visible])

  React.useEffect(() => {
    Animated.spring(posAnim, {
      toValue: t.visible ? offset : -80,
    }).start()
  }, [posAnim, offset, t.visible])

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: t.visible ? 9999 : undefined,
        alignItems: "center",
        opacity: fadeAnim,
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}
    >
      <View
        onLayout={event => updateHeight(t.id, event.nativeEvent.layout.height)}
        style={{
          margin: Constants.statusBarHeight + 10,
          backgroundColor: "#000",
          width: 150,
          borderRadius: "30px",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        key={t.id}
      >
        <Text>{t.icon} </Text>
        <Text
          style={{
            color: "#fff",
            padding: 4,
            flex: 1,
            textAlign: "center",
          }}
        >
          {t.message}
        </Text>
      </View>
    </Animated.View>
  )
}
