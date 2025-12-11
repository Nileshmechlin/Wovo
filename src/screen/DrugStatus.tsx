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
import {usePostStoreUserInfoMutation} from '../redux/apiSlices/authSlice';

type Props = {};
const MMKV = new MMKVStorage.Loader().initialize();

const DrugStatus = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState("");
  const [is_show, setIs_show] = useState<boolean>(false);
  const [data, setData] = useState()
  const [storedData, setStoredData] = useState([])
  const options = ['Yes', 'Occasionally', 'No', 'Prefer not to say'];
  const [postStoreUserInfo, {isLoading, isError}] =
    usePostStoreUserInfoMutation();
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

  const drugs = {value: selectedOptions || value, is_show};
  console.log(drugs);
  useEffect(() => {
    const storedData = MMKV.getString('dataList');
    console.log('storedData', storedData);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStoredData(parsedData)
      if (parsedData?.drugs) {
        setValue(parsedData?.drugs); // Ensure conversion to Date object
      }
    }
  }, []);

  const handleContinue = async () => {
    // Retrieve existing stored data
    const storedString = MMKV.getString('dataList');
    let storedData = [];
  
    if (storedString) {
      try {
        storedData = JSON.parse(storedString);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        storedData = [];
      }
    }
  
    if (!Array.isArray(storedData)) {
      storedData = [];
    }
  
    const drugs = { value: selectedOptions || value, is_show };
  
    const updatedDataList = [...storedData, { drugs }];
  
    MMKV.setString('dataList', JSON.stringify(updatedDataList));
  
    try {
      console.log('storedData++++', storedData);
  
      const formattedData = {
        first_name: storedData.find((item) => item.firstname)?.firstname?.trim() || '',
        last_name: storedData.find((item) => item.LastName)?.LastName?.trim() || '',
        dob: storedData.find((item) => item.dob)?.dob || '',
        address: storedData.find((item) => item.address)?.address || '',
        gender: JSON.stringify(storedData.find((item) => item.gender)?.gender || {}),
        dating_with: storedData.find((item) => item.dating_with)?.dating_with || '',
        height: storedData.find((item) => item.height)?.height || "",
        passions: storedData.find((item) => item.passions)?.passions || [],
        ethnicity: JSON.stringify(storedData.find((item) => item.ethnicity)?.ethnicity || {}),
        have_children: JSON.stringify(storedData.find((item) => item.have_children)?.have_children || {}),
        home_town: JSON.stringify(storedData.find((item) => item.home_town)?.home_town || {}),
        work_place: JSON.stringify(storedData.find((item) => item.work_place)?.work_place || {}),
        job: JSON.stringify(storedData.find((item) => item.job)?.job || {}),
        school: JSON.stringify(storedData.find((item) => item.school)?.school || {}),
        edu_lvl: JSON.stringify(storedData.find((item) => item.edu_lvl)?.edu_lvl || {}),
        religion: JSON.stringify(storedData.find((item) => item.religion)?.religion || {}),
        drink: JSON.stringify(storedData.find((item) => item.drink)?.drink || {}),
        smoke: JSON.stringify(storedData.find((item) => item.smoke)?.smoke || {}),
        smoke_weed: JSON.stringify(storedData.find((item) => item.smoke_weed)?.smoke_weed || {}),
        drugs: JSON.stringify(storedData.find((item) => item.drugs)?.drugs || {})
      };
  
      console.log(formattedData);
      const response = await postStoreUserInfo(formattedData);
      console.log('++++', response);
    } catch (error) {
      console.log(error);
    }
  
    navigation?.navigate('privacy');
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
            <Text style={tw`font-MontserratBlack text-primary text-2xl`}>
              Do you use drugs?
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

export default DrugStatus;
