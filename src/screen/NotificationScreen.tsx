import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import {Avatar, Badge} from 'react-native-ui-lib'; // Using rnulib components

import tw from '../lib/tailwind';
import {
  useGetNotificationQuery,
  usePutMarkAsReadNotificationMutation,
} from '../redux/apiSlices/notificationSlices';

const NotificationsScreen = ({navigation, route}) => {
  const {data, isLoading, isError, refetch} = useGetNotificationQuery({});
  const [putMarkAsReadNotification] = usePutMarkAsReadNotificationMutation();
  console.log('notification data', data?.data)
  // Static Data for Notifications
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

  // Count of unread notifications
  const nullCount = data?.data.filter(item => !item?.read_at).length;

  // // Handlers
  const handleBack = () => {
    console.log('Back pressed');
  };

  const handleRead = async id => {
    console.log(id);
    const res = await putMarkAsReadNotification(id);
    console.log('marked as read', res);
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? {...item, read_at: new Date().toISOString()} : item,
      ),
    );
  };

  const handleNotifation = (item) => {
    console.log('click', item?.data?.matched_user_id);
    navigation?.navigate('Notification_InteractionScreen', {id: item?.data?.matched_user_id})
  };
  return (
    <View style={tw`px-8 flex-1 my-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-between py-6`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-xl font-bold text-black`}>Notifications</Text>
          {nullCount > 0 && (
            <Badge
              label={nullCount.toString()}
              backgroundColor="red"
              containerStyle={tw`ml-2`}
            />
          )}
        </View>
        {/* <Text style={tw`text-blue-500`}>View All</Text> */}
      </View>

      {/* Notifications List */}
      <FlatList
        data={data?.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          console.log('notification item', item?.id);
          return (
            <TouchableOpacity
              onPress={()=>handleNotifation(item)}
              style={tw`flex-row items-center gap-2 py-2`}>
              {/* Avatar */}
              {item?.data?.avatar && (
                <Image
                  source={{uri: item?.data?.avatar}}
                  style={tw`w-12 h-12 rounded-full`}
                />
              )}

              {/* Notification Content */}
              <View style={tw`flex-1 border-b border-gray-200 pb-2`}>
                <Text style={tw`text-black`}>{item?.data?.message}</Text>

                {/* Read/Unread Status */}
                {item.read_at === null ? (
                  <TouchableOpacity
                    onPress={() => handleRead(item?.id)}
                    style={tw`flex-row items-center mt-2`}>
                    <Text style={tw`text-blue-500 px-2`}>
                      {item.created_at_formatted}
                    </Text>
                    <View style={tw`w-3 h-3 bg-red-500 rounded-full`} />
                  </TouchableOpacity>
                ) : (
                  <Text style={tw`text-gray-500 mt-2`}>
                    {item.created_at_formatted}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <StatusBar translucent={false} />
    </View>
  );
};

export default NotificationsScreen;
