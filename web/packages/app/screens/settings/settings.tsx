import React, {useState, useEffect} from 'react';
import { Platform, View, Text, Image, ImageBackground, Button, Pressable } from 'react-native';
import MainSettingsComponent from '../../components/MainSettingsComponent';
import { useAuth } from '../../hooks/useAuth';
import tw from '../../lib/tailwind';
import { useRouter } from '../../navigation/use-router';
// import * as ImagePicker from 'expo-image-picker';
// import {
//   UserSearch as UserSearchIcon,
//   CloseCircle as CloseIcon,
// } from "iconsax-react-native"
// import storage from '@react-native-firebase/storage'

const SettingsScreen = () => {
  const { user, signout } = useAuth()
  const router = useRouter()
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);
// **** WARNING - there was a problem with result from image picker. It did not return
//              - uri so a change was made to node module.
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });
  //   const {uri} = result
  //   console.log(uri);

  //   if (!result.cancelled) {
  //     setImage(uri);
  //   }
  // };

  // useEffect(()=>{
  //   const submitPost = async () =>{
      
  //     let storageref = await storage.ref().child('profile-pictures')
  //     console.log("storageref", storageref);
      
  //     let filename = image.substring(image.lastIndexOf('/')+1)
  //     try{
  //       await storageref.put(filename)
  //     } catch {
  //       console.log("erorr");
        
  //     }
  //   }
  //   submitPost()
  // },[image])

  // // TODO correct signout route
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
            <Pressable>
              {user?.photoUrl ? (
                <ImageBackground
                  source={user?.photoUrl ? { uri: user.photoUrl } : null}
                  resizeMode = 'cover'
                  imageStyle={{ borderRadius: 100}}
                  style= {tw`relative justify-center items-center w-25 h-25`}
                >                 
                  {/* <UserSearchIcon
                    size="20"
                    color={tw.color("white")}
                    style={tw`absolute inset-y-0`}
                  />                  */}
                </ImageBackground> 
              ) : (
                <Text>No Image</Text>
              )}
            </Pressable>            
          </ImageBackground>     
          <Text style={tw`text-brand-black font-semibold text-2xl`}>
            {user?.displayName}
          </Text>
        </View>
      
      
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
     

        <View  style={tw`flex flex-col items-center justify-end`}>
          <MainSettingsComponent
            settingsOptions={settingsOptions}
          /> 
        </View> 
      
    </View>
  );
};

export default SettingsScreen;
