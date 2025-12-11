import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';

type DropdownItem = {
  label: string;
  value: string;
};

const data: DropdownItem[] = [
  { label: 'Exploring life, one adventure at a time 🌍✨', value: '1' },
  { label: 'Here for genuine connections and good vibes 🌞', value: '2' },
  { label: 'Looking for someone to join me on spontaneous road trips 🚗💨', value: '3' },
  { label: 'Trying new things and meeting new people—could you be one of them?', value: '4' },
  { label: 'Coffee lover, bookworm, and always down for a deep convo ☕📚', value: '5' },
 
];

const DropdownComponent: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={tw`absolute bg-white left-5 top-2 z-10 px-2 text-sm ${isFocus ? 'text-blue-500' : 'text-gray-500'}`}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={tw` p-4`}>
      {/* {renderLabel()} */}
      <Dropdown
        style={tw`h-12 border text-black border-gray-300 rounded-lg px-2 ${isFocus ? 'border-blue-500' : ''}`}
        placeholderStyle={tw`text-base text-black`}
        searchPlaceholderTextColor='black'
        selectedTextStyle={tw`text-base text-black`}
        inputSearchStyle={tw`h-10 text-base`}
        iconStyle={tw`w-5 h-5`}
        itemTextStyle={tw`text-black`}
        
        data={data}
        // search
        
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Prompt' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={tw`mr-2`}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default DropdownComponent;
