import React, { PropsWithChildren, useContext, useState } from "react"

import type { ChannelContextValue } from "stream-chat-expo"

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"

export const isAddMemberBottomSheetData = (
  data: BottomSheetOverlayData
): data is Pick<
  ChannelContextValue<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >,
  "channel"
> => "channel" in data

export type BottomSheetOverlayData =
  | Pick<
      ChannelContextValue<
        AttachmentType,
        ChannelType,
        CommandType,
        EventType,
        MessageType,
        ReactionType,
        UserType
      >,
      "channel"
    >
  | {
      onConfirm: () => void
      title: string
      cancelText?: string
      confirmText?: string
      subtext?: string
    }

export type BottomSheetOverlayContextValue = {
  reset: () => void
  setData: React.Dispatch<React.SetStateAction<BottomSheetOverlayData>>
  data?: BottomSheetOverlayData
}

export const BottomSheetOverlayContext = React.createContext(
  {} as BottomSheetOverlayContextValue
)

export const BottomSheetOverlayProvider = ({
  children,
  value,
}: PropsWithChildren<{
  value?: BottomSheetOverlayContextValue
}>) => {
  const [data, setData] = useState(value?.data)

  const reset = () => {
    setData(value?.data)
  }

  const bottomSheetOverlayContext = {
    data,
    reset,
    setData,
  }
  return (
    <BottomSheetOverlayContext.Provider
      value={bottomSheetOverlayContext as BottomSheetOverlayContextValue}
    >
      {children}
    </BottomSheetOverlayContext.Provider>
  )
}

export const useBottomSheetOverlayContext = () =>
  useContext(BottomSheetOverlayContext) as unknown as BottomSheetOverlayContextValue
