import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import tw from '../../lib/tailwind';

export interface IProductCarProps {
  onPress?: () => void;
  containerStyle?: any;
  showStatus?: boolean;
  status?: 'Delivered' | 'Pending' | 'Cancelled';
  item: {
    id?: number;
    productCode?: string;
    name?: string;
    category?: string;
    description?: string;
    price?: number;
    currency?: string;
    images: Array<string>;
  };
}

const ProductCard = ({
  item,
  onPress,
  status,
  showStatus,
  containerStyle,
}: IProductCarProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        tw`bg-white w-[48%] tablet:w-[25%]  p-2 md:p-4 tablet:p-5 shadow-md shadow-slate-800 rounded-xl gap-2`,
        containerStyle,
      ]}>
      <FastImage
        style={tw`w-full  h-32 rounded-xl`}
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: item.images![0],
        }}
      />
      <View style={tw` flex-row justify-between gap-2`}>
        <Text
          style={tw`text-center font-NunitoSansBold text-sm text-color-Black900`}>
          € {item.price}
        </Text>
        <Text
          style={tw`text-center text-[#615E69] font-NunitoSansRegular text-xs`}>
          {item.productCode}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        style={tw`text-center text-color-Black900 font-NunitoSansBold text-sm flex-1`}>
        {item.name}
      </Text>

      <View>
        {showStatus && (
          <View style={tw`flex-row gap-2 justify-center items-center my-2`}>
            <View
              style={tw`w-2 h-2 rounded-full justify-center items-center ${
                status === 'Pending'
                  ? 'bg-yellow-500'
                  : status === 'Cancelled'
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}></View>
            <Text
              style={tw`text-center text-black ${
                status === 'Pending'
                  ? 'text-yellow-500'
                  : status === 'Cancelled'
                  ? 'text-red-500'
                  : 'text-green-500'
              } text-xs font-NunitoSansBold`}>
              {status}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
