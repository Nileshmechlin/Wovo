import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {RadioButton, RadioGroup, Switch} from 'react-native-ui-lib';
import {SvgXml} from 'react-native-svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LeftArrow} from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();
const Choice = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(false);
  const [valueOne, setValueOne] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [choice, setChoice] = useState()
  useEffect(() => {
    const storedData = MMKV.getString('dataList');
    console.log('storedData', storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.gender) {
        setChoice(parsedData?.choice); // Ensure conversion to Date object
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
    const updatedDataList = [...dataList, {dating_with: currentValue}];

    // Save updated data
    MMKV.setString('dataList', JSON.stringify(updatedDataList));

    // Navigate to the next screen
     navigation?.navigate('height')
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 flex-col justify-between items-center px-[4%]`} // move styles here
      style={tw`h-[95%]`}>
      <View style={tw`my-12 px-[4%]`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row gap-4`}>
          <SvgXml xml={LeftArrow} width={25} height={25} />
          <View style={tw`w-[95%]`}>
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
              With whom do you want to date?
            </Text>
          </View>
        </TouchableOpacity>

        <View style={tw`my-6`}>
          <RadioGroup
            initialValue={currentValue}
            onValueChange={setCurrentValue}>
            <RadioButton
              color="black"
              containerStyle={tw` p-4 rounded-3xl`}
              labelStyle={tw`text-primary font-MontserratBold`}
              style={tw``}
              value={'male'}
              label={'Male'}
            />
            <RadioButton
              color="black"
              containerStyle={tw` p-4 rounded-3xl`}
              labelStyle={tw`text-primary font-MontserratBold`}
              style={tw``}
              value={'female'}
              label={'Female'}
              marginT-15
            />
            <RadioButton
              color="black"
              containerStyle={tw` p-4 rounded-3xl`}
              labelStyle={tw`text-primary font-MontserratBold`}
              style={tw``}
              value={'Other'}
              label={'Other'}
              marginT-15
            />
          </RadioGroup>
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

export default Choice;
