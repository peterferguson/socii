import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../lib/tailwind';
import { useRouter } from '../navigation/use-router';
// import AppModal from '../common/AppModal';
// import Icon from '../common/Icon';

const MainSettingsComponent = ({
  modalVisible,
  setModalVisible,
  settingsOptions,
}) => {
  const router = useRouter()
  
  return (
    <View style={tw.style(`h-11/12 bg-brand-gray-lightest dark:bg-brand-black rounded-tr-lg rounded-tl-lg`)}>
      {/* <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        closeOnTouchOutside={false}
        modalBody={
          <View>
            {prefArr.map(({name, selected, onPress}) => (
              <View key={name}>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  {selected && <Icon size={17} name="check" type="material" />}
                  <Text style={{fontSize: 17, paddingLeft: selected ? 15 : 30}}>
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        title="Sort by"
        setModalVisible={setModalVisible}
      /> */}
      <ScrollView >
        {settingsOptions.map(({title, subTitle, onPress}, index) => ( 
          <TouchableOpacity key={title} onPress={() => 
            router.push("/settings/profileSettings")
          }>
            <View
              style={{
                paddingHorizontal: 20, 
                paddingBottom: 10,
                paddingTop: 10,
                
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
