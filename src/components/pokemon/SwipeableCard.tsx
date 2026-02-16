import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Pokemon } from "../../types/pokemon";
import PokemonCard from "./PokemonCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

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

  const handleSwipeComplete = (direction: "left" | "right") => {
    if (direction === "left") {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          -SCREEN_WIDTH,
          { damping: 15 },
          () => {
            runOnJS(handleSwipeComplete)("left");
            translateX.value = 0;
          }
        );
      } else if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          SCREEN_WIDTH,
          { damping: 15 },
          () => {
            runOnJS(handleSwipeComplete)("right");
            translateX.value = 0;
          }
        );
      } else {
        translateX.value = withSpring(0);
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

  return (
    <View style={styles.container}>
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
            onLike={() => {
              translateX.value = withSpring(
                SCREEN_WIDTH,
                { damping: 15 },
                () => {
                  runOnJS(handleSwipeComplete)("right");
                  translateX.value = 0;
                }
              );
            }}
            onDislike={() => {
              translateX.value = withSpring(
                -SCREEN_WIDTH,
                { damping: 15 },
                () => {
                  runOnJS(handleSwipeComplete)("left");
                  translateX.value = 0;
                }
              );
            }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
