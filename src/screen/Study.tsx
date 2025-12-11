import React, {useEffect, useState} from 'react';
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
import {NavigProps} from '../interfaces/NaviProps';
import {RadioButton, Switch} from 'react-native-ui-lib';
import {SvgXml} from 'react-native-svg';
import {LeftArrow} from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();

const Study = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(false);
  const [is_show, setIs_show] = useState<boolean>(false);
  const options = [
    'High school',
    'Under graduation',
    'Post graduation',
    'Prefer not to say',
  ];

  const [selectedOptions, setSelectedOptions] = useState<string>('');

  // Toggle option selection
  const toggleOption = (option: string) => {
    setSelectedOptions(
      option
      // prev =>
      // prev.includes(option)
      //   ? prev.filter(item => item !== option)
      //   : [...prev, option],
    );
  };

  // Select a random option
  const selectRandomOption = () => {
    const unselectedOptions = options.filter(
      option => !selectedOptions.includes(option),
    );
    if (unselectedOptions.length > 0) {
      const randomOption =
        unselectedOptions[Math.floor(Math.random() * unselectedOptions.length)];
      setSelectedOptions(prev => [...prev, randomOption]);
    }
  };

  const edu_lvl = {value:selectedOptions, is_show}
  console.log(edu_lvl)

  useEffect(() => {
    const storedData = MMKV.getString('dataList');
    console.log('storedData', storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.edu_lvl) {
        setSelectedOptions(parsedData?.edu_lvl); // Ensure conversion to Date object
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
    const updatedDataList = [...dataList, {edu_lvl: edu_lvl}];

    // Save updated data
    MMKV.setString('dataList', JSON.stringify(updatedDataList));

    // Navigate to the next screen
    navigation?.navigate('religion');
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-col justify-between h-[95%] px-[4%]`}>
      {/* <View style={tw``}> */}
      <View style={tw`my-[10%]`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row my-6 gap-4`}>
          <SvgXml xml={LeftArrow} width={25} height={25} />
          <View style={tw`w-[90%]`}>
            <Text style={tw`font-MontserratBlack text-primary text-2xl`}>
              What is the height level of education you attained?
            </Text>
          </View>
        </TouchableOpacity>

        <View style={tw`my-8 flex-row flex-wrap gap-1`}>
          {options.map(option => (
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
              }}>
              <Text
                style={{
                  color: selectedOptions.includes(option) ? 'white' : 'black',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`font-MontserratBold text-primary`}>
            Show on your profile
          </Text>
          <Switch
            value={is_show}
            onColor={'black'}
            offColor={'gray'}
            onValueChange={setIs_show}
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
      {/* </View> */}

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

export default Study;
