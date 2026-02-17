import React, { useContext, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import SwipeableCard from "../../components/pokemon/SwipeableCard";
import { usePokemon } from "../../hooks/usePokemon";
import { PokemonContext } from "../../context/PokemonContext";

// Header component - memoized to prevent re-renders
const Header = React.memo(() => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Discover</Text>
    <Text style={styles.headerSubtitle}>Find your perfect match!</Text>
  </View>
));

// Card container that handles Pokemon loading
const CardContainer = () => {
  const { pokemon, loading, loadPokemon } = usePokemon();
  const { addToLiked } = useContext(PokemonContext);

  const handleSwipeLeft = useCallback(() => {
    loadPokemon();
  }, [loadPokemon]);

  const handleSwipeRight = useCallback(() => {
    if (pokemon) {
      addToLiked(pokemon);
    }
    loadPokemon();
  }, [loadPokemon, addToLiked, pokemon]);

  if (loading || !pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <SwipeableCard
      pokemon={pokemon}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    />
  );
};

const SwipeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.cardContainer}>
        <CardContainer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ff6b6b",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
});

export default SwipeScreen;
