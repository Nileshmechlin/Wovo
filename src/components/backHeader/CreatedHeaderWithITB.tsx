import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconWrite} from '../../icons/icons';
import tw from '../../lib/tailwind';

interface CreatedHeaderWithITDefaultProps {
  title?: string;
  ComponentBtn?: JSX.Element;
  onPress?: () => void;
}

const CreatedHeaderWithITB = ({
  title,
  ComponentBtn,
  onPress,
}: CreatedHeaderWithITDefaultProps) => {
  return (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center gap-3`}>
        <SvgXml xml={IconWrite} />
        <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
          {title}
        </Text>
      </View>
      <Text
        onPress={onPress}
        style={tw`text-red-600 font-NunitoSansBold text-base`}>
        Cancel
      </Text>
    </View>
  );
};

export default React.memo(CreatedHeaderWithITB);
