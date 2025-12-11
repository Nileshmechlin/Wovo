// import React, { useState } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSpring,
//   Easing,
// } from 'react-native-reanimated';
// import { SvgXml } from 'react-native-svg';
// import tw from '../lib/tailwind';

// const { width, height } = Dimensions.get('window');

// type AnimatedStarRatingProps = {
//   StarIcon: string;
// };

// const AnimatedStarRating = ({ StarIcon }: AnimatedStarRatingProps) => {
//   const [ratings, setRatings] = useState<number[]>([]); // Array to track active animations
//   const iconPositions = useSharedValue<{ x: number; y: number }[]>([]); // Shared value for icon positions

//   // Function to add a flourish when the user taps on the star
//   const addFlourish = () => {
//     const newId = Math.random(); // Use Math.random() for a unique key
//     setRatings((prev) => [...prev, newId]);

//     // Set the position to the center of the screen for the flourish
//     iconPositions.value = [
//       ...iconPositions.value,
//       { x: width / 2, y: height / 2 }, // Always center
//     ];
//   };

//   const removeFlourish = (id: number) => {
//     setRatings((prev) => prev.filter((ratingId) => ratingId !== id));
//   };

//   return (
//     <View style={styles.container}>
//       {/* Rating Icons */}
//       <View style={styles.ratingRow}>
//         {[1].map((star, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => {
//               addFlourish();
//             }}
//           >
//             <SvgXml xml={StarIcon} width={40} height={40} />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Flourishing Stars */}
//       {ratings.map((id) => (
//         <FlourishIcon
//           key={id}
//           x={iconPositions.value[ratings.indexOf(id)]?.x || width / 2}
//           y={iconPositions.value[ratings.indexOf(id)]?.y || height / 2}
//           onComplete={() => removeFlourish(id)}
//           StarIcon={StarIcon}
//         />
//       ))}
//     </View>
//   );
// };

// const FlourishIcon = ({
//   x,
//   y,
//   onComplete,
//   StarIcon,
// }: {
//   x: number;
//   y: number;
//   onComplete: () => void;
//   StarIcon: string;
// }) => {
//   const position = useSharedValue({ x, y });
//   const opacity = useSharedValue(1);
//   const scale = useSharedValue(1);

//   // Update animation styles
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       position: 'absolute',
//       left: position.value.x - 20, // Adjust for icon size
//       top: position.value.y - 20,
//       opacity: opacity.value,
//       transform: [{ scale: scale.value }],
//     };
//   });

//   React.useEffect(() => {
//     // Sequential animation for each star
//     // Randomize the horizontal movement for a more natural effect
//     position.value = {
//       x: position.value.x + Math.random() * 50 - 25, // Small random horizontal movement
//       y: position.value.y - 500, // Move upwards (decrease y)
//     };
//     scale.value = withSpring(1.5, { damping: 4, stiffness: 100 }); // Slightly increase the size with a more natural spring effect
//     opacity.value = withTiming(0, {
//       duration: 1200, // Increase duration for smoother fade-out
//       easing: Easing.out(Easing.quad),
//     });

//     // Remove the icon after animation is complete
//     const removeTimer = setTimeout(() => {
//       onComplete();
//     }, 1200); // Wait for animation to finish before removing

//     return () => {
//       clearTimeout(removeTimer);
//     };
//   }, [position, scale, opacity, onComplete]);

//   return (
//     <Animated.View style={animatedStyle}>
//       {/* Only render a single flourish icon (star) */}
//       <View style={tw`items-start gap-24 flex-row justify-center`}>
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//       </View>
//       <View style={tw`items-center gap-12 flex-row justify-center`}>
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//       </View>
//       <View style={tw`items-center gap-36 flex-row justify-center`}>
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//       </View>
//       <View style={tw`items-center flex-row justify-center`}>
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//         <SvgXml xml={StarIcon} width={40} height={40} />
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default AnimatedStarRating;

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';

const { width, height } = Dimensions.get('window');

type AnimatedStarRatingProps = {
  StarIcon: string;
};

