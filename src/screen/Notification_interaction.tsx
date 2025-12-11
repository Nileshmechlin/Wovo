import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TButton from '../components/buttons/TButton';
import Clipboard from '@react-native-clipboard/clipboard';
import {TextArea} from 'react-native-ui-lib';
import tw from '../lib/tailwind';
import {useGetHomeQuery} from '../redux/apiSlices/homeSlice';
import {SvgXml} from 'react-native-svg';
import AnimatedStarRating from '../components/AnimatedStartRating';
import AnimatedLoveSending from '../components/AnimatedLoveSending';
import {useGetUserDetailsQuery} from '../redux/apiSlices/userSlice';
import {
  BackgroundIcon,
  BookIcon,
  ChildrenIcon,
  Drinks,
  DrugIcon,
  EducationIcon,
  EnginnerIcon,
  EthinicityIcon,
  HieghtIcon,
  InterestIcon,
  LeftArrow,
  LifeStyle,
  LocationIcon,
  LoveIcon,
  Menicon,
  PersonalPromptIcon,
  ReligiousIcon,
  SmokeIcon,
  StarIcon,
  UnivesityIcon,
  UserIcon,
  WeedIcon,
  WorkplaceIcon,
} from '../assets/icons/icon';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {};
type Topic =
  | 'Online Shopping'
  | 'Amateur Cook'
  | 'Anime'
  | 'Horror Films'
  | 'Skincare';

const ExploreScreen = () => {
  const topics: Topic[] = [
    'Online Shopping',
    'Amateur Cook',
    'Anime',
    'Horror Films',
    'Skincare',
  ];
};

