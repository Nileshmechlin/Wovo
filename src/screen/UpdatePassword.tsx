import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Button,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from 'twrnc'; // Assuming Tailwind with 'twrnc' setup
import {CloseIcon, LeftArrow, OpenEyeIcon, ProfileCameraIcon} from '../assets/icons/icon';
import InputText from '../components/inputs/InputText';

const UpdatePassword = ({navigation}) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState<boolean>(false);
  const [showPass, setShowPass] = useState(true)
  const [showConPass, setShowConPass] = useState(true)

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center my-2 p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`text-lg font-MontserratBold text-black`}> Account settings</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View>
        <Text
          style={tw`font-MontserratExtraBold text-black text-2xl px-[4%]`}>
          Create a secure password
        </Text>
      </View>

      {/* Notification Settings */}
      <View style={tw`p-4 bg-white mt-4 rounded-lg`}>
        <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>
          Use at least 8 characters
        </Text>
        <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>
          Use a mix of letters, numbers, and special
        </Text>
        <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>
          character (e.g. : #$!%)
        </Text>
        <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>
          Try combining words and symbols into a
        </Text>
        <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>unique phrase</Text>
      </View>

      {/* Update Password */}
      <View style={tw`relative`}>
      
        <View style={tw`relative w-[90%] mx-auto my-4 h-14`}>
        <InputText
                  onPress={() => setShowPass(!showPass)}
                  // value={values.password}
                  // onChangeText={handleChange('password')}
                  // onBlur={handleBlur('password')}
                  placeholder="Enter Your Password"
                  floatingPlaceholder
                  // secureTextEntry={!showPass}
                  // svgFirstIcon={IconFillPassword}
                  svgSecondIcon={showPass ? CloseIcon : OpenEyeIcon}
                />
        </View>
      </View>
      <View style={tw`relative`}>
        
        <View style={tw`relative w-[90%] mx-auto my-2 h-14`}>
        <InputText
                  onPress={() => setShowConPass(!showConPass)}
                  // value={values.password}
                  // onChangeText={handleChange('password')}
                  // onBlur={handleBlur('password')}
                  placeholder="Enter Confirm Your Password"
                  floatingPlaceholder
                  // secureTextEntry={!showPass}
                  // svgFirstIcon={IconFillPassword}
                  svgSecondIcon={showConPass ? CloseIcon : OpenEyeIcon}
                />
        </View>
      </View>
     

      {/* Save Changes Button */}
      <View style={tw`p-4 my-6`}>
        <TouchableOpacity style={tw`bg-black py-4 rounded-full`}>
          <Text style={tw`text-center text-white font-bold`}>Save changes</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={false}/>
    </ScrollView>
  );
};

export default UpdatePassword;
