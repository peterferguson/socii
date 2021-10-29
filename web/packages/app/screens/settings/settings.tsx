import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import MainSettingsComponent from '../../components/MainSettingsComponent';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';


const SettingsScreen = () => {
  const [email, setEmail] = useState(null);
  const { user, signout } = useAuth()
  const [modalVisible, setModalVisible] = React.useState(false);

  const settingsOptions = [
    {title: 'Profile', subTitle: 'Setup your profile picture, username etc.', onPress: () => {}},
    {title: 'Personal Info', subTitle: 'Update yourr personal details and contact info.', onPress: () => {}},
    {title: 'Notifications', subTitle: "Decide which communications you'd like to receieve and how.", onPress: () => {}},
    {title: 'FAQ', subTitle: "FAQ and help.", onPress: () => {}},
    {title: 'Log Out', subTitle: "Leave this session.", onPress: () => {}},
    //{title: 'Delete Account', subTitle: "PERMANTLY DELETE ACCOUT", onPress: () => {}},
  ];

  return (
    <View style={tw`flex-1 flex-col items-center justify-between bg-blue-600`}>
      
        <View style={tw`flex-col items-center pt-10`}>
          {user?.photoUrl ? (
              <Image
                source={user?.photoUrl ? { uri: user.photoUrl } : null}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Text>TMP No Image</Text>
            )}

          <Text style={tw`text-white text-lg`}>
            {user?.username}
          </Text>
        </View>

        <View  style={tw`flex flex-col items-center justify-end w-full`}>
          <MainSettingsComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            settingsOptions={settingsOptions}
          /> 
        </View> 
      
    </View>
  );
};

export default SettingsScreen;
