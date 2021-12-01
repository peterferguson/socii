import { BottomSheetModal } from "@gorhom/bottom-sheet"
import {
  CenteredColumn,
  CenteredRow,
  CreateUsernameModal,
  RoundButton,
  SignUpFirstModal,
  TextInputWithCharacterCounter,
} from "app/components"
import SelectorModal, { SelectorOption } from "app/components/SelectorModal"
import { useAuth, useModal } from "app/hooks"
import { checkGroupNameExists, createGroup } from "app/lib/firebase/db"
import tw from "app/lib/tailwind"
import { ArrowSquareDown, Lock, ProfileCircle } from "iconsax-react-native"
import debounce from "lodash/debounce"
import { useRouter } from "app/navigation/use-router"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Dimensions, Pressable, Switch, Text, TextInputProps, View } from "react-native"
import { MaskedTextInput } from "react-native-mask-text"

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
  const [groupName, setGroupName] = useState("")
  const [monthlySubscription, setMonthlySubscription] = useState(0)
  const [initialDeposit, setInitialDeposit] = useState(0)
  const [groupType, setGroupType] = useState(GROUP_PRIVACY_OPTIONS[0])
  const [isValidGroupName, setisValidGroupName] = useState(false)
  const [groupNameTaken, setGroupNameTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const router = useRouter()
  const modalRef = React.useRef<BottomSheetModal>(null)
  const usernameCreationModalRef = React.useRef<BottomSheetModal>(null)
  const groupTypeModalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent: openGroupTypeModal, handleClose: closeGroupTypeModal } =
    useModal(groupTypeModalRef)
  const { handlePresent: openSignInModal } = useModal(modalRef)
  const { handlePresent: openUsernameModal } = useModal(usernameCreationModalRef)

  const handlePress = React.useCallback(() => {
    if (!user?.username) {
      openUsernameModal()
      return
    }
    if (!user) {
      openSignInModal()
      return
    }
    if (groupName && isValidGroupName && !groupNameTaken)
      createGroup(user, groupName, groupType, initialDeposit, monthlySubscription).then(
        () => router.push(`/groups/${groupName}`)
      )
  }, [
    user?.username,
    isValidGroupName,
    groupNameTaken,
    groupName,
    groupType,
    initialDeposit,
    monthlySubscription,
  ])

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
        <SelectInitialDeposit
          initialDeposit={initialDeposit}
          setInitialDeposit={setInitialDeposit}
        />
        <SelectMonthlySubscription
          monthlySubscription={monthlySubscription}
          setMonthlySubscription={setMonthlySubscription}
        />
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
      <CreateUsernameModal modalRef={usernameCreationModalRef} />
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

const SelectInitialDeposit = ({ initialDeposit, setInitialDeposit }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <CenteredColumn>
      <CenteredRow style={tw`justify-between w-full my-2`}>
        <CenteredColumn style={tw`items-start flex-5`}>
          <Text style={tw`font-poppins-400 text-sm`}>Initial deposit</Text>
          <Text
            style={tw`font-poppins-400 text-tiny mx-2 mb-2`}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            A sum of money that each member will need when joining the group
          </Text>
        </CenteredColumn>
        <Switch
          style={tw`flex-1`}
          trackColor={{ false: "#767577", true: tw.color("brand") }}
          thumbColor={isEnabled ? "#f3f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </CenteredRow>
      {isEnabled && (
        <PriceRadioButtonsWithCustomInput
          maximumValue={1000}
          value={initialDeposit}
          onValueChange={value => setInitialDeposit(value)}
        />
      )}
    </CenteredColumn>
  )
}

const SelectMonthlySubscription = ({ monthlySubscription, setMonthlySubscription }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <CenteredColumn>
      <CenteredRow style={tw`justify-between w-full my-2`}>
        <CenteredColumn style={tw`items-start flex-5`}>
          <Text style={tw`font-poppins-400 text-sm`}>Monthly payment</Text>
          <Text
            style={tw`font-poppins-400 text-tiny mx-2 mb-2`}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Set up a monthly subscription that your group will be investing with each
            month
          </Text>
        </CenteredColumn>
        <Switch
          style={tw`flex-1`}
          trackColor={{ false: "#767577", true: tw.color("brand") }}
          thumbColor={isEnabled ? "#f3f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </CenteredRow>
      {isEnabled && (
        <PriceRadioButtonsWithCustomInput
          maximumValue={100}
          value={monthlySubscription}
          onValueChange={value => setMonthlySubscription(value)}
        />
      )}
    </CenteredColumn>
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
      {groupNameTaken && groupName && GROUPNAME_REGEX.test(groupName) ? (
        <Text style={tw`text-red-400 text-xs`}>{`Sorry ${groupName} is taken.`}</Text>
      ) : null}
    </>
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
      style={tw`h-12 w-full -mr-12`}
      value={groupName}
      onChangeText={onChangeText}
      maxLength={15}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder={"groupname"}
      returnKeyType="done"
      {...props}
    />
  )
}

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const RADIO_BUTTON_WIDTH = (SCREEN_WIDTH - 64) / 5
const RADIO_BUTTON_HEIGHT = 40

const PriceRadioButtonsWithCustomInput = ({ maximumValue, value, onValueChange }) => {
  const range = useMemo(() => [10, 5, 4, 2].map(v => maximumValue / v), [maximumValue])

  const [selected, setSelected] = useState(0)
  const [maskedText, setMaskedText] = useState(null)

  useEffect(() => selected !== 4 && setMaskedText(null), [selected])

  return (
    <CenteredRow style={tw`w-full justify-evenly px-2 my-0.5 rounded-lg`}>
      {range.map((v, i) => (
        <Pressable
          key={v}
          style={tw.style(
            `items-center ${v >= 100 ? "mx-5" : "mx-4"} h-10 rounded-lg`,
            {
              backgroundColor:
                selected === i ? tw.color("brand/70") : tw.color("gray-200"),
              width: RADIO_BUTTON_WIDTH,
              height: RADIO_BUTTON_HEIGHT,
            }
          )}
          onPress={() => {
            setSelected(i)
            onValueChange(v)
          }}
        >
          <Text
            style={tw.style(`text-gray-500 ${v >= 100 ? "text-xs py-3 px-2" : "p-3"}`, {
              color: selected === i ? tw.color("white") : tw.color("black"),
            })}
          >
            ${v}
          </Text>
        </Pressable>
      ))}
      <MaskedTextInput
        style={tw.style(
          `items-center justify-center text-center rounded-lg  ${
            value >= 100 || selected !== 4 ? "text-xs mx-5 pb-1" : "mx-4"
          } `,
          {
            backgroundColor:
              selected === 4 ? tw.color("brand/70") : tw.color("gray-200"),
            color: selected === 4 ? tw.color("white") : tw.color("black"),
            width: RADIO_BUTTON_WIDTH,
            height: RADIO_BUTTON_HEIGHT,
          }
        )}
        placeholder={"Custom"}
        value={selected === 4 ? maskedText : null}
        onFocus={() => setSelected(4)}
        mask="$99999"
        onChangeText={(text, rawText) => {
          onValueChange(rawText)
          setMaskedText(text)
        }}
        keyboardType="decimal-pad"
        returnKeyType="done"
        maxLength={5}
      />
    </CenteredRow>
  )
}
