import {Pressable, ScrollView, View} from 'react-native';

import React from 'react';
import {Modal} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

interface NormalModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  scrollable?: boolean;
}

const NormalModal = ({
  setVisible,
  visible,
  containerStyle,
  children,
  layerContainerStyle,
  scrollable,
  animationType,
}: NormalModalProps) => {
  return (
    <Modal
      transparent
      // useKeyboardAvoidingView={false}
      animationType={animationType}
      overlayBackgroundColor={'rgba(0, 0, 0, 0.2)'}
      visible={visible}
      onBackgroundPress={() => setVisible && setVisible(!visible)}>
      <View style={[tw``, layerContainerStyle]}>
        <Pressable
          disabled
          style={[
            tw`bg-white w-full p-4 `,
            containerStyle,
            tw`tablet:w-[35%]`,
          ]}>
          {scrollable ? (
            <ScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default React.memo(NormalModal);
