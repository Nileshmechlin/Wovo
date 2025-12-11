import React, {useState} from 'react';
import {View, Button, StyleSheet, StatusBar, Text, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {LeftArrow, warningRed} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import {Switch} from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WelcomeNotificationControl = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(false);
  const [valueOne, setValueOne] = useState(false);

  return (
    <View style={styles.container}>
      <View style={tw`flex-col justify-between h-[98%] px-[4%]`}>
        <View style={tw`my-[20%]`}>
        <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`font-MontserratBlack text-primary  text-2xl`}>
            Never miss a message from someone great
            </Text>
          </TouchableOpacity>
         

          <View style={tw`bg-[#E0E0E0] h-36 rounded-xl my-12 p-6`}>
            <View style={tw`flex-row justify-between py-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>Enable Notifications</Text>
              <Switch value={valueOne} offColor={'gray'} onColor={'black'} onValueChange={setValueOne} />
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`font-MontserratBold text-primary`}>Disable Notifications</Text>
              <Switch value={value}  offColor={'gray'} onColor={'black'} onValueChange={setValue} />
            </View>
          </View>
        </View>

        <View
          style={tw`z-2 flex mx-auto mb-0 top-0 items-center justify-center px-[4%]`}>
          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <TButton
              onPress={() => navigation?.navigate('basicInfo')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeNotificationControl;
