import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {LeftArrow, warningRed} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();
const WelcomeDob = ({navigation}: NavigProps<null>) => {
  const [date, setDate] = useState(new Date());
  const [isPickerOpen, setPickerOpen] = useState(false);
  // const [dataList, setdataList] = useState()

  useEffect(() => {
    const storedData = MMKV.getString('dataList');
    console.log("storedData", storedData)
    // setdataList(storedData)
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData[0]?.dob) {
        setDate(new Date(parsedData[0].dob)); // Ensure conversion to Date object
      }
    }
  }, []);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensures two-digit month
  const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit day
  const formattedDate = `${year}-${month}-${day}`;

  console.log('Formatted Date:', formattedDate);

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
    const updatedDataList = [...dataList, { dob: formattedDate }];
  
    // Save updated data
    MMKV.setString('dataList', JSON.stringify(updatedDataList));
  
    // Navigate to the next screen
    navigation.navigate('location');
  };
  

  const calculateAge = (birthdate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 flex-col justify-between h-[95%] px-[4%]`}>
      <View style={tw`my-[10%`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row my-[10%] gap-4`}>
          <SvgXml xml={LeftArrow} width={25} height={25} />
          <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
            What is your date of birth
          </Text>
        </TouchableOpacity>

        <View style={tw`flex items-center my-4 justify-center `}>
          <DatePicker
            onDateChange={value => setDate(value)}
            open={isPickerOpen}
            date={date}
            mode="date"
            onConfirm={selectedDate => {
              setPickerOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => setPickerOpen(false)}
            // minuteInterval={15} // Allows selecting minutes in 5-minute intervals
            // mode="datetime" // Picker mode: 'date', 'time', or 'datetime'\
            textColor="#007AFF"
            style={tw`bg-white`}
          />
        </View>
        <Text
          style={tw`font-MontserratBold my-4 text-primary text-2xl text-center`}>
          Age: {calculateAge(date)} Years
        </Text>
        <View style={tw`flex-row gap-4 my-2`}>
          <SvgXml xml={warningRed} width={25} height={25} />
          <Text style={tw`text-black font-MontserratRegular`}>
            Age can’t be changed later
          </Text>
        </View>
      </View>

      <View
        style={tw`z-2 flex mx-auto my-12 items-center justify-center px-[4%]`}>
        <View style={tw`my-2 flex items-center justify-center mx-auto`}>
          <TButton
            onPress={handleContinue}
            // onPress={() => navigation?.navigate('WelcomeNotification')}
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

export default WelcomeDob;
