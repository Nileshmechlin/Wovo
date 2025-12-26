import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
} from 'react-native';

import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {Notification, warningRed} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/buttons/TButton';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-ui-lib';
import { useGetContactQuery, useGetMatchQuery} from '../redux/apiSlices/chatSlice';
import {makeImage} from '../utils/utils';

type ItemData = {
  id: string;
  image: string;
};

const ConnectedChatScreen = ({navigation}: NavigProps<null>) => {
  const {data, isLoading, isError} = useGetMatchQuery({});
const {data:contactData} = useGetContactQuery({});
  // console.log('contact data', contactData?.conversation?.data);
  console.log("new match data",data?.matches?.data.length)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'John Doe commented on your post.',
        creator_name: 'John Doe',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 2,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Your profile picture was liked.',
        creator_name: 'User',
      },
      created_at: new Date().toISOString(),
      read_at: new Date().toISOString(),
    },
    {
      id: 3,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 4,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 5,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 6,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 7,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 8,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 9,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 10,
      data: {
        creator_image: require('../assets/images/NotificationImg.png'),
        message: 'Anna followed you.',
        creator_name: 'Anna',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
  ]);
  const handleRead = (item) => {
    console.log("id from connected chat screen", item)
    console.log('red');
    navigation?.navigate('chatScreen', {id: item?.id, is_active: item?.is_active, receiverId: item?.receiver_id ,receiverName: item?.name, reeciverImage:item?.avatar });
  };

  const handleMessage = (item) => {
    console.log('click', item)
    navigation?.navigate('chatScreen', {receiverId: item?.id, receiverName: item?.first_name + item?.last_name, reeciverImage:item?.avatar});
  }

  return (
    <ScrollView style={tw`flex-1 my-12 h-screen px-[4%]`}>
      <View style={tw`flex-row justify-between w-full`}>
        <Text style={tw`font-MontserratBold text-black text-xl mb-4`}>Chats</Text>
        <SvgXml xml={Notification} width={25} height={25} />
      </View>
      {data?.matches?.data.length !== 0 && 
       <View style={tw`my-6 `}>
       <Text style={tw`font-MontserratBold text-black text-lg py-2`}>
         New Match
       </Text>
       <FlatList
         horizontal={true}
         data={data?.matches?.data}
         renderItem={({item}) => {
           // console.log('item', item);
           return (
             <TouchableOpacity
             onPress={()=>handleMessage(item)}
             >
               <View style={tw` h-18 w-18 mr-2 overflow-hidden`}>
                 <Image
                   style={tw`w-18 h-18 rounded-full`}
                   source={{uri: item?.avatar ? makeImage(item.avatar) : undefined}}
                 />
               </View>
             </TouchableOpacity>
           );
         }}
         keyExtractor={item => item.id}
       />
     </View>
      }
     
      <View>
        <Text style={tw`text-black font-MontserratBold`}>Message</Text>
        {/* Notifications List */}
        <FlatList
          data={contactData?.conversation?.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={tw`flex-row items-center gap-2 py-2 `}>
              <View style={tw`relative`}>
                {/* Avatar */}
                {item?.avatar && (
                  <Avatar
                    source={{uri: makeImage(item.avatar)}}
                    size={50}
                    containerStyle={tw`mr-4`}
                  />
                )}
                {item?.is_active === 0 ?
                <View
                style={tw`w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-4`}
              />
                : <View
                  style={tw`w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-4`}
                /> }
                
              </View>
              {/* Notification Content */}
              <View style={tw`flex-1 border-b border-gray-200 pb-2`}>
                <Text style={tw`text-black`}>{item.latest_message?.message}</Text>

                {/* Read/Unread Status */}
                {item.unread_messages === 0 ? (
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={tw`flex-row items-center mt-2`}>
                      
                    <Text style={tw`text-blue-500 px-2`}>
                      {item.latest_message?.created_at}
                    </Text>
                    <View
                      style={tw`w-5 h-5 items-center justify-center bg-red-500 rounded-full`}>
                      <Text>{item.unread_messages}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={tw`flex-row items-center mt-2`}>
                      
                    <Text style={tw`text-blue-500 px-2`}>
                      {item.latest_message?.created_at}
                    </Text>
                    <View
                      style={tw`w-5 h-5 items-center justify-center bg-red-500 rounded-full`}>
                      <Text>{item.unread_messages}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ConnectedChatScreen;
