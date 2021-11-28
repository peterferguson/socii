import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useAuth, useModal } from "app/hooks"
import { checkUsernameExists } from "app/lib/firebase/db"
import { createAccount } from "app/lib/firebase/function"
import tw from "app/lib/tailwind"
import debounce from "lodash/debounce"
import React, { useCallback, useEffect, useState } from "react"
import { Text, TextInputProps, View, Keyboard } from "react-native"
import { CenteredColumn } from "./Centered"
import { Modal, ModalBackdrop, ModalHeader } from "./Modal"
import { RoundButton } from "./RoundButton"
import { TextInputWithCharacterCounter } from "./TextInputWithCharacterCounter"
import { UserPhoto } from "./UserPhoto"

export const CreateUsernameModal: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef }) => {
  const scrollPositions = ["75%", "95%"]
  const { user } = useAuth()
  const { handleClose, handleExpand } = useModal(modalRef)

  React.useEffect(() => user?.username && handleClose(), [user, handleClose])

  // - iOS keyboard opening doesnt move the modal to the top ... so handling this manually
  useEffect(() => {
    const keyboardListener = Keyboard.addListener("keyboardDidShow", _keyboardDidShow)
    return () => keyboardListener.remove()
  }, [])

  const _keyboardDidShow = handleExpand

  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      backdropComponent={ModalBackdrop}
      defaultPositionIndex={0}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"To continue you need a username"} />
        <CenteredColumn style={tw`p-4`}>
          <UserPhoto
            containerStyle={tw`items-center justify-center`}
            imageStyle={tw`h-20 w-20 rounded-full`}
            overrideOnPress={handleClose}
          />
          <Text style={tw`text-gray-400 text-tiny mt-2`}>
            Psst... try pressing your profile picture 🤩
          </Text>
          <UsernameSelectionContent />
        </CenteredColumn>
      </View>
    </Modal>
  )
}

const UsernameSelectionContent = ({}) => {
  const { user } = useAuth()
  const [username, setUsername] = useState("")
  const [isValidUsername, setisValidUsername] = useState(false)
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePress = useCallback(async () => {
    if (isValidUsername && !usernameTaken) createAccount({ user, username })
  }, [])

  return (
    <CenteredColumn style={tw`items-center mx-4 my-6`}>
      <CenteredColumn style={tw`items-start`}>
        <SelectUsername
          {...{
            username,
            setUsername,
            isValidUsername,
            setisValidUsername,
            usernameTaken,
            setUsernameTaken,
            setLoading,
          }}
        />
      </CenteredColumn>
      <View style={tw`w-full items-center justify-center mt-4`}>
        <RoundButton
          label={"Create username"}
          onPress={handlePress}
          gradientColors={
            isValidUsername && !usernameTaken
              ? [tw.color("brand"), tw.color("brand/70")]
              : [tw.color("gray-300"), tw.color("gray-300/70")]
          }
          labelStyle={tw`capitalize`}
          textColor={
            isValidUsername && !usernameTaken ? tw.color("white") : tw.color("black")
          }
          showArrow={false}
        />
      </View>
    </CenteredColumn>
  )
}

const SelectUsername = ({
  username,
  setUsername,
  isValidUsername,
  setisValidUsername,
  usernameTaken,
  setUsernameTaken,
  setLoading,
}) => {
  console.log("SelectUsername", { username, isValidUsername, usernameTaken })
  return (
    <>
      <Text style={tw`font-poppins-400 text-sm`}>Username</Text>
      <UsernameTextInput
        {...{
          username,
          setUsername,
          setisValidUsername,
          setUsernameTaken,
          setLoading,
        }}
      />
      {!isValidUsername && username && !USERNAME_REGEX.test(username) ? (
        <Text style={tw`text-red-400 text-xs`}>
          Usernames must be between 3-15 characters, and can only contain letters,
          numbers, periods and underscores.
        </Text>
      ) : null}
      {usernameTaken && username && USERNAME_REGEX.test(username) ? (
        <Text style={tw`text-red-400 text-xs`}>{`Sorry ${username} is taken.`}</Text>
      ) : null}
    </>
  )
}

const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

interface UsernameTextInputProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setisValidUsername: React.Dispatch<React.SetStateAction<boolean>>
  setUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UsernameTextInput: React.FC<UsernameTextInputProps> = ({
  username,
  setUsername,
  setisValidUsername,
  setUsernameTaken,
  setLoading,
  ...props
}) => {
  const checkGroupNameIsValid = useCallback(
    val =>
      (val > 15 || val < 3 || !USERNAME_REGEX.test(val)) && setisValidUsername(false),
    []
  )

  // TODO: Users not getting the correct feedback on group name creation
  const onChangeText = text => {
    // Force form value typed in form to match correct format
    const val = text
    setLoading(true)
    checkGroupNameIsValid(val)
    setUsername(val)
  }

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async name => {
      if (name.length >= 3) {
        const empty = await checkUsernameExists(name)
        setisValidUsername(empty)
        setUsernameTaken(!empty)
        setLoading(false)
      }
    }, 500),
    []
  )

  // @ts-ignore
  useEffect(() => checkUsername(username), [username])

  return (
    <TextInputWithCharacterCounter
      style={tw`h-12 w-full`}
      value={username}
      onChangeText={onChangeText}
      maxLength={15}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder={"elon_muskett"}
      returnKeyType="done"
      {...props}
    />
  )
}
