// import React from 'react';
// import { View } from 'react-native';
// import * as Progress from 'react-native-progress';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
// import tw from '../lib/tailwind';

// const SlidingProgressBars = ({ totalSlides, currentSlide }) => {
//   // Create a shared value for animation
//   const progressValues = Array.from({ length: totalSlides }, (_, index) =>
//     useSharedValue(index <= currentSlide ? 1 : 0)
//   );

//   // Update animation on slide change
//   React.useEffect(() => {
//     progressValues.forEach((progress, index) => {
//       progress.value = withTiming(index <= currentSlide ? 1 : 0.2, { duration: 100 });
//     });
//   }, [currentSlide]);

//   return (
//     <View
//       style={tw`flex-row absolute top-6 left-0 transform -translate-x-1/2`}>
//       {progressValues.map((progress, index) => {
//         const animatedStyle = useAnimatedStyle(() => ({
//           transform: [{ scaleX: progress.value }],
//         }));

//         return (
//           <Animated.View key={index} style={animatedStyle}>
//             <Progress.Bar
//               progress={progress.value}
//               width={40} // Adjust width
//               height={6}
//               color={progress.value === 1 ? 'white' : 'gray'}
//               unfilledColor="lightgray"
//               borderWidth={0}
//               borderRadius={4}
//               style={tw`mx-1`}
//             />
//           </Animated.View>
//         );
//       })}
//     </View>
//   );
// };

// export default SlidingProgressBars;

import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import tw from '../lib/tailwind';

const SlidingProgressBars = ({ totalSlides, currentSlide }) => {
  // Create a shared value for animation
  const progressValues = Array.from({ length: totalSlides }, (_, index) =>
    useSharedValue(index <= currentSlide ? 1 : 0)
  );

  // Update animation on slide change
  React.useEffect(() => {
    progressValues.forEach((progress, index) => {
      progress.value = withTiming(index <= currentSlide ? 1 : 0, { duration: 3000 });
    });
  }, [currentSlide]);

  return (
    <View
      style={tw`flex-row absolute top-6 left-0 transform -translate-x-1/2`}>
      {progressValues.map((progress, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scaleX: progress.value }],
        }));

        return (
          <Animated.View key={index} style={animatedStyle}>
            <Progress.Bar
              progress={progress.value}
              width={40} // Adjust width
              height={6}
              color={progress.value === 1 ? 'white' : 'gray'}
              unfilledColor="lightgray"
              borderWidth={0}
              borderRadius={4}
              style={tw`mx-1`}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default SlidingProgressBars;
