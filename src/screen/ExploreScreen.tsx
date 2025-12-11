import React, {useEffect, useRef, useState} from 'react';
import * as Progress from 'react-native-progress';
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Alert,
  Share,
  Linking,
  Button,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSpring,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import tw, {style} from 'twrnc';
import {
  BackgroundIcon,
  BookIcon,
  ChildrenIcon,
  CrossIconBold,
  Drinks,
  DrugIcon,
  EducationIcon,
  EnginnerIcon,
  EthinicityIcon,
  HeartIcon,
  HieghtIcon,
  IconUpArrow,
  InterestIcon,
  LeftArrow,
  LifeStyle,
  LocationIcon,
  LoveIcon,
  Menicon,
  Message,
  PersonalPromptIcon,
  RedCrossIcon,
  ReligiousIcon,
  SmokeIcon,
  StarIcon,
  UnivesityIcon,
  Uparrow,
  UserIcon,
  WeedIcon,
  WorkplaceIcon,
} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import InputText from '../components/inputs/InputText';
import TButton from '../components/buttons/TButton';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedStarRating from '../components/AnimatedStartRating';
import AnimatedLoveSending from '../components/AnimatedLoveSending';
import StoryComponent from '../components/story/StoryComponent';

import {
  useGetHomeQuery,
  usePostBlockUserMutation,
} from '../redux/apiSlices/homeSlice';
import {TextArea} from 'react-native-ui-lib';
import {
  useGetUserQuery,
  usePostHandle_iteractionMutation,
} from '../redux/apiSlices/userSlice';
import SlidingProgressBars from '../components/slidingProgressBars';
import {getSocket} from '../redux/services/socket';
// import ProgressBars from '../components/ExploreProgressBar';

const {width, height} = Dimensions.get('window');
// Example data for the carousel
// const DATA = [
//   {
//     id: '1',
//     profile: {
//       name: 'Lana',
//       age: 26,
//       distance: '0.5 mi. away from you',
//       image: require('../assets/images/ExploreImg.png'),
//       interests: [
//         'Online shopping',
//         'Amateur cook',
//         'Anime',
//         'Horror films',
//         'Skincare',
//       ],
//     },
//   },
//   {
//     id: '2',
//     profile: {
//       name: 'John',
//       age: 30,
//       distance: '1.0 mi. away from you',
//       image: require('../assets/images/openingImg.png'),
//       interests: ['Photography', 'Travel', 'Music', 'Technology', 'Cooking'],
//     },
//   },
//   {
//     id: '3',
//     profile: {
//       name: 'Sophia',
//       age: 24,
//       distance: '2.3 mi. away from you',
//       image: require('../assets/images/promptImg.png'),
//       interests: ['Art', 'Yoga', 'Nature', 'Reading', 'Fitness'],
//     },
//   },
// ];

// const SlidingProgressBars = ({totalSlides, currentSlide}) => {
//   // Render progress bars based on the total slides and the current slide index
//   return (
//     <View
//       style={tw`flex-row absolute bottom-24 z-50 top-6 left-1/2 transform -translate-x-1/2`}>
//       {Array.from({length: totalSlides}).map((_, index) => {
//         const progress = index <= currentSlide ? 1 : 0; // Progress bar fills based on current slide
//         return (
//           <Progress.Bar
//             key={index}
//             progress={progress}
//             width={20}
//             color={progress === 1 ? 'white' : 'gray'}
//             unfilledColor="lightgray"
//             borderWidth={2}
//             style={tw`mx-1`}
//           />
//         );
//       })}
//     </View>
//   );
// };
type Topic =
  | 'Online Shopping'
  | 'Amateur Cook'
  | 'Anime'
  | 'Horror Films'
  | 'Skincare';

