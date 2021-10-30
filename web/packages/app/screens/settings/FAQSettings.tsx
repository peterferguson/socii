import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import MainSettingsComponent from '../../components/MainSettingsComponent';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';


const FAQSettingsScreen = () => {
  const [email, setEmail] = useState(null);
  const { user, signout } = useAuth()
  const [modalVisible, setModalVisible] = React.useState(false);

  const settingsOptions = [
    {title: 'Profile', subTitle: 'Setup your profile picture, username etc.', onPress: () => {}},
    {title: 'Personal Info', subTitle: 'Update yourr personal details and contact info.', onPress: () => {}},

    //{title: 'Delete Account', subTitle: "PERMANTLY DELETE ACCOUT", onPress: () => {}},
  ];

  return (


          <Text style={tw`text-black text-lg`}>
            FAQ
          </Text>
    


  );
};

export default FAQSettingsScreen;
