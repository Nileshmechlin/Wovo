import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from '../lib/tailwind';
import TButton from '../components/buttons/TButton';
import {NavigProps} from '../interfaces/NaviProps';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { LeftArrow } from '../assets/icons/icon';

type Props = {};

const Privacy = ({navigation}: NavigProps<null>) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const text =
    'Wovo Love uses third party services to track analytics data, and provide features such as authentication, chat, and share links. Wovo Love uses third party services to track analytics data, and provide features such as authentication, chat, and share links.';
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 items-center justify-center h-[95%] px-[4%]`}>
      <View style={tw`flex-col justify-between `}>
        <View style={tw`  justify-center`}>
        <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
          <View style={tw`w-[90%]`}>
          <Text
            style={tw`font-MontserratBlack text-black text-2xl text-center`}>
            We value your privacy
          </Text>
          
          </View>
          </TouchableOpacity>
         
          <Text
            style={tw`font-MontserratRegular text-black text-sm`}>
            {showMore ? text : text.slice(0, 200) + '...'}
            <TouchableOpacity onPress={toggleShowMore}>
              <Text style={tw`text-blue-800`}>
                {showMore ? 'See Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          </Text>
          <View style={tw`items-center justify-center`}>
            <Image
              style={tw`w-[50%] h-[60%]`}
              source={require('../assets/images/PrivacyPolicy.png')}
            />
          </View>
        </View>

        <View style={tw`my-6`}>
          <View style={tw`justify-center items-center`}>
            <TButton
              onPress={() => navigation?.navigate('createYourProfile')}
              titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
              title="Accept & continue"
              containerStyle={tw`bg-primary w-[90%] rounded-full`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default Privacy;

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
