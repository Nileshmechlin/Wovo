import {Pressable, View} from 'react-native';
import {Dialog, PanningProvider} from 'react-native-ui-lib';

import React from 'react';
import tw from '../../lib/tailwind';

interface SideModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  scrollable?: boolean;
}

const SideModal = ({
  children,
  containerStyle,
  setVisible,
  visible,
}: SideModalProps) => {
  return (
    <Dialog
      width={'100%'}
      useSafeArea
      visible={visible || false}
      bottom={true}
      onDismiss={() => setVisible && setVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}
      containerStyle={tw`mt-[2%]  bg-white rounded-t-2xl `}
      renderPannableHeader={() => (
        <View style={tw`h-[4%] mt-[2%]`}>
          <View style={tw`bg-gray-300 h-1 w-20 rounded-full self-center`} />
        </View>
      )}>
      <Pressable disabled style={[tw`max-h-[95%]`, containerStyle]}>
        {children}
      </Pressable>
    </Dialog>
  );
};

export default SideModal;
