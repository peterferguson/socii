import { BottomSheetModal } from "@gorhom/bottom-sheet"
import {
  CenteredColumn,
  CenteredRow,
  RoundButton,
  SignUpFirstModal,
} from "app/components"
import SelectorModal, { SelectorOption } from "app/components/SelectorModal"
import { useAuth, useModal } from "app/hooks"
import { checkGroupNameExists } from "app/lib/firebase/db"
import tw from "app/lib/tailwind"
import { ArrowSquareDown, Lock, ProfileCircle } from "iconsax-react-native"
import debounce from "lodash/debounce"
import React, { useCallback, useEffect, useState } from "react"
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native"

const GROUPNAME_REGEX = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

/*
 * Group Privacy Settings
 */
export const GROUP_PRIVACY_OPTIONS = [
  {
    label: "Public",
    icon: () => (
      <ProfileCircle size="32" color={tw.color("gray-300")} variant="Outline" />
    ),
    description: "Activity feed, members, investments will be visible to anyone",
  },
  {
    label: "Private",
    icon: () => <Lock size="32" color={tw.color("gray-300")} variant="Outline" />,
    description: "Activity feed, members, investments will be visible to group only",
  },
] as SelectorOption[]

export default function NewGroupScreen() {
  const { user } = useAuth()
  const modalRef = React.useRef<BottomSheetModal>(null)
  const groupTypeModalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent: openGroupTypeModal, handleClose: closeGroupTypeModal } =
    useModal(groupTypeModalRef)
  const { handlePresent: openSignInModal } = useModal(modalRef)

  const handlePress = React.useCallback(() => {
    // user?.username ? createGroup() : handlePresent()
    // tODO: reinstate above
    openSignInModal()
  }, [user?.username])

  const [groupName, setGroupName] = useState("")
  const [groupType, setGroupType] = useState(GROUP_PRIVACY_OPTIONS[0])
  const [isValidGroupName, setisValidGroupName] = useState(false)
  const [groupNameTaken, setGroupNameTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <CenteredColumn style={tw`items-start mx-4 my-6`}>
        <SelectGroupName
          {...{
            groupName,
            setGroupName,
            isValidGroupName,
            setisValidGroupName,
            groupNameTaken,
            setGroupNameTaken,
            setLoading,
          }}
        />
        <SelectGroupPrivacy
          groupType={groupType}
          openGroupTypeModal={openGroupTypeModal}
        />
        <Text style={tw`font-poppins-400 text-sm`}>Initial deposit</Text>
        <Text style={tw`font-poppins-400 text-sm`}>Monthly payment</Text>
        <View style={tw`w-full mt-4`}>
          <RoundButton
            label={"Create group"}
            onPress={handlePress}
            gradientColors={
              isValidGroupName && !groupNameTaken
                ? [tw.color("brand"), tw.color("brand/70")]
                : [tw.color("gray-300"), tw.color("gray-300/70")]
            }
            labelStyle={tw`capitalize`}
            textColor={
              isValidGroupName && !groupNameTaken
                ? tw.color("white")
                : tw.color("black")
            }
            showArrow={false}
          />
        </View>
      </CenteredColumn>
      <SignUpFirstModal modalRef={modalRef} />
      <SelectorModal
        modalRef={groupTypeModalRef}
        title={"Group type"}
        options={GROUP_PRIVACY_OPTIONS}
        onOptionPress={option => {
          setGroupType(option)
          closeGroupTypeModal()
        }}
      />
    </>
  )
}

const SelectGroupPrivacy = ({ openGroupTypeModal, groupType }) => {
  return (
    <>
      <Text style={tw`font-poppins-400 text-sm`}>Group type</Text>
      <Pressable style={tw`items-start`} onPress={openGroupTypeModal}>
        <CenteredRow>
          <Text style={tw`font-poppins-600 text-lg m-2`}>{groupType.label}</Text>
          <ArrowSquareDown size="16" color={tw.color("black")} variant="Outline" />
        </CenteredRow>
        <Text style={tw`font-poppins-400 text-xs mx-2 mb-2`}>
          {groupType.description}
        </Text>
      </Pressable>
    </>
  )
}

const SelectGroupName = ({
  groupName,
  setGroupName,
  isValidGroupName,
  setisValidGroupName,
  groupNameTaken,
  setGroupNameTaken,
  setLoading,
}) => {
  return (
    <>
      <Text style={tw`font-poppins-400 text-sm`}>Group name</Text>
      <GroupNameTextInput
        {...{
          groupName,
          setGroupName,
          setisValidGroupName,
          setGroupNameTaken,
          setLoading,
        }}
      />
      {!isValidGroupName && groupName && !GROUPNAME_REGEX.test(groupName) ? (
        <Text style={tw`text-red-400 text-xs`}>
          Group names must be between 3-15 characters, and can only contain letters,
          numbers, periods and underscores.
        </Text>
      ) : null}
      {groupNameTaken && groupName && !GROUPNAME_REGEX.test(groupName) ? (
        <Text style={tw`text-red-400 text-xs`}>{`Sorry ${groupName} is taken.`}</Text>
      ) : null}
    </>
  )
}

const TextInputWithCharacterCounter: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <CenteredRow style={tw`w-full bg-gray-200 justify-between px-2 rounded-lg my-2`}>
      <TextInput {...props} />
      <Text style={tw`text-xs text-gray-600`}>
        {props.maxLength - props.value.length}
      </Text>
    </CenteredRow>
  )
}

interface GroupNameTextInputProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  groupName: string
  setGroupName: React.Dispatch<React.SetStateAction<string>>
  setisValidGroupName: React.Dispatch<React.SetStateAction<boolean>>
  setGroupNameTaken: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const GroupNameTextInput: React.FC<GroupNameTextInputProps> = ({
  groupName,
  setGroupName,
  setisValidGroupName,
  setGroupNameTaken,
  setLoading,
  ...props
}) => {
  // TODO: Users not getting the correct feedback on group name creation
  const onChangeText = text => {
    // Force form value typed in form to match correct format
    const val = text
    setLoading(true)
    if (val > 15 || val < 3 || !GROUPNAME_REGEX.test(val)) setisValidGroupName(false)
    setGroupName(val)
  }

  // Hit the database for groupName match after each debounced change
  // useCallback is required for debounce to work
  const checkGroupName = useCallback(
    debounce(async name => {
      if (name.length >= 3) {
        const empty = await checkGroupNameExists(name)
        setisValidGroupName(empty)
        setGroupNameTaken(!empty)
        setLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    checkGroupName(groupName)
  }, [groupName])

  return (
    <TextInputWithCharacterCounter
      style={tw`h-12`}
      value={groupName}
      onChangeText={onChangeText}
      maxLength={15}
      placeholder={"groupname"}
      returnKeyType="done"
      {...props}
    />
  )
}