const Notification_interaction = ({navigation, route}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Topic[]>([]);
  const [report, setReport] = useState();
  const id = route?.params?.id;
  const {data, isLoading, isError} = useGetUserDetailsQuery(id);
  console.log('single notification', data?.data?.id);

  const handleBlockUser = async id => {
    console.log('click', id);
    try {
      const formData = new FormData();
      formData.append('blocked_user_id', id);
      formData.append('reason', report);
      //   const response = await postBlockUser(formData);
      //   console.log('report response++++++++++', response);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedProfile, setSelectedProfile] = useState({
    profile: {
      name: data?.data?.name,
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
  const toggleSelection = (item: Topic): void => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter(selectedItem => selectedItem !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };
  const handleShareProfile = () => {
    const profileUrl = `https://example.com/profile/${selectedProfile.profile.name.toLowerCase()}`;

    // You can log it to test the generated URL
    console.log(profileUrl);

    // Optionally, copy it to the clipboard
    Clipboard.setString(profileUrl);
    // Alert.alert('Profile URL Copied', 'You can now paste this URL anywhere!');
  };
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
        onPress={()=> navigation.goBack()}
        >
          <View style={tw`px-[4%] flex-row gap-2 my-4`}>
            <SvgXml xml={LeftArrow} />
            <Text style={tw`text-black font-MontserratBold text-lg`}>Back</Text>
          </View>
        </TouchableOpacity>
        <View>
          <View style={tw`w-full h-72 px-[4%] mt-4`}>
            <FlatList
              horizontal={true}
              data={data?.data?.profile?.images} // Check if this is an array
              renderItem={({item}) => {
                console.log('item inside FlatList render', item); // Log item to debug
                return (
                  <View style={tw`mr-4`}>
                    {/* Render each image inside the profile */}
                    {/* {item?.map((imageUrl, index) => ( */}
                    <Image
                      key={item}
                      source={{uri: item}}
                      style={tw`w-42 h-72 rounded-lg mb-2`}
                    />
                    {/* ))} */}
                    <Text style={tw`text-center mt-2`}>{item.name}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item} // Assuming item has an id field
              scrollEnabled={true} // Disable scrolling inside FlatList
              contentContainerStyle={tw`flex-row`}
            />
          </View>

          {/* <View>
            {data?.data?.avatar ? (
              <Image
                width={42}
                height={42}
                source={{uri: data?.data?.avatar}}
              />
            ) : (
              <Text>No Avatar</Text> // Fallback if URL is missing
            )}
          </View> */}
        </View>
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
                {data?.data?.address}
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
                {data?.data?.dating_with}
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
                {data?.data?.height}
              </Text>
            </View>
            <View style={tw`border-b border-b-gray-200`}></View>
          </View>
          {/* {items?.ethnicity?.is_show === true && ( */}
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
                  {data?.data?.ethnicity?.value}
                </Text>
              </View>
              <View style={tw`border-b border-b-gray-200`}></View>
            </View>
          </>
          {/* )} */}
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
                    data={data?.data?.interests}
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
        {(data?.data?.drink?.is_show === true ||
          data?.data?.smoke?.is_show === true ||
          data?.data?.smoke_weed?.is_show === true ||
          data?.data?.drugs?.is_show === true ||
          data?.data?.have_children?.is_show === true) && (
          <>
            <View style={tw`pb-2 mt-2 bg-white`}>
              <View style={tw` py-2 px-[4%] mt-4`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <SvgXml xml={LifeStyle} width={12} height={12} />
                  <Text style={tw`font-MontserratBold font-bold text-black`}>
                    Lifestyle
                  </Text>
                </View>
                {data?.data?.drink?.is_show === true && (
                  <>
                    <Text
                      style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                      Drinks
                    </Text>
                    <View style={tw`flex-row my-4 gap-2 items-center`}>
                      <SvgXml xml={Drinks} width={20} height={20} />
                      <Text style={tw`font-MontserratRegular text-black`}>
                        {data?.data?.drink?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </>
                )}
              </View>
              {data?.data?.smoke?.is_show === true && (
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Smokes
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={SmokeIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.smoke?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              )}
              {data?.data?.smoke_weed?.is_show === true && (
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Weed
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={WeedIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.smoke?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              )}
              {data?.data?.drugs?.is_show === true && (
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
                        {data?.data?.drugs?.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
              {data?.data?.have_children?.is_show === true && (
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
                        {data?.data?.have_children.value}
                      </Text>
                    </View>
                    <View style={tw`border-b border-b-gray-200`}></View>
                  </View>
                </>
              )}
            </View>
          </>
        )}
        {(data?.data?.home_town?.is_show === true ||
          data?.data?.religion?.is_show === true) && (
          <View style={tw`pb-2 mt-2 bg-white`}>
            <View style={tw` py-2 px-[4%] mt-4`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={BackgroundIcon} width={20} height={20} />
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Background
                </Text>
              </View>
              {data?.data?.home_town?.is_show === true && (
                <>
                  <Text
                    style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                    Home Town
                  </Text>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <SvgXml xml={LocationIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.home_town?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </>
              )}
            </View>
            {data?.data?.religion?.is_show === true && (
              <>
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Religious Beliefs
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={ReligiousIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.religion?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              </>
            )}
          </View>
        )}
        {(data?.data?.school?.is_show === true ||
          data?.data?.edu_lvl?.is_show === true ||
          data?.data?.job?.is_show === true ||
          data?.data?.work_place?.is_show === true) && (
          <View style={tw`pb-2 mt-2 bg-white`}>
            <View style={tw` py-2 px-[4%] mt-4`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={EducationIcon} width={20} height={20} />
                <Text style={tw`font-MontserratBold font-bold text-black`}>
                  Education & Career
                </Text>
              </View>
              {data?.data?.school?.is_show === true && (
                <>
                  <Text
                    style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                    School
                  </Text>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <SvgXml xml={UnivesityIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.school?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </>
              )}
            </View>
            {data?.data?.edu_lvl?.is_show === true && (
              <>
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Highest Level of Education
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={BookIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.edu_lvl?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              </>
            )}
            {data?.data?.job?.is_show === true && (
              <>
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Job Title
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={EnginnerIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.job?.value}
                    </Text>
                  </View>
                  <View style={tw`border-b border-b-gray-200`}></View>
                </View>
              </>
            )}
            {data?.data?.work_place?.is_show === true && (
              <>
                <View style={tw` px-[4%]`}>
                  <View style={tw`flex-row my-4 gap-2 items-center`}>
                    <Text style={tw`font-MontserratBold font-bold text-black`}>
                      Work Place
                    </Text>
                  </View>
                  <View style={tw`flex-row pb-2 gap-2 items-center`}>
                    <SvgXml xml={WorkplaceIcon} width={20} height={20} />
                    <Text style={tw`font-MontserratRegular text-black`}>
                      {data?.data?.work_place?.value}
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
          {data?.profile?.prompt?.map((p, i) => {
            return (
              <View style={tw`px-[4%]`}>
                <Text style={tw`font-MontserratBold font-bold pt-2 text-black`}>
                  Prompt {i + 1}
                </Text>
                <View style={tw`flex-row mb-2 gap-2 items-center`}>
                  <Text style={tw`font-MontserratRegular text-black`}>{p}</Text>
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
            <AnimatedLoveSending id={data?.data.id} LoveIcon={LoveIcon} />
          </TouchableOpacity>
        </View>
        <View
          style={tw`w-full flex mx-auto gap-y-2 justify-center items-center my-4`}>
          <TButton
            onPress={handleShareProfile}
            titleStyle={tw`text-black font-MontserratBold`}
            containerStyle={tw`w-[90%] bg-gray-100`}
            title={`Share ${data?.data?.name} profile`}
          />
          {data?.data?.is_blocked === false && (
            <>
              <TButton
                onPress={() => {
                  //   handleBlockUser(items?.id);
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
          {data?.data?.is_blocked === false && (
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
                  //   handleBlockUser(items?.id);
                }}
                disabled={isDisabled}
                titleStyle={tw`text-black font-MontserratBold`}
                containerStyle={tw`w-[90%] bg-gray-400 my-2 ${
                  isDisabled ? 'opacity-20' : ''
                }`}
                title={`Report ${data?.data?.name}`}
              />
            </View>
          )}
        </View>
      </View>

      <StatusBar translucent={false} />
    </ScrollView>
  );
};

export default Notification_interaction;

const styles = StyleSheet.create({});
