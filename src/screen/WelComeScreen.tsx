import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../lib/tailwind';
import TButton from '../components/buttons/TButton';
import InputText from '../components/inputs/InputText';
import {RadioButton} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigProps} from '../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import {LeftArrow} from '../assets/icons/icon';

type Props = {};

const WelcomeScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`flex-col justify-between h-[95%]`}>
        <View style={tw`my-[10%]  justify-center px-[4%]`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row my-2 gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw` font-MontserratRegular`}>
              Welcome to Peace app
            </Text>
          </TouchableOpacity>

          <Text style={tw`font-MontserratBlack text-black text-2xl`}>
            Meet. Match. Move On... Together
          </Text>
          <View style={tw`items-center justify-center`}>
            <Image
              style={tw`w-[70%] h-[70%]`}
              source={require('../assets/images/OpeningScreenImg.png')}
            />
          </View>
        </View>

        <View style={tw``}>
          <View style={tw`w-[90%] items-center justify-center flex mx-auto`}>
            <TButton
              onPress={() => navigation?.navigate('WelcomeName')}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Continue"
              containerStyle={tw`bg-primary w-[100%] rounded-3xl`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={'gray'} translucent />
    </View>
  );
};

export default WelcomeScreen;

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
