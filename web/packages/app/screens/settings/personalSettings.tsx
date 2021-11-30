import React, {useEffect, useState, useCallback} from 'react';
import debounce from "lodash/debounce"
import {View, Text, Image, TextInput, Pressable, ScrollView, KeyboardAvoidingView} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';
import { shadowStyle } from '../../utils/shadowStyle';
import { updateUserData } from '../../lib/firebase/client/functions';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, signInWithRedirect} from "firebase/auth"
import { auth, db} from "../../lib/firebase/index"
//import nativeToast from 'native-toast'

// TODO 
// - Batch update all items in one fb call. 
// - Fix scroll to keep box in view with Keyboard
// - Add toasts - attempted nativeToast but failed

const PersonalSettingsScreen = () => {
  const [email, setEmail] = useState(null);
  const { user, signout } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [retrieveEmail, setRetrieveEmail] = useState(null)

  useEffect(()=>{
    if (retrieveEmail){
      console.log("retreiving");
      
      var provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account"
      });
      
      const getEmail= async () => {
        const { user: rawUser } = await signInWithPopup(auth, new GoogleAuthProvider())
        setEmail(user.email)
      }
      getEmail()
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[retrieveEmail])

  const runUpdateDisplayName = async (user, displayName) => {
    updateUserData({uid: user.uid, updateData: {displayName: displayName}}).then((r)=>console.log("update:", r))
  }

  // TODO BUG fix scroll so it automatically scrolls when entered 
  //          currently you need to click into text input first
  return (
    <View style={tw`flex flex-row justify-center`}>
      <View style={{
        ...tw`h-full w-95%  dark:bg-brand-black rounded-tr-xl rounded-tl-xl p-3`,
        ...shadowStyle("xl")}}
      >
        {/* // header info text */}
        <Text style={tw`text-center text-lg text-brand-black pb-3`} >
          Enter you personal and contact details here.
        </Text>
        <Text style={tw`text-center text-pink-400 pb-3`} >
          These options will come soon - keep an eye on our social media for future releases!
        </Text>

        <ScrollView style={{
          ...tw`p-2`,
          ...{flexGrow: 1 } 
          }}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}  
            style={{flexGrow: 1}}             
          >
            {/* // First and Second Names */}
            <View style={tw`flex flex-row`}>
              <View style={tw`w-1/2`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> First Name </Text>
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={user?.displayName.split(" ")[0]}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />           
              </View>
              <View style={tw`w-1/2`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> Second Name </Text>             
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={user?.displayName.split(" ")[1]}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />              
              </View>
            </View>

            {/* // Email */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1 pt-2`}> Email </Text>
            <View style={tw`flex flex-row `}>
            <Pressable 
              style= {tw`bg-brand py-1 px-2 gradient-flow text-white text-xs rounded-2xl border-1 border-black`}
              // onPress={async (e) => {
              // setRetrieveEmail(true)
              // }}
            >
              <Text style={tw`text-white text-sm`}>
                Change Email
              </Text>
              </Pressable>
            </View>

            {/* // Mobile */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1 pt-2`}> Mobile </Text>
            <View style={tw`flex flex-row `}>
              <TextInput
                style={tw`flex h-10 w-full rounded-lg border-colour-gray-500 border-2 p-2`}
                defaultValue={"1234"}
                />
            </View>

            {/* // Address 1 */}
            <Text style={tw`text-brand-black text-lg dark:text-white pb-1 pt-2`}> Address </Text>
            <View style={tw`flex flex-row `}>
              <TextInput
                style={tw`flex h-10 w-full rounded-lg border-colour-gray-500 border-2 p-2`}
                defaultValue={"Address line 1"}
                />
            </View>

            {/* // Postcode and City */}
            <View style={tw`flex flex-row`}>
              <View style={tw`w-1/3`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> Postcode </Text>
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={"postcode"}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />           
              </View>
              <View style={tw`w-2/3 pl-3`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> City </Text>             
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={"city"}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />              
              </View>
            </View>

            {/* // Country and Region */}
            <View style={tw`flex flex-row`}>
              <View style={tw`w-1/2`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> Country </Text>
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={"country"}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />           
              </View>
              <View style={tw`w-1/2 pl-3`}>
                <Text style={tw`text-brand-black text-lg dark:text-white pb-1`}> Region </Text>             
                  <TextInput
                    style={tw`h-10 rounded-lg border-colour-black border-2 p-2`}
                    defaultValue={"region"}
                    onChangeText={()=>{console.log("hi");
                    }}
                  />              
              </View>
            </View>


            <View style={tw`flex flex-row justify-center pt-2`}>
              <Pressable
                style={{
                  ...tw`flex h-10 w-3/12 rounded-lg bg-green-300 p-1 ml-1`,
                  ...shadowStyle("lg")
                }}
                onPress={()=> runUpdateDisplayName(user, displayName)}  
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
  );
};

export default PersonalSettingsScreen;
