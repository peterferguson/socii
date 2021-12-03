import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"
import React, { useContext, useState } from "react"
import type { ChannelState } from "stream-chat"
import type { ChannelContextValue } from "stream-chat-expo"

// type GroupChannelDetailsScreenNavigationProp = StackNavigationProp<
//   StackNavigatorParamList,
//   "GroupChannelDetailsScreen"
// >

export type UserInfoOverlayData = Partial<
  Pick<
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
> & {
  member?: ChannelState<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >["members"][0]
  navigation?: any // GroupChannelDetailsScreenNavigationProp
}

export type UserInfoOverlayContextValue = {
  reset: () => void
  setData: React.Dispatch<React.SetStateAction<UserInfoOverlayData>>
  data?: UserInfoOverlayData
}

export const UserInfoOverlayContext = React.createContext(
  {} as UserInfoOverlayContextValue
)

export const UserInfoOverlayProvider: React.FC<{
  value?: UserInfoOverlayContextValue
}> = ({ children, value }) => {
  const [data, setData] = useState(value?.data)

  const reset = () => {
    setData(value?.data)
  }

  const userInfoOverlayContext = {
    data,
    reset,
    setData,
  }
  return (
    <UserInfoOverlayContext.Provider
      value={userInfoOverlayContext as UserInfoOverlayContextValue}
    >
      {children}
    </UserInfoOverlayContext.Provider>
  )
}

export const useUserInfoOverlayContext = () =>
  useContext(UserInfoOverlayContext) as unknown as UserInfoOverlayContextValue
