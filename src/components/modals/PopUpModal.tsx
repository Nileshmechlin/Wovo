import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Modal} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

// import LottieView from 'lottie-react-native';

// import { FontSize } from '../../../utils/utils';

// Define the ref object type
export interface PopUpModalRef {
  open: (data: PopUpModalProps) => void;
  close: () => void;
}

// Define the component's props type
interface PopUpModalProps {
  title?: string;
  titleStyle?: any;
  icon?: JSX.Element;
  lottify?: string;
  containerStyle?: any;
  iconComponent?: JSX.Element;
  multipleBTNStyle?: any;
  multipleButton?: Array<{
    onPress?: () => void;
    text?: string;
    buttonText?: string;
    buttonTextStyle?: any;
    buttonStyle?: any;
  }>;
  onPress?: () => void;
  svgIcon?: any;
  content?: string;
  contentStyle?: any;
  buttonStyle?: any;
  buttonTextStyle?: any;
  buttonText?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  direction?: 'down' | 'up' | 'left' | 'right';
}

const {width, height} = Dimensions.get('window');

const PopUpModal = forwardRef<PopUpModalRef, PopUpModalProps>(
  ({direction}, ref) => {
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState<PopUpModalProps>();

    useImperativeHandle(ref, () => ({
      open(data) {
        setModalContent(data);
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    }));

    return (
      <Modal
        transparent
        animationType="fade"
        overlayBackgroundColor="rgba(0, 0, 0, 0.2)" // Semi-transparent background
        visible={visible}
        onDismiss={() => setVisible(false)}
        onBackgroundPress={() => setVisible(false)} // Close modal on background press
      >
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={tw`flex-1 justify-center items-center`}>
          <View
            style={[
              tw`bg-white w-[92%] p-8 rounded-3xl gap-6`,
              modalContent?.containerStyle,
            ]}>
            {modalContent?.icon && <View>{modalContent?.icon}</View>}
            {/* {modalContent?.lottify && (
              <View>
                <LottieView
                  autoPlay
                  loop={true}
                  source={modalContent?.lottify}
                  style={{
                    height: height * 0.08,
                    aspectRatio: 1,
                  }}
                />
              </View>
            )} */}
            {modalContent?.iconComponent && (
              <View style={tw`justify-center items-center`}>
                {modalContent?.iconComponent}
              </View>
            )}
            {modalContent?.svgIcon && (
              <View style={tw`justify-center items-center`}>
                {modalContent?.svgIcon}
              </View>
            )}
            {modalContent?.title && (
              <Text
                style={[
                  tw`text-center text-color-Black900 text-[24px] font-bold`,
                  modalContent.titleStyle,
                ]}>
                {modalContent.title}
              </Text>
            )}
            {modalContent?.content && (
              <Text
                style={[
                  tw`text-center font-normal text-lg text-[#34303E]`,
                  modalContent.contentStyle,
                ]}>
                {modalContent.content}
              </Text>
            )}
            {!modalContent?.multipleButton && (
              <View
                style={[
                  tw`bg-green-600 justify-center items-center p-3 rounded-xl`,
                  modalContent?.buttonStyle,
                ]}>
                <TouchableOpacity
                  style={tw`w-full justify-center items-center`}
                  activeOpacity={0.5}
                  onPress={modalContent?.onPress}>
                  <Text
                    style={[
                      tw`text-white font-bold`,
                      modalContent?.buttonTextStyle,
                    ]}>
                    {modalContent?.buttonText || 'Okay'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {modalContent?.multipleButton && (
              <View style={[tw`flex-row gap-3`, modalContent.multipleBTNStyle]}>
                {modalContent?.multipleButton.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      tw` bg-green-600 justify-center items-center p-3 rounded-xl`,
                      item?.buttonStyle,
                    ]}>
                    <TouchableOpacity
                      style={tw`w-full justify-center items-center`}
                      activeOpacity={0.5}
                      onPress={item?.onPress}>
                      <Text
                        style={[
                          tw`text-white font-bold`,
                          item?.buttonTextStyle,
                        ]}>
                        {item?.buttonText || 'Okay'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    );
  },
);

export default PopUpModal;
