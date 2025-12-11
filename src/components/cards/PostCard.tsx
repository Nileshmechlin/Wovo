import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconComment, IconFillLove, IconSend} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import IButton from '../buttons/IButton';
import InputText from '../inputs/InputText';
import SideModal from '../modals/SideModal';
import CommentCard from './CommentCard';

interface PostCardProps {
  item: any;
  onPress?: () => void;
  svgIcon?: any;
  title?: string;
}

const PostCard = ({item, onPress}: PostCardProps) => {
  const [love, setLove] = React.useState(false);
  const [isComment, setIsComment] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [open, setOpen] = React.useState(false);
  return (
    <View style={tw` p-4 bg-white`}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={tw`flex-row gap-2 items-center self-start`}>
        <FastImage
          style={tw`w-12 h-12 rounded-2xl`}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item.user.avatar,
          }}
        />
        <View style={tw`gap-[2px]`}>
          <Text style={tw`text-sm font-NunitoSansBold text-color-Black1000`}>
            {item.user.name}
          </Text>
          <Text style={tw`text-xs text-[#A5A3A9] font-NunitoSansRegular`}>
            {item.user.status}
          </Text>
        </View>
      </TouchableOpacity>
      {item.content.text && (
        <View style={tw`py-3`}>
          <Text style={tw`text-sm text-color-Black900 font-NunitoSansBold`}>
            {item.content.text}
          </Text>
        </View>
      )}

      {item.content.image && (
        <FastImage
          style={tw`w-full h-52 tablet:h-60 rounded-2xl my-1`}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: item.content.image,
          }}
        />
      )}

      <View style={tw`px-2 gap-2 mt-3`}>
        {/* Icons Row */}
        <View style={tw`flex-row items-center gap-4 `}>
          <TouchableOpacity onPress={() => setLove(!love)}>
            <SvgXml
              xml={
                love
                  ? IconFillLove
                  : `<svg width="20" height="20" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.53553 6.53553L7.5 12.5L13.4645 6.53553C14.1275 5.87249 14.5 4.97322 14.5 4.03553C14.5 2.08291 12.9171 0.5 10.9645 0.5C10.0268 0.5 9.12751 0.872492 8.46447 1.53553L7.5 2.5L6.53553 1.53553C5.87249 0.872493 4.97322 0.5 4.03553 0.5C2.08291 0.5 0.5 2.08291 0.5 4.03553C0.5 4.97322 0.872491 5.87249 1.53553 6.53553Z" stroke="#D2D1D4" stroke-linejoin="round"/>
</svg>
`
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsComment(!isComment);
            }}>
            <SvgXml xml={IconComment} />
          </TouchableOpacity>
        </View>

        {/* Views and Likes */}
        <View style={tw`flex-row items-center gap-3`}>
          <Text
            style={tw`text-color-Black1000  font-NunitoSansRegular text-xs`}>
            {item.content.views} views
          </Text>

          <Text
            numberOfLines={1}
            style={tw`text-gray-400 font-NunitoSansRegular w-[70%] text-xs`}>
            • Liked by
            <Text style={tw`text-color-Black1000 font-NunitoSansBold`}>
              {item?.content?.liked_by[0].name} and {item.content.likes} others
            </Text>
          </Text>
        </View>

        {/* Date */}
        <Text style={tw`text-gray-400 text-xs`}>{item.content.created_at}</Text>
      </View>

      <SideModal
        visible={isComment}
        setVisible={setIsComment}
        containerStyle={tw`h-[95%]`}>
        <View style={tw`px-4`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-base`}>
            Comments
          </Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive">
          <View style={tw`px-4 pt-4`}>
            <CommentCard item={item} />
          </View>
        </ScrollView>
        <View style={tw`p-4 flex-row items-center`}>
          <FastImage
            style={tw`w-12 h-12 rounded-2xl`}
            source={{uri: item.user.avatar}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={tw`h-14 flex-1`}>
            <InputText
              placeholder="Add a comment....."
              containerStyle={tw`h-14 border-0`}
            />
          </View>
          <IButton
            svg={IconSend}
            containerStyle={tw`bg-primary p-4 w-14 shadow-none`}
            onPress={() => {
              setOpen(!open);
            }}
          />
        </View>
      </SideModal>
    </View>
  );
};

export default PostCard;
