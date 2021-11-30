import { CenteredColumn, UserPhoto } from "app/components"
import SettingsColumn from "app/components/SettingsColumn"
import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { MessageQuestion } from "iconsax-react-native"

const USER_PHOTO_HEIGHT = 160

const SettingsScreen = () => {
  const { user, signout } = useAuth()
  const router = useRouter()

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

  // TODO: Align icon use with rest of app
  const settingsOptions = [
    {
      title: "Profile",
      subTitle: "Setup your profile picture, username etc.",
      onPress: () => {
        router.push("/settings/profileSettings")
      },
      icon: "newspaper-outline",
    },
    {
      title: "Personal Info",
      subTitle: "Update your personal details and contact info",
      onPress: () => {
        router.push("/settings/personalSettings")
      },
      icon: "person-outline",
    },
    {
      title: "Notifications",
      subTitle: "Decide what you want to hear about",
      onPress: () => {
        router.push("/settings/notificationSettings")
      },
      icon: "notifications-outline",
    },
    {
      title: "FAQ",
      subTitle: "FAQ and help",
      onPress: () => {
        router.push("/settings/FAQSettings")
      },
      icon: "help-outline",
    },
    // {
    //   title: "Log Out",
    //   subTitle: "Leave this session",
    //   onPress: () => {
    //     signout("/enter", false)
    //   },
    //   icon: "exit-outline",
    // },
    //{title: 'Delete Account', subTitle: "PERMANTLY DELETE ACCOUT", onPress: () => {}},
  ]

  return (
    <CenteredColumn style={tw`flex-1 justify-between`}>
      <CenteredColumn>
        {/* <UserPhotoInLogo height={USER_PHOTO_HEIGHT} width={USER_PHOTO_HEIGHT} /> */}
        <UserPhoto
          imageStyle={tw`h-20 w-20 rounded-full mb-4`}
          overrideOnPress={() => {}}
        />
        <Text style={tw`text-brand-black font-poppins-500 text-2xl`}>
          {user?.displayName}
        </Text>
      </CenteredColumn>

      <CenteredColumn style={tw`flex-1 justify-end bg-white mt-8 rounded-t-[5]`}>
        <SettingsColumn settingsOptions={settingsOptions} />
      </CenteredColumn>
    </CenteredColumn>
  )
}

export default SettingsScreen
