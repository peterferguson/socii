import React from "react"
import { Platform, Button, Pressable, useWindowDimensions } from "react-native"
import { View, Text, TextInput } from "react-native"
import tw from "../lib/tailwind"
import { useRouter } from "app/navigation/use-router"

export default function NewPlaylistScreen() {
  const { width } = useWindowDimensions()
  const router = useRouter()

  return (
    <>
      <View style={tw`absolute inset-0 flex items-center justify-center p-4 sm:p-6`} />
      <View
        style={{
          ...Platform.select({
            web: {
              backgroundColor: "#333",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 3,
              justifyContent: "space-between",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
            android: tw`flex-1 border border-white rounded-2xl justify-between items-center top-[40%]`,
            ios: {
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            },
          }),
          height: width / 2,
          width: width / 1.5,
          maxHeight: 300,
          maxWidth: 500,
          padding: 24,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>New Playlist</Text>
        <TextInput
          style={[
            {
              color: "white",
            },
            Platform.OS === "web"
              ? {
                  // @ts-ignore
                  outlineStyle: "none",
                }
              : null,
          ]}
          placeholder="Title"
          autoFocus={true}
          accessibilityHint="The title of your playlist"
          returnKeyType="done"
          selectionColor="#7e7f81"
          placeholderTextColor="#7e7f81"
        />

        {Platform.OS !== "ios" ? (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              onPress={() => {
                router.back()
              }}
              title="Cancel"
            />
            <View style={{ width: 8 }} />
            <Pressable
              onPress={() => {
                router.back()
              }}
              style={tw`bg-green-300 rounded-2xl p-4`}
            >
              <Text style={tw`text-green-700`}>Create</Text>
            </Pressable>
          </View>
        ) : (
          <Button
            onPress={() => {
              router.back()
            }}
            title="Create"
          />
        )}
      </View>
    </>
  )
}
