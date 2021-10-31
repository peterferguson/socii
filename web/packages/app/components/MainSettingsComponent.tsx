import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../lib/tailwind';
import { shadowStyle } from '../utils/shadowStyle';
import { Ionicons } from '@expo/vector-icons'

//TODO
// - Correct colours and set arrows to end of each line

const MainSettingsComponent = ({
  settingsOptions,
}) => {
  
  return (
    <View style={{
      ...tw`h-11/12 dark:bg-brand-black rounded-tr-xl rounded-tl-xl`,
      ...shadowStyle("md")}}
      >
      <ScrollView >
        {settingsOptions.map(({title, subTitle, onPress, icon}, index) => ( 
          <TouchableOpacity key={title} onPress={onPress}>

            <View style={tw`flex flex-col justify-center`}>
              <View style={tw`flex flex-row justify-left pl-2 pr-2`}>

                <View style={tw`flex justify-center`}>
                  <Ionicons name={icon} size={30} color={"black"}  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 20, 
                    paddingBottom: 5,
                    paddingTop: 7,
                    
                  }}>
                  <Text style={{fontSize: 17}}>{title}</Text>
                  {subTitle && (
                    <Text style={{fontSize: 12, opacity: 0.5, paddingTop: 1}}>
                      {subTitle}
                    </Text>
                  )}
                </View>
                { title != "Log Out" ? (
                <View style={tw`flex flex-col justify-center right-0`}>
                  <Ionicons name="arrow-forward-outline" size={20} color={"blue-300"}  />
                </View>
                ):(
                  null
                )
                }
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainSettingsComponent;
