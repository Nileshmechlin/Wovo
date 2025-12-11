import {Text, View} from 'react-native';
import {IconFillLove, IconSendDown, IconSendUp} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface TransactionCardProps {
  item: any;
}

const TransactionCard = ({item}: TransactionCardProps) => {
  return (
    <View style={tw`my-3 flex-row gap-2 items-center`}>
      <View style={tw`relative`}>
        <FastImage
          style={tw`w-12 h-12 rounded-full`}
          source={{uri: item?.image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={tw`w-5 h-5 rounded-full bg-white absolute bottom-0 left-8 justify-center items-center`}>
          <SvgXml
            xml={item?.transactionType === 'credit' ? IconSendDown : IconSendUp}
          />
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center flex-1`}>
        <View>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
            Ritu Hasan
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-[10px]`}>
            Oct 14, 10:24AM
          </Text>
        </View>
        {item.icon === 'heart' ? (
          <View style={tw`flex-row gap-2 items-center justify-center`}>
            <SvgXml
              height={15}
              width={15}
              xml={IconFillLove}
              style={tw`w-6 h-6`}
            />
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
              {item?.transactionType === 'credit' ? '- 12.50' : '+ 12.50'}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
              {item?.transactionType === 'credit' ? '- $12.50' : '+ $12.50'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TransactionCard;
