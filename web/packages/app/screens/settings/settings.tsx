import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import MainSettingsComponent from '../../components/MainSettingsComponent';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';
import { useRouter } from '../../navigation/use-router';

const SettingsScreen = () => {
  const { user, signout } = useAuth()
  const router = useRouter()

  // // correct signout
  const settingsOptions = [
    {title: 'Profile', subTitle: 'Setup your profile picture, username etc.', onPress: () => {router.push("/settings/profileSettings")}, icon: "newspaper-outline"},
    {title: 'Personal Info', subTitle: 'Update your personal details and contact info', onPress: () => {router.push("/settings/personalSettings")}, icon: "person-outline"},
    {title: 'Notifications', subTitle: "Decide what you want to hear about", onPress: () => {router.push("/settings/notificationSettings")}, icon: "notifications-outline"},
    {title: 'FAQ', subTitle: "FAQ and help", onPress: () => {router.push("/settings/FAQSettings")}, icon: "help-outline"},
    {title: 'Log Out', subTitle: "Leave this session", onPress: () => {signout("/enter", false)}, icon: "exit-outline"},
    //{title: 'Delete Account', subTitle: "PERMANTLY DELETE ACCOUT", onPress: () => {}},
  ];

  return (
    <View style={tw`flex-1 flex-col items-center justify-between rounded-tr-lg rounded-tl-lg`}>
      
        <View style={tw`flex-col items-center text-brand-black`}>
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
       
          <Text style={tw`text-brand-black font-semibold text-2xl`}>
            {user?.displayName}
          </Text>
        </View>

        <View  style={tw`flex flex-col items-center justify-end`}>
          <MainSettingsComponent
            settingsOptions={settingsOptions}
          /> 
        </View> 
      
    </View>
  );
};

export default SettingsScreen;
