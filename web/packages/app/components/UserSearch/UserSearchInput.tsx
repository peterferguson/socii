import { UserSearch as UserSearchIcon } from "iconsax-react-native"
import React, { useState } from "react"
import { TextInput } from "react-native"
import { useSearchUsers } from "app/hooks"
import tw from "app/lib/tailwind"
import { CenteredRow } from "../Centered"

const UserSearchInput = ({ onSubmit, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { clearText, searchText, onFocusInput, onChangeSearchText } = useSearchUsers()

  const { onFocus = null, onBlur = null } = props

  return (
    <CenteredRow style={tw`w-11/12 px-1 py-3`}>
      {!isFocused && searchText === "" && (
        <UserSearchIcon
          size="24"
          color={tw.color("brand-black/20")}
          style={tw`absolute left-5`}
        />
      )}
      <TextInput
        autoFocus={false}
        onFocus={() => {
          onFocusInput()
          onFocus && onFocus()
          setIsFocused(true)
        }}
        onChangeText={onChangeSearchText}
        onBlur={() => {
          onBlur && onBlur()
          setIsFocused(false)
        }}
        onSubmitEditing={() => {
          onSubmit(searchText)
          clearText()
          setIsFocused(false)
        }}
        placeholder=""
        placeholderTextColor={tw.color("brand-black")}
        returnKeyType="search"
        value={searchText}
        style={tw`rounded-full border border-brand-black/30 p-4 w-full h-12`}
      />
    </CenteredRow>
  )
}
export default UserSearchInput
