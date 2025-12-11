import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../lib/tailwind';
import TButton from '../components/buttons/TButton';
import {NavigProps} from '../interfaces/NaviProps';
import {useCreateUserMutation} from '../redux/apiSlices/authSlice';

type Props = {};

const AccountCreationOpening = ({navigation}: NavigProps<null>) => {
  const [createUser, {isLoading, isError}] = useCreateUserMutation();
  const handleCreateUser = async () => {
    console.log('click');
    try {
      // await createUser()
    } catch (error) {
      console.log(error);
    }
    navigation?.replace('AccountCreationEmail', {from: 'createUser'});
  };
  return (
    <View>
      <ImageBackground
        source={require('../assets/images/openingImg.png')}
        style={tw`h-[100%] w-[100%]`}
        resizeMode="cover">
        {/* Overlaying gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.99)']} // Transparent at top, darker at bottom
          style={styles.gradientOverlay}
        />
        <View style={tw`flex-col justify-between h-[98%] z-30`}>
          <View style={tw`z-2 flex mx-auto my-24`}>
            <Text
              style={tw`font-MontserratBold text-center text-white  text-4xl`}>
              Wovo Love
            </Text>
            <Text
              style={tw`font-MontserratRegular text-center text-white text-sm`}>
              Love made simple
            </Text>
          </View>
          <View style={tw`z-2 flex mx-auto mb-0 top-0`}>
            <Text
              style={tw`font-MontserratRegular text-center text-white  text-sm`}>
              By creating an account you agree to the{' '}
            </Text>
            <Text
              style={tw`font-MontserratRegular text-center text-white  text-sm`}>
              <Text style={tw`text-blue-800 border-b-white border`}>
                Terms of use
              </Text>{' '}
              and our{' '}
              <Text style={tw`text-blue-800 border-b-white border`}>
                Privacy policy
              </Text>
            </Text>
            <View style={tw`my-2 flex items-center justify-center`}>
              <TButton
                onPress={handleCreateUser}
                // onPress={()=> navigation?.navigate('AccountCreationEmail')}
                titleStyle={tw`text-black font-MontserratBold text-center mx-auto`}
                title="Create Account"
                containerStyle={tw`bg-white w-[90%] my-2 rounded-full`}
              />
              <TButton
                onPress={() =>
                  navigation?.navigate('AccountCreationEmail', {from: 'Login'})
                }
                titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
                title="Sign In"
                containerStyle={tw`bg-primary w-[90%] my-2 rounded-full`}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar backgroundColor={'transparent'} translucent />
    </View>
  );
};

export default AccountCreationOpening;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  imageBackground: {
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
  },
  gradientOverlay: {
    position: 'absolute', // Overlay on top of the image
    width: '100%', // Full width
    height: '100%', // Full height
    zIndex: 1, // Ensures it overlays the image
  },
});
