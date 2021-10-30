import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import MainSettingsComponent from '../../components/MainSettingsComponent';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';
import { useRouter } from '../../navigation/use-router';


const SettingsScreen = () => {
  const [email, setEmail] = useState(null);
  const { user, signout } = useAuth()
  const [modalVisible, setModalVisible] = React.useState(false);
  const router = useRouter()

  // correct signout
  const settingsOptions = [
    {title: 'Profile', subTitle: 'Setup your profile picture, username etc.', onPress: () => {router.push("/settings/profileSettings")}},
    {title: 'Personal Info', subTitle: 'Update yourr personal details and contact info.', onPress: () => {router.push("/settings/personalSettings")}},
    {title: 'Notifications', subTitle: "Decide which communications you'd like to receieve and how.", onPress: () => {router.push("/settings/notificationSettings")}},
    {title: 'FAQ', subTitle: "FAQ and help.", onPress: () => {router.push("/settings/FAQSettings")}},
    {title: 'Log Out', subTitle: "Leave this session.", onPress: () => {signout("/enter/", false)}},
    //{title: 'Delete Account', subTitle: "PERMANTLY DELETE ACCOUT", onPress: () => {}},
  ];

  return (
    <View style={tw`flex-1 flex-col items-center justify-between bg-blue-600`}>
      
        <View style={tw`flex-col items-center`}>
        
          {/* TODO: fully center image.. future TODO: make logo spin */}
          <ImageBackground 
            source = {require('../../../expo/assets/favicon-196x196.png')} 
            resizeMode = 'cover' 
            style= {tw`justify-center items-center w-50 h-50`}
          >
            {user?.photoUrl ? (
              <Image
                source={user?.photoUrl ? { uri: user.photoUrl } : null}
                style={{ width: 100, height: 100, borderRadius: 50}}
              />
            ) : (
              <Text>TMP No Image</Text>
            )}
           
          </ImageBackground>
       
          <Text style={tw`text-white text-lg`}>
            {user?.username}
          </Text>
        </View>

        <View  style={tw`flex flex-col items-center justify-end w-full`}>
          <MainSettingsComponent
            settingsOptions={settingsOptions}
          /> 
        </View> 
      
    </View>
  );
};

export default SettingsScreen;
