import React from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Platform, Button, Pressable, useWindowDimensions } from "react-native"
import { View, Text, TextInput } from "react-native"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import { CenteredColumn, RoundButton, SignUpFirstModal } from "app/components"
import { useAuth, useModal } from "app/hooks"

export default function NewGroupScreen() {
  const { width } = useWindowDimensions()
  const { user } = useAuth()
  const modalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent } = useModal(modalRef)
  const router = useRouter()

  const handlePress = React.useCallback(() => {
    user?.username ? createGroup() : handlePresent()
  }, [user?.username])

  return (
    <>
      <CenteredColumn style={tw`items-start m-4`}>
        <Text style={tw`font-poppins-400 text-sm`}>Group name</Text>
        <Text style={tw`font-poppins-400 text-sm`}>Group type</Text>
        <Text style={tw`font-poppins-400 text-sm`}>Initial deposit</Text>
        <Text style={tw`font-poppins-400 text-sm`}>Monthly payment</Text>
        <RoundButton label={"Create group"} onPress={handlePress} />
      </CenteredColumn>
      <SignUpFirstModal modalRef={modalRef} />
    </>
  )
}

const createGroup = () => {}
