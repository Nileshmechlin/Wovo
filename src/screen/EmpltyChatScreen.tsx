import React, {useState} from 'react';
import {View, Button, StyleSheet, StatusBar, Text, Image} from 'react-native';

import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';
import {Notification, warningRed} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/buttons/TButton';

const EmptyChatScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 my-12 h-screen px-[4%]`}>
      <View style={tw`flex-row justify-between w-full`}>
        <Text style={tw`font-MontserratBold text-xl`}>Chats</Text>
        <SvgXml xml={Notification} width={25} height={25} />
      </View>
      <View style={tw`my-6 `}>
        <Text style={tw`text-left`}>Message</Text>
        <Image
          width={150}
          height={150}
          style={tw`flex mx-auto my-12`}
          source={require('../assets/images/EmptyMessageImg.png')}
        />
        <Text style={tw`font-MontserratBold text-2xl text-center`}>
          Connections start here
        </Text>
        <Text style={tw`font-MontserratRegular text-center`}>
          When you both swipe right on each other, you will match. Here is where
          you can chat
        </Text>
      </View>
      <View>
        <TButton
        onPress={() => navigation?.navigate('explore')}
        containerStyle={tw`bg-primary flex mx-auto my-6 w-[80%]`} titleStyle={tw`text-white`} title='Start connecting' />
      </View>
      <StatusBar backgroundColor={'gray'} translucent />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EmptyChatScreen;
