import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import tw from '../lib/tailwind';


const SliderWithProgress = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  // Autoplay slide every 3 seconds (for example)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [totalSlides]);

  // Render progress bars based on the number of images
  const renderProgressBars = () => {
    return images.map((_, index) => {
      const progress = index <= currentSlide ? 1 : 0; // Fill progress bar for current or previous slides
      return (
        <Progress.Bar
          key={index}
          progress={progress}
          width={100}
          color={progress === 1 ? 'black' : 'gray'}
          unfilledColor="lightgray"
          borderWidth={0}
        />
      );
    });
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      {/* Slider Images */}
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / 300); // 300 is the width of each image
          setCurrentSlide(index);
        }}
        style={{ width: '100%' }}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={{ width: 300, height: 200 }}
          />
        ))}
      </ScrollView>

      {/* Progress Bars */}
      <View style={tw`flex-row my-2 gap-2`}>
        {renderProgressBars()}
      </View>
    </View>
  );
};
export default ProgressBars