const AnimatedStarRating = ({ StarIcon }: AnimatedStarRatingProps) => {
  const [ratings, setRatings] = useState<number[]>([]); // Array to track active animations
  const iconPositions = useSharedValue<{ x: number; y: number }[]>([]); // Shared value for icon positions

  // Function to add a flourish when the user taps on the star
  const addFlourish = () => {
    const newId = Math.random(); // Use Math.random() for a unique key
    setRatings((prev) => [...prev, newId]);

    // Add new position to the shared value array
    iconPositions.value = [
      ...iconPositions.value,
      { x: width / 2, y: height / 2 }, // Always center
    ];
  };

  const removeFlourish = (id: number) => {
    setRatings((prev) => prev.filter((ratingId) => ratingId !== id));
  };

  return (
    <View style={styles.container}>
      {/* Rating Icons */}
      <View style={styles.ratingRow}>
        {[1].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              addFlourish();
            }}
          >
            <SvgXml xml={StarIcon} width={40} height={40} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Flourishing Stars */}
      {ratings.map((id) => (
        <FlourishIcon
          key={id}
          x={iconPositions.value[ratings.indexOf(id)]?.x || width / 2}
          y={iconPositions.value[ratings.indexOf(id)]?.y || height / 2}
          onComplete={() => removeFlourish(id)}
          StarIcon={StarIcon}
        />
      ))}
    </View>
  );
};

// const FlourishIcon = ({
//   x,
//   y,
//   onComplete,
//   StarIcon,
// }: {
//   x: number;
//   y: number;
//   onComplete: () => void;
//   StarIcon: string;
// }) => {
//   const position = useSharedValue({ x, y });
//   const opacity = useSharedValue(1);
//   const scale = useSharedValue(1);

//   // Update animation styles
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       position: 'absolute',
//       left: position.value.x - 20, // Adjust for icon size
//       top: position.value.y - 20,
//       opacity: opacity.value,
//       transform: [{ scale: scale.value }],
//     };
//   });

//   React.useEffect(() => {
//     // Sequential animation for each star
//     position.value = {
//       x: position.value.x + Math.random() * 50 - 25, // Small random horizontal movement
//       y: position.value.y - 500, // Move upwards (decrease y)
//     };
//     scale.value = withSpring(1.5, { damping: 4, stiffness: 100 }); // Slightly increase the size with a more natural spring effect
//     opacity.value = withTiming(0, {
//       duration: 1200, // Smooth fade-out
//       easing: Easing.out(Easing.quad),
//     });

//     // Remove the icon after animation is complete
//     const removeTimer = setTimeout(() => {
//       onComplete();
//     }, 1200);

//     return () => {
//       clearTimeout(removeTimer);
//     };
//   }, [position, scale, opacity, onComplete]);

const FlourishIcon = ({
  x,
  y,
  onComplete,
  StarIcon,
}: {
  x: number;
  y: number;
  onComplete: () => void;
  StarIcon: string;
}) => {
  const position = useSharedValue({ x, y });
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: position.value.x - 20, // Adjust for star size
      top: position.value.y - 20,
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  React.useEffect(() => {
    // Animate position upwards and fade out
    position.value = withTiming(
      { x: position.value.x + Math.random() * 50 - 25, y: -250 }, // Move up to the top
      { duration: 1200, easing: Easing.out(Easing.quad) }
    );

    // Slightly grow the star
    scale.value = withTiming(1.5, { duration: 500 });

    // Fade out the star
    opacity.value = withTiming(0, { duration: 1200, easing: Easing.in(Easing.quad) });

    // Clean up after animation
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(removeTimer);
    };
  }, [position, scale, opacity, onComplete]);


  return (
    <Animated.View style={animatedStyle}>
      {/* Flourishing Stars Layout */}
      <View style={tw`items-start gap-24 flex-row justify-center`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <SvgXml key={idx} xml={StarIcon} width={40} height={40} />
        ))}
      </View>
      <View style={tw`items-center gap-12 flex-row justify-center`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <SvgXml key={idx} xml={StarIcon} width={40} height={40} />
        ))}
      </View>
      <View style={tw`items-center gap-22 flex-row justify-center`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <SvgXml key={idx} xml={StarIcon} width={40} height={40} />
        ))}
      </View>
      <View style={tw`items-center flex-row justify-center`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <SvgXml key={idx} xml={StarIcon} width={40} height={40} />
        ))}
      </View>
    </Animated.View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedStarRating;
