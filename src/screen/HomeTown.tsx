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
import InputText from '../components/inputs/InputText';
import {SvgXml} from 'react-native-svg';
import {LeftArrow} from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();

const HomeTown = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState("");
  const [is_show, setIs_show] = useState<boolean>(false);

 
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const home_town = {value, is_show};
  console.log(home_town);
  useEffect(() => {
    const storedData = MMKV.getString('dataList');
    console.log('storedData', storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData?.home_town) {
        setSelectedOptions(parsedData?.home_town); // Ensure conversion to Date object
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
    const updatedDataList = [...dataList, {home_town: home_town}];

    // Save updated data
    MMKV.setString('dataList', JSON.stringify(updatedDataList));

    // Navigate to the next screen
    navigation?.navigate('workPlace');
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-col justify-between h-[95%] px-[4%]`}>
      <View style={tw`my-[10%]`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row my-6 gap-4`}>
          <SvgXml xml={LeftArrow} width={25} height={25} />
          <View style={tw`w-[90%]`}>
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
              Where is your home town?
            </Text>
          </View>
        </TouchableOpacity>

        <View style={tw`h-14 my-12`}>
          <InputText
            onChangeText={value => setValue(value)}
            placeholder="e.g New York USA"
            placeholderTextColor={'black'}
            style={tw`font-MontserratRegular`}
            cursorColor={'black'}
            containerStyle={tw`border-0 bg-transparent border-b-2 border-b-black`}
            focusSTyle={tw`text-black`}
            fieldStyle={tw`text-black`}
          />
        </View>
        <View style={tw`flex-row justify-between my-8`}>
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

      <View style={tw` flex mx-auto my-12 items-center justify-center px-[4%]`}>
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

export default HomeTown;
