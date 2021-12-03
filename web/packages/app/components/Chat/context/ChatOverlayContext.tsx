import React, { useContext } from "react"

export type BlurTint = "light" | "dark" | "default"

export type Overlay =
  | "addMembers"
  | "alert"
  | "channelInfo"
  | "confirmation"
  | "none"
  | "userInfo"

export type ChatOverlayContextValue = {
  overlay: Overlay
  setOverlay: React.Dispatch<React.SetStateAction<Overlay>>
}
export const ChatOverlayContext = React.createContext<ChatOverlayContextValue>(
  {} as ChatOverlayContextValue
)

export type AppOverlayProviderProps = {
  value?: Partial<ChatOverlayContextValue>
}

export const useChatOverlayContext = () => useContext(ChatOverlayContext)
