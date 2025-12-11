import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../lib/tailwind';
import TButton from '../components/buttons/TButton';
import InputText from '../components/inputs/InputText';
import {RadioButton} from 'react-native-ui-lib';
import {NavigProps} from '../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import {LeftArrow} from '../assets/icons/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  useCreateUserMutation,
  usePostResendOtpMutation,
} from '../redux/apiSlices/authSlice';

type Props = {};

const AccountCreationEmail = ({navigation, route}: NavigProps<null>) => {
  const [value, setValue] = useState(false);
  const [email, setEmail] = useState(false);
  const [postResendOtp, {isLoading, isError}] = usePostResendOtpMutation();
  const [createUser] = useCreateUserMutation();
  // const from = route?.params;
  const from = route?.params?.from;
  console.log('from', from);

  const handleSendOtp = async () => {
    console.log('click', email);
    try {
      if (!email) {
        console.error('Email is required.');
        return;
      }
      const formData = new FormData();
      formData.append('email', email); // Trim unnecessary spaces or newlines

      // Manual logging of FormData in React Native
      console.log('FormData Content:', formData);
      let response;
      if (from === 'Login') {
        response = await postResendOtp(formData).unwrap();
        console.log(response)
      } else if (from === 'createUser') {
        response = await createUser(formData).unwrap();
        console.log("create user response", response)
      } else {
        console.error('Invalid "from" value:', from);
        return;
      }

      console.log('Response:', response);

      if (response) {
        navigation?.navigate('AccountCreationOtpVerificaton', {from});
      } else {
        console.error('OTP request failed:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={tw`flex-col justify-between h-[98%] z-30`}>
        <View style={tw`z-2 flex px-[4%] my-[20%]`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`font-MontserratBold text-primary  text-2xl`}>
              What's your email?
            </Text>
          </TouchableOpacity>
          <View style={tw`h-14`}>
            <InputText
              // value={email}
              onChangeText={value => setEmail(value)}
              placeholder="exam@ple.com"
              placeholderTextColor={tw`text-black font-MontserratRegular`}
              style={tw`font-MontserratRegular`}
              cursorColor={'black'}
              containerStyle={tw`border-0 bg-transparent border-b-2 border-b-black`}
              focusSTyle={tw`text-black`}
              fieldStyle={tw`text-black`}
            />
          </View>
          <View style={tw`my-2`}>
            <RadioButton
              color="black"
              containerStyle={tw`flex items-start my-4`}
              labelStyle={tw`font-MontserratRegular text-primaryText text-sm`}
              label={
                'I do not wish to receive marketing communications about peace products & service'
              }
              selected={value}
              onPress={() => setValue(!value)}
            />
          </View>
        </View>
        <View
          style={tw`z-2 flex mx-auto mb-0 top-0 items-center justify-center px-[4%]`}>
          <Text
            style={tw`font-MontserratRegular text-center text-primaryText  text-sm`}>
            We will send you a text with a verification code. Message and data
            rates may apply
          </Text>

          <View style={tw`my-2 flex items-center justify-center mx-auto`}>
            <TButton
              onPress={handleSendOtp}
              // onPress={() =>
              //   navigation?.navigate('AccountCreationOtpVerificaton', {from})
              // }
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

export default AccountCreationEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  imageBackground: {
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradientOverlay: {
    position: 'absolute', // Overlay on top of the image
    width: '100%', // Full width
    height: '100%', // Full height
    zIndex: 1, // Ensures it overlays the image
  },
});
