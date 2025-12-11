import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Checkbox } from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

interface UserSelectionCardProps {
    item : {
        id : any,
        name : string,
        image : string
    },
    selectionSate : any,
    setSelectionSate : React.Dispatch<SetStateAction<any>>
 }

const UserSelectionCard = ({item,selectionSate,setSelectionSate} : UserSelectionCardProps) => {
  return (
    <TouchableOpacity
    onPress={() => {
      if (selectionSate?.includes(item?.id)) {
        const exitData = selectionSate?.filter(
          (i : any) => i !== item?.id,
        );
        setSelectionSate([...exitData]);
      } else {
        setSelectionSate([...selectionSate, item.id]);
      }
    }}
    activeOpacity={0.5}
    style={tw`flex-row items-center justify-between py-2 gap-3`}>
    <View style={tw`flex-row items-center gap-3`}>
      <Checkbox
        color="#4964C6"
        size={25}
        style={tw`border-2 border-[#E8E8EA]`}
        value={selectionSate?.includes(item.id)}
        onValueChange={value => {
          if (selectionSate?.includes(item?.id)) {
            const exitData = selectionSate.filter(
              (i : any) => i !== item?.id,
            );
            setSelectionSate([...exitData]);
          } else {
            setSelectionSate([...selectionSate, item.id]);
          }
        }}
      />
      <Text>{item?.name}</Text>
    </View>
    <FastImage
      source={{uri: item?.image}}
      style={tw`w-12 h-12 rounded-2xl`}
      resizeMode={FastImage.resizeMode.contain}
    />
  </TouchableOpacity>
  )
}

export default React.memo(UserSelectionCard)