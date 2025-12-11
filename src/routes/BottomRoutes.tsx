import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screen/ExploreScreen';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationScreen from '../screen/NotificationScreen';
import {
  ExploreFocus,
  Explore,
  Chat,
  ChatFocus,
  Profile,
  ProfileFocus,
  Notification,
  NotificationFocus,
} from '../assets/icons/icon';
import ProfileScreen from '../screen/ProfileScreen';
import { useEffect, useState } from 'react';
import ConnectedChatScreen from '../screen/ConnectedChatScreen';

const Tab = createBottomTabNavigator();

const BottomRoutes = () => {
  // States to track new notifications and new messages
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Simulate fetching new notifications and messages
  useEffect(() => {
    const fetchNotifications = async () => {
      // Replace with actual logic to check notifications
      setHasNewNotification(true); // Mocking a new notification
    };

    const fetchMessages = async () => {
      // Replace with actual logic to check for new messages
      setHasNewMessage(true); // Mocking a new message
    };

    fetchNotifications();
    fetchMessages();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: 'fade',
        tabBarStyle: tw`h-16 bg-primaryBase shadow-none border-0`,
        contentStyle: tw`h-16 bg-primaryBase shadow-none border-0`,
        tabBarItemStyle: tw`my-[10px] tablet:my-5 flex-col`,
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarIcon: ({ focused }) => {
          let icon;
          let badge = null; // Initialize badge to null

          // Choose icon based on route name and focused state
          switch (route.name) {
            case 'explore':
              icon = focused ? ExploreFocus : Explore;
              break;
            case 'notification':
              icon = focused ? NotificationFocus : Notification;
              if (hasNewNotification) {
                badge = (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'red',
                    }}
                  />
                );
              }
              break;
            case 'chat':
              icon = focused ? ChatFocus : Chat;
              if (hasNewMessage) {
                badge = (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'red',
                    }}
                  />
                );
              }
              break;
            case 'profileScreen':
              icon = focused ? ProfileFocus : Profile;
              break;
            default:
              icon = null;
          }

          return (
            <View style={{ position: 'relative' }}>
              <SvgXml xml={icon} />
              {badge}
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? 'gray' : 'gray';
          const font = focused ? 'NunitoSansBold' : 'NunitoSansRegular';

          return (
            <Text
              style={{
                color,
                fontSize: 12,
                textTransform: 'capitalize',
                fontFamily: font,
              }}
            >
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen 
      // options={{
      //   headerShown: false
      // }}
      name="explore" component={ExploreScreen} />
      <Tab.Screen name="notification" component={NotificationScreen} />
      <Tab.Screen name="chat" component={ConnectedChatScreen} />
      <Tab.Screen name="profileScreen" component={ProfileScreen} />
    </Tab.Navigator>
    
  );
};

export default BottomRoutes;
