import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

const { width, height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ff6b6b" />
      
      {/* Background decoration */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      {/* Pokemon Logo/Icon */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.pokeball}>⚪</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>PokeSwipe</Text>
        <Text style={styles.subtitle}>Find your perfect Pokémon match!</Text>
        <Text style={styles.description}>
          Swipe right to like, swipe left to pass.
          Discover new Pokémon and build your collection!
        </Text>
      </View>

      {/* Pokemon Characters Preview */}
      <View style={styles.previewContainer}>
        <View style={styles.pokemonPreview}>
          <Text style={styles.pokemonEmoji}>🔥</Text>
        </View>
        <View style={styles.pokemonPreview}>
          <Text style={styles.pokemonEmoji}>⚡</Text>
        </View>
        <View style={styles.pokemonPreview}>
          <Text style={styles.pokemonEmoji}>💧</Text>
        </View>
      </View>

      {/* Get Started Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("MainTabs")}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start Swiping</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("MainTabs")}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>View Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Made with ❤️ for Pokémon fans
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backgroundCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -100,
  },
  backgroundCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: 100,
    left: -80,
  },
  backgroundCircle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: 150,
    left: -50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  pokeball: {
    fontSize: 60,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  previewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 20,
  },
  pokemonPreview: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  pokemonEmoji: {
    fontSize: 35,
  },
  buttonContainer: {
    marginTop: 50,
    gap: 15,
  },
  startButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: "#ff6b6b",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
  },
});
