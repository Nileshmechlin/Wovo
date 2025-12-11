import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '../lib/tailwind';
import TButton from '../components/buttons/TButton';
import InputText from '../components/inputs/InputText';
import {NavigProps} from '../interfaces/NaviProps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {LeftArrow} from '../assets/icons/icon';
import MMKVStorage from 'react-native-mmkv-storage';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();
const WelcomeName = ({navigation}: NavigProps<null>) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  console.log(firstName, lastName )

  useEffect(() => {
    MMKV.removeItem('dataList');
    const storedData = MMKV.getString('dataList');
    console.log(storedData)
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFirstName(parsedData[0]?.firstname || '');
      setLastName(parsedData[1]?.LastName || '');
    }
  }, []);

  // Function to save data in the required format
  const handleContinue = () => {
    const dataList = [
      { firstname: firstName },
      { LastName: lastName }
    ];
    
    MMKV.setString('dataList', JSON.stringify(dataList)); // Save as JSON string
    navigation?.navigate('WelcomeDob'); // Navigate to next screen
  };
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`flex-col justify-between h-[98%] px-[4%]`}>
        <View style={tw`my-[10%]  justify-center`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row my-[20%] gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
              What is your name?
            </Text>
          </TouchableOpacity>

          <View style={tw`flex-row gap-2`}>
            <View style={tw`h-14 w-6/12`}>
              <InputText
              onChangeText={(value)=> setFirstName(value)}
                placeholderTextColor={tw`text-black`}
                placeholder="First Name"
                style={tw`font-MontserratRegular`}
                cursorColor={'black'}
                containerStyle={tw`border-0 bg-transparent border-b-2 border-b-black`}
                focusSTyle={tw`text-black`}
                fieldStyle={tw`text-black`}
              />
            </View>
            <View style={tw`h-14 w-6/12`}>
              <InputText
               onChangeText={(value)=> setLastName(value)}
                placeholderTextColor={tw`text-black`}
                placeholder="Last Name"
                style={tw`font-MontserratRegular`}
                cursorColor={'black'}
                containerStyle={tw`border-0 bg-transparent border-b-2 border-b-black`}
                focusSTyle={tw`text-black`}
                fieldStyle={tw`text-black`}
              />
            </View>
          </View>
          <Text
            style={tw`my-6 font-MontserratRegular text-black text-sm px-[4%]`}>
            Last name is optional, and only shared with matches.
          </Text>
        </View>

        <View
          style={tw`z-2 flex mx-auto mb-0 top-0 items-center justify-center px-[4%]`}>
          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <TButton
              onPress={handleContinue}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Continue"
              containerStyle={tw`bg-primary w-[90%] my-2 rounded-full`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={'gray'} translucent />
    </View>
  );
};

export default WelcomeName;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  timer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  resend: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
});
