import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import { NavigProps } from '../interfaces/NaviProps';
import { RadioButton, Switch } from 'react-native-ui-lib';
import { SvgXml } from 'react-native-svg';
import { LeftArrow } from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();

const Children = ({ navigation }: NavigProps<null>) => {
    const [value, setValue] = useState(false);
      const [is_show, setIs_show] = useState<boolean>(false);
  const options = [
    "Don't have children",
    'Have children',
    "Don't want children",
    'Want children',
    'Open to children',
    'Prefer not to say',
    
    
  ];

  const [selectedOptions, setSelectedOptions] = useState<string>('');

  // Toggle option selection
  const toggleOption = (option: string) => {
    setSelectedOptions(
      option
      // (prev) =>
      // prev.includes(option)
      //   ? prev.filter((item) => item !== option)
      //   : [...prev, 
      //     option
      //   ]
    );
  };

  // Select a random option
  const selectRandomOption = () => {
    const unselectedOptions = options.filter(
      (option) => !selectedOptions.includes(option)
    );
    if (unselectedOptions.length > 0) {
      const randomOption =
        unselectedOptions[
          Math.floor(Math.random() * unselectedOptions.length)
        ];
      setSelectedOptions((prev) => [...prev, randomOption]);
    }
  };
const have_children = {value:selectedOptions, is_show}
console.log(have_children)
    useEffect(() => {
      const storedData = MMKV.getString('dataList');
      console.log('storedData', storedData);
  
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.have_children) {
          setSelectedOptions(parsedData?.have_children); // Ensure conversion to Date object
        }
      }
    }, []);
    const handleContinue = () => {
      // Retrieve existing stored data
      const storedData = MMKV.getString('dataList');
      let dataList = [];
  
      if (storedData) {
        try {
          dataList = JSON.parse(storedData);
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      }
  
      // Ensure dataList is an array and append new data
      if (!Array.isArray(dataList)) {
        dataList = [];
      }
  
      // Add or update "dob" entry
      const updatedDataList = [...dataList, {have_children: have_children}];
  
      // Save updated data
      MMKV.setString('dataList', JSON.stringify(updatedDataList));
  
      // Navigate to the next screen
      navigation?.navigate('homeTown')
    };

  return (
    <ScrollView contentContainerStyle={tw`flex-col justify-between h-[98%] px-[4%]`}>
     
        <View style={tw`my-[10%]`}>
        <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row my-6 gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
            What about Children?
            </Text>
          </TouchableOpacity>
        
          <View style={tw`my-8 flex-row flex-wrap gap-1`}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => toggleOption(option)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 30,
                  backgroundColor: selectedOptions.includes(option)
                    ? 'black'
                    : 'lightgray',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: selectedOptions.includes(option) ? 'white' : 'black',
                    fontSize: 14,
                    textAlign: 'center',
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={tw`flex-row justify-between`}>
              <Text style={tw`font-MontserratBold text-primary`}>Show on your profile</Text>
              <Switch
               value={is_show} 
               onColor={'black'} offColor={'gray'} 
               onValueChange={setIs_show} />
            </View>
   
        </View>

        <View
          style={tw`z-2 flex mx-auto my-12 items-center justify-center px-[4%]`}
        >
          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <TButton
              onPress={handleContinue}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Continue"
              containerStyle={tw`bg-primary w-[90%] my-2 rounded-full`}
            />
          </View>
        </View>
  

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Children;
