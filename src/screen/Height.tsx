import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet, StatusBar, Text, ScrollView} from 'react-native';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {RadioButton, RadioGroup, Switch, WheelPicker} from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { LeftArrow } from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';


type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();
const Height = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(false);
  const [valueOne, setValueOne] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  console.log(currentValue.toString().slice(0, 4))

   useEffect(() => {
      const storedData = MMKV.getString('dataList');
      console.log('storedData', storedData);
  
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.height) {
          setValue(parsedData?.height); // Ensure conversion to Date object
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
      const updatedDataList = [...dataList, {height: currentValue}];
  
      // Save updated data
      MMKV.setString('dataList', JSON.stringify(updatedDataList));
  
      // Navigate to the next screen
       navigation?.navigate('passion')
    };
  return (
    <View style={tw`flex-1 flex-col justify-between h-[98%] px-[4%]`}>
     
        <View style={tw``}>
        <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row my-6 gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
            How tall you are?
            </Text>
          </TouchableOpacity>
          <Text style={tw`my-6 font-MontserratBlack text-primary text-2xl`}>
         
          </Text>
          <View style={tw`my-6`}>
            <WheelPicker
           
           items={[
            { label: "4.0' (121 cm)", value: "4.0' (121 cm)" },
            { label: "4.1' (125 cm)", value: "4.1' (125 cm)" },
            { label: "4.2' (127 cm)", value: "4.2' (127 cm)" },
            { label: "4.3' (130 cm)", value: "4.3' (130 cm)" },
            { label: "4.4' (132 cm)", value: "4.4' (132 cm)" },
            { label: "4.5' (137 cm)", value: "4.5' (137 cm)" },
            { label: "4.6' (137 cm)", value: "4.6' (137 cm)" },
            { label: "4.7' (140 cm)", value: "4.7' (140 cm)" },
            { label: "4.8' (142 cm)", value: "4.8' (142 cm)" },
            { label: "4.9' (145 cm)", value: "4.9' (145 cm)" },
            { label: "5.0' (152 cm)", value: "5.0' (152 cm)" },
            { label: "5.1' (155 cm)", value: "5.1' (155 cm)" },
            { label: "5.2' (157 cm)", value: "5.2' (157 cm)" },
            { label: "5.3' (161 cm)", value: "5.3' (161 cm)" },
            { label: "5.4' (163 cm)", value: "5.4' (163 cm)" },
            { label: "5.5' (165 cm)", value: "5.5' (165 cm)" },
            { label: "5.6' (168 cm)", value: "5.6' (168 cm)" },
            { label: "5.7' (170 cm)", value: "5.7' (170 cm)" },
            { label: "5.8' (173 cm)", value: "5.8' (173 cm)" },
            { label: "5.9' (175 cm)", value: "5.9' (175 cm)" },
            { label: "5.10' (178 cm)", value: "5.10' (178 cm)" },
            { label: "5.11' (180 cm)", value: "5.11' (180 cm)" },
            { label: "6.0' (183 cm)", value: "6.0' (183 cm)" },
            { label: "6.1' (185 cm)", value: "6.1' (185 cm)" },
            { label: "6.2' (188 cm)", value: "6.2' (188 cm)" },
            { label: "6.3' (191 cm)", value: "6.3' (191 cm)" },
            { label: "6.4' (193 cm)", value: "6.4' (193 cm)" },
            { label: "6.5' (196 cm)", value: "6.5' (196 cm)" },
            { label: "6.6' (198 cm)", value: "6.6' (198 cm)" },
            { label: "6.7' (201 cm)", value: "6.7' (201 cm)" },
            { label: "6.8' (203 cm)", value: "6.8' (203 cm)" },
            { label: "6.9' (206 cm)", value: "6.9' (206 cm)" },
            { label: "7.0' (213 cm)", value: "7.0' (213 cm)" }
          ]}
          
              initialValue={''}
              onChange={(value) => setCurrentValue(value)}
              // itemHeight={200}
              // labelStyle={tw`text-red-600`}
 
              
            />
          </View>
        </View>

        <View
          style={tw`z-2 flex mx-auto my-12 items-center justify-center px-[4%]`}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Height;
