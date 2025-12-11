import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import { usePostHandle_iteractionMutation } from '../redux/apiSlices/userSlice';

const {width, height} = Dimensions.get('window');

type AnimatedStarRatingProps = {
  LoveIcon: string;
  onRatingChange?: (rating: number) => void;
};

const AnimatedLoveSending = ({
  id,
  LoveIcon,
  onRatingChange,
}: AnimatedStarRatingProps) => {
  const [ratings, setRatings] = useState<number[]>([]); // Array to track active animations
   const [postHandle_iteraction] = usePostHandle_iteractionMutation();
  const iconPositions = useSharedValue<{x: number; y: number}[]>([]); // Shared value for icon positions
console.log("ratings", ratings)
  const derivedIconPositions = useDerivedValue(
    () => [...iconPositions.value],
    [],
  );
  // Function to add a flourish when the user taps on the star
  const addFlourish =async () => {
    const newId = Math.random(); // Use Math.random() for a unique key
   
    setRatings(prev => {
      const updatedRatings = [...prev, newId];
      onRatingChange?.(updatedRatings.length);
      return updatedRatings;
    });
    const result = 'like';
  
    // Extract the first value from the ratings array
    const newRatings = ratings[0]; // Assuming you only need the first value from the array
  
    try {
      const formData = new FormData();
      formData.append('matched_user_id', id);
      
      // Append the string value of the rating, not the array
      formData.append('status', result); // Ensure it's a string
  
      console.log('formData', formData);
  
      const response = await postHandle_iteraction(formData);
      console.log('interaction response', response);
    } catch (error) {
      console.log(error);
    }
  
    // Set the position to the center of the screen for the flourish
    iconPositions.value = [
      ...iconPositions.value,
      {x: width / 2, y: height / 2}, // Always center
    ];
  };
  

  const removeFlourish = (id: number) => {
    setRatings(prev => prev.filter(ratingId => ratingId !== id));
  };
  const handleInteraction = async id => {
    console.log('click', id);
    try {
      const formData = new FormData();
      formData.append('matched_user_id', id);
      formData.append('status', rating);
      console.log('formData', formData);
      const response = await postHandle_iteraction(formData);
      console.log('interacion response', response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Rating Icons */}
      <View style={styles.ratingRow}>
        {[1].map((star, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              addFlourish();
            }}>
            <SvgXml xml={LoveIcon} width={40} height={40} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Flourishing Stars */}
      {ratings.map((id, index) => (
        <FlourishIcon
          key={id}
          x={derivedIconPositions.value[index]?.x || width / 2}
          y={derivedIconPositions.value[index]?.y || height / 2}
          onComplete={() => removeFlourish(id)}
          StarIcon={LoveIcon}
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
  const position = useSharedValue({x, y});
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: position.value.x - 300, // Adjust for star size
      top: position.value.y - 20,
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  React.useEffect(() => {
    // Animate position upwards and fade out
    position.value = withTiming(
      {x: position.value.x + Math.random() * 50 - 25, y: -290}, // Move up to the top
      {duration: 1600, easing: Easing.out(Easing.quad)},
    );

    // Slightly grow the star
    scale.value = withTiming(1.5, {duration: 500});

    // Fade out the star
    opacity.value = withTiming(0, {
      duration: 1200,
      easing: Easing.in(Easing.quad),
    });

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
      {/* Only render a single flourish icon (star) */}
      <View style={tw` justify-center my-4 flex-row gap-18`}>
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
      </View>
      <View style={tw`justify-center my-4 flex-row gap-12`}>
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
      </View>
      <View style={tw`items-center gap-16 my-4 flex-row`}>
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
      </View>
      <View style={tw`items-center flex-row gap-10 justify-center`}>
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
        <SvgXml xml={StarIcon} width={40} height={40} />
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

export default AnimatedLoveSending;
