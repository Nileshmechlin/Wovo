import {
   
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from 'react-native';
  import tw from '../lib/tailwind';
  import TButton from '../components/buttons/TButton';
   import { NavigProps } from '../interfaces/NaviProps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { LeftArrow } from '../assets/icons/icon';
  
  type Props = {};
  
  const BasicInfo = ({navigation}: NavigProps<null>) => {
   
  
    
  
    return (
      <View style={tw`flex-1 p-[4%]`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
          </TouchableOpacity>
        <View style={tw`flex-col justify-between`}>
      
          <View style={tw`  justify-center`}>
         
            <Text style={tw`font-MontserratBlack text-black text-2xl text-center`}>The More you share</Text>
            <Text style={tw`font-MontserratBlack text-black text-2xl text-center`}>better we match</Text>
            <View style={tw`items-center justify-center`}>
            <Image style={tw`w-[70%] h-[70%]`} source={require('../assets/images/BasicInfo.png')} />
            </View>
              </View>

            <View
            style={tw``}>
            <View style={tw`w-[90%] mx-auto`}>
              <TButton
              onPress={() => navigation?.navigate('location')}
                titleStyle={tw`text-white font-MontserratBold text-center mx-auto`}
                title="Enter Basic Information"
                containerStyle={tw`bg-primary w-full rounded-3xl`}
              />
            </View>
          </View>
        </View>
  
        <StatusBar backgroundColor={'gray'} translucent={false} />
      </View>
    );
  };
  
  export default BasicInfo;
  
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
  