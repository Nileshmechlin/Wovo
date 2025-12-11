import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {
  BackgroundIcon,
  BookIcon,
  ChildrenIcon,
  CrossIcon,
  Drinks,
  DrugIcon,
  EducationIcon,
  EnginnerIcon,
  EthinicityIcon,
  HeartIcon,
  HieghtIcon,
  InterestIcon,
  LeftArrow,
  LifeStyle,
  LocationIcon,
  Menicon,
  Message,
  PersonalPromptIcon,
  RedCrossIcon,
  ReligiousIcon,
  SmokeIcon,
  StarIcon,
  TickIcon,
  UnivesityIcon,
  Uparrow,
  UserIcon,
  WeedIcon,
  WorkplaceIcon,
} from '../assets/icons/icon';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import 'react-native-get-random-values';
import InputText from '../components/inputs/InputText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TButton from '../components/buttons/TButton';
import NormalModal from '../components/modals/NormalModal';
import Toast from 'react-native-toast-message';
import {
  useGetPorfileQuery,
  useGetUserQuery,
  usePostUpdateProfileMutation,
} from '../redux/apiSlices/userSlice';
import {Switch} from 'react-native-ui-lib';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePostStoreUserInfoMutation} from '../redux/apiSlices/authSlice';

interface useInfo {
  first_name: string;
  last_name: string;
  dob: string;
  is_notify: string;
  address: string;
  lat: number;
  lng: number;
  max_distance: number;
  age_range: {min_age: string; max_age: string};
  gender: {value: string; is_show: string};
  dating_with: string;
  height: string;
  passions: string[];
  interests: string[];
  ethnicity: {value: string; is_show: string};
  have_children: {value: string; is_show: string};
  home_town: {value: string; is_show: string};
  work_place: {value: string; is_show: string};
  job: {value: string; is_show: string};
  school: {value: string; is_show: string};
  edu_lvl: {value: string; is_show: string};
  religion: {value: string; is_show: string};
  drink: {value: string; is_show: string};
  smoke: {value: string; is_show: string};
  smoke_weed: {value: string; is_show: string};
  drugs: {value: string; is_show: string};
}

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
const EditProfile = ({navigation}) => {
  // const topic: Topic[] = [
  //   'Online Shopping',
  //   'Amateur Cook',
  //   'Anime',
  //   'Horror Films',
  //   'Skincare',
  // ];
  const [selectedItems, setSelectedItems] = useState<Topic[]>([]);
  const [location, setLocation] = useState('');
  const [isShowState, setIsShowState] = useState<Record<string, boolean>>({});
  // console.log("isShowState", isShowState);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  // console.log('150', currentLocation);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [newInterest, setNewInterest] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {data, isLoading, isError} = useGetUserQuery({});
  const {data: profile} = useGetPorfileQuery({});
  const [postStoreUserInfo] = usePostStoreUserInfoMutation();
  const [postUpdateProfile] = usePostUpdateProfileMutation();
  console.log('topics', data?.data);

  const [userData, setUserData] = useState<useInfo>({
    first_name: '',
    last_name: '',
    dob: '',
    is_notify: '',
    address: '',
    lat: 0,
    lng: 0,
    max_distance: 0,
    age_range: {min_age: '', max_age: ''},
    gender: {value: '', is_show: ''},
    dating_with: '',
    height: '',
    passions: [],
    interests: [],
    ethnicity: {value: '', is_show: ''},
    have_children: {value: '', is_show: ''},
    home_town: {value: '', is_show: ''},
    work_place: {value: '', is_show: ''},
    job: {value: '', is_show: ''},
    school: {value: '', is_show: ''},
    edu_lvl: {value: '', is_show: ''},
    religion: {value: '', is_show: ''},
    drink: {value: '', is_show: ''},
    smoke: {value: '', is_show: ''},
    smoke_weed: {value: '', is_show: ''},
    drugs: {value: '', is_show: ''},
  });

  const [profileData, setProfileData] = useState({
    images: [],
    prompt: [],
  });
  console.log('profileData', profileData);

  // State for modal visibility

  // console.log('++++', profile);

  // console.log('user Data+++++++++++++++++', data?.data?.edu_lvl);
  // const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setUserData(prev => ({
        ...prev,
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        dob: data?.data?.dob,
        is_notify: data?.data?.is_notify,
        address: data?.data?.address,
        lat: data?.data?.lat,
        lng: data?.data?.lng,
        max_distance: data?.data?.max_distance,
        age_range: {
          min_age: data?.data?.age_range?.min_age,
          max_age: data?.data?.age_range?.max_age,
        },
        gender: {
          value: data?.data?.gender?.value,
          is_show: data?.data?.gender?.is_show,
        },
        dating_with: data?.data?.dating_with,
        height: data?.data?.height,
        passions: data?.data?.passions,
        interests: data?.data?.interests,
        ethnicity: {
          value: data?.data?.ethnicity?.value,
          is_show: data?.data?.ethnicity?.is_show,
        },
        have_children: {
          value: data?.data?.have_children?.value,
          is_show: data?.data?.have_children?.is_show,
        },
        home_town: {
          value: data?.data?.home_town?.value,
          is_show: data?.data?.home_town?.is_show,
        },
        work_place: {
          value: data?.data?.work_place?.value,
          is_show: data?.data?.work_place?.is_show,
        },
        job: {value: data?.data?.job?.value, is_show: data?.data?.job?.is_show},
        school: {
          value: data?.data?.school?.value,
          is_show: data?.data?.school?.is_show,
        },
        edu_lvl: {
          value: data?.data?.edu_lvl?.value,
          is_show: data?.data?.edu_lvl?.is_show,
        },
        religion: {
          value: data?.data?.religion?.value,
          is_show: data?.data?.religion?.is_show,
        },
        drink: {
          value: data?.data?.drink?.value,
          is_show: data?.data?.drink?.is_show,
        },
        smoke: {
          value: data?.data?.smoke?.value,
          is_show: data?.data?.smoke?.is_show,
        },
        smoke_weed: {
          value: data?.data?.smoke_weed?.value,
          is_show: data?.data?.smoke_weed?.is_show,
        },
        drugs: {
          value: data?.data?.drugs?.value,
          is_show: data?.data?.drugs?.is_show,
        },
      }));

      setIsShowState({
        gender: data.data.gender?.is_show ?? false,
        ethnicity: data.data.ethnicity?.is_show ?? false,
        have_children: data.data.have_children?.is_show ?? false,
        home_town: data.data.home_town?.is_show ?? false,
        work_place: data.data.work_place?.is_show ?? false,
        job: data.data.job?.is_show ?? false,
        school: data.data.school?.is_show ?? false,
        edu_lvl: data.data.edu_lvl?.is_show ?? false,
        religion: data.data.religion?.is_show ?? false,
        drink: data.data.drink?.is_show ?? false,
        smoke: data.data.smoke?.is_show ?? false,
        smoke_weed: data.data.smoke_weed?.is_show ?? false,
        drugs: data.data.drugs?.is_show ?? false,
      });
      setTopics(data?.data?.interests);
      setProfileData({
        images: profile?.data?.images || [],
        prompt: profile?.data?.prompt || [],
      });
    }
  }, [data, profile]);

  const toggleSelection = (item: Topic): void => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(selectedItem => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  // Add new interest to the list
  const addInterest = () => {
    if (newInterest) {
      setTopics(prev => [...prev, newInterest]);
      setNewInterest(''); // Clear the input field after adding
    }
  };

  // Remove interest from the list
  const removeInterest = interestToRemove => {
    setTopics(topics.filter(interest => interest !== interestToRemove));
  };
  const renderItem = ({item}) => (
    <View>
      <View style={tw`relative flex-row items-center mb-2 mr-2`}>
        <View
          style={tw`bg-gray-200 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 text-sm`}>
          <Text style={tw`text-black font-MontserratRegular`}>{item}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeInterest(item)}
        style={tw`absolute bottom-2 right-0 p-1 bg-red-500 text-black rounded-full`}>
        <SvgXml xml={CrossIcon} width={12} height={12} />
      </TouchableOpacity>
    </View>
  );
  // const handleScrollBeginDrag = () => {
  //   setIsSliding(true);
  // };
  const handleSuccess = () => {
    setModalVisible(true);
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'You’re All Set!',
      text2: 'Your profile is now 100% completed.',
    });
  };
  // const GOOGLE_API_KEY = 'AIzaSyBNEIke2SRWsmiDiLuTFn9GG3PSaErmKEE';
  const GOOGLE_API_KEY = 'AIzaSyBOx-P4WZSYeCYMbWa37lP7QMVVSuip9sc';
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // {
          //   title: 'Location Permission',
          //   message: 'This app needs access to your location to display the map.',
          //   buttonNeutral: 'Ask Me Later',
          //   buttonNegative: 'Cancel',
          //   buttonPositive: 'OK',
          // }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const permissionGranted = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionGranted === 'granted') {
          console.log('iOS location permission granted');
          getCurrentLocation();
        } else {
          console.log('iOS location permission denied');
        }
      }
    } catch (err) {
      console.warn('Permission request error:', err);
    }
  };

  // Get the current location
  const getCurrentLocation = () => {
    console.log('Fetching location...');
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position fetched:', position);
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setIsFetchingLocation(false);
      },
      error => {
        console.warn('Error fetching location:', error);
        setIsFetchingLocation(false);
        if (error.code === 3) {
          Alert.alert(
            'Timeout',
            'Location request timed out. Please try again.',
          );
        } else if (error.code === 1) {
          Alert.alert('Permission Denied', 'Please grant location permission.');
        } else if (error.code === 2) {
          Alert.alert('Location Unavailable', 'Unable to fetch location.');
        } else {
          Alert.alert('Error', `Unable to fetch location: ${error.message}`);
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     position => {
  //       console.log('Position updated:', position);
  //       const {latitude, longitude} = position.coords;
  //       setCurrentLocation({
  //         latitude,
  //         longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     error => {
  //       console.warn('Error watching location:', error);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       distanceFilter: 10,
  //     },
  //   );

  //   return () => {
  //     Geolocation.clearWatch(watchId);
  //   };
  // }, []);

  // Handle location fetching states
  if (isFetchingLocation) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-textPrimary`}>Fetching location...</Text>
      </View>
    );
  }

  if (!currentLocation) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-textPrimary`}>Unable to fetch location.</Text>
      </View>
    );
  }

  //================= handle isShow=====================================

  const handleToggle = (key: string, value: boolean) => {
    setIsShowState(prev => ({
      ...prev,
      [key]: value,
    }));

    setUserData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        is_show: value,
      },
    }));
  };

  // ======================image area===========================
  const handleAddPhoto = () => {
    // Open the image picker to select a new image
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Add the selected image to the images array
        setProfileData(prevState => ({
          ...prevState,
          images: [...prevState.images, response.assets[0].uri], // Use the URI of the selected image
        }));
      }
    });
  };

  const handleDeletePhoto = index => {
    // Remove photo from the images array by index
    setProfileData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleChangePhoto = index => {
    // Open the image picker to change the existing image
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // Update the image at the selected index
        const updatedImages = [...profileData.images];
        updatedImages[index] = response.assets[0].uri;
        setProfileData(prevState => ({
          ...prevState,
          images: updatedImages,
        }));
      }
    });
  };

  // ++++++++++++++++++++++++++ Save button action ++++++++++++++++++++++++++++++++++++++
  const handleStoreInfo = async () => {
    try {
      const formattedData = {
        first_name: userData.first_name?.trim() || '',
        last_name: userData.last_name?.trim() || '',
        dob: userData.dob || '',
        address: userData.address || '',
        gender: JSON.stringify({
          value: userData.gender.value || '',
          is_show: isShowState.gender
        }),
        dating_with: userData.dating_with || '',
        height: userData.height || '',
        passions: userData.passions || [],
        ethnicity: JSON.stringify({
          value: userData.ethnicity?.value || '',
          is_show: isShowState?.ethnicity,
        }),
        have_children: JSON.stringify({
          value: userData.have_children?.value || '',
          is_show: isShowState?.have_children,
        }),
        home_town: JSON.stringify({
          value: userData.home_town?.value || '',
          is_show: isShowState?.home_town,
        }),
        work_place: JSON.stringify({
          value: userData.work_place?.value || '',
          is_show: isShowState?.work_place,
        }),
        job: JSON.stringify({
          value: userData.job?.value || '',
          is_show: isShowState?.job,
        }),
        school: JSON.stringify({
          value: userData.school?.value || '',
          is_show: isShowState?.school,
        }),
        edu_lvl: JSON.stringify({
          value: userData.edu_lvl?.value || '',
          is_show: isShowState?.edu_lvl,
        }),
        religion: JSON.stringify({
          value: userData.religion?.value || '',
          is_show: isShowState?.religion,
        }),
        drink: JSON.stringify({
          value: userData.drink?.value || '',
          is_show: isShowState?.drink,
        }),
        smoke: JSON.stringify({
          value: userData.smoke?.value || '',
          is_show: isShowState?.smoke,
        }),
        smoke_weed: JSON.stringify({
          value: userData.smoke_weed?.value || '',
          is_show: isShowState?.smoke_weed,
        }),
        drugs: JSON.stringify({
          value: userData.drugs?.value || '',
          is_show: isShowState?.drugs,
        }),
        age_range: JSON.stringify(userData.age_range || {}),
        interests: topics || [], // Updated to use setTopics data
        max_distance: userData.max_distance || 0,
        is_notify: userData.is_notify || 0,
        lat: userData.lat || '',
        lng: userData.lng || '',
      };
      showToast();
      console.log('Formatted Data:', formattedData);

      const response = await postStoreUserInfo(formattedData);
      console.log('API Response:', response);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleEditProfile = async () => {
    console.log('handle edit profile');
    try {
      console.log('try catch block', profileData?.images);
      const formData = new FormData();
      profileData?.images.forEach((image, index) => {
        formData.append(`images[${index}]`, {
          uri: image,
          type: 'image/jpeg', // Ensure correct MIME type
          name: `image_${index}.jpg`,
        });
      });
      // formData?.append("_method", "PATCH")
      // formData?.append('prompt', profileData?.prompt)
      console.log('prompt data++++++++++++++++++++++', profileData?.prompt);
      profileData?.prompt.forEach(item => {
        formData.append('prompt[]', item);
      });

      console.log('formData', formData);
      const res = await postUpdateProfile(formData);
      if (res?.data?.success === true) {
        showToast();
      }
      console.log('profile update res', res?.data?.success);
    } catch (error) {
      console.log(error);
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
    <ScrollView
      style={tw`flex-1 `}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`flex-row gap-4 my-6 p-[4%]`}>
        <SvgXml xml={LeftArrow} width={30} height={30} />
        <Text style={tw`font-MontserratBold text-2xl text-black`}>
          Edit your info.
        </Text>
      </TouchableOpacity>

      <View style={tw`pb-2 bg-white`}>
        <View style={tw` py-2 px-[4%] mt-4`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={UserIcon} width={20} height={20} />
            <View style={tw`flex-row justify-between w-[90%]`}>
              <Text style={tw`font-MontserratBold text-black`}>
                Basic Information
              </Text>
              {/* <Text style={tw`text-red-700 font-MontserratBold`}>20%</Text> */}
            </View>
          </View>

          <Text style={tw`text-gray-600 font-MontserratBold`}>First name</Text>
          <View style={tw``}>
            <InputText
              containerStyle={tw` border-b border-0`}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  first_name: value,
                }))
              }
              defaultValue={userData?.first_name || ''}
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>
          <Text style={tw`text-primary font-MontserratBold`}>Last Name</Text>
          <View style={tw``}>
            <InputText
              containerStyle={tw` border-b border-0`}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  last_name: value,
                }))
              }
              defaultValue={userData?.last_name || ''}
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>
          <Text style={tw`text-primary font-MontserratBold`}>
            Date of birth
          </Text>
          <View style={tw``}>
            <InputText
              containerStyle={tw` border-b border-0`}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  dob: value,
                }))
              }
              defaultValue={userData?.dob || ''}
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>
          <View style={tw`flex-row items-center justify-between mt-2`}>
            <Text style={tw`text-primary font-MontserratBold`}>Gender</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary pb-2`}>
                Show on your profile
              </Text>
              <Switch
                value={isShowState.gender ?? false}
                onColor="black"
                offColor="gray"
                onValueChange={value => handleToggle('gender', value)}
              />
            </View>
          </View>
          <View style={tw`border-b border-gray-300`}>
            <InputText
              containerStyle={tw`border-0`}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  gender: {
                    ...prev.gender,
                    value: value,
                  },
                }))
              }
              defaultValue={userData?.gender?.value || ''}
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>

          <Text style={tw`text-primary font-MontserratBold`}>
            Current location
          </Text>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={LocationIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                containerStyle={tw`px-8 border-b border-0`}
                // placeholder={data?.data?.address}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    address: value,
                  }))
                }
                defaultValue={userData?.address || ''}
                placeholderTextColor={tw`text-black font-MontserratRegular`}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <GooglePlacesAutocomplete
              placeholder="Search for a location"
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
                types: 'address',
              }}
              fetchDetails={true}
              debounce={300}
              onPress={(data, details = null) => {
                console.log('Autocomplete Response:', data, details);
                if (details?.geometry?.location) {
                  const {lat, lng} = details.geometry.location;
                  setCurrentLocation({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  });
                  setLocation(details.formatted_address);
                  setUserData(prev => ({
                    ...prev,
                    address: details.formatted_address,
                  }));
                }
              }}
              styles={{
                textInputContainer: tw`bg-white border border-gray-300 rounded-lg p-2 mt-4`,
                textInput: tw`text-black font-MontserratRegular`,
                listView: {height: 200}, // Restrict height to avoid full nesting
              }}
              keyboardShouldPersistTaps="handled"
              value={location}
            />
          </View>

          {/* <MapView
            style={tw`w-full h-24`}
            provider={PROVIDER_GOOGLE}
            region={currentLocation}
            showsUserLocation={true}
            showsMyLocationButton={true}>
            <Marker
              coordinate={currentLocation}
              // onPress={() => setShowPopup(true)}
            />
          </MapView> */}
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Text style={tw`font-MontserratBold text-primary`}>
              Want to date
            </Text>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={Menicon}
              width={20}
              height={20}
            />
            <InputText
              containerStyle={tw`px-8 border-b border-0`}
              placeholder="Men"
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  dating_with: value,
                }))
              }
              defaultValue={userData?.dating_with}
              placeholderTextColor={tw`text-primary font-MontserratRegular`}
            />
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Text style={tw`font-MontserratBold text-primary`}>Height</Text>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={HieghtIcon}
              width={20}
              height={20}
            />
            <InputText
              containerStyle={tw`px-8 border-b border-0`}
              defaultValue={userData?.height}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  height: value,
                }))
              }
              placeholder="172 cm"
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>
          <View style={tw`border-b border-b-gray-200`}></View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-between justify-between`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Ethinicity
              </Text>
            </View>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.ethnicity ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('ethnicity', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={EthinicityIcon}
              width={20}
              height={20}
            />
            <InputText
              containerStyle={tw`px-8 border-b border-0`}
              defaultValue={userData.ethnicity?.value}
              onChangeText={value =>
                setUserData(prev => ({
                  ...prev,
                  ethnicity: {
                    ...prev.ethnicity,
                    value: value,
                  },
                }))
              }
              placeholder="East Asian"
              placeholderTextColor={tw`text-black font-MontserratRegular`}
            />
          </View>
        </View>
      </View>
      <View style={tw`pb-2 mt-2 bg-white`}>
        <View style={tw`py-2 px-[4%]`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={InterestIcon} width={20} height={20} />
            <Text style={tw`font-MontserratBold text-primary`}>Interest</Text>
          </View>
          {/* Interest section */}
          <View style={tw`pb-2 bg-white`}>
            <View style={tw`py-2 px-[4%]`}>
              <View style={tw`pb-2 mt-2 bg-white`}>
                <View style={tw`py-2`}>
                  {/* Add New Interest Input */}
                  <View style={tw`flex-row items-center mb-4`}>
                    <TextInput
                      cursorColor={'black'}
                      style={tw`border border-gray-300 p-2 text-black rounded-lg bg-white flex-1 flex-wrap`}
                      value={newInterest}
                      onChangeText={setNewInterest}
                      placeholder="Add new interest"
                      placeholderTextColor={tw`text-black font-MontserratRegular`}
                    />
                    <TouchableOpacity
                      onPress={addInterest}
                      style={tw`ml-2 p-2 bg-blue-500 rounded-full`}>
                      <Text style={tw`text-white font-MontserratBold`}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* FlatList for Interests */}
                  <View
                    style={tw`flex-row items-center justify-center mx-auto`}>
                    <FlatList
                      horizontal
                      data={topics}
                      //  numColumns={2} // Ensures two columns
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItem}
                      contentContainerStyle={tw`gap-2 p-2`} // Adds spacing for better layout
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={tw`border-b border-b-gray-200`} />
      </View>

      <View style={tw`pb-2 mt-2 bg-white`}>
        <View style={tw` py-2 px-[4%] mt-4`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={LifeStyle} width={12} height={12} />
            <Text style={tw`font-MontserratBold text-black`}>Lifestyle</Text>
          </View>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>Drinks</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.drink ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('drink', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={Drinks}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                containerStyle={tw`px-8 border-b border-0`}
                defaultValue={userData?.drink?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    drink: {
                      ...prev.drink,
                      value: value,
                    },
                  }))
                }
                // placeholder="Occationally"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>Smoke</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.smoke ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('smoke', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={SmokeIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                containerStyle={tw`px-8 border-b border-0`}
                defaultValue={userData?.smoke?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    smoke: {
                      ...prev.smoke,
                      value: value,
                    },
                  }))
                }
                placeholder="Occationally"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw`px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>Weed</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.smoke_weed ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('smoke_weed', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={WeedIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.smoke_weed?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    smoke_weed: {
                      ...prev.smoke_weed,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Occationally"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>Drugs</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.drugs ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('drugs', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={DrugIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.drugs?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    drugs: {
                      ...prev.drugs,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="No"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>
              Children
            </Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.have_children ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('have_children', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={ChildrenIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.have_children?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    have_children: {
                      ...prev.have_children,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="I do not have children"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={tw`pb-2 mt-2 bg-white`}>
        <View style={tw` py-2 px-[4%] mt-4`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={BackgroundIcon} width={20} height={20} />
            <Text style={tw`font-MontserratBold text-black`}>Background </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>
              Home town
            </Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.home_town ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('home_town', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={LocationIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.home_town?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    home_town: {
                      ...prev.home_town,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="San Francisco"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>
              Religious believes
            </Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.religion ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('religion', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={ReligiousIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.religion?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    religion: {
                      ...prev.religion,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Christian"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={tw`pb-2 mt-2 bg-white`}>
        <View style={tw` py-2 px-[4%] mt-4`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={EducationIcon} width={20} height={20} />
            <Text style={tw`font-MontserratBold text-black`}>
              Education & Career{' '}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>School</Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.school ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('school', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={UnivesityIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.school?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    school: {
                      ...prev.school,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Harbard University"
                placeholderTextColor={tw`text-black font-MontserratRegular`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <View style={tw`flex-row items-center gap-2 justify-between`}>
              <Text
                style={tw`font-MontserratBold items-center text-black pt-2`}>
                Heighest education
              </Text>
              <View style={tw`flex-row gap-4 items-center`}>
                <Text style={tw`font-MontserratBold text-primary`}>
                  Show on profile
                </Text>
                <Switch
                  value={isShowState?.edu_lvl ?? false}
                  onColor={'black'}
                  offColor={'gray'}
                  onValueChange={value => handleToggle('edu_lvl', value)}
                />
              </View>
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={BookIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative items-center justify-center`}>
              <InputText
                defaultValue={userData?.edu_lvl?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    edu_lvl: {
                      ...prev.edu_lvl,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Post-Graduate"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold items-center text-black pt-2`}>
              Job title
            </Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.job_title ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('job_title', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={EnginnerIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.job?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    job: {
                      ...prev.job,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Softwae Engineer"
                placeholderTextColor={tw`text-black`}
              />
            </View>
          </View>
        </View>
        <View style={tw` px-[4%]`}>
          <View style={tw`flex-row items-center gap-2 justify-between`}>
            <Text style={tw`font-MontserratBold text-black pt-2`}>
              Work place
            </Text>
            <View style={tw`flex-row gap-4`}>
              <Text style={tw`font-MontserratBold text-primary`}>
                Show on profile
              </Text>
              <Switch
                value={isShowState?.work_place ?? false}
                onColor={'black'}
                offColor={'gray'}
                onValueChange={value => handleToggle('work_place', value)}
              />
            </View>
          </View>
          <View style={tw`flex-row pb-2 gap-2 items-center`}>
            <SvgXml
              style={tw`absolute ml-2 z-30`}
              xml={WorkplaceIcon}
              width={20}
              height={20}
            />
            <View style={tw`w-full relative`}>
              <InputText
                defaultValue={userData?.work_place?.value}
                onChangeText={value =>
                  setUserData(prev => ({
                    ...prev,
                    work_place: {
                      ...prev.work_place,
                      value: value,
                    },
                  }))
                }
                containerStyle={tw`px-8 border-b border-0`}
                placeholder="Google"
                placeholderTextColor={tw`text-black font-MontserratRegular`}
              />
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center justify-center gap-1  my-4`}>
          <TButton
            onPress={handleStoreInfo}
            containerStyle={tw`bg-black w-[90%]`}
            title="Save changes"
          />
        </View>
      </View>
      <View style={{flex: 1, padding: 20}}>
        {/* FlatList to display images */}
        <FlatList
          horizontal
          data={profileData?.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={{position: 'relative', marginRight: 10}}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                  }}
                />

                

                {/* Button to change the image */}
                <View style={tw``}>
                  <TouchableOpacity
                    onPress={() => handleChangePhoto(index)}
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 5,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 15,
                      padding: 5,
                      zIndex: 10, // Ensure it's above the image
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Change
                    </Text>
                  </TouchableOpacity>
                  
                {/* Cross Icon to delete the image */}
                  <TouchableOpacity
                    onPress={() => handleDeletePhoto(index)}
                    style={{
                      position: 'absolute',
                      bottom: 72,
                      right: 5,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 15,
                      padding: 5,
                      zIndex: 10, // Ensure it's above the image
                    }}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        {/* Add New Image Button */}
        <TouchableOpacity
          onPress={handleAddPhoto}
          style={{
            padding: 10,
            backgroundColor: 'gray',
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 8,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Add New Image</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`pb-2 mt-2 bg-white`}>
        <View style={tw` py-2 px-[4%] mt-4`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <SvgXml xml={PersonalPromptIcon} width={20} height={20} />
            <Text style={tw`font-MontserratBold text-black`}>
              Personal Prompts{' '}
            </Text>
          </View>
          {profileData?.prompt &&
            profileData?.prompt.map((p, i) => {
              return (
                <View key={i} style={tw`mb-4`}>
                  <Text
                    style={tw`font-MontserratBold text-black pt-2`}>{`Prompt ${
                    i + 1
                  }`}</Text>
                  <View style={tw`flex-row mb-2 gap-2 items-center`}>
                    {/* You can uncomment and customize the icon if you want */}
                    {/* <SvgXml xml={UnivesityIcon} width={20} height={20} /> */}
                    <View style={tw`w-full relative`}>
                      <InputText
                        onChangeText={value => {
                          setProfileData(prev => ({
                            ...prev,
                            prompt: prev.prompt.map((item, index) =>
                              index === i ? value : item,
                            ),
                          }));
                        }}
                        defaultValue={p}
                        containerStyle={tw`border-b border-0`}
                        placeholder="Exploring life, one adventure at a time 🌍✨"
                        placeholderTextColor={tw`text-black`}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      <View style={tw`flex-row items-center justify-center gap-1  my-4`}>
        <TButton
          onPress={handleEditProfile}
          containerStyle={tw`bg-black w-[90%]`}
          title="Save changes"
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
