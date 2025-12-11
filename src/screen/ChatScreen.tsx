// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   FlatList,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Video from 'react-native-video'; // Ensure this is installed: npm install react-native-video
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import io from 'socket.io-client';
// import tw from 'twrnc'; // Tailwind for React Native
// import {
//   AttachmentIcon,
//   KibubIcon,
//   LeftArrow,
//   StillCamera,
//   VideoCam,
// } from '../assets/icons/icon';
// import {SvgXml} from 'react-native-svg';
// import TButton from '../components/buttons/TButton';
// import {Avatar} from 'react-native-ui-lib';

// const socket = io('http://localhost:3000'); // Replace with your server's IP or domain

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([
//     {
//       text: 'Hello! How are you?',
//       user: 'Friend',
//       createdAt: new Date().setMinutes(new Date().getMinutes() - 5),
//       image: null,
//       video: null,
//     },
//     {
//       text: 'Check out this video!',
//       user: 'Friend',
//       createdAt: new Date().setMinutes(new Date().getMinutes() - 3),
//       image: null,
//       video: 'https://www.example.com/sample-video.mp4', // Example static video URL
//     },
//   ]); // Static incoming messages
//   const [text, setText] = useState(''); // For input field
//   const [mediaUri, setMediaUri] = useState(null); // For holding selected image or video URI
//   const [mediaType, setMediaType] = useState(null); // 'image' or 'video'

//   useEffect(() => {
//     // Listen for new messages from the server
//     socket.on('receiveMessage', message => {
//       setMessages(prev => [...prev, message]);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (text.trim() || mediaUri) {
//       const message = {
//         text,
//         user: 'User1', // Replace this with dynamic user data
//         createdAt: new Date(),
//         image: mediaType === 'image' ? mediaUri : null,
//         video: mediaType === 'video' ? mediaUri : null,
//       };

//       // Send message to the server
//       socket.emit('sendMessage', message);

//       // Update local message state
//       setMessages(prev => [...prev, message]);

//       // Clear input field and media
//       setText('');
//       setMediaUri(null);
//       setMediaType(null);
//     }
//   };

//   const pickMedia = type => {
//     launchImageLibrary(
//       {
//         mediaType: type,
//         quality: 1,
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled media picker');
//         } else if (response.errorMessage) {
//           console.error('MediaPicker Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setMediaUri(response.assets[0].uri); // Set the selected media URI
//           setMediaType(type);
//         }
//       },
//     );
//   };

//   const capturePhoto = () => {
//     launchCamera(
//       {
//         mediaType: 'photo',
//         quality: 1,
//         saveToPhotos: true, // Optional: Save the photo to the device's photo library
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled photo capture');
//         } else if (response.errorMessage) {
//           console.error('Camera Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setMediaUri(response.assets[0].uri); // Set the captured photo URI
//           setMediaType('image');
//         }
//       },
//     );
//   };

//   const recordVideo = () => {
//     launchCamera(
//       {
//         mediaType: 'video',
//         quality: 1,
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled video recording');
//         } else if (response.errorMessage) {
//           console.error('Camera Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setMediaUri(response.assets[0].uri); // Set the recorded video URI
//           setMediaType('video');
//         }
//       },
//     );
//   };

//   return (
//     <View style={tw`flex-1 bg-gray-100`}>
//       <View style={tw`flex-row items-center justify-between px-[4%] my-4`}>
//         <SvgXml xml={LeftArrow} width={25} height={25} />
//         <View style={tw`flex-row items-center gap-2 py-2 `}>
//           <View style={tw`relative`}>
//             <Avatar
//               source={require('../assets/images/promptImg.png')}
//               size={50}
//               containerStyle={tw`mr-4`}
//             />

//             <View
//               style={tw`w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-4`}
//             />
//           </View>
//           <Text style={tw`text-black font-MontserratRegular`}>Maryland Winkles</Text>
//         </View>
//         <TouchableOpacity>
//         <SvgXml xml={KibubIcon} width={20} height={20}/>
//         </TouchableOpacity>
//       </View>
//       {/* Message List */}
//       <FlatList
//         data={messages}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => (
//           <View
//             style={[
//               tw`mb-3 p-3 rounded-lg max-w-3/4`,
//               item.user === 'User1'
//                 ? tw`bg-blue-200 self-end`
//                 : tw`bg-gray-200 self-start`,
//             ]}>
//             <Text style={tw`font-MontserratBold text-black`}>{item.user}</Text>
//             {item.image && (
//               <Image
//                 source={{uri: item.image}}
//                 style={tw`h-40 w-full rounded-lg my-2`}
//                 resizeMode="cover"
//               />
//             )}
//             {item.video && (
//               // <Video
//               //   source={{ uri: item.video }}
//               //   style={tw`h-40 w-full rounded-lg my-2`}
//               //   resizeMode="cover"
//               //   controls
//               // />
//               <SvgXml xml={VideoCam} width={20} height={20} />
//             )}
//             <Text style={tw`text-black font-MontserratRegular`}>{item.text}</Text>
//             <Text style={tw`text-xs text-black mt-2`}>
//               {new Date(item.createdAt).toLocaleTimeString()}
//             </Text>
//           </View>
//         )}
//         contentContainerStyle={tw`p-4`}
//       />

//       {/* Input and Send Button */}
//       <View
//         style={tw`flex-row items-center mx-[4%] p-[4%] border-t border-gray-300`}>
//         {/* Attach Media Button */}
//         <TouchableOpacity onPress={capturePhoto} style={tw`mr-3`}>
//           <SvgXml xml={StillCamera} width={20} height={20} />
//         </TouchableOpacity>

//         {/* Camera Button */}
//         <TouchableOpacity onPress={recordVideo} style={tw`mr-3`}>
//           <SvgXml xml={VideoCam} width={20} height={20} />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => pickMedia('video')} style={tw`mr-3`}>
//           <SvgXml xml={AttachmentIcon} width={20} height={20} />
//         </TouchableOpacity>
//         <View style={tw`flex-row w-[75%] gap-1`}>
//           <TextInput
//             style={tw`flex-1 h-10 border border-gray-400 rounded-2xl px-3`}
//             placeholder="Type a message"
//             value={text}
//             onChangeText={setText}
//           />
//           <TouchableOpacity
//             onPress={sendMessage}
//             style={tw`bg-gray-400 py-1 px-2 rounded-2xl`}>
//             <Text style={tw`text-white text-lg font-MontserratBold`}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Preview Selected Media */}
//       {mediaUri && mediaType === 'image' && (
//         <View style={tw`flex-row items-center p-3`}>
//           <Image
//             source={{uri: mediaUri}}
//             style={tw`h-20 w-20 rounded-lg`}
//             resizeMode="cover"
//           />
//           <Button title="Remove" onPress={() => setMediaUri(null)} />
//         </View>
//       )}
//       {mediaUri && mediaType === 'video' && (
//         <View style={tw`flex-row items-center p-3`}>
//           <Video
//             source={{uri: mediaUri}}
//             style={tw`h-40 w-full rounded-lg`}
//             resizeMode="cover"
//             controls
//           />
//           <SvgXml xml={VideoCam} width={20} height={20} />
//           <Button title="Remove" onPress={() => setMediaUri(null)} />
//         </View>
//       )}
//     </View>
//   );
// };

// export default ChatScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Video from 'react-native-video'; // Ensure this is installed: npm install react-native-video
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import tw from 'twrnc'; // Tailwind for React Native
import {
  AttachmentIcon,
  CrossIcon,
  KibubIcon,
  LeftArrow,
  SendIcon,
  StillCamera,
  VideoCam,
} from '../assets/icons/icon';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/buttons/TButton';
import NormalModal from '../components/modals/NormalModal';

import {useGetUserQuery} from '../redux/apiSlices/userSlice';
import {
  useGetMessageQuery,
  usePostSendMessageMutation,
} from '../redux/apiSlices/chatSlice';
import {getSocket} from '../redux/services/socket';

const ChatScreen = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [conversation_id, setConversation_id] = useState();
  // console.log('cid', conversation_id);
  const {data} = useGetUserQuery({});
  const {data: messageData, refetch} = useGetMessageQuery({
    per_page: 10,
    id: conversation_id,
  });
  const [postSendMessage] = usePostSendMessageMutation();
  // console.log('data++++++++', messageData?.messages?.data);
  const receiverInfo = route?.params;
  const id = route?.params.id;
  useEffect(() => {
    setConversation_id(id);
  }, [id]);
  // console.log('receiver info++++++++++++++++++++++++', receiverInfo);

  console.log('receiverInfo', receiverInfo);

  const [messages, setMessages] = useState([]); // Static incoming messages
  const [text, setText] = useState(''); // For input field
  const [mediaUri, setMediaUri] = useState(null); // For holding selected image or video URI
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  console.log('text', mediaUri);
  // console.log('message==================', messages);
  const socket = getSocket();

  // Join the chat room and listen for real-time messages
  useEffect(() => {
    if (receiverInfo && data?.data?.id) {
      socket.emit('joinRoom', {
        userId: data?.data?.id,
        receiverId: receiverInfo?.receiverId,
      });

    
      const receiveMessageListener = () => {
        refetch();
      };

      socket.on(`receive_message`, receiveMessageListener);
      // console.log("reciveImge ++++++++++++++++++++++++++++++++++++", receiveImage)

      return () => {
        socket.off('receive_message', receiveMessageListener);
      };
    }
  }, [receiverInfo, data?.data]);

  // Fetch initial chat messages
  useEffect(() => {
    if (messageData) {
      setMessages(messageData?.messages?.data);
    }
  }, [messageData, conversation_id]);

  const sendMessage = async () => {
    if (text.trim() || mediaUri) {
      const messageText = text.trim() || 'Sent an image/video/document';
      const message = {
        message: messageText,
        user: data?.data?.name,
        createdAt: new Date(),
        media: null,
      };

      const formData = new FormData();
      formData.append('receiver_id', receiverInfo?.receiverId);
      formData.append('message', messageText);

      if (mediaUri) {
        let media = {
          uri: mediaUri,
          type: mediaType === 'photo' ? 'image/jpeg' : 'video/mp4',
          name: mediaType === 'photo' ? 'image.jpg' : 'video.mp4',
        };
        formData.append('media', media);
      }
      console.log('formData', formData);
      const postRes = await postSendMessage(formData);
      setConversation_id(postRes?.data?.data?.conversation_id);

      // Emit message via socket
      message.media = mediaUri || null;
      socket.emit('send_message', {
        conversation_id: postRes?.data?.data?.conversation_id,
        userId: data?.data?.id,
        receiverId: receiverInfo?.receiverId,
        message: messageText,
        media: mediaUri || null,
      });

      // Update local state for instant message visibility
      // setMessages(prev => [...prev, message]);
      setMessages(prev => [...prev, { message: messageText, media: mediaUri }]);
      setText('');
      setMediaUri(null);
      setMediaType(null);
    }
  };

  async function requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const pickMedia = (type) => {
    launchImageLibrary(
      {
        mediaType: type, 
        quality: 1,
        selectionLimit: 1, // Allow only one image/video selection
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled media selection');
        } else if (response.errorMessage) {
          console.error('MediaPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log("Selected media:", response.assets[0]); // Debugging log
  
          setMediaUri(response.assets[0].uri);
          setMediaType(type);
        }
      }
    );
  };
  

  const capturePhoto = async () => {
    // Request camera permission before launching camera
    await requestCameraPermission();

    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      },
      response => {
        console.log("photos", response)
        if (response.didCancel) {
          console.log('User cancelled photo capture');
        } else if (response.errorMessage) {
          console.error('Camera Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setMediaUri(response.assets[0].uri); // Set the captured photo URI
          setMediaType('image'); // Set the media type as 'image'
        }
      },
    );
  };

  const pickPhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1, // Allow only one image
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled media selection');
        } else if (response.errorMessage) {
          console.error('MediaPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log("Selected Image:", response.assets[0]); // Debugging log
          setMediaUri(response.assets[0].uri);
          setMediaType('image');
        }
      }
    );
  };
  

  const recordVideo = async () => {
    // Request camera permission before recording video
    await requestCameraPermission();

    launchCamera(
      {
        mediaType: 'video',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled video recording');
        } else if (response.errorMessage) {
          console.error('Camera Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setMediaUri(response.assets[0].uri); // Set the recorded video URI
          setMediaType('video'); // Set the media type as 'video'
        }
      },
    );
  };
  const toggleModal = () => setOpenModal(prev => !prev);

  // React.useEffect(() => {

  // }, [receiverInfo, data?.data]);
  const selectMediaType = () => {
    Alert.alert(
      "Choose Media",
      "Select the type of media you want to upload",
      [
        {
          text: "Image",
          onPress: () => pickPhotoFromGallery(),
        },
        {
          text: "Video",
          onPress: () => pickMedia('video'),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
  
  return (
    <View style={tw`flex-1 px-2 bg-gray-100`}>
      <View style={tw`px-[4%] flex-row justify-between items-center  my-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={LeftArrow} />
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-6`}>
          <View style={tw``}>
            <View style={tw`w-12, relative h-12 rounded-full overflow-hidden`}>
              <Image
                source={{uri: receiverInfo?.reeciverImage}}
                style={tw`w-12 h-12  rounded-full`}
              />
            </View>
            {receiverInfo?.is_active === 0 ?
                <View
                style={tw`w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-4`}
              />
                : <View
                  style={tw`w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-4`}
                /> }
          </View>
          <Text style={tw`font-MontserratBold text-black`}>
            {receiverInfo?.receiverName}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <SvgXml xml={KibubIcon} />
        </TouchableOpacity>
      </View>
      {/* Message List */}
      <FlatList
        keyboardShouldPersistTaps="always"
        inverted
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          // console.log('messageItem', item);
          return (
            <View
              style={[
                tw`mb-3 p-3 rounded-lg  w-[85%] text-black`,
                item?.is_sender === true
                  ? tw`bg-blue-200 self-end text-black`
                  : tw`bg-green-200 self-start text-black`,
              ]}>
              <View>
                <Text style={tw`font-MontserratRegular text-black`}>
                  {item.sender?.first_name + item.sender?.last_name}
                </Text>
                {item.media && (
                  <>
                    {item.media.includes('.mp4') ||
                    item.media.includes('.mov') ? (
                      <Video
                        source={{uri: item.media}}
                        style={tw`h-30 w-full rounded-lg my-2`}
                        resizeMode="cover"
                        controls
                      />
                    ) : (
                      <Image
                        source={{uri: item.media}}
                        style={tw`h-30 w-full rounded-lg my-2`}
                        resizeMode="cover"
                      />
                    )}
                  </>
                )}
                <Text style={tw`text-black font-MontserratRegular`}>
                  {item.message}
                </Text>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-xs flex-row text-end text-black mt-2`}>
                  {item.created_at_formatted}
                </Text>
                  <Text style={tw`text-xs flex-row text-end text-black mt-2`}>
                  {item.created_at_date}
                </Text>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={tw`p-4`}
      />

      {/* Input and Send Button */}
      <View style={tw`border-t border-gray-300`}>
        <View style={tw`flex-row items-center p-3  w-[90%]`}>
          {/* Attach Media Button */}
          <TouchableOpacity onPress={capturePhoto} style={tw`mr-2`}>
            <SvgXml xml={StillCamera} width={20} height={20} />
          </TouchableOpacity>

          {/* Camera Button */}
          <TouchableOpacity onPress={recordVideo} style={tw`mr-2`}>
            <SvgXml xml={VideoCam} width={20} height={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectMediaType()} style={tw`mr-2`}>
            <SvgXml xml={AttachmentIcon} width={20} height={20} />
          </TouchableOpacity>
          <View style={tw`flex-row w-[75%] gap-1 px-[2%]`}>
            <TextInput
              style={tw`w-full h-10 border text-black border-gray-400 rounded-2xl px-2`}
              placeholder="Type a message"
              placeholderTextColor={'black'}
              cursorColor={'black'}
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={tw` border items-center justify-center p-2 rounded-2xl`}>
              {/* <Text style={tw`text-white text-sm font-MontserratBold`}>Send</Text> */}
              <SvgXml xml={SendIcon} width={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Preview Selected Media */}
      {mediaUri && mediaType === 'image' && (
        <View style={tw`flex-row items-center p-3`}>
          <Image
            source={{uri: mediaUri}}
            style={tw`h-20 w-20 rounded-lg`}
            resizeMode="cover"
          />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )}
      {mediaUri && mediaType === 'video' && (
        <View style={tw`flex-row items-center p-3`}>
          <Video
            source={{uri: mediaUri}}
            style={tw`h-40 w-full rounded-lg`}
            resizeMode="cover"
            controls
          />
          <SvgXml xml={VideoCam} width={20} height={20} />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Button to open the modal */}
        {/* <Button title="Open Modal"  /> */}

        {/* NormalModal usage */}
        <NormalModal
          visible={openModal}
          setVisible={setOpenModal}
          animationType="fade" // Optional, choose 'none', 'slide', or 'fade'
          scrollable={true} // Optional, to make the modal content scrollable
          layerContainerStyle={{padding: 20}} // Optional, styling for the background layer
          containerStyle={{borderRadius: 10}} // Optional, styling for the modal container
        >
          {/* Content inside the modal */}
          <View>
            <View style={tw`flex-row w-full justify-end`}>
              <TouchableOpacity
                style={tw`text-red-700 border border-red-800 items-center justify-center h-6 w-6 rounded-full`}
                onPress={toggleModal}>
                <SvgXml color={'red'} xml={CrossIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={tw`font-MontserratBold text-black text-xl`}>
                Delete Conversation
              </Text>
              <Text style={tw`font-MontserratBold text-black text-xl py-4`}>
                Block
              </Text>
              <Text style={tw`font-MontserratBold text-red-900 text-xl`}>
                Delete{' '}
              </Text>
            </View>
          </View>
        </NormalModal>
      </View>
      <StatusBar translucent={false} />
    </View>
  );
};

export default ChatScreen;
