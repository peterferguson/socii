import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';
import { shadowStyle } from '../../utils/shadowStyle';
import { updateUserData } from '../../lib/firebase/client/functions';
import {getUserNotificationSettings} from '../../lib/firebase/client/db/index'
import { Ionicons } from '@expo/vector-icons';
//import nativeToast from 'native-toast'

// TODO 
// - Add toasts - attempted nativeToast but failed

const NotificationSettingsScreen = () => {
  const { user } = useAuth()
  const [email, setEmail] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [messages, setMessages] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [initialSettings, setInitialSettings] = useState(null)

  useEffect(()=> {
    if(user?.uid) getUserNotificationSettings(user.uid).then((r)=>setInitialSettings(r))
  }
  , [user.uid])

  useEffect(()=> {
    if(initialSettings) {
      setEmail(initialSettings?.email)
      setMarketing(initialSettings?.marketing)
      setMessages(initialSettings?.messages)
      setUpdates(initialSettings?.updates)
    }
  }
  , [initialSettings])

  const runUpdateNotifications = async (user) => {
    let notifications = {
      email: email,
      marketing: marketing,
      messages: messages,
      updates: updates,
    }
    updateUserData({uid: user.uid, updateData: {notifications: notifications}}).then((r)=>console.log("update:", r))
  }

  const notificationOptions = [
    {title: 'Email', subTitle: 'Recieve our newsletter and interesting updates from the investing world.', onPress: () => setEmail(!email), itemState: email},
    {title: 'Marketing', subTitle: 'Hear about our upcoming events, competitions and more.', onPress: () => setMarketing(!marketing), itemState:marketing},
    {title: 'Messages', subTitle: "Get notifications for chat messages", onPress: () => setMessages(!messages), itemState:messages},
    {title: 'Updates', subTitle: "Be the first to know about new features and releases", onPress: () => setUpdates(!updates), itemState:updates},
  ];

  return (
    <View style={tw`flex flex-row justify-center`}>
      <View style={{
        ...tw`h-full w-95%  dark:bg-brand-black rounded-tr-xl rounded-tl-xl p-3`,
        ...shadowStyle("xl")}}
      >
        {/* // header info text */}
        <Text style={tw`text-center text-lg text-brand-black pb-3`} >
          Decide which communications you'd like to receieve and how.
        </Text>
        <Text style={tw`text-center text-pink-400 pb-3`} >
          These will be enabled soon - keep an eye on our social media for future releases!
        </Text>

        <ScrollView style={tw`p-2 h-full`}>
          {notificationOptions.map(({title, subTitle, onPress, itemState}, index) => (          
            <View style={tw`flex flex-col justify-center`}>
              <View style={tw`flex flex-row justify-left pl-2 pr-2`}>
                <View style={tw`flex justify-center`}>                                     
                  <Pressable
                    style={[{...tw`w-7 h-7 rounded-md border-2 bg-transparent align-items-center`},
                    itemState && {
                      backgroundColor: 'green',
                    }]}
                    onPress={()=>onPress()}>
                    {itemState && <Ionicons name="checkmark" size={24} color="white" />}
                  </Pressable>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20, 
                    paddingBottom: 10,
                    paddingTop: 7,                   
                  }}>
                  <Text style={{fontSize: 17}}>{title}</Text>
                  {subTitle && (
                    <Text style={{fontSize: 12, opacity: 0.5, paddingTop: 1}}>
                      {subTitle}
                    </Text>
                  )}
                </View>
              </View>
            </View>         
          ))}
        
          <View style={tw`flex flex-row p-5 justify-center pt-2`}>
            <Pressable
              style={{
                ...tw`flex h-10 w-3/12 rounded-lg bg-green-100 border-color-black ml-1`,
                ...shadowStyle("lg")
              }}
              onPress={()=> runUpdateNotifications(user)}  
            >
              <View style={tw`flex-1 flex-row justify-center items-center`}>
                <Text style={tw`text-lg text-brand-black`}>Submit</Text> 
              </View>
            </Pressable>
          </View> 
        </ScrollView>     
      </View>
    </View>
  );
};

export default NotificationSettingsScreen;
