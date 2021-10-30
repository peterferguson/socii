import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../lib/tailwind';

const MainSettingsComponent = ({
  settingsOptions,
}) => {
  
  return (
    <View style={tw.style(`h-11/12 bg-brand-gray-lightest dark:bg-brand-black rounded-tr-xl rounded-tl-xl`)}>
      <ScrollView >
        {settingsOptions.map(({title, subTitle, onPress}, index) => ( 
          <TouchableOpacity key={title} onPress={onPress}>
            <View
              style={{
                paddingHorizontal: 20, 
                paddingBottom: 5,
                paddingTop: 5,
                
              }}>
              <Text style={{fontSize: 17}}>{title} --> </Text>
              {subTitle && (
                <Text style={{fontSize: 12, opacity: 0.5, paddingTop: 3}}>
                  {subTitle}
                </Text>
              )}
            </View>

            <View style={{height: 0.5, backgroundColor: "#eeeeee"}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainSettingsComponent;
