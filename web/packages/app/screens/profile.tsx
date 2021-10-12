import React from "react"
import { View, Text } from "react-native"
import tw from "../lib/tailwind"
export default function ProfileScreen() {
  return (
    <View>
      <View>
        <View style={tw.style("md:grid md:grid-cols-3 md:gap-6")}>
          <View style={tw.style("md:col-Text-1")}>
            <View style={tw.style("px-4 sm:px-0")}>
              <Text style={tw.style("text-lg font-medium text-gray-900 leading-6")}>
                Profile
              </Text>
              <Text style={tw.style("mt-1 text-sm text-gray-600")}>
                This information will be displayed publicly so be careful what you
                share.
              </Text>
            </View>
          </View>
          <View style={tw.style("mt-5 md:mt-0 md:col-Text-2")}>
            <View>
              <View style={tw.style("shadow sm:rounded-md sm:overflow-hidden")}>
                <View style={tw.style("px-4 py-5 bg-white space-y-6 sm:p-6")}>
                  <View style={tw.style("grid grid-cols-3 gap-6")}>
                    <View style={tw.style("col-Text-3 sm:col-Text-2")}>
                      <Text style={tw.style("block text-sm font-medium text-gray-700")}>
                        Website
                      </Text>
                      <View style={tw.style("flex mt-1 rounded-md shadow-sm")}>
                        <Text
                          style={tw.style(
                            "inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50"
                          )}
                        >
                          http://
                        </Text>
                        {/* <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          style={tw.style("flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm")}
                          // placeholder="www.example.com"
                        /> */}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
