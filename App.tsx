import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const DATA = [
  { id: '1', title: 'Slide 1', backgroundColor: '#FF5733' },
  { id: '2', title: 'Slide 2', backgroundColor: '#33FF57' },
  { id: '3', title: 'Slide 3', backgroundColor: '#3357FF' },
  { id: '4', title: 'Slide 4', backgroundColor: '#FF33A1' },
  { id: '5', title: 'Slide 5', backgroundColor: '#A1FF33' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current visible slide
  const scrollX = useRef(new Animated.Value(0)).current; // For tracking scroll position
  const flatListRef = useRef(null); // Ref for FlatList

  // Configuration for the carousel
  const autoPlayInterval = 3000; // Interval to automatically scroll (3 seconds)
  const scrollAnimationDuration = 3000; // Scroll animation duration (3 seconds)
  const stackInterval = 20; // The interval between stacked items (for spacing)
  const scaleInterval = 0.9; // Scale of the stacked items
  const angle = -15; // The angle of rotation (in degrees)

  // Auto scroll the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % DATA.length; // Loop back to first item
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }, autoPlayInterval);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [currentIndex]);

  // Interpolate the scroll position for smooth transition effects
  const inputRange = DATA.map((_, index) => index * width);
  const outputRange = DATA.map((item) => item.backgroundColor); // Animate color change on scroll

  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  // Animate scale, translation and rotation based on scroll position (for stack and angle effect)
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: Array(DATA.length).fill(scaleInterval),
    extrapolate: 'clamp',
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: DATA.map((_, index) => -(index * stackInterval)),
    extrapolate: 'clamp',
  });

  const rotate = scrollX.interpolate({
    inputRange,
    outputRange: DATA.map((_, index) => `${(index - currentIndex) * angle}deg`),
    extrapolate: 'clamp',
  });

  const renderItem = ({ item, index }) => {
    const style = {
      transform: [
        { scale: scale },
        { translateX: translateX },
        { rotate: rotate },
      ],
    };

    return (
      <Animated.View style={[styles.card, style, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.cardText}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Animated background color change based on scroll */}
      <Animated.View style={[styles.carouselContainer, { backgroundColor }]}>
        <FlatList
          ref={flatListRef}
          data={DATA}
          horizontal
          pagingEnabled
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false } // This is for the color transition animation
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      {/* Manual navigation buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const prevIndex = (currentIndex - 1 + DATA.length) % DATA.length;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
          }}
        >
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const nextIndex = (currentIndex + 1) % DATA.length;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  carouselContainer: {
    width: width,
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    width: width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10, // Small gap between cards
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Carousel;
