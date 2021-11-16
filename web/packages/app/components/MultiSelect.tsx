import tw from "app/lib/tailwind"
import { uncamelCase } from "../utils/uncamelCase"
import React, { useState, useRef } from "react"
import { ArrowSquareDown, CloseCircle, ArrowDown2} from "iconsax-react-native"
import { View, Pressable, Text, ScrollView, TouchableHighlight} from "react-native"
import  { BottomSheetScrollView } from "@gorhom/bottom-sheet"

const Multiselect = ({ items, selectedItems, setSelectedItems }) => {
  const [dropdown, setDropdown] = useState(false)
  const [dropdownItems, setDropdownItems] = useState(items)

  const toggleDropdown = () => setDropdown(!dropdown)
  
  // adds new item to multiselect
  const addTag = (item) => {
    setDropdownItems(dropdownItems.filter((e) => e !== item))
    setSelectedItems(selectedItems.concat(item))
    setDropdown(false)
  }

  // removes item from multiselect
  const removeTag = (item) => {
    setSelectedItems(selectedItems.filter((e) => e !== item))
    setDropdownItems(dropdownItems.concat(item))
  }

  return (
    <View style={tw`flex flex-col items-center w-full mx-auto`}>
      <View style={tw`w-full`}>
        <View style={tw` flex  flex-col items-center`}>
          <View
            style={tw`relative flex-row w-full bg-red-300 p-1 my-2 bg-white border border-gray-300 shadow-sm rounded-md`}
            
            // style={tw(
            //   "flex w-full p-1 my-2 bg-white border border-gray-300 shadow-sm rounded-md",
            //   "umami--click--invest-button-share-modal-toggle-dropdown"
            // )}
          >
            <Pressable style={tw`flex flex-row flex-wrap flex-auto`} onPress={toggleDropdown}>
              {selectedItems.map((tag, index) => {
                return ( 
                  <View
                    key={index}
                    style={tw`flex flex-row items-center justify-center px-2 py-1 m-1 font-medium text-teal-700 bg-teal-100 border border-teal-300 rounded-full`}
                  >
                    <View style={tw`text-xs font-normal`}>
                    <Text >{tag}</Text>
                    </View>
                    <View style={tw`flex flex-row-reverse flex-auto`}>
                      <Pressable onPress={() => removeTag(tag)}>
                        <CloseCircle size={20} />
                      </Pressable>
                    </View>
                  </View>
                )
              })}
              {/* // TODO: Allow input to search the options   */}
              {/* <View style={tw`flex-1`}>
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </View> */}
            </Pressable>
            <Pressable
              style={tw`w-8 py-1 pl-2 pr-1 text-gray-300 border-l border-gray-300`}
              onPress={toggleDropdown}
            >
              <Pressable style={tw`w-6 h-6 text-gray-600 outline-none my-auto`} onPress={toggleDropdown}>
                <ArrowSquareDown size={20} />
              </Pressable>
            </Pressable>
          </View>
        </View>
        {dropdown ? <Dropdown items={dropdownItems} addItem={addTag}></Dropdown> : null}
      </View>
    </View>
  )
}

const Dropdown = ({ items, addItem }) => {
  const scrollViewRef = useRef(null);
  const scrollPosition = useRef<number>(0);

  const toNextPage = () => {
    if (scrollViewRef.current !== null) {
        let scrollValue = scrollPosition.current
        scrollViewRef.current.scrollTo({
            y: (scrollValue + 30),
            animated: true,
        });
        scrollPosition.current = scrollValue + 20
    }
  };
  const toPrevPage = () => {
    if (scrollViewRef.current !== null && scrollViewRef.current>0 ) {
        let scrollValue = scrollPosition.current
        scrollViewRef.current.scrollTo({
            y: (scrollValue - 30),
            animated: true,
        });
        scrollPosition.current = scrollValue + 20
    }
  };
  // TODO: Add dropdown open on dropdown funcitonality
  return (
    
    <View style={tw`absolute  flex flex-col `}>
      <View style={tw`items-center z-0`}>
        <Pressable
        style={tw`w-1/2 border-b border-gray-100 `}
        onPressIn={() => toPrevPage()}
        >         
        <View style={tw`items-center bg-blue-300 p-2 rounded-full`}> 
          <ArrowDown2 size={20}/>
        </View>
        </Pressable> 
      </View>

      <ScrollView
        style={tw` w-10/12  bg-white max-h-56 shadow-lg`}
        scrollToOverflowEnabled={true}
        keyboardDismissMode="on-drag"
        ref={scrollViewRef}
      >
        {items.sort().map((item) => {
          return (
          
            <Pressable
              key={`${item}-key`}
              style={tw`w-full border-b border-gray-100 rounded-t`}
              onPress={() => toNextPage()}
              // onPress={() => addItem(item)}
            >         
            
              <View style={tw`relative flex p-2 mx-2 leading-6 `}> 
                <Text>{uncamelCase(item)}</Text>
              </View>
            </Pressable>
          
          )
        })}
      </ScrollView> 

      <View style={tw`items-center`}>
        <Pressable
        style={tw`w-1/2 border-b border-gray-100 `}
        onPressIn={() => toNextPage()}
        >         
        <View style={tw`items-center bg-blue-300 p-2 rounded-full`}> 
          <ArrowDown2 size={20}/>
        </View>
        </Pressable> 
      </View>
    </View>
  ) 
}

export default Multiselect

// TODO: Implement a better verison of the multiselect
