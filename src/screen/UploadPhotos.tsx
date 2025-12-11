import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TButton from '../components/buttons/TButton';
import tw from '../lib/tailwind';
import { NavigProps } from '../interfaces/NaviProps';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import IButton from '../components/buttons/IButton';
import {
  Gallery,
  StillCamera,
  VideoCam,
  BulbIcon,
  CrossIcon,
  LeftArrow,
} from '../assets/icons/icon';
import { SvgXml } from 'react-native-svg';
import MMKVStorage from 'react-native-mmkv-storage';

// Initialize MMKV
const storage = new MMKVStorage.Loader().initialize();

const UploadPhotos = ({ navigation }: NavigProps<null>) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);

  console.log("selected images",selectedImages)
  // Fetch images from MMKV storage on component mount
  useEffect(() => {
    const fetchImages = () => {
      try {
        const savedImages = storage.getString('images');
        if (savedImages) {
          setSelectedImages(JSON.parse(savedImages));
        }
      } catch (error) {
        console.log('Error fetching images from storage:', error);
      }
    };
    fetchImages();
  }, []);

  // Save images to MMKV storage
  const saveImagesToStorage = (images: string[]) => {
    try {
      storage.setString('images', JSON.stringify(images));
    } catch (error) {
      console.log('Error saving images to storage:', error);
    }
  };

  // Open gallery to select images
  const openGallery = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      cropping: true,
    })
      .then(images => {
        const imagePaths = images.map((image: any) => image.path);
        const updatedImages = [...selectedImages, ...imagePaths];
        setSelectedImages(updatedImages);
        saveImagesToStorage(updatedImages);
      })
      .catch(error => {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', error.message || 'Something went wrong');
        }
      });
  };

  // Open camera to capture images
  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });

      const updatedImages = [...selectedImages, image.path];
      setSelectedImages(updatedImages);
      saveImagesToStorage(updatedImages);

      Alert.alert('Success', 'Image saved locally!');
    } catch (error) {
      console.error(error);
    }
  };

  // Capture video
  const captureVideo = () => {
    ImageCropPicker.openCamera({
      mediaType: 'video',
    })
      .then(video => {
        setCapturedVideo(video.path);
      })
      .catch(error => {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', error.message || 'Something went wrong');
        }
      });
  };

  // Remove a specific image
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    saveImagesToStorage(updatedImages);
  };

  // Clear the captured video
  const clearCapturedVideo = () => {
    setCapturedVideo(null);
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 h-[95%] items-center justify-between px-4`}>
      <View style={tw`my-10`}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={tw`flex-row gap-4`}>
          <SvgXml xml={LeftArrow} width={25} height={25} />
          <Text style={tw`font-MontserratBlack text-primary text-2xl`}>
            Pair with photos & videos with prompts.
          </Text>
        </TouchableOpacity>

        {/* Media Upload */}
        <View style={tw`flex items-center justify-center my-12`}>
          <View style={tw`flex-row gap-6`}>
            <IButton
              containerStyle={tw`p-4 rounded-full`}
              svg={Gallery}
              onPress={openGallery}
            />
            <IButton
              containerStyle={tw`p-4 rounded-full`}
              svg={StillCamera}
              onPress={openCamera}
            />
            <IButton
              containerStyle={tw`p-4 rounded-full`}
              svg={VideoCam}
              onPress={captureVideo}
            />
          </View>
          <Text style={tw`font-MontserratRegular my-2`}>Four Images required</Text>

          {/* Display selected images */}
          {selectedImages.length > 0 && (
            <View style={tw`flex-row flex-wrap gap-2 my-4`}>
              {selectedImages.map((image, index) => (
                <View key={index} style={tw`relative`}>
                  <TouchableOpacity
                    onPress={() => navigation?.navigate('promptScreen')}>
                    <Image
                      source={{ uri: image }}
                      style={tw`w-24 h-24 rounded-lg`}
                    />
                  </TouchableOpacity>
                  <IButton
                    containerStyle={tw`absolute top-[-8px] right-[-8px] bg-red-500 rounded-full p-1`}
                    svg={CrossIcon}
                    onPress={() => handleRemoveImage(index)}
                  />
                </View>
              ))}
            </View>
          )}

          {/* Display captured video */}
          {capturedVideo && (
            <View style={tw`relative`}>
              <Video
                source={{ uri: capturedVideo }}
                style={tw`w-72 h-48 mt-2`}
                controls
                resizeMode="contain"
              />
              <IButton
                containerStyle={tw`absolute top-[-8px] right-[-8px] bg-red-500 rounded-full p-1`}
                svg={CrossIcon}
                onPress={clearCapturedVideo}
              />
            </View>
          )}
        </View>

        <View style={tw`bg-gray-100 rounded-lg p-5 border border-gray-300 relative`}>
          <SvgXml
            style={tw`absolute top-[-25px] left-[50%]`}
            width={50}
            height={50}
            xml={BulbIcon}
          />
          <Text style={tw`text-center text-gray-600 text-base`}>
            Tap a photo to add a prompt and make your profile stand out even more
          </Text>
        </View>
      </View>

      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
          onPress={() =>{
            if(selectedImages.length >= 4) {
              navigation?.navigate('promptScreen', {selectedImages: selectedImages})
            }else{
              Alert.alert('You must select at least 4 images!')
            }
            }
          } 
          titleStyle={tw`text-white font-MontserratBold text-center`}
          title="Continue"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default UploadPhotos;
