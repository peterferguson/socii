import React from "react"
import { useToaster } from "react-hot-toast"
import { View } from "react-native"
import { Toast } from "../Toast/Toast"

const Notifications = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          t={t}
          updateHeight={handlers.updateHeight}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
        />
      ))}
    </View>
  )
}

export default Notifications
