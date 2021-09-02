// ! SOURCE: https://github.com/GetStream/stream-chat-react/blob/52f4186011b2ff29aca9557a5126f50efc18ca48/src/components/ChannelSearch/SearchInput.tsx

import React from "react"

import { useTranslationContext } from "stream-chat-react"
import type { ChannelOrUserResponse } from "stream-chat-react"

import {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
} from "stream-chat-react/dist/types/types"

export type ChannelSearchFunctionParams<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
> = {
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setResults: React.Dispatch<
    React.SetStateAction<Array<ChannelOrUserResponse<At, Ch, Co, Ev, Me, Re, Us>>>
  >
  setResultsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSearching: React.Dispatch<React.SetStateAction<boolean>>
}

export type SearchInputProps<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
> = {
  channelSearchParams: {
    setQuery: React.Dispatch<React.SetStateAction<string>>
    setResults: React.Dispatch<
      React.SetStateAction<ChannelOrUserResponse<At, Ch, Co, Ev, Me, Re, Us>[]>
    >
    setResultsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSearching: React.Dispatch<React.SetStateAction<boolean>>
  }
  inputRef: React.RefObject<HTMLInputElement>
  onSearch: (event: React.BaseSyntheticEvent) => void
  query: string
  searchFunction?: (
    params: ChannelSearchFunctionParams<At, Ch, Co, Ev, Me, Re, Us>,
    event: React.BaseSyntheticEvent
  ) => Promise<void> | void
}

export const SearchInput = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>(
  props: SearchInputProps<At, Ch, Co, Ev, Me, Re, Us>
) => {
  const { channelSearchParams, inputRef, onSearch, query, searchFunction } = props

  const { t } = useTranslationContext()

  return (
    <input
      className="str-chat__channel-search-input"
      onChange={(event: React.BaseSyntheticEvent) =>
        searchFunction ? searchFunction(channelSearchParams, event) : onSearch(event)
      }
      placeholder={t("Search for Friends")}
      ref={inputRef}
      type="text"
      value={query}
    />
  )
}
