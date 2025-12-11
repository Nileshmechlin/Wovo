import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import tw from '../lib/tailwind';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import {SvgXml} from 'react-native-svg';
import {
  CrossIcon,
  EditIcon,
  LogoutIcon,
  ProfileCameraIcon,
  SettingsIcon,
  TickIcon,
  VerifiedIcon,
} from '../assets/icons/icon';
import NormalModal from '../components/modals/NormalModal';
import {NavigProps} from '../interfaces/NaviProps';
import {usePostLogoutMutation} from '../redux/apiSlices/authSlice';
import {getStorageToken, removeStorageToken} from '../utils/utils';
import {useGetUserQuery} from '../redux/apiSlices/userSlice';
import {cross} from '../helper/exportedFunction';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [postLogout, {isLoading, isError}] = usePostLogoutMutation();
  const {data} = useGetUserQuery({});
  // console.log("data+++++++", data?.data?.profile?.images)
  console.log(imageUri);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        setImageUri(file.uri);
        uploadImage(file);
      }
    });
  };

  const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
  };

  const Data = [
    {
      id: 1,
      title: 'Monthly',
      Amount: '20.00/mo',
    },
    {
      id: 2,
      title: '6 Month',
      Amount: '40.00/mo',
    },
    {
      id: 3,
      title: '12 Month',
      Amount: '60.00/mo',
    },
  ];

  const handleSubsriptionModal = () => {
    setOpenModal(true);
  };

  const handleLogout = async () => {
    // console.log('click')
    try {
      const token = getStorageToken();
      console.log('token', token);
      // Trigger your logout API call
      const response = await postLogout(token);
      // console.log('Logout API Response:', response);
      removeStorageToken();
      // Sign out the user using GoogleSignin
      // await GoogleSignin.signOut();
      // console.log('Google Signout Successful');

      // Log success message
      // console.log('User signed out successfully');

      // Navigate to the Login screen
      navigation?.replace('LoadingSplash');

      // Close the logout confirmation modal
      // setLogoutConfirmationModalVisible(false);
    } catch (error) {
      // Handle errors
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading ...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={tw`flex-1  my-12`}>
      <TouchableOpacity
        onPress={handleLogout}
        style={tw`flex-row justify-end px-[4%] gap-4`}>
        <Text style={tw`text-black font-MontserratRegular`}>Logout</Text>
        <SvgXml xml={LogoutIcon} />
      </TouchableOpacity>
      <View style={tw`items-center`}>
        <View onPress={selectImage}>
          <View
            style={tw`w-30 h-30 rounded-full overflow-hidden mx-auto justify-center items-center`}>
            <Image
              source={{uri: imageUri?.length ? imageUri : data?.data?.avatar}}
              style={tw`w-full h-full`}
            />
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
        </View>
      </View>

      <View>
        <View
          style={tw`flex-row mx-auto gap-12 my-12 w-[85%] items-center justify-center`}>
          {/* <TouchableOpacity
            onPress={selectImage}
            style={tw`bg-white p-4 items-center justify-center rounded-lg w-4/12`}>
            <SvgXml xml={ProfileCameraIcon} width={30} height={30} />
            <Text
              style={tw`font-MontserratRegular py-1 text-black text-center`}>
              Add
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('editProfile')}
            style={tw`bg-white p-4 items-center justify-center rounded-lg w-4/12`}>
            <SvgXml xml={EditIcon} width={30} height={30} />
            <Text
              style={tw`font-MontserratRegular py-1 text-black text-center`}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('accountSettings')}
            style={tw`bg-white p-4 items-center justify-center rounded-lg w-4/12`}>
            <SvgXml xml={SettingsIcon} width={30} height={30} />
            <Text
              style={tw`font-MontserratRegular py-1 text-black text-center`}>
              Sttings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <NormalModal
        visible={openModal}
        setVisible={setOpenModal}
        animationType="fade"
        containerStyle={tw`p-4 mt-[10%] border-gray-300`}>
        <View style={tw`bg-white border-gray-300 border p-4 rounded-2xl`}>
          <Text
            style={tw`text-center text-2xl font-MontserratBold text-black py-4`}>
            Your Benifits
          </Text>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <Text style={tw`text-xl font-MontserratBold text-black `}>
              Unlimited Like
            </Text>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <Text style={tw`text-xl font-MontserratBold text-black`}>
              See Who like you
            </Text>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <Text style={tw`text-xl font-MontserratBold text-black`}>
              1 Free bosst per month
            </Text>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <Text style={tw`text-xl font-MontserratBold text-black`}>
              5 free super like per week
            </Text>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <View>
              <Text style={tw`text-xl font-MontserratBold text-black`}>
                Global match
              </Text>
              <Text style={tw`font-MontserratRegular text-black`}>
                Connect and chat with people worldwide.
              </Text>
            </View>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <View>
              <Text style={tw`text-xl font-MontserratBold text-black`}>
                Control your profile
              </Text>
              <Text style={tw`font-MontserratRegular text-black`}>
                Decide what others can see about you.
              </Text>
            </View>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <View>
              <Text style={tw`text-xl font-MontserratBold text-black`}>
                Control who see you
              </Text>
              <Text style={tw`font-MontserratRegular text-black`}>
                Manage your visibility
              </Text>
            </View>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <View>
              <Text style={tw`text-xl font-MontserratBold text-black`}>
                Control who follow you
              </Text>
              <Text style={tw`font-MontserratRegular text-black`}>
                Find the type of people you are looking for
              </Text>
            </View>
          </View>
          <View style={tw`flex-row gap-4`}>
            <SvgXml xml={TickIcon} width={20} height={20} />
            <Text style={tw`text-xl font-MontserratBold text-black`}>
              Add free experiences
            </Text>
          </View>
        </View>

        <View style={tw`flex-row w-[60%] mx-auto justify-between items-center`}>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={tw`mt-4 bg-gray-600 py-2 px-6 rounded-lg`}>
            <Text style={tw`text-white text-center`}>Select</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={tw`mt-4 bg-red-400 py-2 px-6 rounded-lg`}>
            <Text style={tw`text-white text-center`}>Close</Text>
          </TouchableOpacity>
        </View>
      </NormalModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
