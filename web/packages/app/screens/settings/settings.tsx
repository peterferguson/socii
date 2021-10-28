import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import SettingsComponent from '../../components/SettingsComponent';

const SettingsScreen = () => {
  const [email, setEmail] = useState(null);
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
    <SettingsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      settingsOptions={settingsOptions}
    />
  );
};

export default SettingsScreen;