const ExploreScreen = ({route}) => {
  const topics: Topic[] = [
    'Online Shopping',
    'Amateur Cook',
    'Anime',
    'Horror Films',
    'Skincare',
  ];

  // Clipboard.setString('This is the text to copy!');

  // Get string from clipboard

  // State to track selected items (using type annotation for the array of strings)
  const [selectedItems, setSelectedItems] = useState<Topic[]>([]);
  const [items, setItems] = useState();
  const [report, setReport] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [rating, setRating] = useState(0);
  const {data: userData} = useGetUserQuery({});
  console.log(
    'rating+++++++++++++++++++++++++++++++++++++++++++++++++',
    rating,
  );
  const {data, isLoading, isError} = useGetHomeQuery({
    perPage: 10,
  });
  const [postBlockUser] = usePostBlockUserMutation();
  const [postHandle_iteraction] = usePostHandle_iteractionMutation();
  // console.log('rating', rating);

  const currentSlide = useSharedValue(0);
  const bounce = useSharedValue(1);

  const derivedSlide = useDerivedValue(() => currentSlide.value, []);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: derivedSlide.value * width},
      {scale: bounce.value},
      {rotate: '-90deg'},
    ],
  }));

  // Define the bounce animation
  useEffect(() => {
    bounce.value = withRepeat(
      withTiming(1.2, {duration: 500, easing: Easing.linear}), // Bounce scale up
      -1, // Infinite repeat
      true, // Reverse the animation for bounce
    );
  }, [bounce]);

  const handleSnapToItem = index => {
    currentSlide.value = index;
    setSelectedProfile(data?.data?.data?.[index] || null);
  };

  Clipboard.getString().then(content => {
    console.log(content); // This will log the clipboard content
  });
  // Function to handle item selection
  const toggleSelection = (item: Topic): void => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(selectedItem => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  // Render each item in the FlatList
  const renderItem = ({item}: {item: Topic}) => {
    const isSelected = selectedItems.includes(item);
    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item)}
        style={tw`bg-gray-200 px-4 py-2 rounded-full mr-2 mb-2`}>
        <Text
          style={tw`text-sm ${
            isSelected ? 'font-bold text-blue-500' : 'text-black'
          }`}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleScrollBeginDrag = () => {
    setIsSliding(true);
  };

  const handleScrollEndDrag = () => {
    setIsSliding(false);
  };
  // for dynamic handling
  // const handleShareProfile = () => {
  //   const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

  //   // Copy the URL to clipboard
  //   Clipboard.setString(profileUrl);

  //   // Optional: Display a message to confirm that the URL is copied
  //   Alert.alert('Profile URL Copied', 'You can now paste this URL anywhere!');
  // };

  // for static handling
  const navigation = useNavigation();
  const [selectedProfile, setSelectedProfile] = useState({
    profile: {
      name: 'Lana',
      age: 26,
      distance: '0.5 mi. away from you',
      image: require('../assets/images/ExploreImg.png'),
      interests: [
        'Online shopping',
        'Amateur cook',
        'Anime',
        'Horror films',
        'Skincare',
      ],
    },
  });
  const selectedProfiles = {
    profile: {name: 'JohnDoe'}, // Replace with dynamic profile data
  };
  const profileUrl = `myapp://profile/${selectedProfiles.profile.name.toLowerCase()}`;

  // Function to Copy Profile Link to Clipboard
  const handleCopyProfile = () => {
    Clipboard.setString(profileUrl);
    Alert.alert('Copied!', 'Profile link copied to clipboard.');
  };
  // Function to handle "Share Profile" action
  const handleShareProfile = async () => {
    //   const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

    //   // You can log it to test the generated URL
    //   console.log(profileUrl);

    //   // Optionally, copy it to the clipboard
    //   Clipboard.setString(profileUrl);
    //   // Alert.alert('Profile URL Copied', 'You can now paste this URL anywhere!');
    // };

    // const handleCopyProfile = () => {
    //   Clipboard.setString(profileUrl);
    //   Alert.alert('Copied!', 'Profile link copied to clipboard.');
    // };

    // // Function to navigate to the profile page (simulating the dynamic URL)
    // const handleViewProfile = () => {
    //   const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

    //   // Simulate navigation to the profile screen with the profile name
    //   navigation.navigate('ProfileScreen', {
    //     profileName: selectedProfile.profile.name,
    //   });

    try {
      await Share.share({
        message: `Check out this profile: ${profileUrl}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share profile link.');
    }
  };

  // Function to Open Profile in App
  const handleOpenProfile = () => {
    Linking.openURL(profileUrl).catch(err =>
      Alert.alert('Error', 'Failed to open link. Ensure the app is installed.'),
    );
  };

  // const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handleBlockUser = async id => {
    console.log('click', id);
    try {
      const formData = new FormData();
      formData.append('blocked_user_id', id);
      formData.append('reason', report);
      const response = await postBlockUser(formData);
      console.log('report response++++++++++', response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInteraction = async id => {
    if (!id) {
      console.log('No ID provided');
      return;
    }

    console.log('click', id);

    try {
      const formData = new FormData();
      formData.append('matched_user_id', id);
      formData.append('status', rating || 'default_rating');
      console.log('formData', formData);

      // const response = await postHandle_iteraction(formData);

      // // Log the raw response to debug
      // console.log('Raw response:', response);

      // Check if the response is valid JSON before trying to parse it
      // const contentType = response.headers.get('Content-Type');
      // if (contentType && contentType.includes('application/json')) {
      //   const parsedResponse = await response.json();
      //   console.log('Parsed interaction response:', parsedResponse);
      // } else {
      //   // If it's not JSON, log the response text
      //   const responseText = await response.text();
      //   console.log('Non-JSON response:', responseText);
      // }
    } catch (error) {
      console.log('Error during interaction:', error);
    }
  };

  const turnUp = useRef<Animated.ScrollView>(null);
  const scrollViewRef = useRef<Animated.ScrollView>(null); // Ref for Animated.ScrollView

  // const scaleValue = useSharedValue(1); // Initial scale is 1 (no scaling)

  // Function to scroll the ScrollView up
  const scrollUp = () => {
    if (scrollViewRef.current) {
      // Scroll to top (y: 0) with an animated scroll
      scrollViewRef.current.scrollTo({y: 200, animated: true});
    }
  };

  // Function to scale up (optional, just as a visual effect)
  // const scaleUp = () => {
  //   scaleValue.value = 1.5; // Scale up by 50%
  //   console.log("Scale value set to:", scaleValue.value);
  // };

  const socket = getSocket();
  React.useEffect(() => {
    if (userData) {
      const res = socket?.emit('login', {userId: userData?.data?.id});
      //  console.log("res++++++", res)
    }
  }, [userData]);

  return (
    <View style={tw`flex-1`}>
      <Animated.ScrollView
        //  ref={turnUp}
        ref={scrollViewRef}
        style={tw`flex-1`}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={tw`relative`}>
          {/* <StoryComponent /> */}
          <Carousel
            // loop
            width={width}
            height={height}
            // autoPlay={true}
            // autoPlayInterval={3000}
            data={data?.data?.data}
            scrollAnimationDuration={3000}
            mode="horizontal-stack"
            modeConfig={{
              stackInterval: 20,
              scaleInterval: 0.9,
              // translationInterval: 50,
            }}
            // onSnapToItem={index => {
            //   const currentItem = data?.data?.data?.[index]; // ✅ Get the current item
            //   console.log('Current Item:', currentItem);
            //   setItems(currentItem);
            //   setCurrentSlide(index);
            // }}
            onSnapToItem={handleSnapToItem}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            renderItem={({item}) => {
              // setItems(item)
              return (
                <ImageBackground
                  source={{uri: item?.profile?.images[0]}}
                  style={tw`flex-1`}
                  imageStyle={tw`w-full h-[90%]`}>
                  <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
                    style={tw`absolute inset-0`}
                  />

                  {/* <SlidingProgressBars
                  totalSlides={data?.data?.data?.length || 0}
                  currentSlide={derivedSlide.value}
                /> */}

                  <View style={tw`px-[4%] mt-1 mb-0 flex justify-end h-[90%]`}>
                    <View style={tw`mt-48`}>
                      <View style={tw`flex-row gap-4 items-center anim`}>
                        <Text
                          style={tw`text-3xl text-white font-MontserratBold`}>
                          {item?.name}
                        </Text>
                        <Text
                          style={tw`text-xl text-gray-300 font-MontserratRegular`}>
                          {item?.age}
                        </Text>
                      </View>
                      <Text style={tw`text-sm text-gray-400`}>
                        {item?.distance}
                      </Text>
                    </View>

                    <View style={tw`flex-row flex-wrap gap-4 my-2`}>
                      {item?.interests?.map((interest, index) => {
                        console.log('interest++', interest);
                        return (
                          <TouchableOpacity
                            key={index} //
                            style={tw`bg-[#6D6D6D99] py-1 px-4 rounded-full`}>
                            <Text style={tw`text-white text-sm`}>
                              {interest}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}

                      <TouchableOpacity
                        onPress={scrollUp}
                        style={tw` h-12 absolute top-18 right-4 `}>
                        <Animated.View style={[animatedStyle]}>
                          <View style={tw`flex-row`}>
                            
                            {/* <Text
                              style={[
                                tw`text-white px-2 py-1 rounded-2xl opacity-40`,
                                // Additional styles can be added here
                              ]}>
                              Scroll Up
                            </Text> */}
                            <SvgXml
                              style={tw` opacity-80`}
                              width={30}
                              height={30}
                              xml={IconUpArrow}
                            />
                          </View>
                        </Animated.View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={tw`flex-row items-center mx-auto justify-between w-3/5 my-14`}>
                      <TouchableOpacity
                        style={tw`w-12 h-12 justify-center items-center  rounded-full`}>
                        <Text style={tw`text-3xl text-gray-800`}>❌</Text>
                      </TouchableOpacity>
                      <View style={tw`bg-none`}>
                        <AnimatedStarRating StarIcon={StarIcon} />
                      </View>

                      <TouchableOpacity
                        onPress={() => handleInteraction(item?.id)}
                        style={tw`w-12 h-12 justify-center items-center rounded-full`}>
                        <AnimatedLoveSending
                          id={item?.id}
                          LoveIcon={LoveIcon}
                          onRatingChange={setRating}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              );
            }}
          />
          {/* {isSliding && (
          <View
            style={tw`absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
            <CrossIconBold width={50} height={50} color="white" />
          </View>
        )} */}
        </View>
        {/* Additional content */}

        <View>
          <View style={tw`pb-2 bg-white`}>
            <View style={tw` py-2 px-[4%] mt-4`}>
              <View style={tw`flex-row my-4 gap-2 items-center`}>
                <SvgXml xml={UserIcon} width={20} height={20} />
                <Text style={tw`font-MontserratRegular text-black`}>
                  Basic Information
                </Text>
              </View>
              <Text style={tw`text-black font-MontserratRegular`}></Text>
              <View style={tw`flex-row my-1 gap-2 items-center`}>
                <SvgXml xml={LocationIcon} width={20} height={20} />
                <Text style={tw`font-MontserratRegular text-black`}>
                  {items?.address}
                </Text>
              </View>
              <View style={tw`border-b border-b-gray-200`}></View>
            </View>
            <View style={tw` px-[4%]`}>
              <View style={tw`flex-row my-4 gap-2 items-center`}>
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Want to date
                </Text>
              </View>
              <View style={tw`flex-row pb-2 gap-2 items-center`}>
                <SvgXml xml={Menicon} width={20} height={20} />
                <Text style={tw`font-MontserratRegular text-black`}>
                  {items?.dating_with}
                </Text>
              </View>
              <View style={tw`border-b border-b-gray-200`}></View>
            </View>
            <View style={tw` px-[4%]`}>
              <View style={tw`flex-row my-4 gap-2 items-center`}>
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Height
                </Text>
              </View>
              <View style={tw`flex-row pb-2 gap-2 items-center`}>
                <SvgXml xml={HieghtIcon} width={20} height={20} />
                <Text style={tw`font-MontserratRegular text-black`}>
                  {items?.height || 'N/A'}
                </Text>
              </View>
              <View style={tw`border-b border-b-gray-200`}></View>
            </View>
            {items?.ethnicity?.is_show === true && (
              <>
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Ethinicity
                    </Text>
                  </View>

                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={EthinicityIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {items?.ethnicity?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              </>
            )}
          </View>
          <View style={tw`pb-2 mt-2 bg-white`}>
            <View style={tw` py-2 px-[4%]`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={InterestIcon} width={20} height={20} />
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Interest
                </Text>
              </View>

              <View style={tw`pb-2 mt-2 bg-white`}>
                <View style={tw`py-2 px-4`}>
                  {/* FlatList Container */}
                  <View style={tw`flex-row`}>
                    <FlatList
                      horizontal={true}
                      data={items?.interests}
                      renderItem={renderItem}
                      keyExtractor={item => item}
                      // numColumns={3} // Optional for multi-column layout
                      scrollEnabled={true} // Disable scrolling inside FlatList
                      contentContainerStyle={tw`flex-row`}
                    />
                  </View>
                </View>
              </View>
              <View style={tw`border-b border-b-gray-200`}></View>
            </View>
          </View>
          {(items?.drink?.is_show === true ||
            items?.smoke?.is_show === true ||
            items?.smoke_weed?.is_show === true ||
            items?.drugs?.is_show === true ||
            items?.have_children?.is_show === true) && (
            <>
              <View style={tw`pb-2 mt-2 bg-white`}>
                <View style={tw` py-2 px-[4%] mt-4`}>
                  <View style={tw`flex-row gap-2 items-center`}>
                    <SvgXml xml={LifeStyle} width={12} height={12} />
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Lifestyle
                    </Text>
                  </View>
                  {items?.drink?.is_show === true && (
                    <>
                      <Text
                        style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                        Drinks
                      </Text>
                      <View style={tw`flex-row my-4 gap-2 items-center`}>
                        <SvgXml xml={Drinks} width={20} height={20} />
                        <Text style={tw`font-MontserratRegular text-black`}>
                          {items?.drink?.value}
                        </Text>
                      </View>
                      <View style={tw`border-b border-b-gray-200`}></View>
                    </>
                  )}
                </View>
                {items?.smoke?.is_show === true && (
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Smokes
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={SmokeIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.smoke?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                )}
                {items?.smoke_weed?.is_show === true && (
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Weed
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={WeedIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.smoke?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                )}
                {items?.drugs?.is_show === true && (
                  <>
                    <View style={tw` px-[4%]`}>
                      <View style={tw`flex-row my-4 gap-2 items-center`}>
                        <Text
                          style={tw`font-MontserratBold font-bold text-black`}>
                          Drugs
                        </Text>
                      </View>
                      <View style={tw`flex-row pb-2 gap-2 items-center`}>
                        <SvgXml xml={DrugIcon} width={20} height={20} />
                        <Text style={tw`font-MontserratRegular text-black`}>
                          {items?.drugs?.value}
                        </Text>
                      </View>
                      <View style={tw`border-b border-b-gray-200`}></View>
                    </View>
                  </>
                )}
                {items?.have_children?.is_show === true && (
                  <>
                    <View style={tw` px-[4%]`}>
                      <View style={tw`flex-row my-4 gap-2 items-center`}>
                        <Text
                          style={tw`font-MontserratBold font-bold text-black`}>
                          Children
                        </Text>
                      </View>
                      <View style={tw`flex-row pb-2 gap-2 items-center`}>
                        <SvgXml xml={ChildrenIcon} width={20} height={20} />
                        <Text style={tw`font-MontserratRegular text-black`}>
                          {items?.have_children.value}
                        </Text>
                      </View>
                      <View style={tw`border-b border-b-gray-200`}></View>
                    </View>
                  </>
                )}
              </View>
            </>
          )}
          {(items?.home_town?.is_show === true ||
            items?.religion?.is_show === true) && (
            <View style={tw`pb-2 mt-2 bg-white`}>
              <View style={tw` py-2 px-[4%] mt-4`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <SvgXml xml={BackgroundIcon} width={20} height={20} />
                  <Text style={tw`font-MontserratBold font-bold text-black`}>
                    Background
                  </Text>
                </View>
                {items?.home_town?.is_show === true && (
                  <>
                    <Text
                      style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                      Home Town
                    </Text>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <SvgXml xml={LocationIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.home_town?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </>
                )}
              </View>
              {items?.religion?.is_show === true && (
                <>
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Religious Beliefs
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={ReligiousIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.religion?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
            </View>
          )}
          {(items?.school?.is_show === true ||
            items?.edu_lvl?.is_show === true ||
            items?.job?.is_show === true ||
            items?.work_place?.is_show === true) && (
            <View style={tw`pb-2 mt-2 bg-white`}>
              <View style={tw` py-2 px-[4%] mt-4`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <SvgXml xml={EducationIcon} width={20} height={20} />
                  <Text style={tw`font-MontserratBold font-bold text-black`}>
                    Education & Career
                  </Text>
                </View>
                {items?.school?.is_show === true && (
                  <>
                    <Text
                      style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                      School
                    </Text>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <SvgXml xml={UnivesityIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.school?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </>
                )}
              </View>
              {items?.edu_lvl?.is_show === true && (
                <>
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Highest Level of Education
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={BookIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.edu_lvl?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
              {items?.job?.is_show === true && (
                <>
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Job Title
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={EnginnerIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.job?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
              {items?.work_place?.is_show === true && (
                <>
                  <View style={tw` px-[4%]`}>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <Text
                        style={tw`font-MontserratBold font-bold text-black`}>
                        Work Place
                      </Text>
                    </View>
                    <View style={tw`flex-row pb-2 gap-2 items-center`}>
                      <SvgXml xml={WorkplaceIcon} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {items?.work_place?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
            </View>
          )}

          <View style={tw`pb-2 mt-2 bg-white`}>
            <View style={tw` py-2 px-[4%] mt-4`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={PersonalPromptIcon} width={20} height={20} />
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Personal Prompts
                </Text>
              </View>
            </View>
            {items?.profile?.prompt?.map((p, i) => {
              return (
                <View style={tw`px-[4%]`}>
                  <Text
                    style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                    Prompt {i + 1}
                  </Text>
                  <View style={tw`flex-row mb-2 gap-2 items-center`}>
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {p}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              );
            })}
          </View>
          {/* <View style={tw`flex-row items-center justify-center gap-1  my-4`}>
          <Text style={tw`font-MontserratBold text-black`}>Show Less</Text>
          <SvgXml xml={Uparrow} width={20} height={20} />
        </View> */}

          {/* <View style={tw`pb-2 mt-2 bg-white`}>
          <View style={tw` py-2 px-[4%] mt-4`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml xml={Message} width={20} height={20} />
              <Text style={tw`font-MontserratBold font-bold text-black`}>
                Send Message to Lana
              </Text>
            </View>
            <Text style={tw`font-MontserratBold pt-2 text-black`}>
              Boost your profile for a 25% better chance of finding your perfect
              match!
            </Text>
          </View>
          <View style={tw`w-full h-14 flex justify-center items-center py-2`}>
            <InputText
              placeholder="Type a Message"
              floatingPlaceholderStyle={tw`font-MontserratRegular`}
              containerStyle={tw`w-[90%]`}
            />
          </View>
        </View> */}

          <View
            style={tw`flex-row items-center mx-auto justify-between w-3/5 py-4`}>
            <TouchableOpacity
              style={tw`w-12 h-12 justify-center items-center  rounded-full`}>
              <Text style={tw`text-3xl text-gray-800`}>❌</Text>
            </TouchableOpacity>
            <View style={tw`bg-none`}>
              <AnimatedStarRating StarIcon={StarIcon} />
            </View>

            <TouchableOpacity
              style={tw`w-12 h-12 justify-center items-center rounded-full`}>
              <AnimatedLoveSending id={items?.id} LoveIcon={LoveIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={tw`w-full flex mx-auto gap-y-2 justify-center items-center my-4`}>
            <TButton
              onPress={handleShareProfile}
              titleStyle={tw`text-black font-MontserratBold`}
              containerStyle={tw`w-[90%] bg-gray-100`}
              title={`Share ${items?.name} profile`}
            />
            {items?.is_blocked === false && (
              <>
                <TButton
                  onPress={() => {
                    handleBlockUser(items?.id);
                    setIsDisabled(true);
                  }}
                  disabled={isDisabled}
                  titleStyle={tw`text-black font-MontserratBold`}
                  containerStyle={tw`w-[90%] bg-gray-100 ${
                    isDisabled ? 'opacity-20' : ''
                  }`}
                  title="Block"
                />
              </>
            )}
            {items?.is_blocked === false && (
              <View style={tw`w-full mx-auto justify-center items-center`}>
                <View
                  style={tw` py-2 w-[90%] rounded-2xl h-24 border border-gray-300 px-[4%]`}>
                  <TextArea
                    onChangeText={value => setReport(value)}
                    placeholder="Report user..."
                    containerStyle={tw`border border-red-300 rounded-lg p-3 bg-white`}
                    style={tw`text-black text-lg`}
                    multiline
                    numberOfLines={4} // Adjust height
                  />
                </View>

                <TButton
                  onPress={() => {
                    setIsDisabled(true);
                    handleBlockUser(items?.id);
                  }}
                  disabled={isDisabled}
                  titleStyle={tw`text-black font-MontserratBold`}
                  containerStyle={tw`w-[90%] bg-gray-400 my-2 ${
                    isDisabled ? 'opacity-20' : ''
                  }`}
                  title={`Report ${items?.name}`}
                />
              </View>
            )}
          </View>
        </View>

        <StatusBar translucent={false} />
      </Animated.ScrollView>
    </View>
  );
};

export default ExploreScreen;

// import React, {useEffect, useState} from 'react';
// import * as Progress from 'react-native-progress';
// import {
//   Dimensions,
//   ImageBackground,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   StatusBar,
// } from 'react-native';
// import tw, {style} from 'twrnc';
// import {
//   BackgroundIcon,
//   BookIcon,
//   ChildrenIcon,
//   CrossIconBold,
//   Drinks,
//   DrugIcon,
//   EducationIcon,
//   EnginnerIcon,
//   EthinicityIcon,
//   HeartIcon,
//   HieghtIcon,
//   InterestIcon,
//   LifeStyle,
//   LocationIcon,
//   LoveIcon,
//   Menicon,
//   Message,
//   PersonalPromptIcon,
//   RedCrossIcon,
//   ReligiousIcon,
//   SmokeIcon,
//   StarIcon,
//   UnivesityIcon,
//   Uparrow,
//   UserIcon,
//   WeedIcon,
//   WorkplaceIcon,
// } from '../assets/icons/icon';
// import {SvgXml} from 'react-native-svg';
// import InputText from '../components/inputs/InputText';
// import TButton from '../components/buttons/TButton';
// import Clipboard from '@react-native-clipboard/clipboard';
// import {useNavigation} from '@react-navigation/native';
// import Carousel from 'react-native-reanimated-carousel';
// import LinearGradient from 'react-native-linear-gradient';
// import AnimatedStarRating from '../components/AnimatedStartRating';
// import AnimatedLoveSending from '../components/AnimatedLoveSending';
// import StoryComponent from '../components/story/StoryComponent';
// import {
//   useGetHomeQuery,
//   usePostBlockUserMutation,
// } from '../redux/apiSlices/homeSlice';
// import {TextArea} from 'react-native-ui-lib';
// import {usePostHandle_iteractionMutation} from '../redux/apiSlices/userSlice';
// import SlidingProgressBars from '../components/slidingProgressBars';
// // import ProgressBars from '../components/ExploreProgressBar';

// const {width, height} = Dimensions.get('window');
// // Example data for the carousel
// // const DATA = [
// //   {
// //     id: '1',
// //     profile: {
// //       name: 'Lana',
// //       age: 26,
// //       distance: '0.5 mi. away from you',
// //       image: require('../assets/images/ExploreImg.png'),
// //       interests: [
// //         'Online shopping',
// //         'Amateur cook',
// //         'Anime',
// //         'Horror films',
// //         'Skincare',
// //       ],
// //     },
// //   },
// //   {
// //     id: '2',
// //     profile: {
// //       name: 'John',
// //       age: 30,
// //       distance: '1.0 mi. away from you',
// //       image: require('../assets/images/openingImg.png'),
// //       interests: ['Photography', 'Travel', 'Music', 'Technology', 'Cooking'],
// //     },
// //   },
// //   {
// //     id: '3',
// //     profile: {
// //       name: 'Sophia',
// //       age: 24,
// //       distance: '2.3 mi. away from you',
// //       image: require('../assets/images/promptImg.png'),
// //       interests: ['Art', 'Yoga', 'Nature', 'Reading', 'Fitness'],
// //     },
// //   },
// // ];

// // const SlidingProgressBars = ({totalSlides, currentSlide}) => {
// //   // Render progress bars based on the total slides and the current slide index
// //   return (
// //     <View
// //       style={tw`flex-row absolute bottom-24 z-50 top-6 left-1/2 transform -translate-x-1/2`}>
// //       {Array.from({length: totalSlides}).map((_, index) => {
// //         const progress = index <= currentSlide ? 1 : 0; // Progress bar fills based on current slide
// //         return (
// //           <Progress.Bar
// //             key={index}
// //             progress={progress}
// //             width={20}
// //             color={progress === 1 ? 'white' : 'gray'}
// //             unfilledColor="lightgray"
// //             borderWidth={2}
// //             style={tw`mx-1`}
// //           />
// //         );
// //       })}
// //     </View>
// //   );
// // };
// type Topic =
//   | 'Online Shopping'
//   | 'Amateur Cook'
//   | 'Anime'
//   | 'Horror Films'
//   | 'Skincare';

// const ExploreScreen = () => {
//   const topics: Topic[] = [
//     'Online Shopping',
//     'Amateur Cook',
//     'Anime',
//     'Horror Films',
//     'Skincare',
//   ];

//   // Clipboard.setString('This is the text to copy!');

//   // Get string from clipboard

//   // State to track selected items (using type annotation for the array of strings)
//   const [selectedItems, setSelectedItems] = useState<Topic[]>([]);
//   const [items, setItems] = useState();
//   const [report, setReport] = useState();
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [rating, setRating] = useState(0);
//   const {data, isLoading, isError} = useGetHomeQuery({
//     perPage: 10,
//   });
//   const [postBlockUser] = usePostBlockUserMutation();
//   const [postHandle_iteraction] = usePostHandle_iteractionMutation();
//   console.log('rating', rating);

//   Clipboard.getString().then(content => {
//     console.log(content); // This will log the clipboard content
//   });
//   // Function to handle item selection
//   const toggleSelection = (item: Topic): void => {
//     setSelectedItems(prevSelected => {
//       if (prevSelected.includes(item)) {
//         return prevSelected.filter(selectedItem => selectedItem !== item);
//       } else {
//         return [...prevSelected, item];
//       }
//     });
//   };

//   // Render each item in the FlatList
//   const renderItem = ({item}: {item: Topic}) => {
//     const isSelected = selectedItems.includes(item);
//     return (
//       <TouchableOpacity
//         onPress={() => toggleSelection(item)}
//         style={tw`bg-gray-200 px-4 py-2 rounded-full mr-2 mb-2`}>
//         <Text
//           style={tw`text-sm ${
//             isSelected ? 'font-bold text-blue-500' : 'text-black'
//           }`}>
//           {item}
//         </Text>
//       </TouchableOpacity>
//     );
//   };
//   const handleScrollBeginDrag = () => {
//     setIsSliding(true);
//   };

//   const handleScrollEndDrag = () => {
//     setIsSliding(false);
//   };
//   // for dynamic handling
//   // const handleShareProfile = () => {
//   //   const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

//   //   // Copy the URL to clipboard
//   //   Clipboard.setString(profileUrl);

//   //   // Optional: Display a message to confirm that the URL is copied
//   //   Alert.alert('Profile URL Copied', 'You can now paste this URL anywhere!');
//   // };

//   // for static handling
//   const navigation = useNavigation();
//   const [selectedProfile, setSelectedProfile] = useState({
//     profile: {
//       name: 'Lana',
//       age: 26,
//       distance: '0.5 mi. away from you',
//       image: require('../assets/images/ExploreImg.png'),
//       interests: [
//         'Online shopping',
//         'Amateur cook',
//         'Anime',
//         'Horror films',
//         'Skincare',
//       ],
//     },
//   });

//   // Function to handle "Share Profile" action
//   const handleShareProfile = () => {
//     const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

//     // You can log it to test the generated URL
//     console.log(profileUrl);

//     // Optionally, copy it to the clipboard
//     Clipboard.setString(profileUrl);
//     // Alert.alert('Profile URL Copied', 'You can now paste this URL anywhere!');
//   };

//   // Function to navigate to the profile page (simulating the dynamic URL)
//   const handleViewProfile = () => {
//     const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

//     // Simulate navigation to the profile screen with the profile name
//     navigation.navigate('ProfileScreen', {
//       profileName: selectedProfile.profile.name,
//     });
//   };
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isSliding, setIsSliding] = useState(false);
//   const totalSlides = data?.data?.data?.length || 0;
//   const handleBlockUser = async id => {
//     console.log('click', id);
//     try {
//       const formData = new FormData();
//       formData.append('blocked_user_id', id);
//       formData.append('reason', report);
//       const response = await postBlockUser(formData);
//       console.log('report response++++++++++', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInteraction = async id => {
//     console.log('click', id);
//     try {
//       const formData = new FormData();
//       formData.append('matched_user_id', id);
//       formData.append('status', rating);
//       console.log('formData', formData);
//       const response = await postHandle_iteraction(formData);
//       console.log('interacion response', response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const images = data?.data?.data?.[currentSlide]?.profile?.images || [];
//       setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [currentSlide, data?.data?.data]);

//   return (
//     <ScrollView style={tw`flex-1`}>
//       <View style={tw`relative`}>
//         {/* <StoryComponent /> */}
//         <Carousel
//           // loop
//           width={width}
//           height={height}
//           // autoPlay={true}
//           // autoPlayInterval={3000}
//           data={data?.data?.data}
//           scrollAnimationDuration={1500}
//           mode="horizontal-stack"
//           modeConfig={{
//             stackInterval: 20,
//             scaleInterval: 0.9,
//             // translationInterval: 50,
//           }}
//           // onSnapToItem={index => {
//           //   setCurrentSlide(index);
//           //   setCurrentImageIndex(0);
//           // }}
//           onSnapToItem={index => setCurrentSlide(index)}
//           onScrollBeginDrag={handleScrollBeginDrag}
//           onScrollEndDrag={handleScrollEndDrag}
//           renderItem={({item}) => {
//             // setItems(item)
//             const images = item?.profile?.images || [];
//             return (
//               <ImageBackground
//                 source={{uri: images[currentImageIndex]}}
//                 style={tw`flex-1`}
//                 imageStyle={tw`w-full h-[90%]`}>
//                 <LinearGradient
//                   colors={['rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
//                   style={tw`absolute inset-0`}
//                 />

//                 {/* <SlidingProgressBars
//                   totalSlides={data?.data?.data?.length || 0} // Ensure a valid number
//                   currentSlide={currentSlide}
//                 /> */}

//                 <View style={tw`px-[4%] mt-1 mb-0 flex justify-end h-[90%]`}>
//                   <View style={tw`mt-48`}>
//                     <View style={tw`flex-row gap-4 items-center`}>
//                       <Text style={tw`text-3xl text-white font-MontserratBold`}>
//                         {item?.name}
//                       </Text>
//                       <Text
//                         style={tw`text-xl text-gray-300 font-MontserratRegular`}>
//                         {item?.age}
//                       </Text>
//                     </View>
//                     <Text style={tw`text-sm text-gray-400`}>
//                       {item?.distance}
//                     </Text>
//                   </View>

//                   <View style={tw`flex-row flex-wrap gap-4 my-2`}>
//                     {item?.interests?.map((interest, index) => {
//                       console.log('interest++', interest);
//                       return (
//                         <TouchableOpacity
//                           key={index} //
//                           style={tw`bg-[#6D6D6D99] py-1 px-4 rounded-full`}>
//                           <Text style={tw`text-white text-sm`}>{interest}</Text>
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </View>

//                   <View
//                     style={tw`flex-row items-center mx-auto justify-between w-3/5 my-14`}>
//                     <TouchableOpacity
//                       style={tw`w-12 h-12 justify-center items-center  rounded-full`}>
//                       <Text style={tw`text-3xl text-gray-800`}>❌</Text>
//                     </TouchableOpacity>
//                     <View style={tw`bg-none`}>
//                       <AnimatedStarRating StarIcon={StarIcon} />
//                     </View>

//                     <TouchableOpacity
//                       onPress={() => handleInteraction(item?.id)}
//                       style={tw`w-12 h-12 justify-center items-center rounded-full`}>
//                       <AnimatedLoveSending
//                         LoveIcon={LoveIcon}
//                         onRatingChange={setRating}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </ImageBackground>
//             );
//           }}
//         />
//         {isSliding && (
//           <View
//             style={tw`absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
//             <CrossIconBold width={50} height={50} color="white" />
//           </View>
//         )}
//       </View>
//       {/* Additional content */}

//       <View>
//         <View style={tw`pb-2 bg-white`}>
//           <View style={tw` py-2 px-[4%] mt-4`}>
//             <View style={tw`flex-row my-4 gap-2 items-center`}>
//               <SvgXml xml={UserIcon} width={20} height={20} />
//               <Text style={tw`font-MontserratRegular text-black`}>
//                 Basic Information
//               </Text>
//             </View>
//             <Text style={tw`text-black font-MontserratRegular`}></Text>
//             <View style={tw`flex-row my-1 gap-2 items-center`}>
//               <SvgXml xml={LocationIcon} width={20} height={20} />
//               <Text style={tw`font-MontserratRegular text-black`}>
//                 {items?.address}
//               </Text>
//             </View>
//             <View style={tw`border-b border-b-gray-200`}></View>
//           </View>
//           <View style={tw` px-[4%]`}>
//             <View style={tw`flex-row my-4 gap-2 items-center`}>
//               <Text style={tw`font-MontserratBold font-bold text-black`}>
//                 Want to date
//               </Text>
//             </View>
//             <View style={tw`flex-row pb-2 gap-2 items-center`}>
//               <SvgXml xml={Menicon} width={20} height={20} />
//               <Text style={tw`font-MontserratRegular text-black`}>
//                 {items?.dating_with}
//               </Text>
//             </View>
//             <View style={tw`border-b border-b-gray-200`}></View>
//           </View>
//           <View style={tw` px-[4%]`}>
//             <View style={tw`flex-row my-4 gap-2 items-center`}>
//               <Text style={tw`font-MontserratBold font-bold text-black`}>
//                 Height
//               </Text>
//             </View>
//             <View style={tw`flex-row pb-2 gap-2 items-center`}>
//               <SvgXml xml={HieghtIcon} width={20} height={20} />
//               <Text style={tw`font-MontserratRegular text-black`}>
//                 {items?.height || 'N/A'}
//               </Text>
//             </View>
//             <View style={tw`border-b border-b-gray-200`}></View>
//           </View>
//           {items?.ethnicity?.is_show === true && (
//             <>
//               <View style={tw` px-[4%]`}>
//                 <View style={tw`flex-row my-4 gap-2 items-center`}>
//                   <Text style={tw`font-MontserratBold font-bold text-black`}>
//                     Ethinicity
//                   </Text>
//                 </View>

//                 <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                   <SvgXml xml={EthinicityIcon} width={20} height={20} />
//                   <Text style={tw`font-MontserratRegular text-black`}>
//                     {items?.ethnicity?.value}
//                   </Text>
//                 </View>
//                 <View style={tw`border-b border-b-gray-200`}></View>
//               </View>
//             </>
//           )}
//         </View>
//         <View style={tw`pb-2 mt-2 bg-white`}>
//           <View style={tw` py-2 px-[4%]`}>
//             <View style={tw`flex-row gap-2 items-center`}>
//               <SvgXml xml={InterestIcon} width={20} height={20} />
//               <Text style={tw`font-MontserratBold font-bold text-black`}>
//                 Interest
//               </Text>
//             </View>

//             <View style={tw`pb-2 mt-2 bg-white`}>
//               <View style={tw`py-2 px-4`}>
//                 {/* FlatList Container */}
//                 <View style={tw`flex-row flex-wrap`}>
//                   <FlatList
//                     horizontal={true}
//                     data={items?.interests}
//                     renderItem={renderItem}
//                     keyExtractor={item => item}
//                     // numColumns={3} // Optional for multi-column layout
//                     scrollEnabled={true} // Disable scrolling inside FlatList
//                     contentContainerStyle={tw`flex-row flex-wrap`}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={tw`border-b border-b-gray-200`}></View>
//           </View>
//         </View>
//         {(items?.drink?.is_show === true ||
//           items?.smoke?.is_show === true ||
//           items?.smoke_weed?.is_show === true ||
//           items?.drugs?.is_show === true ||
//           items?.have_children?.is_show === true) && (
//           <>
//             <View style={tw`pb-2 mt-2 bg-white`}>
//               <View style={tw` py-2 px-[4%] mt-4`}>
//                 <View style={tw`flex-row gap-2 items-center`}>
//                   <SvgXml xml={LifeStyle} width={12} height={12} />
//                   <Text style={tw`font-MontserratBold font-bold text-black`}>
//                     Lifestyle
//                   </Text>
//                 </View>
//                 {items?.drink?.is_show === true && (
//                   <>
//                     <Text
//                       style={tw`font-MontserratBold font-bold pt-2 text-black`}>
//                       Drinks
//                     </Text>
//                     <View style={tw`flex-row my-4 gap-2 items-center`}>
//                       <SvgXml xml={Drinks} width={20} height={20} />
//                       <Text style={tw`font-MontserratRegular text-black`}>
//                         {items?.drink?.value}
//                       </Text>
//                     </View>
//                     <View style={tw`border-b border-b-gray-200`}></View>
//                   </>
//                 )}
//               </View>
//               {items?.smoke?.is_show === true && (
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Smokes
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={SmokeIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.smoke?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               )}
//               {items?.smoke_weed?.is_show === true && (
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Weed
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={WeedIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.smoke?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               )}
//               {items?.drugs?.is_show === true && (
//                 <>
//                   <View style={tw` px-[4%]`}>
//                     <View style={tw`flex-row my-4 gap-2 items-center`}>
//                       <Text
//                         style={tw`font-MontserratBold font-bold text-black`}>
//                         Drugs
//                       </Text>
//                     </View>
//                     <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                       <SvgXml xml={DrugIcon} width={20} height={20} />
//                       <Text style={tw`font-MontserratRegular text-black`}>
//                         {items?.drugs?.value}
//                       </Text>
//                     </View>
//                     <View style={tw`border-b border-b-gray-200`}></View>
//                   </View>
//                 </>
//               )}
//               {items?.have_children?.is_show === true && (
//                 <>
//                   <View style={tw` px-[4%]`}>
//                     <View style={tw`flex-row my-4 gap-2 items-center`}>
//                       <Text
//                         style={tw`font-MontserratBold font-bold text-black`}>
//                         Children
//                       </Text>
//                     </View>
//                     <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                       <SvgXml xml={ChildrenIcon} width={20} height={20} />
//                       <Text style={tw`font-MontserratRegular text-black`}>
//                         {items?.have_children.value}
//                       </Text>
//                     </View>
//                     <View style={tw`border-b border-b-gray-200`}></View>
//                   </View>
//                 </>
//               )}
//             </View>
//           </>
//         )}
//         {(items?.home_town?.is_show === true ||
//           items?.religion?.is_show === true) && (
//           <View style={tw`pb-2 mt-2 bg-white`}>
//             <View style={tw` py-2 px-[4%] mt-4`}>
//               <View style={tw`flex-row gap-2 items-center`}>
//                 <SvgXml xml={BackgroundIcon} width={20} height={20} />
//                 <Text style={tw`font-MontserratBold font-bold text-black`}>
//                   Background
//                 </Text>
//               </View>
//               {items?.home_town?.is_show === true && (
//                 <>
//                   <Text
//                     style={tw`font-MontserratBold font-bold pt-2 text-black`}>
//                     Home Town
//                   </Text>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <SvgXml xml={LocationIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.home_town?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </>
//               )}
//             </View>
//             {items?.religion?.is_show === true && (
//               <>
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Religious Beliefs
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={ReligiousIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.religion?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               </>
//             )}
//           </View>
//         )}
//         {(items?.school?.is_show === true ||
//           items?.edu_lvl?.is_show === true ||
//           items?.job?.is_show === true ||
//           items?.work_place?.is_show === true) && (
//           <View style={tw`pb-2 mt-2 bg-white`}>
//             <View style={tw` py-2 px-[4%] mt-4`}>
//               <View style={tw`flex-row gap-2 items-center`}>
//                 <SvgXml xml={EducationIcon} width={20} height={20} />
//                 <Text style={tw`font-MontserratBold font-bold text-black`}>
//                   Education & Career
//                 </Text>
//               </View>
//               {items?.school?.is_show === true && (
//                 <>
//                   <Text
//                     style={tw`font-MontserratBold font-bold pt-2 text-black`}>
//                     School
//                   </Text>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <SvgXml xml={UnivesityIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.school?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </>
//               )}
//             </View>
//             {items?.edu_lvl?.is_show === true && (
//               <>
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Highest Level of Education
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={BookIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.edu_lvl?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               </>
//             )}
//             {items?.job?.is_show === true && (
//               <>
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Job Title
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={EnginnerIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.job?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               </>
//             )}
//             {items?.work_place?.is_show === true && (
//               <>
//                 <View style={tw` px-[4%]`}>
//                   <View style={tw`flex-row my-4 gap-2 items-center`}>
//                     <Text style={tw`font-MontserratBold font-bold text-black`}>
//                       Work Place
//                     </Text>
//                   </View>
//                   <View style={tw`flex-row pb-2 gap-2 items-center`}>
//                     <SvgXml xml={WorkplaceIcon} width={20} height={20} />
//                     <Text style={tw`font-MontserratRegular text-black`}>
//                       {items?.work_place?.value}
//                     </Text>
//                   </View>
//                   <View style={tw`border-b border-b-gray-200`}></View>
//                 </View>
//               </>
//             )}
//           </View>
//         )}

//         <View style={tw`pb-2 mt-2 bg-white`}>
//           <View style={tw` py-2 px-[4%] mt-4`}>
//             <View style={tw`flex-row gap-2 items-center`}>
//               <SvgXml xml={PersonalPromptIcon} width={20} height={20} />
//               <Text style={tw`font-MontserratBold font-bold text-black`}>
//                 Personal Prompts
//               </Text>
//             </View>
//           </View>
//           {items?.profile?.prompt?.map((p, i) => {
//             return (
//               <View style={tw`px-[4%]`}>
//                 <Text style={tw`font-MontserratBold font-bold pt-2 text-black`}>
//                   Prompt {i + 1}
//                 </Text>
//                 <View style={tw`flex-row mb-2 gap-2 items-center`}>
//                   <Text style={tw`font-MontserratRegular text-black`}>{p}</Text>
//                 </View>
//                 <View style={tw`border-b border-b-gray-200`}></View>
//               </View>
//             );
//           })}
//         </View>
//         {/* <View style={tw`flex-row items-center justify-center gap-1  my-4`}>
//           <Text style={tw`font-MontserratBold text-black`}>Show Less</Text>
//           <SvgXml xml={Uparrow} width={20} height={20} />
//         </View> */}

//         {/* <View style={tw`pb-2 mt-2 bg-white`}>
//           <View style={tw` py-2 px-[4%] mt-4`}>
//             <View style={tw`flex-row gap-2 items-center`}>
//               <SvgXml xml={Message} width={20} height={20} />
//               <Text style={tw`font-MontserratBold font-bold text-black`}>
//                 Send Message to Lana
//               </Text>
//             </View>
//             <Text style={tw`font-MontserratBold pt-2 text-black`}>
//               Boost your profile for a 25% better chance of finding your perfect
//               match!
//             </Text>
//           </View>
//           <View style={tw`w-full h-14 flex justify-center items-center py-2`}>
//             <InputText
//               placeholder="Type a Message"
//               floatingPlaceholderStyle={tw`font-MontserratRegular`}
//               containerStyle={tw`w-[90%]`}
//             />
//           </View>
//         </View> */}

//         <View
//           style={tw`flex-row items-center mx-auto justify-between w-3/5 py-4`}>
//           <TouchableOpacity
//             style={tw`w-12 h-12 justify-center items-center  rounded-full`}>
//             <Text style={tw`text-3xl text-gray-800`}>❌</Text>
//           </TouchableOpacity>
//           <View style={tw`bg-none`}>
//             <AnimatedStarRating StarIcon={StarIcon} />
//           </View>

//           <TouchableOpacity
//             style={tw`w-12 h-12 justify-center items-center rounded-full`}>
//             <AnimatedLoveSending LoveIcon={LoveIcon} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={tw`w-full flex mx-auto gap-y-2 justify-center items-center my-4`}>
//           <TButton
//             onPress={handleShareProfile}
//             titleStyle={tw`text-black font-MontserratBold`}
//             containerStyle={tw`w-[90%] bg-gray-100`}
//             title={`Share ${items?.name} profile`}
//           />
//           {items?.is_blocked === false && (
//             <>
//               <TButton
//                 onPress={() => {
//                   handleBlockUser(items?.id);
//                   setIsDisabled(true);
//                 }}
//                 disabled={isDisabled}
//                 titleStyle={tw`text-black font-MontserratBold`}
//                 containerStyle={tw`w-[90%] bg-gray-100 ${
//                   isDisabled ? 'opacity-20' : ''
//                 }`}
//                 title="Block"
//               />
//             </>
//           )}
//           {items?.is_blocked === false && (
//             <View style={tw`w-full mx-auto justify-center items-center`}>
//               <View
//                 style={tw` py-2 w-[90%] rounded-2xl h-24 border border-gray-300 px-[4%]`}>
//                 <TextArea
//                   onChangeText={value => setReport(value)}
//                   placeholder="Report user..."
//                   containerStyle={tw`border border-red-300 rounded-lg p-3 bg-white`}
//                   style={tw`text-black text-lg`}
//                   multiline
//                   numberOfLines={4} // Adjust height
//                 />
//               </View>

//               <TButton
//                 onPress={() => {
//                   setIsDisabled(true);
//                   handleBlockUser(items?.id);
//                 }}
//                 disabled={isDisabled}
//                 titleStyle={tw`text-black font-MontserratBold`}
//                 containerStyle={tw`w-[90%] bg-gray-400 my-2 ${
//                   isDisabled ? 'opacity-20' : ''
//                 }`}
//                 title={`Report ${items?.name}`}
//               />
//             </View>
//           )}
//         </View>
//       </View>

//       <StatusBar translucent={false} />
//     </ScrollView>
//   );
// };

// export default ExploreScreen;
