import {Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment-timezone';
import React from 'react';
import FastImage from 'react-native-fast-image';
import tw from '../../lib/tailwind';

interface MessageCardProps {
  item: {
    image?: string;
    name?: string;
    lastMessage?: string;
    unreadCount?: number;
    time?: string;
  };
  onPress?: () => void;
  joinBtn?: boolean;
  joinPress?: () => void;
  offPartOne?: boolean;
  offPartTow?: boolean;
  offPartThree?: boolean;
  titleStyle?: any;
  subTitleStyle?: any;
  containerStyle?: any;
  titleContainerStyle?: any;
  Component?: React.ReactNode;
  disabled?: boolean;
}

// three part are divided 1= is image part 2= is name and title part 3= is icons and options part
const MessageCard = ({
  item,
  onPress,
  joinBtn,
  joinPress,
  subTitleStyle,
  titleStyle,
  containerStyle,
  titleContainerStyle,
  offPartOne,
  offPartTow,
  offPartThree,
  Component,
  disabled,
}: MessageCardProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}
      style={[tw`flex-row items-center  gap-3 px-[4%] py-2`, containerStyle]}>
      {!offPartOne && (
        <View style={tw`w-12 h-12 aspect-square rounded-2xl overflow-hidden`}>
          <FastImage
            source={{uri: item.image}}
            resizeMode={FastImage.resizeMode.contain}
            style={tw`w-full h-full`}
          />
        </View>
      )}
      {!offPartTow && (
        <View style={[tw`flex-1  gap-[2px]`, titleContainerStyle]}>
          {item.name && (
            <Text
              numberOfLines={1}
              style={[
                tw`text-[#1D1929] font-NunitoSansBold text-sm`,
                titleStyle,
              ]}>
              {item.name}
            </Text>
          )}

          {item.lastMessage && (
            <Text
              style={[
                tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`,
                subTitleStyle,
              ]}>
              {item.lastMessage}
            </Text>
          )}
        </View>
      )}
      {Component && Component}
      {/* show unread message naumber */}
      {!offPartThree && (
        <View style={tw`items-center gap-2`}>
          {joinBtn ? (
            <TouchableOpacity
              onPress={joinPress}
              activeOpacity={0.5}
              style={tw`items-center gap-2 `}>
              {/* unread message = 0 so dot show  */}
              <Text style={tw`text-color-Black950 font-NunitoSansBold text-sm`}>
                {/* date format like this 8:10 AM/PM  */}
                Join
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {item.unreadCount !== 0 && (
                <View
                  style={tw`w-4 h-4 rounded-full bg-red-500 items-center justify-center`}>
                  <Text style={tw`text-white font-NunitoSansBold text-[10px]`}>
                    {item.unreadCount}
                  </Text>
                </View>
              )}

              <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
                {/* date format like this 8:10 AM/PM  */}
                {moment(item.time).format('LT')}
              </Text>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MessageCard;
