import { Ionicons } from "@expo/vector-icons"
import { displayNameExists } from "app/lib/firebase/db/displayNameExists"
import { updateUserData } from "app/lib/firebase/function"
import debounce from "lodash/debounce"
import React, { useCallback, useEffect, useState } from "react"
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"
import { useAuth } from "../../hooks/useAuth"
import tw from "../../lib/tailwind"
import { shadowStyle } from "../../utils/shadowStyle"
//import nativeToast from 'native-toast'

// TODO
// - Batch update all items in one fb call. Currently only displayname works
// - Fix scroll to keep box in view with Keyboard
// - Add toasts - attempted nativeToast but failed

const ProfileSettingsScreen = () => {
  const [email, setEmail] = useState(null)
  const { user, signout } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [initialDisplayName, setInitialDisplayName] = useState(user?.displayName || "")
  const [isValidDisplayName, setisValidUsername] = useState(false)
  const [loading, setLoading] = useState(false)
  const [retrieveEmail, setRetrieveEmail] = useState(null)

  const onChange = text => {
    console.log("un in onchange:", displayName)
    console.log("text :", text)
    console.log("initila :", initialDisplayName)

    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    setLoading(true)
    re.test(text) ? setDisplayName(text) : setDisplayName("")
    setisValidUsername(false)
  }

  // @ts-ignore
  useEffect(() => checkDisplayName(displayName), [displayName])

  useEffect(() => setInitialDisplayName(initialDisplayName), [user?.displayName])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkDisplayName = useCallback(
    debounce(async name => {
      if (name.length >= 3) {
        const empty = await displayNameExists(displayName)
        setisValidUsername(empty)
        setLoading(false)
      }
    }, 500),
    [displayName]
  )

  const runUpdateDisplayName = async (user, displayName) => {
    updateUserData({ uid: user.uid, updateData: { displayName: displayName } }).then(
      r => console.log("update:", r)
    )
  }

  return (
    <View style={tw`flex flex-row justify-center`}>
      <View
        style={{
          ...tw`h-full w-95%  dark:bg-brand-black rounded-tr-xl rounded-tl-xl p-3`,
          ...shadowStyle("xl"),
        }}
      >
        {/* // header info text */}
        <Text style={tw`text-center text-lg text-brand-black pb-3`}>
          This information will be displayed publicly on your profile.
        </Text>
        <Text style={tw`text-center text-pink-400 pb-3`}>
          For now you can change your username.. other options will be enabled soon -
          keep an eye on our social media for future releases!
        </Text>

        <ScrollView style={tw`h-11/12 p-2`}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            {/* // displayName */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}>
              {" "}
              Username{" "}
            </Text>
            <View style={tw`flex flex-row `}>
              <TextInput
                style={tw`flex h-10 w-9/12 rounded-lg border-colour-black border-2 p-2`}
                defaultValue={user?.displayName}
                onChangeText={text => onChange(text)}
              />
              <View style={tw`flex flex-col justify-center`}>
                {initialDisplayName == displayName || isValidDisplayName ? (
                  <Ionicons name="checkmark-circle-outline" size={30} color={"green"} />
                ) : (
                  <Ionicons name="alert-circle-outline" size={30} color={"red"} />
                )}
              </View>
            </View>

            {/* // Website */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1 pt-2`}>
              {" "}
              Website{" "}
            </Text>
            <View style={tw`flex flex-row `}>
              <TextInput
                style={tw`flex h-10 w-11/12 rounded-lg border-colour-gray-500 border-2 p-2`}
                defaultValue={"www.example.com"}
              />
            </View>

            {/* // About */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1 pt-2`}>
              {" "}
              About{" "}
            </Text>
            <View style={tw`flex flex-row `}>
              <TextInput
                style={tw`flex h-40 w-11/12 rounded-lg border-colour-gray-500 border-2 p-2`}
                defaultValue={"Tell everyone about yourself"}
              />
            </View>
            <View style={tw`flex flex-row justify-center pt-2`}>
              <Pressable
                style={{
                  ...tw`flex h-10 w-3/12 rounded-lg bg-green-300 p-1 ml-1`,
                  ...shadowStyle("lg"),
                }}
                onPress={() => runUpdateDisplayName(user, displayName)}
              >
                <View style={tw`flex-1 flex-row justify-center items-center`}>
                  <Text style={tw`text-lg text-white`}>Submit</Text>
                </View>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  )
}

export default ProfileSettingsScreen
