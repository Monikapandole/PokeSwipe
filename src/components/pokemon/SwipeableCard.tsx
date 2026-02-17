import React, { useCallback } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Pokemon } from "../../types/pokemon";
import PokemonCard from "./PokemonCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

// Optimized spring config for smooth, natural feel
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 150,
  mass: 0.8,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

interface Props {
  pokemon: Pokemon;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeableCard: React.FC<Props> = ({
  pokemon,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const translateX = useSharedValue(0);

  // Memoize callbacks to prevent recreation on every render
  const handleSwipeLeft = useCallback(() => {
    onSwipeLeft();
  }, [onSwipeLeft]);

  const handleSwipeRight = useCallback(() => {
    onSwipeRight();
  }, [onSwipeRight]);

  // Only activate for horizontal movements (not vertical)
  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      // Apply translation directly without any smoothing
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe left - animate off screen
        translateX.value = withTiming(
          -SCREEN_WIDTH * 1.5,
          { duration: 250 },
          (finished) => {
            if (finished) {
              runOnJS(handleSwipeLeft)();
              translateX.value = -SCREEN_WIDTH;
            }
          }
        );
      } else if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe right - animate off screen
        translateX.value = withTiming(
          SCREEN_WIDTH * 1.5,
          { duration: 250 },
          (finished) => {
            if (finished) {
              runOnJS(handleSwipeRight)();
              translateX.value = SCREEN_WIDTH;
            }
          }
        );
      } else {
        // Snap back to center with spring
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-15, 0, 15],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  // Optimized background overlay - use opacity interpolation
  const backgroundStyle = useAnimatedStyle(() => {
    const absX = Math.abs(translateX.value);
    const opacity = interpolate(
      absX,
      [0, SWIPE_THRESHOLD],
      [0, 0.3],
      Extrapolation.CLAMP
    );
    
    const isLeft = translateX.value < 0;
    
    return {
      backgroundColor: isLeft 
        ? `rgba(255, 68, 68, ${opacity})` 
        : `rgba(68, 255, 68, ${opacity})`,
    };
  });

  const leftOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const rightOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const handleLike = useCallback(() => {
    translateX.value = withTiming(
      SCREEN_WIDTH * 1.5,
      { duration: 250 },
      (finished) => {
        if (finished) {
          runOnJS(handleSwipeRight)();
          translateX.value = SCREEN_WIDTH;
        }
      }
    );
  }, [translateX, handleSwipeRight]);

  const handleDislike = useCallback(() => {
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      { duration: 250 },
      (finished) => {
        if (finished) {
          runOnJS(handleSwipeLeft)();
          translateX.value = -SCREEN_WIDTH;
        }
      }
    );
  }, [translateX, handleSwipeLeft]);

  return (
    <View style={styles.container}>
      {/* Background color overlay */}
      <Animated.View style={[styles.backgroundOverlay, backgroundStyle]} />
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
          <Animated.View style={[styles.overlay, styles.leftOverlay, leftOverlayStyle]}>
            <Text style={styles.overlayText}>NOPE</Text>
          </Animated.View>
          <Animated.View style={[styles.overlay, styles.rightOverlay, rightOverlayStyle]}>
            <Text style={styles.overlayText}>LIKE</Text>
          </Animated.View>
          <PokemonCard
            pokemon={pokemon}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    margin: 16,
  },
  cardContainer: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 50,
    zIndex: 10,
    padding: 10,
    borderWidth: 4,
    borderRadius: 10,
  },
  leftOverlay: {
    left: 20,
    borderColor: "#ff4444",
    backgroundColor: "rgba(255, 68, 68, 0.1)",
  },
  rightOverlay: {
    right: 20,
    borderColor: "#44ff44",
    backgroundColor: "rgba(68, 255, 68, 0.1)",
  },
  overlayText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SwipeableCard;
