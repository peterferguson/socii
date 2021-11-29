import DrawerContent from "app/components/DrawerContent"
import React from "react"
import { Platform, useWindowDimensions } from "react-native"
import { createDrawerNavigator } from "./create-drawer-navigator"
import { MainNavigator } from "./main-navigator"
import { NextNavigationProps } from "./types"

const Drawer = createDrawerNavigator()

export function DrawerNavigator({ pageProps, Component }: NextNavigationProps) {
  const dimensions = useWindowDimensions()
  const permanent = dimensions.width > 768 // - permanent on desktop
  return (
    <Drawer.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        drawerType: permanent ? "permanent" : "slide",
        drawerActiveBackgroundColor: "#333",
        drawerInactiveTintColor: "#888",
        drawerActiveTintColor: "white",
        headerTintColor: "white",
      }}
      useLegacyImplementation={Platform.OS === "web"}
      drawerContent={props => <DrawerContent {...props} />}
      Component={Component}
      pageProps={pageProps}
    >
      <Drawer.Screen name="main" component={MainNavigator} />
    </Drawer.Navigator>
  )
}

// type Props = DrawerContentComponentProps<DrawerNavigationProp>

// function DrawerContent(props) {
//   React.useEffect(() => console.log("DrawerContent", props), [])
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerContent}>
//         <View style={styles.userInfoSection}>
//           <TouchableOpacity
//             style={{ marginLeft: 10 }}
//             onPress={() => {
//               props.navigation.toggleDrawer()
//             }}
//           >
//             <Image
//               source={{
//                 uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
//               }}
//               style={tw`h-40 w-40`}
//             />
//           </TouchableOpacity>
//           {/* <Title style={styles.title}>Dawid Urbaniak</Title>
//           <Caption style={styles.caption}>@trensik</Caption> */}
//           <View style={styles.row}>
//             <View style={styles.section}>
//               {/* <Paragraph style={[styles.paragraph, styles.caption]}>202</Paragraph>
//               <Caption style={styles.caption}>Obserwuje</Caption> */}
//             </View>
//             <View style={styles.section}>
//               {/* <Paragraph style={[styles.paragraph, styles.caption]}>159</Paragraph>
//               <Caption style={styles.caption}>Obserwujący</Caption> */}
//             </View>
//           </View>
//         </View>
//         {/* <Drawer.Section style={styles.drawerSection}>
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="account-outline"
//                 color={color}
//                 size={size}
//               />
//             )}
//             label="Profile"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons name="tune" color={color} size={size} />
//             )}
//             label="Preferences"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="bookmark-outline"
//                 color={color}
//                 size={size}
//               />
//             )}
//             label="Bookmarks"
//             onPress={() => {}}
//           />
//         </Drawer.Section>
//         <Drawer.Section title="Preferences">
//           <TouchableRipple onPress={toggleTheme}>
//             <View style={styles.preference}>
//               <Text>Dark Theme</Text>
//               <View pointerEvents="none">
//                 <Switch value={theme === "dark"} />
//               </View>
//             </View>
//           </TouchableRipple>
//           <TouchableRipple onPress={toggleRTL}>
//             <View style={styles.preference}>
//               <Text>RTL</Text>
//               <View pointerEvents="none">
//                 <Switch value={rtl === "right"} />
//               </View>
//             </View>
//           </TouchableRipple>
//         </Drawer.Section>
//     */}
//       </View>
//     </DrawerContentScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   section: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: "bold",
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// })
