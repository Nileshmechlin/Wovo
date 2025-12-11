import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {getSocket, initiateSocket} from '../../redux/services/socket';

import React from 'react';

import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useLazyTokenCheckQuery} from '../../redux/apiSlices/authSlice';
import {getStorageToken} from '../../utils/utils';
import FastImage from 'react-native-fast-image';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  const token = getStorageToken();
  const socket = getSocket();
  const [checkToken] = useLazyTokenCheckQuery({});
  console.log(token);
  const handleCheckValidToken = async () => {
    try {
      const res = await checkToken(token).unwrap();
      if (res) {
        (navigation as any)?.replace('bottomRoute');
      } else {
        (navigation as any)?.replace('AccountCreationOpening');
      }
    } catch (error) {
      console.log(error);
      (navigation as any)?.replace('AccountCreationOpening');
    }
  };
  React.useEffect(() => {
    if (token) {
      if (!socket) {
        initiateSocket();
      }
      handleCheckValidToken();
    } else {
      (navigation as any)?.replace('AccountCreationOpening');
    }
  }, []);

  return (
    <View style={tw`flex-1 w-full bg-white justify-center items-center`}>
      <FastImage
        style={tw`w-28 h-28 flex-1 `}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../../assets/images/logo.png')}
      />
      {/* <Text style={tw`text-white`}>Peach</Text> */}
      <StatusBar barStyle="light-content"  />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
