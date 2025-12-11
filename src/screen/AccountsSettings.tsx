import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Button,
  StatusBar,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from 'twrnc'; // Assuming Tailwind with 'twrnc' setup
import {EditIcon, LeftArrow, ProfileCameraIcon} from '../assets/icons/icon';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useGetUserQuery,
  usePostUpdateUserImgMutation,
} from '../redux/apiSlices/userSlice';
import {launchImageLibrary} from 'react-native-image-picker';

const AccountSettings = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(false);
  const {data} = useGetUserQuery({});
  const [postUpdateUserImg] = usePostUpdateUserImgMutation();
  console.log('data+++++++', data?.data?.name);
  const selectImage = () => {
    // Open the image picker
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        setImageUri(file.uri); // Update the image URI in state
        uploadImage(file); // Call the function to upload the image
      }
    });
  };

  const uploadImage = async file => {
    // Check if file URI is present
    if (!file.uri) {
      console.log('File URI is missing');
      return;
    }

    // Validate file type (only allow .jpg, .png, .jpeg)
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      console.log(
        'Invalid file type. Please upload a jpg, png, or jpeg image.',
      );
      return;
    }

    // Construct the FormData object
    const formData = new FormData();
    formData.append('avatar', {
      uri: file.uri,
      type: file.type || 'image/jpeg', // Default to 'image/jpeg' if type is missing
      name: file.fileName || 'uploaded_image.jpg', // Default name if missing
    });

    formData.append('_method', 'PUT');

    try {
      console.log('Uploading image with formData:', formData);
      const response = await postUpdateUserImg(formData); // Assuming this is an API function that handles the upload
      console.log('Image uploaded successfully:', response);

      // Handle success response
      if (response && response.success) {
        console.log('Image uploaded successfully!');
        // Update state or do something else after a successful upload
      } else {
        console.log('Failed to upload image:', response.message);
        // Handle the failure case (e.g., show an error message to the user)
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      // Handle any errors during the upload process (e.g., show an error message)
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center my-2 p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={LeftArrow} width={25} height={25} />
            <Text style={tw`text-lg font-MontserratBold text-black`}>
              {' '}
              Account settings
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <ScrollView contentContainerStyle={tw`flex-col justify-between h-[100%]`}>
        <View>
          <View style={tw`items-center mt-4 relative`}>
            <TouchableOpacity onPress={selectImage}>
              <View
                style={tw`w-30 h-30 rounded-full mx-auto justify-center items-center`}>
                <View
                  style={tw`w-30 h-30 rounded-full overflow-hidden mx-auto justify-center items-center `}>
                  {/* {imageUri ? ( */}
                  <Image
                    source={{
                      uri: imageUri?.length ? imageUri : data?.data?.avatar,
                    }}
                    style={tw`w-full h-full `}
                  />
                </View>
                <View
                  style={tw`absolute bg-gray-200 w-8 h-8 items-center justify-center rounded-full left-[60%] top-[80%]`}>
                  <SvgXml style={tw``} xml={EditIcon} />
                </View>
              </View>

              <View style={tw`flex items-center justify-center my-4`}>
                <Text style={tw`text-2xl font-MontserratBold text-black`}>
                  {data?.data?.name}
                </Text>
                <Text style={tw`text-2xl font-MontserratBold text-black`}>
                  {' '}
                  {data?.data?.email}
                </Text>
                {/* <SvgXml xml={VerifiedIcon} width={20} height={20} /> */}
              </View>
            </TouchableOpacity>
            <Text style={tw`mt-2 text-sm font-MontserratRegular text-gray-500`}>
              Upload profile picture or choose avatar
            </Text>
          </View>

          {/* Notification Settings */}
          {/* <View style={tw`p-4 bg-white mt-4 rounded-lg`}>
            <Text style={tw`text-lg font-MontserratBold text-black mb-4`}>
              Notification Settings
            </Text>

            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-black font-MontserratRegular`}>
                Push Notifications
              </Text>
              <Switch
                trackColor={{false: 'gray', true: 'black'}} // Custom track colors
                thumbColor={emailEnabled ? '#FFF' : '#6B7280'} // Custom thumb color
                value={pushEnabled}
                onValueChange={setPushEnabled}
              />
            </View>

            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-black font-MontserratRegular`}>
                E-mail Notifications
              </Text>
              <Switch
                trackColor={{false: 'gray', true: 'black'}} // Custom track colors
                thumbColor={emailEnabled ? '#FFF' : '#6B7280'} // Custom thumb color
                value={emailEnabled}
                onValueChange={setEmailEnabled}
              />
            </View>

            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-black`}>In-app Notifications</Text>
              <Switch
                trackColor={{false: 'gray', true: 'black'}} // Custom track colors
                thumbColor={emailEnabled ? '#FFF' : '#6B7280'} // Custom thumb color
                value={inAppEnabled}
                onValueChange={setInAppEnabled}
              />
            </View>
          </View> */}
        </View>

        {/* Update Password */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('updatePassword')} style={tw`p-4 mt-2`}>
        <Text style={tw`text-blue-500 text-center font-bold`}>
          Update Password
        </Text>
       </TouchableOpacity> */}

        {/* Save Changes Button */}
        <View style={tw`p-4`}>
          <TouchableOpacity style={tw`bg-black py-4 rounded-full`}>
            <Text style={tw`text-center text-white font-bold`}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar translucent={false} />
    </View>
  );
};

export default AccountSettings;
