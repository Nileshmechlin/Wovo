import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import PromptImg from '../assets/images/promptImg.png';
import {BulbIcon} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import DropdownComponent from '../components/DropDown';
import InputText from '../components/inputs/InputText';
import {usePostStoreProfileMutation} from '../redux/apiSlices/authSlice';

const PromptScreen = ({navigation, route}: NavigProps<null>) => {
  const selectedImages = route?.params?.selectedImages;
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [prompt1, setPrompt1] = useState('');
  const [prompt2, setPrompt2] = useState('');
  const [prompt3, setPrompt3] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log('++++', selectedImages);
  const [postStoreProfile] = usePostStoreProfileMutation();
const prompt = [prompt1, prompt2, prompt3]
console.log(prompt)
  const handleContinue = async () => {
    try {
      const formData = new FormData();
     prompt.forEach((item) => {
      formData.append('prompt[]', item);
     })

      if (Array.isArray(selectedImages) && selectedImages.length > 0) {
        selectedImages.forEach((uri, i) => {
          formData.append('images[]', {
            uri: uri,
            name: `image_${i}.${uri.split('.').pop()}`, // Extract file extension dynamically
            type: `image/${uri.split('.').pop()}`, // Adjust MIME type
          });
        });
      }

      console.log('formData', formData);
      const response = await postStoreProfile(formData);
      console.log('======', response?.data?.success);
      if(response?.data?.success === true){
        navigation?.navigate('likeSendingScreen');
      }else{
        Alert.alert("Something went wrong please try again")
      }
    } catch (error) {
      console.log(error);
    }
   
  };
  return (
    <ScrollView contentContainerStyle={tw`items-center justify-center `}>
      <View style={tw`flex-col justify-between h-screen`}>
        <View style={tw``}>
          <View style={tw`flex-row justify-between m-[4%] px-[4%]`}>
            <TouchableOpacity
              onPress={() => navigation?.navigate('uploadPhotos')}>
              <Text style={tw`font-MontserratBold text-black`}>Cancel</Text>
            </TouchableOpacity>
            <Text style={tw`font-MontserratBold text-primary text-xl`}>
              Add Prompt
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('likeSendingScreen')}>
              <Text style={tw`font-MontserratBold text-blue-700`}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`w-96 h-24 px-[8%] mt-8`}>
            <Text style={tw`text-black font-MontserratBold my-2`}>
              Add Prompt 1
            </Text>
            <InputText
              onChangeText={value => setPrompt1(value)}
              placeholder="Exploring life, one adventure at a time 🌍✨', value: '1"
            />
          </View>
          <View style={tw`w-96 h-24 px-[8%] my-6`}>
            <Text style={tw`text-black font-MontserratBold my-2`}>
              Add Prompt 2
            </Text>
            <InputText
              onChangeText={value => setPrompt2(value)}
              placeholder="Exploring life, one adventure at a time 🌍✨', value: '1"
            />
          </View>
          <View style={tw`w-96 h-24 px-[8%]`}>
            <Text style={tw`text-black font-MontserratBold my-2`}>
              Add Prompt 2
            </Text>
            <InputText
              onChangeText={value => setPrompt3(value)}
              placeholder="Exploring life, one adventure at a time 🌍✨', value: '1"
            />
          </View>

          {/* <View style={tw`border border-gray-100 h-80 rounded-lg `}>
            <Image
              style={tw`w-full h-full`}
              source={{uri: 'http://10.0.80.60:8000/deafult/voyabear_1.jpg'}}
              resizeMode="cover"
            />
          </View> */}

          {/* <View
          style={tw`bg-gray-100 w-[90%] mx-auto my-12 rounded-lg p-5 border border-gray-300 relative`}>
          <SvgXml
            style={tw`absolute top-[-25px] left-[50%] translate-x-[-50%]`}
            width={50}
            height={50}
            xml={BulbIcon}
          />
          <Text style={tw`text-center text-gray-600 text-base`}>
            Tap a photo to add a prompt and make your profile stand out even
            more
          </Text>
        </View> */}
        </View>

        {/* Continue button */}
        <View style={tw`flex items-center`}>
          <TButton
            onPress={handleContinue}
            titleStyle={tw`text-white font-MontserratBold text-center`}
            title="Continue"
            containerStyle={tw`bg-primary w-[90%] my-2 rounded-full`}
          />
        </View>
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default PromptScreen;
